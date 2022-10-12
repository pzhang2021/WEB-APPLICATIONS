const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./database/db.json')
const middleware = jsonServer.defaults()

server.use(middleware)
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
