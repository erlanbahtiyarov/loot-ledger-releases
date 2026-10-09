const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function requireToken(token) {
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(token ?? '')) {
    throw new Error('Задайте TELEGRAM_BOT_TOKEN, полученный у BotFather.');
  }
}

// Never print raw errors/responses: Telegram URLs contain the bot token.
export async function telegramRequest(token, method, payload, fetcher = fetch, sleep = pause) {
  requireToken(token);
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    let data;
    try {
      response = await fetcher(`https://api.telegram.org/bot${token}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20_000),
      });
      data = await response.json();
    } catch {
      throw new Error('Telegram: ответ не получен. Проверьте доставку в группе перед повторной отправкой.');
    }
    if (response.ok && data.ok === true) return data.result;
    const code = Number(data.error_code || response.status);
    const delay = Number(data.parameters?.retry_after);
    if (code === 429 && attempt < 2 && Number.isInteger(delay) && delay > 0 && delay <= 30) {
      await sleep(delay * 1000);
      continue;
    }
    const hints = {
      400: 'Проверьте ID группы/темы и право отправлять сообщения. При преобразовании группы ID может измениться.',
      401: 'Токен бота недействителен.',
      403: 'Добавьте бота в группу и разрешите ему отправлять сообщения.',
      409: 'Остановите другой polling-процесс или проверьте webhook существующего бота.',
      429: 'Лимит запросов. Повторите позже после проверки группы.',
    };
    throw new Error(`Telegram: ошибка ${code}. ${hints[code] || 'Проверьте группу перед повторной отправкой.'}`);
  }
}
