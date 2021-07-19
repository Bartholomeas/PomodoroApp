const clockWatch = document.querySelector('.clock-time');

// TODOLIST
const todoBtn = document.querySelector('.btn-todo');
const todo = document.querySelector('.todo');


// SETTINGS
const settingsBtn = document.querySelector('.btn-settings');
const settingsPanel = document.querySelector('.settings');
const saveBtn = document.querySelector('.btn-save');
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
        playBtn.setAttribute('disabled', true);
        const min = Math.floor(time / 60);
        const minutes = min < 10 ? `0${min}` : `${min}`;
        const sec = Math.floor(time % 60);
        const seconds = sec < 10 ? `0${sec}` : `${sec}`;
        
        clockWatch.textContent =`${minutes}:${seconds}`
    } else {
        counter = !counter;
            time = workSetting.value * 60;
            playBtn.removeAttribute('disabled');
        return
    }
    
    setTimeout(() => {
        if(time > 0) {
            time--;
            updateTime()
        }else {
            clockWatch.textContent = '00:00';
            counter = !counter;
            clearTimeout();
            updateTime()
        }
    }, 1000)
};

const updateSettings = () => {
    settingsPanel.classList.remove('active-modal')
    
};

settingsBtn.addEventListener('click', handleSettings);
saveBtn.addEventListener('click',updateSettings);
todoBtn.addEventListener('click', handleTodo);
playBtn.addEventListener('click', updateTime);