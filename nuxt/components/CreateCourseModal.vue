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
          <v-text-field v-model="desc" desc="desc" label="Описание" type="text">
          </v-text-field>
          <v-row>
            <v-col cols="3">
              <v-textarea
                v-model="lessonsNames"
                name="lessons"
                label="Названия через enter"
                type="text"
                outlined
                auto-grow
              >
              </v-textarea>
            </v-col>
            <v-col cols="9">
              <v-textarea
                v-model="lessonsDescrs"
                name="lessons"
                label="Описания через enter"
                type="text"
                outlined
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
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
      lessonsNames: '',
      lessonsDescrs: '',
    }
  },
  computed: {
    shown() {
      return this.showModal
    },
  },
  methods: {
    createCourse() {
      const lessons = []
      const lessonsNames = this.lessonsNames.split(/\n/)
      const lessonsDescrs = this.lessonsDescrs.split(/\n/)
      for (let i = 0; i < lessonsNames.length; i++) {
        lessons.push({
          name: lessonsNames[i],
          description: lessonsDescrs[i],
        })
      }
      const data = {
        name: this.name,
        description: this.desc,
        lessonsList: lessons,
        owners: [this.$store.getters.userId],
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
