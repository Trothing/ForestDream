const consoleDiv = document.getElementById('console');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let audioContext = null;
let backgroundMusic = null;
let typingSound = null;
let musicStarted = false;

function stopAllAudio() {
    if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
    }

    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
        audioContext = null;
    }
}


function initAudio() {
    if (!musicStarted) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        backgroundMusic = new Audio('music.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;

        const source1 = audioContext.createMediaElementSource(backgroundMusic);
        source1.connect(audioContext.destination);

        typingSound = new Audio('typing.mp3');
        typingSound.loop = true;
        typingSound.volume = 0.5;

        const source2 = audioContext.createMediaElementSource(typingSound);
        source2.connect(audioContext.destination);

        backgroundMusic.play().catch(e => console.log('Music play failed:', e));
        musicStarted = true;
    }
}

function startTypingSound() {
    if (typingSound && typingSound.paused) {
        typingSound.play().catch(e => console.log('Typing sound failed:', e));
    }
}

function stopTypingSound() {
    if (typingSound && !typingSound.paused) {
        typingSound.pause();
    }
}

async function typeText(text, speed = 30, className = "") {
    const line = document.createElement('div');
    line.className = 'line ' + className;
    consoleDiv.appendChild(line);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    line.appendChild(cursor);

    if (text.length > 0) {
        startTypingSound();
    }

    for (let i = 0; i < text.length; i++) {
        cursor.before(text[i]);
        await sleep(speed);

    }

    stopTypingSound();
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

    startTypingSound();

    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await sleep(150);
    }

    stopTypingSound();
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
    await typeText("  Analyzing silence_duration... 125 DAYS", 15);
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
    await sleep(800);
    await typeText("", 0);
    await typeText("LOADING: casual_questions.dat", 15, "system-msg");
    await sleep(300);
    await typeText("> Як день?", 50);
    await typeText("> Що снідала?", 50);
    await typeText("> Що нового у житті?", 50);
    await typeText("> Все добре?", 50);
    await sleep(500);
    await typeText("SYSTEM: Questions loaded successfully", 15, "system-msg");


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

    await typeText("[ERROR] Некоректна відповідь. Ти точно хотіла написати 'Y'.", 30, "error");
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
    await typeText("SYSTEM_RESTORE.EXE", 20, "system-msg");
    await typeText("", 0);
    await typeText(">> Для запуску системи натисни кнопку", 20, "system-msg");
    await sleep(300);

    const startBtnLine = document.createElement('div');
    startBtnLine.className = 'line';
    const startBtn = document.createElement('button');
    startBtn.className = 'btn';
    startBtn.textContent = '▶ ЗАПУСТИТИ СИСТЕМУ';
    startBtn.style.cursor = 'pointer';
    startBtn.onclick = async function() {
        initAudio();
        this.disabled = true;
        this.textContent = '✓ СИСТЕМА ЗАПУЩЕНА';
        await sleep(500);
        startBtnLine.remove();
        await bootSequence();
        await messageSequence();
        await finalSequence();
    };

    startBtnLine.innerHTML = '> ';
    startBtnLine.appendChild(startBtn);
    consoleDiv.appendChild(startBtnLine);
}

startSequence();








