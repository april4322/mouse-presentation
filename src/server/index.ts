/// <reference path="../types.d.ts" />
/// <reference path="../session.d.ts" />

import 'module-alias/register'
import socket from 'socket.io'
import http from 'http'
import { appStartUp } from './server'
import { adminRouter, adminRequireAuthRouter, userRouter } from './router'
import { adminMiddleware } from './middleware'
import { dbSetUp } from './utils'
import { port } from './config'

dbSetUp()

const app = appStartUp()
const server = http.createServer(app)
const socketio = socket(server)

// routing
app.use('/api', adminRouter(socketio))
app.use(/\/api\/admin\/*/, adminMiddleware)
app.use('/api/admin', adminRequireAuthRouter())
app.use('/api/user', userRouter())

server.listen(port, () => {
  console.log('App listening on port ' + port)
})
