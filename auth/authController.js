const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')

const generateAccessToken = (id, username, roles) => {
  const payload = {
    id,
    username,
    roles
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации' })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(409).json({ message: 'Пользователь с таким именем уже существует' })
      }
      const hashPassword = bcrypt.hashSync(password, 5)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({ username, password: hashPassword, roles: [userRole.value] })
      await user.save()
      return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
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
      return res.status(200).json({ message: 'Login success', user: { id: user._id, name: user.username } })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }

  async getUsers(req, res) {
    // нужно сделать бэкап базы и избавиться от этого роута
    try {
      const userRole = new Role()
      const adminRole = new Role({ value: "ADMIN" })
      await userRole.save()
      await adminRole.save()
      const users = await User.find()
      res.json(users)
    } catch {

    }
  }

  async validate(req, res) {
    if (req.cookies.token) {
      const token = req.cookies.token
      const decodedToken = jwt.decode(token)
      const isValid = jwt.verify(token, secret)
      isValid
        ? res.status(200).json({ isValid: true, user: { id: decodedToken.id, name: decodedToken.username } })
        : res.status(200).json({ isValid: false })
    } else {
      res.status(200).json({ message: 'Cookie is not exist' })
    }
  }

  async delete(req, res) {
    if (req.headers.cookie) {
      const token = req.cookies.token
      res.cookie('token', token, { httpOnly: true, maxAge: 0 })
      res.status(200).json({ message: 'cookie removed' })
    } else {
      res.status(200).json({ message: 'Cookie is not exist' })
    }
  }
}

module.exports = new authController