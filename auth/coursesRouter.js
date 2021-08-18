const Router = require('express')
const router = new Router()
const coursesController = require('./coursesController')

router.get('/', coursesController.getAll)
router.get('/:user_id', coursesController.getMyCourses)
router.post('/', coursesController.create)
router.put('/', coursesController.update)
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
 * /auth/login:
 *    post:
 *      summary: логин
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          description: учетные данные 
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              username: 'name_name'
 *              password: '123456'
 *      responses:
 *        '200':
 *          description: кука
 *        '400':
 *          description: ошибка
*/
/**
 * @swagger
 * /auth/validate:
 *    post:
 *      summary: валидация куки
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: cookie
 *          description: проверка куки
 *          name: token
 *      responses:
 *        '200':
 *          description: "{isValid: true}"
 *        '400':
 *          description: ошибка
*/

module.exports = router