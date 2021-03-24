import { Router, Request, Response } from 'express'
import socketio from 'socket.io'
import fs from 'fs'
import { validationResult } from 'express-validator'
import { endPointInfo } from '@/server/utils'
import { BouyomiChanParameterModel, MessageModel, UserModel } from '@/server/db'
import { admin } from '@/server/config'
import { messageRule, bouyomichanRule, userLoginRule } from '@/server/request'

// /admin routing
export const adminRouter = (socket: socketio.Server): Router => {
  const router = Router()

  router.post('/login', (req, res) => {
    if(req.body.username === admin.username && req.body.password === admin.password) {
      req.session.isAdmin = true
    } else {
      req.session.isAdmin = false
    }
    res.json({ isAdmin: req.session.isAdmin })
    res.end()
  })

  router.post('/comment/message', messageRule(), async (req: Request, res: Response) => {
    const message: Message = {
      userId: req.body.userId,
      content: req.body.content,
      color: req.body.color,
      size: req.body.size
    }

    const errors = validationResult(req)
    if(errors.isEmpty()){
      MessageModel.insert(message)
      socket.emit('message', { message: message })
    }
    res.end()
  })
  
  router.post('/comment/stamp', (req, res) => {
    const filename = req.body.filename
    socket.emit('stamp', { stamp: filename })
    res.end()
  })

  router.get('/file/images', (req, res) => {
    const filenames = {
      stamps: fs.readdirSync('src/img/stamps'),
      emotes: fs.readdirSync('src/img/emotes')
    }
    res.json({ filenames: filenames })
    res.end()
  })

  router.get('/session', (req, res) => {
    res.json({ isAdmin: req.session.isAdmin })
    res.end()
  })

  return router
}

// require session auth in /admin route
export const adminRequireAuthRouter = (): Router => {
  const router = Router()
  
  router.get('/history', async (req, res) => {
    const messages = await MessageModel.getAll()
    res.json( { messages: messages })
    res.end()
  })
  
  router.get('/users', async (req, res) => {
    const users = await UserModel.getAll()
    res.json( { users: users })
    res.end()
  })

  router.get('/bouyomichan', async (req, res) => {
    const BouyomiChanParameters = await BouyomiChanParameterModel.get()
    res.json({ params: BouyomiChanParameters})
    res.end()
  })

  router.post('/bouyomichan', bouyomichanRule(), async (req: Request, res: Response) => {
    const BouyomiChanParameters: BouyomiChanParameter = {
      speed: req.body.speed,
      pitch: req.body.pitch,
      volume: req.body.volume,
      type: req.body.type,
      isEnabled: req.body.isEnabled
    }
    const errors = validationResult(req)
    if(errors.isEmpty()){
      BouyomiChanParameterModel.update(BouyomiChanParameters)
      res.json({ isUpdated: true})
    } else {
      res.json({ isUpdated: false })
    }
    res.end()
  })

  router.get('/addr', async (req, res) => {
    res.json({ endPointInfo: endPointInfo() })
    res.end()
  })
  
  return router
}

// /user routing
export const userRouter = (): Router => {
  const router = Router()

  router.post('/login', userLoginRule(), async (req: Request, res: Response) => {
    const user: User = {
      name: req.body.username
    }

    const errors = validationResult(req)
    if(errors.isEmpty()){
      const maxId = await UserModel.insert(user)
      res.json({ userId: maxId })
    }
    res.end()
  })

  return router
}