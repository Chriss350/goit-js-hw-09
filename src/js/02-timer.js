import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const btnPickDate = document.querySelector('#datetime-picker');
const txtDay = document.querySelector('span[data-days]');
const txtHr = document.querySelector('span[data-hours]');
const txtMin = document.querySelector('span[data-minutes]');
const txtSec = document.querySelector('span[data-seconds]');

let timeNow = new Date().getTime();
let timer, timeSel, timeDiff;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const checkPickDate = (timeSel, timeNow) => {
  if (timeSel < timeNow) {
    return Notiflix.Notify.failure('Please choose a date in the future');
  }
  return (btnStart.disabled = false);
};

const startCount = () => {
  btnStart.disabled = true;
  btnPickDate.disabled = true;
  timer = setInterval(() => {
    timeDiff -= 1000;
    if (timeDiff < 1000) {
      stopCounter();
      return Notiflix.Notify.success('End counting');
    }
    updateCounter();
  }, 1000);
};

const updateCounter = () => {
  const diff = convertMs(timeDiff);
  txtDay.innerHTML = addLeadingZero(diff.days);
  txtHr.innerHTML = addLeadingZero(diff.hours);
  txtMin.innerHTML = addLeadingZero(diff.minutes);
  txtSec.innerHTML = addLeadingZero(diff.seconds);
};

const clearCounter = () => {
  txtDay.innerHTML = '00';
  txtHr.innerHTML = '00';
  txtMin.innerHTML = '00';
  txtSec.innerHTML = '00';
};

const stopCounter = () => {
  btnStart.disabled = false;
  btnPickDate.disabled = false;
  clearCounter();
  clearInterval(timer);
  return;
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeSel = selectedDates[0].getTime();
    checkPickDate(timeSel, timeNow);
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  timeDiff = timeSel - timeNow;
  startCount();
});
