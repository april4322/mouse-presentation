import { Database } from './database'

export class MessageModel extends Database
{
  private static tableName = 'messages'

  public static async getAll() {
    return await this.all(`
      SELECT ${this.tableName}.id, ${this.tableName}.content, ${this.tableName}.createdAt, users.name
      FROM ${this.tableName}
      INNER JOIN users ON ${this.tableName}.userId = users.id
      ORDER BY ${this.tableName}.createdAt
    `)
  }

  public static async insert(message: Message) {
    const stmt = this.db.prepare(`INSERT INTO ${this.tableName} (userId, content) VALUES ($userId, $content)`)
    stmt.bind({
      $userId: message.userId,
      $content: message.content
    });
    stmt.run();
    stmt.finalize();
  }

  public static async allDelete() {
    await this.run(`DELETE FROM ${this.tableName}`)
    await this.deleteSequence()
  }

  public static async deleteSequence() {
    await this.run(`DELETE FROM sqlite_sequence WHERE name='${this.tableName}'`)
  }
}
