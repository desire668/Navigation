let answer = [];
let guessCount = 0;

// 生成一个4位不重复的随机数字
function generateAnswer() {
    const numbers = Array.from({length: 10}, (_, i) => i); // 0-9的数组
    answer = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        answer.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }
    guessCount = 0;
    console.log('答案已生成：', answer.join('')); // 用于调试
}

// 检查输入是否合法（4位不重复数字）
function isValidInput(input) {
    if (!/^\d{4}$/.test(input)) return false;
    const digits = input.split('');
    return new Set(digits).size === 4;
}

// 计算xAxB
function calculateResult(guess) {
    const guessDigits = guess.split('').map(Number);
    let a = 0, b = 0;

    // 计算A（位置和数字都正确的个数）
    for (let i = 0; i < 4; i++) {
        if (guessDigits[i] === answer[i]) {
            a++;
        }
    }

    // 计算B（数字正确但位置错误的个数）
    for (let i = 0; i < 4; i++) {
        if (answer.includes(guessDigits[i]) && guessDigits[i] !== answer[i]) {
            b++;
        }
    }

    return { a, b };
}

// 显示消息
function showMessage(text, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = isError ? 'error' : 'success';
}

// 添加历史记录
function addHistory(guess, result) {
    const historyList = document.getElementById('history-list');
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = `第${guessCount}次猜测：${guess} → ${result.a}A${result.b}B`;
    historyList.insertBefore(historyItem, historyList.firstChild);
}

// 处理猜测
function makeGuess() {
    const input = document.getElementById('guess');
    const guess = input.value;

    if (!isValidInput(guess)) {
        showMessage('请输入4位不重复的数字！', true);
        return;
    }

    guessCount++;
    const result = calculateResult(guess);
    addHistory(guess, result);

    if (result.a === 4) {
        showMessage(`恭喜你！用了${guessCount}次猜对了！`);
        input.disabled = true;
    } else {
        showMessage(`${result.a}A${result.b}B`);
    }

    input.value = '';
    input.focus();
}

// 开始新游戏
function newGame() {
    generateAnswer();
    document.getElementById('guess').disabled = false;
    document.getElementById('history-list').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').focus();
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    newGame();
    // 添加回车键支持
    document.getElementById('guess').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
});