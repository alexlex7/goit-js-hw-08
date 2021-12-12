import { throttle } from 'lodash';
import storageMethods from './local_storage.js';

const storageKey = 'feedback-form-state';
const storageValue = storageMethods.load(storageKey);
const data = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[name="email"]'),
  message: document.querySelector('.feedback-form textarea[name="message"]'),
};

if (storageValue) {
  refs.email.value = storageValue.email === undefined ? '' : storageValue.email;
  refs.message.value = storageValue.message === undefined ? '' : storageValue.message;
  data.email = storageValue.email;
  data.message = storageValue.message;
}

refs.form.addEventListener('input', throttle(onInputHandler, 500));

function onInputHandler(e) {
  data[e.target.name] = e.target.value;
  storageMethods.save(storageKey, data);
}

refs.form.addEventListener('submit', function (e) {
  e.preventDefault();
  storageMethods.remove(storageKey);
  refs.email.value = '';
  refs.message.value = '';
});
