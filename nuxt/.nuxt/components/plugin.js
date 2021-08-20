import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  CommentLesson: () => import('../..\\components\\CommentLesson.vue' /* webpackChunkName: "components/comment-lesson" */).then(c => wrapFunctional(c.default || c)),
  CreateCourseModal: () => import('../..\\components\\CreateCourseModal.vue' /* webpackChunkName: "components/create-course-modal" */).then(c => wrapFunctional(c.default || c)),
  EditCourseModal: () => import('../..\\components\\EditCourseModal.vue' /* webpackChunkName: "components/edit-course-modal" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
