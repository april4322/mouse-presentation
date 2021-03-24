import sqlite3 from 'sqlite3'
import { dbName } from '@/server/config'

// extends Databaseにするためexportする （extends **** の****はimport **** fromで読み込んだものを記述するため）
export class Database {
  protected static db: sqlite3.Database = new sqlite3.Database(dbName as string)

  public static async createTableIfNotExists(): Promise<void> {
    await this.serialize(async () => {
      // create users table
      await this.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT (DATETIME('now', 'localtime')),
          deletedAt TIMESTAMP
        )
      `)

      // create comments table
      await this.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          content TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT (DATETIME('now', 'localtime'))
        )
      `)

      // create bouyomichan_parameters table
      await this.run(`
        CREATE TABLE IF NOT EXISTS bouyomichan_parameters (
          id INTEGER PRIMARY KEY,
          speed INTEGER NOT NULL,
          pitch INTEGER NOT NULL,
          volume INTEGER NOT NULL,
          type INTEGER NOT NULL,
          isEnabled INTEGER NOT NULL
        )
      `)
    })
  }

  protected static serialize (callback: () => Promise<any>): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      this.db.serialize(async () => {
        try {
          const res = await callback()
          resolve(res)
        } catch (err) {
          reject(err)
        }  
      })
    })
  }

  protected static get(sql: string, ...params: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.get(sql, params, (err, row) => (err ? reject(err): resolve(row)))
    })
  }

  protected static all(sql: string, ...params: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)))
    })
  }

  protected static run(sql: string, ...params: any[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(sql, params, (err) => (err ? reject(err) : resolve()))
    })
  }
}
