import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { requireToken, telegramRequest } from './api.mjs';

function shorten(value, limit) {
  const text = String(value ?? '').replace(/\r\n/g, '\n').trim();
  if (text.length <= limit) return text;
  // Leave room for ellipsis, without splitting an emoji's surrogate pair.
  return text.slice(0, limit - 1).replace(/[\uD800-\uDBFF]$/, '') + '…';
}

function releaseUrl(value) {
  let url;
  try { url = new URL(value); } catch { throw new Error('В релизе отсутствует корректная ссылка GitHub.'); }
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.username || url.password ||
      !/^\/[^/]+\/[^/]+\/releases\/tag\/.+/.test(url.pathname)) {
    throw new Error('Разрешены только HTTPS-ссылки на GitHub Release.');
  }
  return url.href;
}

export function buildMessage(release, appName = 'Loot Ledger') {
  const url = releaseUrl(release.html_url);
  const tag = shorten(release.tag_name, 100);
  if (!tag) throw new Error('У релиза нет номера версии (tag_name).');
  const heading = `🚀 ${shorten(appName, 100)} — новое обновление ${tag}`;
  const title = shorten(release.name, 200);
  const prefix = `${heading}${release.prerelease ? '\n🧪 Предварительная версия' : ''}${title && title !== tag ? `\n${title}` : ''}\n\nЧто нового:\n`;
  const suffix = '\n\nСкачивание и полное описание — по кнопке ниже.';
  return {
    text: prefix + shorten(release.body || 'Описание изменений доступно на странице релиза.', 4000 - prefix.length - suffix.length) + suffix,
    // Plain text avoids interpreting GitHub Markdown/HTML as Telegram markup.
    link_preview_options: { is_disabled: true },
    disable_notification: false,
    reply_markup: { inline_keyboard: [[{ text: '📥 Скачать обновление', url }]] },
  };
}

export async function getRelease(repository, tag, token, fetcher = fetch) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? '')) throw new Error('Задайте GITHUB_REPOSITORY в формате owner/repo.');
  if (!tag?.trim()) throw new Error('Для отправки релиза вручную укажите RELEASE_TAG.');
  let response;
  let data;
  try {
    response = await fetcher(`https://api.github.com/repos/${repository}/releases/tags/${encodeURIComponent(tag.trim())}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Loot-Ledger-Telegram-Bot', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      signal: AbortSignal.timeout(20_000),
    });
    data = await response.json();
  } catch { throw new Error('GitHub: не удалось получить релиз.'); }
  if (!response.ok) throw new Error(`GitHub: ошибка ${response.status}. Проверьте репозиторий, тег и доступ.`);
  return data;
}

export async function notify(env = process.env, { fetcher = fetch, event } = {}) {
  const automatic = env.GITHUB_EVENT_NAME === 'release';
  if (automatic && Number(env.GITHUB_RUN_ATTEMPT || 1) > 1) {
    return { skipped: 'Повторный запуск пропущен для защиты от дублей. Для восстановления используйте Run workflow с тегом релиза.' };
  }
  let message;
  if (env.TEST_ONLY === 'true') {
    message = { text: `✅ Тест уведомлений ${shorten(env.APP_NAME || 'Loot Ledger', 100)}.\nБот подключён к группе. Это тест, новая версия не публиковалась.`, disable_notification: false };
  } else {
    if (automatic) {
      event ??= JSON.parse(await readFile(env.GITHUB_EVENT_PATH, 'utf8'));
      if (event.action !== 'published') return { skipped: 'Событие не является публикацией релиза.' };
    }
    const release = automatic ? event.release : await getRelease(env.GITHUB_REPOSITORY, env.RELEASE_TAG, env.GITHUB_TOKEN, fetcher);
    if (!release || release.draft || !release.published_at) return { skipped: 'Релиз ещё не опубликован.' };
    if (release.prerelease && env.INCLUDE_PRERELEASES !== 'true') return { skipped: 'Предварительная версия пропущена.' };
    message = buildMessage(release, env.APP_NAME || 'Loot Ledger');
  }
  requireToken(env.TELEGRAM_BOT_TOKEN);
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  if (!/^-\d+$/.test(chatId ?? '')) throw new Error('Задайте отрицательный числовой TELEGRAM_CHAT_ID группы.');
  const thread = env.TELEGRAM_THREAD_ID?.trim();
  if (thread && (!/^\d+$/.test(thread) || !Number.isSafeInteger(Number(thread)) || Number(thread) <= 0)) {
    throw new Error('TELEGRAM_THREAD_ID должен быть положительным целым ID темы.');
  }
  const result = await telegramRequest(env.TELEGRAM_BOT_TOKEN, 'sendMessage', {
    ...message, chat_id: chatId, ...(thread ? { message_thread_id: Number(thread) } : {}),
  }, fetcher);
  return { messageId: result.message_id };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.includes('--preview')) {
      const event = JSON.parse(await readFile(new URL('./example-release.json', import.meta.url), 'utf8'));
      console.log(JSON.stringify(buildMessage(event.release, process.env.APP_NAME || 'Loot Ledger'), null, 2));
    } else {
      const result = await notify();
      console.log(result.skipped || `Уведомление отправлено. Message ID: ${result.messageId}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
