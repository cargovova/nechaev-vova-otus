const { Schema, model } = require('mongoose')

const Course = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  lessonsList: { type: Array }
})

module.exports = model('Course', Course)