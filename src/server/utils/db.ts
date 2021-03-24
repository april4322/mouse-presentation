import net from 'net'
import { Database, UserModel, MessageModel, BouyomiChanParameterModel } from '@/server/db'
import { bouyomiPort, hostName, defaultSetting } from '@/server/config'

const isOpened = () => {
  const socket = new net.Socket()
  return new Promise((resolve, reject) => {
    const success = () => {
      socket.destroy()
      resolve(true)
    }
    const error = () => {
      socket.destroy()
      resolve(false)
    }
    socket.on('connect', success)
    socket.on('error', error)
    socket.on('timeout', error)
    socket.connect(bouyomiPort, hostName)
  })
}

export const dbSetUp = async () => {
  await Database.createTableIfNotExists()
  await UserModel.allDelete()
  await MessageModel.allDelete()

  const res = await BouyomiChanParameterModel.get()
  const isBouyomichanUsabled = await isOpened()
  // デフォルトパラメータをinsert
  if(res === undefined) {
    BouyomiChanParameterModel.insert()
  }
  else if(!isBouyomichanUsabled && res.isEnabled) {
    const BouyomiChanParameters: BouyomiChanParameter = {
      speed: res.speed || defaultSetting.speed,
      pitch: res.pitch || defaultSetting.pitch,
      volume: res.volume || defaultSetting.volume,
      type: res.type || defaultSetting.type,
      isEnabled: false
    }
    BouyomiChanParameterModel.update(BouyomiChanParameters)
  }
}