const balance = document.querySelector('.balance'),
    money_plus = document.querySelector('#income'),
    money_lose = document.querySelector('#expenses'),
    list = document.querySelector('.list'),
    addForm = document.querySelector('#add-form'),
    note  = document.querySelector('#note'),
    amount = document.querySelector('#amount'),
    toast = document.querySelector('.toast');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// 获取本地数据
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// 自定义弹窗
function Toast(message, time = 2000) {
    toast.innerText = message;
    toast.classList.add('show-toast');
    let timer = setTimeout(() => {
        toast.classList.remove('show-toast');
        clearTimeout(timer);
    }, time);
}


function addTransaction(e) {
    // 阻止默认时间
    e.preventDefault();

    if (note.value.trim() === '' || amount.value.trim() === '') {
        Toast('enter note and amount');
    } else {
        const transaction = {
            id : generateID(),
            note : note.value,
            amount : +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        note.value = '';
        amount.value = '';
    }
}

function generateID() {
    // 设置随机ID
    return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction) {
    // 判断符号
    let sign  = transaction.amount < 0 ? '-' : '+';
    let item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'lose' : 'plus');

    item.innerHTML = `
        ${transaction.note}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;

    // 新数据插入到最后面
    // list.appendChild(item);
    // 新数据插入到最前面
    list.insertBefore(item, list.firstChild);
}

function updateValues() {
    // 获取 transaction 的 amount
    let amounts = transactions.map(transaction => transaction.amount);

    // reduce用于将数组内容进行累计，toFixed保留n位小数
    let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // 取出数组中大于0的数，累加，取两位小数
    let income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    let expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = total;
    money_plus.innerText = income;
    money_lose.innerText = expense;
}

function removeTransaction(id) {

    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

addForm.addEventListener('submit', addTransaction);