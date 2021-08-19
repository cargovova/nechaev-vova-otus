<template>
  <div>
    <v-card v-for="course in courses" :key="course._id" class="mb-2">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-divider />
      <v-card-text>{{ course.description }}</v-card-text>
      <v-row v-for="(lesson, i) in course.lessonsList" :key="i">
        <v-col>
          {{ lesson.name }}
        </v-col>
        <v-col>
          {{ lesson.description }}
        </v-col>
      </v-row>
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
