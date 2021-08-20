import { wrapFunctional } from './utils'

export { default as CommentLesson } from '../..\\components\\CommentLesson.vue'
export { default as CreateCourseModal } from '../..\\components\\CreateCourseModal.vue'
export { default as EditCourseModal } from '../..\\components\\EditCourseModal.vue'
export { default as EditLessonModal } from '../..\\components\\EditLessonModal.vue'

export const LazyCommentLesson = import('../..\\components\\CommentLesson.vue' /* webpackChunkName: "components/comment-lesson" */).then(c => wrapFunctional(c.default || c))
export const LazyCreateCourseModal = import('../..\\components\\CreateCourseModal.vue' /* webpackChunkName: "components/create-course-modal" */).then(c => wrapFunctional(c.default || c))
export const LazyEditCourseModal = import('../..\\components\\EditCourseModal.vue' /* webpackChunkName: "components/edit-course-modal" */).then(c => wrapFunctional(c.default || c))
export const LazyEditLessonModal = import('../..\\components\\EditLessonModal.vue' /* webpackChunkName: "components/edit-lesson-modal" */).then(c => wrapFunctional(c.default || c))
