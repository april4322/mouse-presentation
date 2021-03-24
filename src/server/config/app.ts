import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.APP_PORT

export const dbName = process.env.DB_NAME + '.db'

export const hostName: string = process.env.HOST || 'localhost'

export const admin = {
  username: process.env.ADMIN_USER_NAME,
  password: process.env.ADMIN_USER_PASS
}