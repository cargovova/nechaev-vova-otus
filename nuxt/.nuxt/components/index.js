import { wrapFunctional } from './utils'

export { default as CreateCourseModal } from '../..\\components\\CreateCourseModal.vue'

export const LazyCreateCourseModal = import('../..\\components\\CreateCourseModal.vue' /* webpackChunkName: "components/create-course-modal" */).then(c => wrapFunctional(c.default || c))
