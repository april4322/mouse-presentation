import { Database } from './database'

export class UserModel extends Database
{
  private static tableName = 'users'

  public static async getAll() {
    return await this.all(`SELECT id, name, createdAt FROM ${this.tableName} ORDER BY id`)
  }

  // getMaxIdは同期処理じゃないとnullになるのでserializeで同期処理をする
  public static async insert(user: User) {
    return this.serialize(async () => {
      const stmt = this.db.prepare(`INSERT INTO ${this.tableName} (name) VALUES ($name)`)
      stmt.bind({
        $name: user.name
      });
      stmt.run()
      stmt.finalize()

      return await this.getMaxId()
    })
  }

  public static async getMaxId() {
    const res = await this.get(`SELECT MAX(id) FROM ${this.tableName}`)
    return res['MAX(id)']
  }

  public static async allDelete() {
    await this.run(`DELETE FROM ${this.tableName}`)
    await this.deleteSequence()
  }

  public static async deleteSequence() {
    await this.run(`DELETE FROM sqlite_sequence WHERE name='${this.tableName}'`)
  }
}
