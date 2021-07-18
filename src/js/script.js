const settingsBtn = document.querySelector('.btn-settings');
const settingsPanel = document.querySelector('.settings');
const saveBtn = document.querySelector('.btn-save');

const todoBtn = document.querySelector('.btn-todo');
const todo = document.querySelector('.todo');

const clockWatch = document.querySelector('.clock-time');

const workSetting = document.querySelector('.work-setting');
const breakSetting = document.querySelector('.break-setting');

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
    // counter = true;
    if(counter) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        clockWatch.textContent = `${minutes}:${seconds}`;
    } else {
        counter = !counter;
    }
   
    setTimeout(() => {
        time--;
        updateTime()
        if(time == 0) {
            clockWatch.textContent = '00:00';
            counter = !counter;
            clearTimeout()
        }
    }, 10)
}

settingsBtn.addEventListener('click', handleSettings);
saveBtn.addEventListener('click', () => settingsPanel.classList.remove('active-modal'));
todoBtn.addEventListener('click', handleTodo)
playBtn.addEventListener('click', updateTime)