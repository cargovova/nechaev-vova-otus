<template>
  <div>
    <EditCourseModal
      v-if="showModal"
      :show-modal="showModal"
      :course="curentCourse"
      @modalClose=";(showModal = false), getMyCourses()"
    />
    <EditLessonModal
      v-if="showEditLessonModal"
      :show-edit-lesson-modal="showEditLessonModal"
      :lesson-id="lessonId"
      @modalClose="showEditLessonModal = false"
    />
    <v-card v-for="course in courses" :key="course._id" class="mb-5">
      <v-btn
        icon
        style="position: absolute; right: 10px; top: 10px; z-index: 200"
        @click=";(curentCourse = course), (showModal = true)"
      >
        <v-icon>mdi-file-document-edit</v-icon>
      </v-btn>
      <v-card-title>{{ course.name }}</v-card-title>
      <v-divider />
      <v-card-text>{{ course.description }}</v-card-text>
      <v-row
        v-for="(lesson, i) in course.lessonsList"
        :key="i"
        class="pr-3 pl-3"
      >
        <v-btn
          block
          outlined
          color="teal"
          @click=";(lessonId = lesson.id), (showEditLessonModal = true)"
        >
          <v-col>
            {{ lesson.name }}
          </v-col>
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
  middleware: ['auth'],
  data() {
    return {
      courses: [],
      error: null,
      showModal: false,
      curentCourse: {},
      lessonId: false,
      showEditLessonModal: false,
    }
  },
  created() {
    this.getMyCourses()
  },
  methods: {
    getMyCourses() {
      this.$axios
        .get('/courses/' + this.$store.getters.userId, {
          withCredentials: true,
        })
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
