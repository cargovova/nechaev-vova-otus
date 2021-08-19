const Router = require('express')
const router = new Router()
const coursesController = require('./coursesController')

router.get('/', coursesController.getAll)
router.get('/:user_id', coursesController.getMyCourses)
router.post('/', coursesController.create)
router.put('/:course_id', coursesController.update)
router.delete('/', coursesController.delete)

/**
 * @swagger
 * /courses:
 *    post:
 *      summary: создать курс
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: Данные о курсе
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              lessonsList:
 *                type: array
 *            example:
 *              name: 'course name'
 *              description: 'course description'
 *              lessonsList: []
 *      responses:
 *        '201':
 *          description: курс создан
 *        '400':
 *          description: ошибка
*/

/**
 * @swagger
 * /courses/{user_id}:
 *    get:
 *      summary: показать только мои курсы
 *      consumes:
 *        - application/json
 *      responses:
 *        '200':
 *          description: вернет массив курсов
 *        '400':
 *          description: что-то пошло не так
*/

/**
 * @swagger
 * /courses/{course_id}:
 *    put:
 *      summary: изменить курс
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: Данные о курсе
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              lessonsList:
 *                type: array
 *            example:
 *              name: 'course name'
 *              description: 'course description'
 *              lessonsList: []
 *      responses:
 *        '200':
 *          description: 'Edit success'
 *        '400':
 *          description: ошибка
*/

module.exports = router