import express from 'express'
import session from 'express-session'
import path from 'path'

export const appStartUp = (): express.Express => {
  const app = express()

  // CORSは許可しないためコメントアウト
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*")
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  //   next()
  // })
  
  // セッション設定
  app.use(session({
    secret: 'secret',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1day
    resave: false,
    saveUninitialized: true
  }))

  // body-parserに基づいたリクエストの解析
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/img', express.static(path.resolve('dist/img/')))
  app.use('/css', express.static(path.resolve('dist/css/')))
  app.use('/js', express.static(path.resolve('dist/js/')))

  const baseRouter = express.Router()
  // /apiの場合は表示無効
  baseRouter.get(/^(?!\/api)/, (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
  })
  
  app.use(baseRouter)

  return app;
}

