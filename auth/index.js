const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = 3001
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
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