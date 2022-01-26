
const cardsContainer = document.querySelector('.cards-container');
const preBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-btn');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('.add-container');

// 当前卡片
let currentActiveCard = 0;

// 卡片元素组
const cardsEl = [];

// 获取卡片数据
const cardsData = getCardsData();


// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// 根据卡片元素组的数据创建卡片
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    // 如果插入的是第一张卡片，则设置active样式
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
         <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    // 点击翻转
    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // 加入卡片元素组
    cardsEl.push(card);
    // 加入cardsContainer
    cardsContainer.appendChild(card);
    // 更新导航
    updateCurrentText();
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// listeners

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

preBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));


addCardBtn.addEventListener('click', () => {
    let question = questionEl.value;
    let answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        let newCard = {question, answer};

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    } else {
        alert('question and answer cant be empty')
    }
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

