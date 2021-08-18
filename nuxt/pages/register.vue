<template>
  <v-card>
    <v-card-title>Введите логин и пароль | РЕГИСТРАЦИЯ</v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
        @submit.prevent="register"
      >
        <v-text-field
          v-model="username"
          name="username"
          type="text"
          :rules="nameRules"
          autofocus
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          name="password"
          type="text"
          :rules="passwordRules"
          autofocus
        >
        </v-text-field>
        <v-btn height="50" class="mb-2" block tile type="submit" :disabled="!valid">Войти</v-btn>
        <v-alert v-if=error type="error" outlined text>
          {{error}}
        </v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      error: '',
      username: '',
      password: '',
      valid: false,
      nameRules: [
        v => !!v || 'Поле обязательно для ввода',
        v => (v && v.length >= 3) || 'Имя должно быть минимум 3 символа'
      ],
      passwordRules: [
        v => !!v || 'Поле обязательно для ввода',
        v => (v && v.length >= 3) || 'Пароль должен быть минимум 3 символа'
      ]
    }
  },
  methods: {
    register(){
      this.$axios.post('/auth/cookie', '', { withCredentials: true })
      .then((result) => {
        this.$store.dispatch('logout')
      })
      .catch((error) => {
        this.error = error
      })
      const data = {
          username: this.username,
          password: this.password
        }
      this.$axios.post('/auth/register', data, { withCredentials: true })
        .then((result) => {
          this.$store.dispatch('login', result)
          this.$router.push('/login')
        })
      .catch((error) => {
          this.error = error.response.data.message
        })
    }
  }
}
</script>
