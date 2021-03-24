import { Database } from './database'
import { defaultSetting } from '@/server/config'

export class BouyomiChanParameterModel extends Database
{
  private static tableName = 'bouyomichan_parameters'

  public static async get() {
    const res = await this.all(`SELECT speed, pitch, volume, type, isEnabled FROM ${this.tableName} WHERE id = 1`)
    return res[0]
  }

  public static async insert() {
    await this.run(`INSERT INTO ${this.tableName} (
        id,
        speed,
        pitch,
        volume,
        type,
        isEnabled
      ) VALUES (
        1,
        ${defaultSetting.speed},
        ${defaultSetting.pitch},
        ${defaultSetting.volume},
        ${defaultSetting.type},
        ${defaultSetting.isEnabled}
      )`
    )
  }

  public static async update(bouyomiChanParameters: BouyomiChanParameter) {
    await this.run(`UPDATE ${this.tableName}
      SET 
        speed = ${bouyomiChanParameters.speed},
        pitch = ${bouyomiChanParameters.pitch},
        volume = ${bouyomiChanParameters.volume},
        type = ${bouyomiChanParameters.type},
        isEnabled = ${bouyomiChanParameters.isEnabled}
      WHERE
        id = 1
    `)
  }
}
