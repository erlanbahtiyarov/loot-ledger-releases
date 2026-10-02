<div align="center">

# ⚔️ Loot Ledger

### Ваша история. Ваша добыча. Ваша кампания.
### Your story. Your loot. Your campaign.

Локальный помощник мастера и игроков для D&D  
A local companion for D&D game masters and players

**Windows · Android · LAN · Offline**

[**Скачать / Download**](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/latest) · [История версий / Release notes](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases) · [Сообщить о проблеме / Report an issue](https://github.com/erlanbahtiyarov/loot-ledger-releases/issues)

[Русский](#русский) · [English](#english)

</div>

---

## Русский

**Меньше учёта за столом — больше времени на приключение.**

Loot Ledger помогает мастеру вести кампании, готовить добычу и выдавать её героям, а игрокам — видеть свой инвентарь на телефоне. Приложение оформлено в стиле тёмного фэнтези: графитовые поверхности, приглушённое золото и читаемые карточки предметов.

Мастер работает на **Windows**, игроки — на **Android**. Во время сессии устройства обмениваются данными по локальной сети. Основная база кампании хранится на компьютере мастера; обязательного облака нет.

### Что уже есть

| Для мастера · Windows | Для игрока · Android |
|---|---|
| Кампании, персонажи и доступ игроков | Подключение к кампании по QR-приглашению |
| Общая библиотека предметов и выдача добычи | Инвентарь героя, кошелёк и общий сундук |
| Противники, места и объекты как источники добычи | Запросы передачи предметов и история |
| Фиксированные наборы и таблицы под реальные броски D4–D100 | Просмотр последних синхронизированных данных без сети |
| Собственные валюты, названия и цвета | Офлайн-черновики предметов и правок с одобрением мастера |
| Журнал событий и отмена поддерживаемых операций | Запоминание входа по желанию и выбор сохранённого героя |

**Для обоих приложений:** независимые локальные профили, изображения кампаний, портреты героев, картинки и иконки предметов, резервные копии и встроенная пошаговая помощь.

У мастера также есть настраиваемые сочетания клавиш, необязательный четырёхзначный PIN и помощник **Ollama** для подготовки предметов. Ollama подключается отдельно; результат AI сохраняется только после подтверждения мастера.

### Начать игру

1. Откройте [последний релиз](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/latest) и раздел **Assets**.
2. **Мастеру:** скачайте Windows-установщик `.exe`, создайте профиль, кампанию и персонажей.
3. **Игрокам:** скачайте `.apk`, установите Android-приложение и создайте локальные профили.
4. Подключите компьютер и телефоны к общей Wi-Fi/LAN-сети. Мастер начинает сессию и создаёт приглашение, игрок сканирует его в приложении.
5. Выдавайте добычу, следите за кошельками и продолжайте приключение. Инструкции доступны внутри приложения.

> Для установки нужны **EXE или APK**. Архивы **Source code** скачивать не нужно. Интерфейс приложений сейчас на русском языке.

### Обновления и сохранения

- **Windows:** проверка обновлений находится в настройках. Приложение проверяет подпись и создаёт резервную копию базы и текущего EXE перед установкой.
- **Android:** устанавливайте новый APK поверх прежнего или используйте Obtainium для отслеживания этого репозитория. При первом запуске новой версии создаётся копия зашифрованного профиля.
- Перед ручным обновлением сохраните формы и создайте резервную копию. **Не удаляйте приложение и не очищайте его данные.**
- Для отката Windows восстанавливайте совместимые базу и версию программы вместе. Восстановление профиля Android не откатывает сам APK.

Android пока распространяется как тестовый APK с сохранённой подписью для обновления поверх предыдущих выпусков. Работа без сети позволяет читать сохранённые данные и готовить черновики; синхронизация и одобрение требуют подключения к мастеру.

### Полезные инструкции

[Профили и вход](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.17.0/PROFILES.md) · [Валюты кампании](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.16.0/CURRENCIES.md) · [Изображения и оформление](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.15.0/IMAGES.md)

---

## English

**Less bookkeeping at the table. More time for the adventure.**

Loot Ledger helps game masters manage campaigns, prepare treasure and award it to heroes, while players follow their inventory on their phones. Its dark fantasy interface combines charcoal surfaces, muted gold and readable item cards.

The game master uses **Windows**, and players use **Android**. Devices synchronize over the local network during a session. The campaign’s primary database stays on the game master’s computer, with no mandatory cloud service.

### Available features

| Game master · Windows | Player · Android |
|---|---|
| Campaigns, characters and player access | Join a campaign through a QR invitation |
| Shared item library and loot distribution | Character inventory, wallet and shared chest |
| Enemies, locations and objects as loot sources | Item transfer requests and history |
| Fixed loot lists and tables for physical D4–D100 rolls | View the last synchronized data offline |
| Custom currencies, names and colors | Draft items and edits offline for GM approval |
| Event history and undo for supported operations | Optional remembered sign-in and saved character selection |

**Both apps include:** independent local profiles, campaign artwork, character portraits, item images and icons, backups and built-in step-by-step help.

The desktop app also includes configurable keyboard shortcuts, an optional four-digit GM PIN and an **Ollama** assistant for drafting items. Ollama is optional and configured separately; AI results are saved only after the game master confirms them.

### Start playing

1. Open the [latest release](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/latest) and expand **Assets**.
2. **Game master:** download the Windows `.exe` installer, then create a profile, campaign and characters.
3. **Players:** download and install the Android `.apk`, then create local profiles.
4. Connect the computer and phones to the same Wi-Fi/LAN. The GM starts a session and creates an invitation; players scan it inside the app.
5. Award loot, track wallets and keep the adventure moving. Help is available inside the apps.

> Download the **EXE or APK** to install. The **Source code** archives are not installers. The application interface is currently in Russian.

### Updates and backups

- **Windows:** check for updates in Settings. The app verifies the update signature and backs up the database and current EXE before installation.
- **Android:** install the new APK over the existing app, or use Obtainium to track this repository. The first launch of a new version creates a backup of the encrypted profile.
- Before a manual update, save open forms and create a backup. **Do not uninstall the app or clear its data.**
- A Windows rollback requires a matching database backup and application version. Restoring an Android profile does not downgrade the APK itself.

Android is currently distributed as a test APK with a consistent signing certificate for upgrades. Offline use supports cached data and local drafts; synchronization and approval require a connection to the game master.

### Guides · in Russian

[Profiles and sign-in](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.17.0/PROFILES.md) · [Campaign currencies](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.16.0/CURRENCIES.md) · [Images and artwork](https://github.com/erlanbahtiyarov/loot-ledger-releases/releases/download/v0.15.0/IMAGES.md)

---

<div align="center">

**Об этом репозитории / About this repository**

Установщики, файлы обновлений и инструкции Loot Ledger.  
Loot Ledger installers, update files and user guides.

Исходный код приложения, данные кампаний и секретные ключи здесь не публикуются.  
Application source code, campaign data and private keys are not published here.

</div>
