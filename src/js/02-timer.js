import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
};

let deltaTime = 0;

refs.startButton.setAttribute('disabled', true);

refs.startButton.addEventListener('click', onStartButtonClick);

flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(Date.now());

    if (selectedDates[0].getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }
    refs.startButton.removeAttribute('disabled');
    deltaTime = selectedDates[0].getTime() - Date.now();
  },
});

function onStartButtonClick() {}

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
