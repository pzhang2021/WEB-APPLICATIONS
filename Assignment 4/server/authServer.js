const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const keys = require('./config/token.private.keys')
const db = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'))
const server = jsonServer.create()
const router = jsonServer.router('./database/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

const isAuthenticated = (email, password) => {
  const index = db.users.findIndex(
    (user) => user.email === email && user.password === password
  )
  return index !== -1
}
// create user
server.post('/auth/signup', (req, res) => {})
// login
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!isAuthenticated(email, password)) {
    res.status(401).json({ error: 'Incorrect username or password' })
  } else {
    const accessToken = jwt.sign(email, keys.access_token_secret_key)
    res.json({ accessToken: accessToken })
  }
})

server.use(router)
server.listen(4001, () => {
  console.log('JSON authServer is running at http://localhost:4001')
})
