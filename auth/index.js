const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors')

const PORT = 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect('mongodb://root:example@localhost/admin')
    app.listen(PORT, () => console.log(`server has been started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()