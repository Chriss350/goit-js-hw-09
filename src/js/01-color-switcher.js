function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timer = null;

btnStop.disabled = true;

btnStart.addEventListener('click', e => {
  timer = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});
btnStop.addEventListener('click', e => {
  clearInterval(timer);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
