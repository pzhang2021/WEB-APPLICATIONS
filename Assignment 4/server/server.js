const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const keys = require('./config/token.private.keys')
const db = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'))
const server = jsonServer.create()
const router = jsonServer.router('./database/db.json')
const middlewares = jsonServer.defaults()

const jwtToken = 'abcd'

server.use(middlewares)
server.use(jsonServer.bodyParser)

// edit todo list
server.post('todoList', (req, res, next) => {
  if (req.headers['authorization'] !== `Bearer ${jwtToken}`) {
    return res.status(401).jsonp({ error: 'Incorrect Token' })
  }
  next()
})

server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running at http://localhost:4000')
})
