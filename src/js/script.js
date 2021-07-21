const clockWatch = document.querySelector('.clock-time');
const clockCircle = document.querySelector('.clock-circle');
const clockSlime = document.querySelector('.clock-circle-slime');

// AUDIO
const ticking = document.querySelector('.ticking');

// TODOLIST
const todoBtn = document.querySelector('.btn-todo');
const todo = document.querySelector('.todo');


// SETTINGS
const settingsBtn = document.querySelector('.btn-settings');
const settingsPanel = document.querySelector('.settings');
const saveBtn = document.querySelector('.btn-save');
const volumeRange = document.querySelector('.settings-volume');
const workSetting = document.querySelector('.work-setting');
const breakSetting = document.querySelector('.break-setting');


// PLAY/PAUSE
const playBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');


// Handle settings panel
const handleSettings = () => {
    settingsPanel.classList.toggle('active-modal')
}

// Handle todo list
const handleTodo = () => {
    todo.classList.toggle('active-todo')
}


// Clock time
let time = workSetting.value * 60;
let counter = true;


const updateTime = () => {
    if(counter) {
        const min = Math.floor(time / 60);
        const minutes = min < 10 ? `0${min}` : `${min}`;
        const sec = Math.floor(time % 60);
        const seconds = sec < 10 ? `0${sec}` : `${sec}`;
        
        clockWatch.textContent =`${minutes}:${seconds}`

        if(time === 0) {
            console.log('object')
            clearInterval(counterInterval);
        }
    } else {
            counter = !counter;
            console.log('kurcze')
            time = workSetting.value * 60;
            return
    }
    
    // setTimeout(() => {
    //     if(time > 0 && counter) {
    //         time--;
    //         updateTime()
    //     }else {
    //         clockWatch.textContent = '00:00';
    //         counter = !counter;
    //         clearTimeout();
    //         updateTime()
    //     }
    // }, 100)
};

// CHANGING VOLUME
const updateVolume = () => {
    ticking.volume = parseInt(volumeRange.value)/100;
console.log(parseInt(volumeRange.value)/100)

};
// HANDLING EFFECTS
const handleEffects = () => {
    clockCircle.classList.add('clock-circle-slime')
    ticking.play();
}


// TIME COUNTER
let counterInterval;
const countTime = () => {
    if(clockWatch.textContent == '00:00') {
        return
    }
    handleEffects()

    playBtn.setAttribute('disabled', true);

    counterInterval = setInterval(() => {
        if(counter) {
            time--;
            updateTime()
        } else if(time == 0) {
            clockWatch.textContent = '00:00';
            counter = !counter;
            console.log('kraksa')
            updateTime()
        }
    }, 1000)
}

const updateSettings = () => {
    settingsPanel.classList.remove('active-modal');
    time = workSetting.value * 60;
    clockWatch.textContent = workSetting.value > 9 ? `${workSetting.value}:00` : `0${workSetting.value}:00`;
    // counter = !counter;
    clearInterval(counterInterval);
};

const pauseTime = () => {
    playBtn.removeAttribute('disabled');
    clearInterval(counterInterval)
    ticking.pause();


    if(clockWatch.textContent == '00:00') {
        return
    }

}

settingsBtn.addEventListener('click', handleSettings);
saveBtn.addEventListener('click',updateSettings);
todoBtn.addEventListener('click', handleTodo);
playBtn.addEventListener('click', countTime);
pauseBtn.addEventListener('click', pauseTime);
volumeRange.addEventListener('change', updateVolume) 