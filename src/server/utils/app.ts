import os from 'os'
import { port, bouyomiPort } from '@/server/config'

export const endPointInfo = () => {
  const networks: any = Object.values(os.networkInterfaces())
  let privateAddr = ''

  networks.map((interfaces: any) => {
    return interfaces.map((i: any) => {
      if(i.family === 'IPv4' && i.netmask === '255.255.255.0' && /192\.168\.\d{1,3}\.\d{1,3}/.test(i.address)){
        privateAddr = i.address
      }
    })
  })

  return {
    privateAddr: privateAddr,
    port: port,
    bouyomiPort: bouyomiPort
  }
}
