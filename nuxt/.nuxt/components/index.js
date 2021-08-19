import { wrapFunctional } from './utils'

export { default as CreateCourseModal } from '../..\\components\\CreateCourseModal.vue'
export { default as EditCourseModal } from '../..\\components\\EditCourseModal.vue'

export const LazyCreateCourseModal = import('../..\\components\\CreateCourseModal.vue' /* webpackChunkName: "components/create-course-modal" */).then(c => wrapFunctional(c.default || c))
export const LazyEditCourseModal = import('../..\\components\\EditCourseModal.vue' /* webpackChunkName: "components/edit-course-modal" */).then(c => wrapFunctional(c.default || c))
