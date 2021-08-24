const Router = require('express')
const router = new Router()
const coursesController = require('./coursesController')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

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
router.put('/lessons/all_data/:lesson_id', validateCookie(), upload.single('image'), coursesController.updateLesson)

/**
 * @swagger
 * /courses/lessons/all_data/{:lesson_id}:
 *    put:
 *      summary: обновить поля занятия
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: обновить поля занятия
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - data
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              data:
 *                type: array
 *            example:
 *              name: 'name'
 *              description: 'asasdaasd'
 *              data: []
 *      responses:
 *        '200':
 *          description: 'success add new comment'
 *        '400':
 *          description: ошибка
*/

/**
 * @swagger
 * /courses/lesson/{:lesson_id}:
 *    put:
 *      summary: добавить коммент
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: Добавить коммент
 *          schema:
 *            type: object
 *            required:
 *              - newComment
 *            properties:
 *              name:
 *                type: string
 *            example:
 *              newComment: 'ccomment'
 *      responses:
 *        '200':
 *          description: 'success add new comment'
 *        '400':
 *          description: ошибка
*/

/**
 * @swagger
 * /courses/:
 *    get:
 *      summary: показать все курсы
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
 * /courses/lessons/{:lesson_id}:
 *    get:
 *      summary: вернет объект занятия
 *      consumes:
 *        - application/json
 *      responses:
 *        '200':
 *          description: вернет объект занятия
 *        '400':
 *          description: что-то пошло не так
*/

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
 * /courses/{:user_id}:
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
 * /courses/{:course_id}:
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