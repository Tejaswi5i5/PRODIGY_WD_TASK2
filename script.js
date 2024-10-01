let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function updateDisplay() {
    const display = document.getElementById('display');
    const currentTime = Date.now();
    const time = new Date(elapsedTime + (currentTime - startTime));
    
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');

    display.innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
}

function pause() {
    if (running) {
        running = false;
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
    }
}

function reset() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    laps = [];
}

function lap() {
    if (running) {
        const lapTime = document.getElementById('display').innerText;
        laps.push(lapTime);
        displayLaps();
    }
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(li);
    });
}
