import express from 'express'
import jwt from 'jsonwebtoken'
const app = express()
import keys from './config/token.secret.keys.js'

const jwtToken = 'abcd'

// edit todo list
app.post('todoList', (req, res, next) => {
  if (req.headers['authorization'] !== `Bearer ${jwtToken}`) {
    return res.status(401).jsonp({ error: 'Incorrect Token' })
  }
  next()
})

app.listen(4000, () => {
  console.log('Todo List Server is running at http://localhost:4000')
})
