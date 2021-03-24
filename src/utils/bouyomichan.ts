import axios from 'axios'

export const bouyomiParameters = async (): Promise<Dictionary<any>> => {
  const res = await axios.get('/api/admin/bouyomichan')
  return res.data.params
}

export const prepareSend = (bouyomiChanParams: Dictionary<string>, message: string): string => {
  delete bouyomiChanParams.isEnabled
  const params = Object.values(bouyomiChanParams)
  params.push(message)
  return params.join('<bouyomi>')
}

export const uri = async (): Promise<string> => {
  const res = await axios.get('/api/admin/addr')
  return `ws://${res.data.endPointInfo.privateAddr}:${res.data.endPointInfo.bouyomiPort}`
}