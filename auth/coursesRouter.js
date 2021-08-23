const Router = require('express')
const router = new Router()
const coursesController = require('./coursesController')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')

const validateCookie = (req, res, next) => {
  return (req, res, next) => {
    try {
      const token = req?.cookies?.token
      const isValid = token
        ? jwt.verify(token, secret)
        : false
      isValid ? next() : res.status(401).json({ isValid: false })
    } catch (e) {
      console.log(e)
      res.status(401).json({ isValid: false })
    }
  }
}

router.get('/', coursesController.getAll)
router.get('/:user_id', validateCookie(), coursesController.getMyCourses)
router.post('/', validateCookie(), coursesController.create)
router.put('/:course_id', validateCookie(), coursesController.update)
router.get('/lessons/:lesson_id', validateCookie(), coursesController.getLesson)
router.put('/lessons/:lesson_id', validateCookie(), coursesController.newComment)
router.put('/lessons/all_data/:lesson_id', validateCookie(), coursesController.updateLesson)

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