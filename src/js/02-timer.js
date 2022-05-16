import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let deltaTime = 0;
let selectedDate = 0;

refs.startButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', onStartButtonClick);

flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    console.log(selectedDates[0]);

    refs.startButton.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
});

function onStartButtonClick() {
  const intervalId = setInterval(() => {
    deltaTime = selectedDate - Date.now();
    markupBuild(convertMs(deltaTime));
    const stopTimerTrigger =
      refs.days.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.minutes.textContent === '00' &&
      refs.seconds.textContent === '00';
    if (stopTimerTrigger) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function markupBuild(time) {
  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
