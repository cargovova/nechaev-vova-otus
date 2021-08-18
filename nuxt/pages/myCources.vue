<template>
  <div>
    <v-card v-for="course in courses" :key="course._id" class="mb-2">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-text>{{ course.description }}</v-card-text>
      <v-card-actions>{{ course.lessonsList }}</v-card-actions>
    </v-card>
    <v-alert v-if="error" type="error" outlined text>
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      courses: [],
      error: null,
    }
  },
  created() {
    this.getMyCourses()
  },
  methods: {
    getMyCourses() {
      this.$axios
        .get('/courses/' + this.$store.getters.userId)
        .then((result) => {
          this.courses = result.data.courses
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>
