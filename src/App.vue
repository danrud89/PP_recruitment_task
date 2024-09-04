<template>
  <div>
    <div class="app-wrap">
      <div class="container" v-if="!user">
        <h1>Załóż konto</h1>
        <p>
          Uzupełnij pola poniżej swoimi danymi, a&nbsp;w&nbsp;kolejnych krokach
          zdecyduj czy&nbsp;konto będzie należeć do&nbsp;Ciebie
          czy&nbsp;do&nbsp;osoby bliskiej, dla&nbsp;której jesteś opiekunem
          prawnym
        </p>

        <Form
          class="form"
          @submit="(submittedUser) => (user = submittedUser)"
        />
      </div>

      <div class="container" v-if="user">
        <h1>{{ user.firstName }}, dziękujemy za&nbsp;rejestrację!</h1>
        <p>
          Na&nbsp;Twój adres email
          <span class="email">{{ user.email }}</span> wysłaliśmy wiadomość
          z&nbsp;linkiem aktywującym konto<br />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    onLinkClick() {
      alert(
        'Jeśli widzisz tę wiadomość, wpisz w listę błędów:\nNiedziałający link do polityki prywatności'
      );
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: white;
  margin: 40px;
  overflow-y: scroll;
}

@media (max-width: 1024px) {
  body {
    margin: 0;
    background: #065a57;
  }
}

h1 {
  font-size: 46px;
}

a {
  color: white;
  text-decoration: underline;
}

a:hover,
a:focus {
  text-decoration: none;
}

h1,
h2,
h3,
h4 {
  font-family: 'Oswald', sans-serif;
  text-align: center;
}

.app-wrap {
  background: #065a57;
  padding: 60px 0 100px;
}

@media (max-width: 1024px) {
  .app-wrap {
    padding: 20px;
  }
}

.app-wrap--center-content {
  display: flex;
  align-items: center;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.form {
  margin-top: 60px;
}

.app-wrap p {
  text-align: center;
  padding: 0 30px;
}

.btn {
  text-align: center;
  padding: 15px 30px;
  border-radius: 5px;
  border: 2px solid white;
  text-transform: uppercase;
  color: #065a57;
  font-weight: 700;
  font-family: 'Oswald', sans-serif;
  cursor: pointer;
  transition: all 0.15s;
  outline: none;
}

.btn:hover,
.btn:focus {
  color: white;
  background: #065a57;
  border-color: white;
}

.email {
  color: #46ccc8;
}

.cookies {
  text-align: center;
  border: 2px solid #065a57;
  color: #065a57;
  padding: 20px;

  width: calc(100%);
  margin: 40px auto 40px;

  position: relative;
}

.cookies a {
  color: #065a57;
}

.cookies::after {
  content: 'x';
  position: absolute;
  right: -15px;
  top: -15px;

  width: 30px;
  height: 30px;
  background: #065a57;
  color: white;

  border-radius: 15px;
  font-weight: 700;
  line-height: 26px;

  cursor: pointer;
}
</style>
