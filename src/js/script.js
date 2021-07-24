const clockWatch = document.querySelector('.clock-time');
const clockCircle = document.querySelector('.clock-circle');
// const clockSlime = document.querySelector('.clock-circle-slime');
const clockSlime = document.querySelector('#slime');

// AUDIO
const ticking = document.querySelector('.ticking');

// TODOLIST
const todoBtn = document.querySelector('.btn-todo');
const todoAdd = document.querySelector('.btn-add');
const todoInput = document.querySelector('.todo-input');
const todo = document.querySelector('.todo');
const todoList = document.querySelector('.todo-items');


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

let workTime = 0;
let breakTime = 0;

const updateTime = () => {
    if(counter) {
        const min = Math.floor(time / 60);
        const minutes = min < 10 ? `0${min}` : `${min}`;
        const sec = Math.floor(time % 60);
        const seconds = sec < 10 ? `0${sec}` : `${sec}`;
        
        clockWatch.textContent =`${minutes}:${seconds}`

        if(time == 0) {
            setTimeout(() => {
                ticking.pause();
            }, 1)
            clearInterval(counterInterval);
        }

    } else {
            counter = !counter;
            time = workSetting.value * 60;
            return
    }
};

// CHANGING VOLUME
const updateVolume = () => {
    ticking.volume = parseInt(volumeRange.value)/100;
};

// HANDLING EFFECTS
const handleEffects = () => {
    playBtn.classList.add('active');
    pauseBtn.classList.remove('active');
    clockSlime.classList.add('clock-circle-slime')
    clockSlime.style.animationDuration = `${time}s`;
};

// TIME COUNTER
let counterInterval;
const countTime = () => {

    if(clockWatch.textContent == '00:00') {
        ticking.pause();
        console.log('counter alert')
        clearInterval(counterInterval);
    }
    handleEffects();

    playBtn.setAttribute('disabled', true);

    counterInterval = setInterval(() => {
        if(time != 0) {
            time--;
            updateTime()
            ticking.play();
            
        } else if(time == 0) {
            clockWatch.textContent = '00:00';
            console.log('interwal');
            counter = !counter;
            clearInterval(counterInterval);
            ticking.pause();
            updateTime();
        }
    }, 1000)
}

// SETTINGS UPDATE
const updateSettings = () => {
    settingsPanel.classList.remove('active-modal');
    time = workSetting.value * 60;
    clockWatch.textContent = workSetting.value > 9 ? `${workSetting.value}:00` : `0${workSetting.value}:00`;
    ticking.pause();
    playBtn.classList.remove('active')
    clearInterval(counterInterval);
};

// PAUSING APP
const pauseTime = () => {
    if(clockWatch.textContent == '00:00') {
        return
    }
    pauseBtn.classList.add('active');
    playBtn.classList.remove('active');
    playBtn.removeAttribute('disabled');
    clearInterval(counterInterval);
    ticking.pause();
    
}

let id = 0;

// ADDING TODO ITEM
const addItem = () => {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.setAttribute('id', id)
    item.innerHTML = `
    <p class="todo-item-content">${todoInput.value}</p>
    <button class="btn btn-delete">⨯</button>`;
    todoList.appendChild(item);
    id++;
    todoInput.value = '';

}

// DELETING TODO ITEM
const deleteItem = e => {
    e.target.classList.contains('btn-delete') ?  e.target.closest('li').remove() : null;
};

settingsBtn.addEventListener('click', handleSettings);
saveBtn.addEventListener('click', updateSettings);
todoBtn.addEventListener('click', handleTodo);
playBtn.addEventListener('click', countTime);
pauseBtn.addEventListener('click', pauseTime);
volumeRange.addEventListener('change', updateVolume);
todoAdd.addEventListener('click', addItem);
todoList.addEventListener('click', deleteItem);