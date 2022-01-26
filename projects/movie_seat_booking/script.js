
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const movieSelect = document.querySelector('#movies');


populateUI();

// 使用 + 转换字符串 为 number
let ticketPrice = +movieSelect.value;


// 存储数据
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// 读取选择的座位
function updateSelectedCount() {

    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    // .map 函数接收一个回调函数，用于将数组中的每一项经过回调函数自定义处理后返回一个新数组
    // .indexOf 函数用于查找字符在数组中的index，未找到则返回 -1
    const seatIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat));
        console.log(seatIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
        console.log(JSON.stringify(seatIndex));
    const selectedSeatsCount = selectedSeat.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// 使用数据填充
function populateUI() {
    // 读取本地数据
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // 遍历所有座位，匹配存储的已选择的index，匹配到则设置对应样式
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }



    // 读取存储的电影 index
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// 设置价格
movieSelect.childNodes.forEach(child => {
    child.innerText = `${child.innerText} (${child.value}￥)`
});

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();



