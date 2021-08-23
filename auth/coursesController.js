const User = require('./models/User')
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
          lessons.push({ name: lessonFromDb.name, description: lessonFromDb.description, id: id })
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
      if(!req?.params?.user_id){
        res.status(401).json({ isValid: false })
      }
      const allCourses = await Course.find({ owners: req?.params?.user_id })
      for await (const course of allCourses) {
        const lessons = []
        for await (const id of course.lessonsList) {
          const lessonFromDb = await Lesson.findOne({ _id: id })
          lessons.push({ name: lessonFromDb.name, description: lessonFromDb.description, id: id })
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
      const { name, description, owners } = req.body
      const ownersArray = owners.split(',')
      await Course.updateOne({ _id: req.params.course_id }, { $set: { name, description, owners: ownersArray } })
      return res.status(200).json({ message: 'Edit success' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Edit course error' })
    }
  }

  async getLesson(req, res) {
    try {
      const lesson = await Lesson.findOne({ _id: req.params.lesson_id })
      return res.status(200).json(lesson)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'get lesson error' })
    }
  }

  async newComment(req, res) {
    try {
      await Lesson.updateOne({ _id: req.params.lesson_id }, { $push: { comments: req.body.newComment } })
      return res.status(200).json({ message: 'success add new comment' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'comment not set' })
    }
  }

  async updateLesson(req, res) {
    try {
      const { name, description, data } = req.body
      await Lesson.updateOne({ _id: req.params.lesson_id }, { $set: { name, description, data: [data] } })
      return res.status(200).json({ message: 'update successfully' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'update lesson unsucsessfully' })
    }
  }
}

module.exports = new coursesController