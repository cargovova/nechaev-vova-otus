const { Schema, model } = require('mongoose')

const Lesson = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  comments: { type: Array },
  data: { type: Array }
})

module.exports = model('Lesson', Lesson)