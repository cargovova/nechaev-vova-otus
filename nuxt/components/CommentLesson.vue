<template>
  <v-dialog
    v-model="shown"
    scrollable
    persistent
    @keydown.esc="$emit('modalClose')"
  >
    <v-card>
      <v-card-title>{{ lesson.name }}</v-card-title>
      <v-divider />
      <v-card-text>
        <div>Описание: {{ lesson.description }}</div>
        <div>Данные занятия: {{ lesson.data }}</div>
        <v-divider />
        <span>Комменты:</span>
        <div v-for="(comment, i) in lesson.comments" :key="i">
          {{ comment }}
        </div>
        <v-text-field
          v-model="newComment"
          type="text"
          label="Комментарий"
          append-icon="mdi-send"
          filled
          clearable
          @click:append="addComment"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" text @click="$emit('modalClose')">
          Закрыть
        </v-btn>
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
  props: { showComment: Boolean, lessonId: String },
  data() {
    return {
      error: false,
      lesson: {},
      lesson_comments: [],
      newComment: '',
    }
  },
  computed: {
    shown() {
      return this.showComment
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
      this.$axios.get('/courses/lessons/' + this.lessonId).then((result) => {
        this.lesson = result.data
      })
    },
    addComment() {
      this.$axios
        .put(
          '/courses/lessons/' + this.lessonId,
          {
            newComment: this.newComment,
          },
          { withCredentials: true }
        )
        .then((result) => {
          this.getLesson()
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
  },
}
</script>
