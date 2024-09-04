<template>
  <div>
    <ValidationObserver ref="form" tag="div">
      <form @submit.prevent="onSubmit">
        <ValidationProvider
          name="Imię"
          rules="required|alpha_spaces_dashes"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Imię*<br />
            <input
              class="input"
              v-model="firstName"
              type="text"
              placeholder="Imię"
              autocomplete="name"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="Nazwisko"
          rules="required|alpha_spaces_dashes"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Nazwisko*<br />
            <input
              class="input"
              v-model="lastName"
              type="text"
              placeholder="Nazwisko"
              autocomplete="family-name"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="E-mail"
          rules="required|email-abstract"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Adres e-mail*<br />
            <input
              class="input"
              v-model="email"
              type="email"
              placeholder="Twój adres e-mail"
              autocomplete="email"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="password"
          rules="password|required"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Hasło*<br />
            <input
              class="input"
              v-model="password"
              type="password"
              placeholder="Hasło"
              autocomplete="new-password"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="Powtórz hasło"
          rules="required|password-confirmed:password"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Powtórz hasło*<br />
            <input
              class="input"
              v-model="repassword"
              type="password"
              placeholder="Powtórz hasło"
              autocomplete="new-password"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="Data urodzenia"
          rules="required"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Data urodzenia*<br />
            <date-picker
              class="datepicker"
              v-model="dateOfBirth"
              type="date"
              placeholder="Data urodzenia"
            ></date-picker>
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <div class="input-wrapper">
          <label class="label">
            Język<br />
            <select v-model="language" class="input select">
              <option value="" selected>Wybierz język</option>
              <option
                :value="code"
                :key="code"
                v-for="(name, code) in languageNames"
              >
                {{ name }}
              </option>
            </select>
          </label>
        </div>

        <ValidationProvider
          name="Numer telefonu"
          rules="phone"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <div class="label">
            Numer telefonu<br />
            <vue-tel-input
              class="phone-input"
              v-model="phoneNumber"
              default-country="pl"
              :input-options="{
                placeholder: 'Numer telefonu',
                disabledFormatting: true,
              }"
            />
            <span class="errors" v-if="isPhoneInputInitialized">{{
              errors[0]
            }}</span>
          </div>
        </ValidationProvider>

        <br />

        <ValidationProvider
          rules="checkbox-required"
          v-slot="{ errors }"
          class="input-wrapper"
          name="rodo"
        >
          <label class="label">
            <div class="fake-input-wrap">
              <input class="input" v-model="rodo" type="checkbox" />
              <div class="fake-input"></div>
              <span class="checkbox-text">
                Akceptuję
                <a href="/regulamin" @click.prevent="onLinkClick('regulaminu')"
                  >regulamin</a
                >
                oraz&nbsp;<a
                  href="/polityka-prywatnosci"
                  @click.prevent="onLinkClick('polityki prywatności')"
                  >politykę prywatności</a
                >
                *<br />
              </span>
            </div>
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          class="input-wrapper"
          name="allowSend"
        >
          <label class="label">
            <div class="fake-input-wrap">
              <input class="input" v-model="allowInfo" type="checkbox" />
              <div class="fake-input"></div>
              <span class="checkbox-text">
                Wyrażam zgodę na&nbsp;otrzymywanie informacji na&nbsp;podany
                przeze mnie&nbsp;adres e‑mail.
              </span>
            </div>
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        * Pola wymagane

        <div class="btn-wrapper">
          <button type="submit" class="btn">Zarejestruj</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import languages from '@cospired/i18n-iso-languages';
import languagesPl from '@cospired/i18n-iso-languages/langs/pl.json';
import { VueTelInput } from 'vue-tel-input';

languages.registerLocale(languagesPl);
const languageNames = languages.getNames('pl');

export default {
  components: {
    VueTelInput,
    DatePicker,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      rodo: false,
      allowInfo: false,
      language: '',
      dateOfBirth: null,
      phoneNumber: null,
      isPhoneInputInitialized: false,
    };
  },
  methods: {
    onLinkClick(czego) {
      alert(
        `Jeśli widzisz tę wiadomość, wpisz w listę błędów:\nNiedziałający link do ${czego}`
      );
    },
    async onSubmit() {
      await this.$refs.form.validate();
      const errors = { ...this.$refs.form.errors };

      const isValid = Object.values(errors).every(
        (errors) => errors.length === 0
      );

      if (isValid) {
        this.$emit('submit', {
          firstName: this.firstName,
          email: this.email,
        });
      }
    },
  },
  computed: {
    languageNames() {
      return languageNames;
    },
  },
  mounted() {
    // https://github.com/iamstevendao/vue-tel-input/issues/322
    // https://github.com/iamstevendao/vue-tel-input/issues/447
    setTimeout(() => {
      this.$refs.form.setErrors({ ['Numer telefonu']: '' });
      this.isPhoneInputInitialized = true;
    }, 1000);
  },
  watch: {
    isPhoneInputInitialized: {
      handler(value) {
        console.log(value);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: block;
  margin-bottom: 20px;
}

.input {
  display: block;
  width: 100%;
  color: #065a57;
  font-weight: 600;
  padding: 15px 20px;
  margin-top: 4px;
  border-radius: 3px;
  border: none;
}

input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

input[type='checkbox']:focus + .fake-input {
  border: 2px solid white;
}

input[type='checkbox']:checked + .fake-input::after {
  content: '';
  display: block;
  width: 7px;
  height: 12px;
  border-bottom: 3px solid white;
  border-right: 3px solid white;

  position: absolute;
  left: 50%;
  top: 42%;

  transform: translate(-50%, -50%) rotate(30deg);
}

.fake-input-wrap {
  display: flex;
  position: relative;
}

.fake-input {
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  margin-right: 20px;
}

.checkbox-text {
  width: calc(100% - 40px);
}

.errors {
  font-size: 14px;
  color: #f6e96e;
}

.btn-wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}

.datepicker {
  width: 100%;
}
</style>

<style>
.mx-input {
  padding: 15px 20px !important;
  margin-top: 4px;
  font-weight: bold;
  color: #065a57 !important;
  height: 46px !important;
}

.phone-input {
  height: 46px;
  border-color: white;
  border-radius: 3px;
  border-width: 2px;
  margin-top: 4px;
}

.phone-input:focus-within {
  box-shadow: none;
  border-color: black;
  outline: 1px solid;
}

.vti__input {
  padding-left: 20px !important;
  font-weight: bold;
}

.vti__dropdown-item {
  color: black;
}

.vti__dropdown-list.below {
  top: 44px;
}

.vti__dropdown {
  background-color: #f3f3f3;
}
</style>
