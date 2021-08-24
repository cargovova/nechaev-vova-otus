const Router = require('express')
const router = new Router()
const authController = require('./authController')
const { check } = require('express-validator')

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({ min: 4, max: 10 })
  ],
  authController.registration
)
router.post('/login', authController.login)
router.post('/validate', authController.validate)
router.post('/cookie', authController.delete)
router.post('/register', authController.registration)


/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: зарегистрироваться
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
 *          description: пользователь зарегистрирован
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

/**
 * @swagger
 * /auth/cookie:
 *    post:
 *      summary: удаление куки
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: cookie
 *          description: удаление куки
 *          name: token
 *      responses:
 *        '200':
 *          description: 'cookie removed'
 *        '400':
 *          description: ошибка
*/

module.exports = router