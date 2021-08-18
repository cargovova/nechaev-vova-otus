<template>
  <v-dialog
    v-model="shown"
    scrollable
    persistent
    @keydown.esc="$emit('modalClose')"
  >
    <v-card>
      <v-card-title>Создать курс</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name"
            name="name"
            label="Название курса"
            type="text"
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="desc"
            desc="desc"
            label="Описание"
            type="text"
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="lessons"
            name="lessons"
            label="Список занятий (ввести названия через запятую)"
            type="text"
            autofocus
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" text @click="$emit('modalClose')">
          Закрыть
        </v-btn>
        <v-btn color="primary" text @click="createCourse">Создать</v-btn>
        <v-spacer />
      </v-card-actions>
      <v-alert v-if="error" type="error" outlined text>
        {{ error }}
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { showModal: Boolean },
  data() {
    return {
      error: false,
      name: '',
      desc: '',
      lessons: '',
    }
  },
  computed: {
    shown() {
      return this.showModal
    },
  },
  methods: {
    createCourse() {
      const str = this.lessons.replace(/\s/g, '')
      const lessons = str.split(',')
      const data = {
        name: this.name,
        description: this.desc,
        lessonsList: lessons,
        owners: [this.$store.getters.userId]
      }
      this.$axios
        .post('/courses', data)
        .then((result) => {
          this.closeModal()
          this.$router.push('/allCources')
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
    closeModal() {
      this.$emit('modalClose')
    },
  },
}
</script>
