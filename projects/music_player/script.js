const musicContainer = document.querySelector('.music-container');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('audio');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const musicName = document.querySelector('.music-name');
const disk = document.querySelector('.disk');


// 音乐列表
const musics = ['Bohemian Rhapsody', 'D4C', 'We Will Rock You'];

// 当前音乐
let musicIndex = 0;

// 加载音乐
loadMusic(musics[musicIndex]);

function loadMusic(music) {
    musicName.innerText = music;
    audio.src = `music/${music}.m4a`;
    disk.children[0].src = `img/${music}.jpg`;
}

// 播放
function playMusic() {
    // audio返回一个Promise对象，用来判断资源是否已加载完成
    audio.play().then(() => {
        musicContainer.classList.add('play');
        playBtn.children[0].classList.remove('icon-bofang');
        playBtn.children[0].classList.add('icon-zanting');
    });
}

// 暂停
function pauseMusic() {
    musicContainer.classList.remove('play');
    playBtn.children[0].classList.add('icon-bofang');
    playBtn.children[0].classList.remove('icon-zanting');
    audio.pause();
}

function prevMusic() {
    musicIndex --;
    if (musicIndex < 0) {
        musicIndex = musics.length - 1;
    }

    loadMusic(musics[musicIndex]);
    playMusic();
}

function nextMusic() {
    musicIndex ++;
    if (musicIndex > musics.length - 1) {
        musicIndex = 0;
    }
    loadMusic(musics[musicIndex]);
    playMusic();
}

// 更新进度条
function updateProgressBar(e) {
    // duration 媒体总时长，单位是秒，double类型
    // currentTime 当前播放时间，秒，double类型
    const {duration, currentTime} = e.target;
    const progressPercent = (currentTime / duration) * 100;

    progressBar.style.width = `${progressPercent}%`;
}

// 设置点击进度条
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// listener

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextMusic);

progressContainer.addEventListener('click', setProgressBar);