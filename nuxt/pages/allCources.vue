<template>
  <div>
    <CreateCourseModal
      v-if="showModal"
      :show-modal="showModal"
      @modalClose="(showModal = false), getCourses()"
    />
    <CommentLesson
      v-if="showComment"
      :show-comment="showComment"
      :lesson-id="lessonId"
      @modalClose="(showComment = false)"
      />
    <v-btn
      style="position: absolute; z-index: 200; right: 5px; top: 5px"
      @click="checkToken"
    >
      <v-icon color="green"> mdi-plus </v-icon></v-btn
    >
    <v-card v-for="course in courses" :key="course._id" class="mb-5">
      <v-card-title>{{ course.name }}</v-card-title>
      <v-divider />
      <v-card-text>{{ course.description }}</v-card-text>
      <v-row
        v-for="(lesson, i) in course.lessonsList"
        :key="i"
        class="pr-3 pl-3"
      >
        <v-btn block outlined color="teal" @click="lessonId = lesson.id, showComment = true">
          <v-col>
            {{ lesson.name }}
          </v-col>
          <v-divider vertical/>
          <v-col>
            {{ lesson.description }}
          </v-col>
        </v-btn>
      </v-row>
    </v-card>
    <v-alert v-if="error" type="error" outlined text>
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      error: null,
      showModal: false,
      showComment: false,
      lessonId: ''
    }
  },
  created() {
    this.getCourses()
  },
  methods: {
    getCourses() {
      this.$axios
        .get('/courses')
        .then((result) => {
          this.courses = result.data
        })
        .catch((error) => {
          this.error = error
        })
    },
    checkToken() {
      this.$store.getters.hasToken
        ? (this.showModal = true)
        : this.$router.push('/login')
    },
  },
}
</script>
