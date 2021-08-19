const User = require('./models/User')
const Role = require('./models/Role')
const Course = require('./models/Course')
const Lesson = require('./models/Lesson')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')

class coursesController {
  async getAll(req, res) {
    try {
      const allCourses = await Course.find()
      for await (const course of allCourses) {
        const lessons = []
        for await (const id of course.lessonsList) {
          const lessonFromDb = await Lesson.findOne({ _id: id })
          lessons.push({ name: lessonFromDb.name, description: lessonFromDb.description })
        }
        course.lessonsList = lessons
      }
      return res.status(200).json(allCourses)
    } catch (e) {
      console.log(e)
    }
  }

  async create(req, res) {
    try {
      const { name, description, owners, lessonsList } = req.body
      const candidate = await Course.findOne({ name })
      if (candidate) {
        return res.status(409).json({ message: 'Курс с таким именем уже существует' })
      }
      const lessonsId = []
      const lessonsFromDB = []
      for await (const lesson of lessonsList) {
        const lessonScheme = new Lesson({ name: lesson.name, description: lesson.description })
        await lessonScheme.save()
          .then((lessonFromDb) => {
            lessonsId.push(lessonFromDb._id)
            lessonsFromDB.push(lessonFromDb)
          })
      }
      const course = new Course({ name, description, owners, lessonsList: lessonsId })
      await course.save()
      return res.status(201).json({ message: 'Курс создан' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: e })
    }
  }

  async getMyCourses(req, res) {
    try {
      const allCourses = await Course.find({ owners: req.params.user_id })
      for await (const course of allCourses) {
        const lessons = []
        for await (const id of course.lessonsList) {
          const lessonFromDb = await Lesson.findOne({ _id: id })
          lessons.push({ name: lessonFromDb.name, description: lessonFromDb.description })
        }
        course.lessonsList = lessons
      }
      res.status(200).json({ courses: allCourses })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: e })
    }
  }

  async update(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Пароль не верный' })
      }
      const token = generateAccessToken(user._id, user.username, user.roles)
      res.cookie('token', token, { httpOnly: true })
      return res.status(200).json({ message: 'Login success' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }

  async delete(req, res) {
    if (req.headers.cookie) {
      const token = req.cookies.token
      const isValid = jwt.verify(token, secret)
      isValid
        ? res.status(200).json({ isValid: true })
        : res.status(200).json({ isValid: false })
    } else {
      res.status(200).json({ message: 'Cookie is not exist' })
    }
  }
}

module.exports = new coursesController