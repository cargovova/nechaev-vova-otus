const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const coursesRouter = require('./coursesRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    info: {
      title: 'api для Express',
      description: 'описание api',
      version: '1.0.0',
      servers: ["http://127.0.0.1:4001"]
    },
    openapi: '3.0.0'
  },
  swaggerOptions: {
    supportedSubmitMethods: []
  },
  apis: ['authRouter.js', 'coursesRouter.js'],
}
const swaggerDocs = swaggerJsdoc(options)

const PORT = 4001
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use('/auth', authRouter)
app.use('/courses', coursesRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const start = async () => {
  try {
    await mongoose.connect('mongodb://root:example@localhost/admin')
    app.listen(PORT, () => console.log(`server has been started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()