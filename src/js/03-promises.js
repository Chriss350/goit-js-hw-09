import Notiflix from 'notiflix';

const btnSubmit = document.querySelector('button[type=submit]');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

btnSubmit.addEventListener('click', e => {
  e.preventDefault();

  if (inputAmount.value < 1) {
    return Notiflix.Notify.info('wprowadz liczbę więszą niż 0 w pole Amount');
  }

  if (inputDelay.value < 1) {
    return Notiflix.Notify.info('wprowadz liczbę więszą niż 0 w pole Delay');
  }

  if (inputStep.value < 1) {
    return Notiflix.Notify.info('wprowadz liczbę więszą niż 0 w pole Step');
  }
  let delay = Number(inputDelay.value);
  for (let i = 1; i <= inputAmount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        return Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        return Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay = delay + Number(inputStep.value);
  }
});
