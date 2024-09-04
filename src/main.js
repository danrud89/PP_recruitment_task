import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import pl from 'vee-validate/dist/locale/pl.json';
import * as rules from 'vee-validate/dist/rules';
import App from './App.vue';
import 'vue2-datepicker/index.css';
import 'vue-tel-input/dist/vue-tel-input.css';

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend('email-abstract', {
  ...rules.email,
  message: 'To pole musi być poprawnym adresem email',
});

extend('password-confirmed', {
  ...rules.confirmed,
  message: 'Hasła nie są jednakowe!',
});

extend('checkbox-required', {
  validate(required) {
    return required;
  },
  message: 'To pole jest wymagane',
});

extend('password', (value) => {
  const hasBigLetter = value !== value.toLowerCase();
  const hasDigit = /\d/.test(value);
  const hasEnoughChars = value.length >= 8;
  const hasSpecialChar = /\W/.test(value);

  const isValid = hasBigLetter && hasDigit && hasEnoughChars && hasSpecialChar;
  if (isValid) return true;

  const requirements = [];
  if (!hasEnoughChars) {
    requirements.push('co najmniej 8 znaków');
  }
  if (!hasBigLetter) {
    requirements.push('dużą literę');
  }
  if (!hasDigit) {
    requirements.push('liczbę');
  }
  if (!hasSpecialChar) {
    requirements.push('znak specjalny');
  }

  return `Hasło musi zawierać: ${requirements.join(', ')}!`;
});

extend('alpha_spaces_dashes', (value) => {
  return (
    /^[\p{L} -]*$/u.test(value) ||
    'To pole może zawierać tylko litery, spacje i "-"'
  );
});

extend('phone', (value) => {
  if (/[^\d ]/u.test(value))
    return 'To pole może zawierać tylko cyfry i spacje';
  if (!/^(?=(?:.*\d){9}).*$/.test(value))
    return 'To pole musi zawierać co najmniej 9 cyfr';
  return true;
});

localize('pl', pl);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
