const consoleDiv = document.getElementById('console');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function typeText(text, speed = 30, className = "") {
    const line = document.createElement('div');
    line.className = 'line ' + className;
    consoleDiv.appendChild(line);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    line.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
        cursor.before(text[i]);
        await sleep(speed);
        window.scrollTo(0, document.body.scrollHeight);
    }

    cursor.remove();
}

async function deleteLastLine() {
    const lines = document.getElementsByClassName('line');
    if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        const text = lastLine.innerText;

        for (let i = text.length; i >= 0; i--) {
            lastLine.innerText = text.substring(0, i);
            await sleep(10);
        }
        lastLine.remove();
    }
}

async function clearScreen() {
    const lines = document.getElementsByClassName('line');
    while (lines.length > 0) {
        await sleep(20);
        lines[lines.length - 1].remove();
    }
}

async function simulateTyping(text, elementId) {
    const element = document.getElementById(elementId);
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await sleep(150);
    }
}

async function bootSequence() {
    await sleep(500);
    await typeText("BIOS DATE 15/12/2025 14:22:56 VER 1.02", 10, "system-msg");
    await typeText("CPU: OVERTHINKING_CORE i9 @ 3.6GHz... OK", 10, "system-msg");
    await typeText("RAM: 16GB (15.9GB використовується думками)... OK", 10, "system-msg");
    await typeText("HDD: CHECKING SECTORS...", 10, "system-msg");
    await sleep(300);
    await typeText("  - old_conversations.dat... FOUND", 10);
    await typeText("  - unread_messages.log... 0 ENTRIES", 10);
    await typeText("  - friendship.dll... OUTDATED", 10, "error");
    await sleep(400);
    await typeText("", 0);
    await typeText("LOADING EMOTIONAL_STATE.SYS...", 20, "system-msg");
    await sleep(600);
    await typeText("[WARNING] FILE CORRUPTED. RUNNING DIAGNOSTICS...", 15, "error");
    await sleep(400);
    await typeText("  Analyzing silence_duration... 247 HOURS", 15);
    await typeText("  Checking awkwardness_level... MODERATE", 15);
    await typeText("  Scanning care_factor... STILL HIGH", 15, "system-msg");
    await sleep(500);
    await typeText("", 0);
    await typeText("LOADING FRIENDSHIP_PROTOCOL...", 20, "system-msg");
    await sleep(800);
    await typeText(">> BOOT COMPLETE", 15, "system-msg");
    await sleep(1000);

    await typeText(">> CLEARING SCREEN...", 10, "system-msg");
    await sleep(500);
    await clearScreen();
}

async function messageSequence() {
    await sleep(500);

    await typeText("> Ініціалізація повідомлення...", 30);
    await sleep(500);

    await typeText("> Шановна Олександра. Я помітив відсутність комунікації...", 40);
    await sleep(600);
    await typeText("[ERROR 404: DUDE, TOO FORMAL]", 10, "error");
    await sleep(400);
    await typeText(">> DELETING...", 20, "error");
    await deleteLastLine();
    await deleteLastLine();

    await sleep(500);
    await typeText("> Чому ти ігноруєш? Я думаю, що ми могли б....", 40);
    await sleep(800);
    await typeText("[WARNING: DRAMA DETECTED. ABORTING]", 10, "error");
    await typeText(">> CLEARING CACHE...", 20, "error");
    await deleteLastLine();
    await deleteLastLine();

    await sleep(800);
    await typeText("> Спроба №3. Завантаження...", 20, "system-msg");
    await sleep(300);
    await typeText("> Я думаю, що ми могли б відновити наше спілкування", 50);
    await typeText("> Мені просто цікаво, як ти.", 50);

    await sleep(1000);
    await typeText("", 0);
    await typeText("SYSTEM: Продовжити? (Y/N)", 20, "system-msg");

    const inputLine = document.createElement('div');
    inputLine.className = 'line';
    inputLine.innerHTML = '> <span id="userInput"></span><span class="cursor"></span>';
    consoleDiv.appendChild(inputLine);

    await sleep(1500);
    await simulateTyping("N", "userInput");
    await sleep(500);
    const cursorEl = document.getElementById('userInput').nextElementSibling;
    if (cursorEl) cursorEl.remove();

    await typeText("[ERROR] Некоректна відповідь. Ти точно хотіла написати 'Y'!", 30, "error");
    await sleep(600);
    await typeText("SYSTEM: Автокорекція активована... Інтерпретовано як 'Y'", 20, "system-msg");
    await sleep(800);
    await typeText(">> CONTINUING...", 20, "system-msg");

    await sleep(1000);
}

async function finalSequence() {
    await typeText("", 0);
    await typeText(">> CONNECTION ESTABLISHED", 20, "system-msg");
    await typeText(">> WAITING FOR RESPONSE...", 20, "system-msg");
    await sleep(500);

    const btnLine = document.createElement('div');
    btnLine.className = 'line';
    btnLine.innerHTML = '> <a href="https://t.me/AwesomeMilka" class="btn">ВІДПОВІСТИ (Y)</a>';
    consoleDiv.appendChild(btnLine);
}

async function startSequence() {
    await bootSequence();
    await messageSequence();
    await finalSequence();
}

startSequence();
