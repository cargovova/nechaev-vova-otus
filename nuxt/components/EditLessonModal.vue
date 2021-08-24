<template>
  <v-dialog
    v-model="shown"
    scrollable
    persistent
    @keydown.esc="$emit('modalClose')"
  >
    <v-card>
      <v-card-title>Редактирование занятия</v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="lesson.name"
          type="text"
          label="Название"
        ></v-text-field>
        <v-text-field
          v-model="lesson.description"
          type="text"
          label="Описание"
        ></v-text-field>
        <v-file-input
          v-model="lesson.data"
          label="Данные"
          counter
          chips
          show-size
          truncate-length="15"
        ></v-file-input>
        <v-divider />
        <span>Комменты:</span>
        <div v-for="(comment, i) in lesson.comments" :key="i">
          <span style="background-color: black" class="pl-5 pr-5">
            {{ comment }}
          </span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" text @click="$emit('modalClose')">
          Закрыть
        </v-btn>
        <v-btn color="primary" text @click="editLesson">Сохранить</v-btn>
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
  props: { showEditLessonModal: Boolean, lessonId: String },
  data() {
    return {
      error: false,
      lesson_comments: [],
      newComment: '',
      lesson: {},
    }
  },
  computed: {
    shown() {
      return this.showEditLessonModal
    },
  },
  created() {
    this.getLesson()
  },
  methods: {
    closeModal() {
      this.$emit('modalClose')
    },
    getLesson() {
      this.$axios
        .get('/courses/lessons/' + this.lessonId, { withCredentials: true })
        .then((result) => {
          this.lesson = result.data
          const file = new File([""], this.lesson.data[0].originalname)
          this.lesson.data = file
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
    editLesson() {
      const form = new FormData()
      form.append('image', this.lesson.data)
      form.append('id', this.lessonId)
      form.append('name', this.lesson.name)
      form.append('description', this.lesson.description)

      this.$axios
        .put('/courses/lessons/all_data/' + this.lessonId, form, {
          withCredentials: true,
        })
        .then(() => {
          this.getLesson()
          this.closeModal()
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
  },
}
</script>
