<template>
  <v-dialog
    v-model="shown"
    scrollable
    persistent
    @keydown.esc="$emit('modalClose')"
  >
    <v-card>
      <v-card-title>Редактирование курса</v-card-title>
      <v-card-text>
        <v-text-field v-model="course_name" type="text" label="Название">
        </v-text-field>
        <v-text-field v-model="course_descr" type="text" label="Описание">
        </v-text-field>
        <v-text-field
          v-model="course_owners"
          type="text"
          label="Доступ (вводить через запятую)"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="secondary" text @click="$emit('modalClose')">
          Закрыть
        </v-btn>
        <v-btn color="primary" text @click="editCourse">Сохранить</v-btn>
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
  props: { showModal: Boolean, course: Object },
  data() {
    return {
      error: false,
      course_name: this.course.name,
      course_descr: this.course.description,
      course_owners: this.course.owners,
    }
  },
  computed: {
    shown() {
      return this.showModal
    },
  },
  methods: {
    closeModal() {
      this.$emit('modalClose')
    },
    editCourse() {
      const data = {
        name: this.course_name,
        description: this.course_descr,
        owners: this.course_owners,
        lessonsList: this.course.lessonsList
      }
      this.$axios
        .put('/courses/' + this.course._id, data)
        .then((result) => {
          this.closeModal()
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
  },
}
</script>
