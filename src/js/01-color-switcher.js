const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    body: document.body,
}
let timerId = null;

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startButton.setAttribute('disabled', true)
};

function onStopButtonClick() {
    clearInterval(timerId);
    refs.startButton.removeAttribute('disabled')
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}