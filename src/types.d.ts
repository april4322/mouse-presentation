

interface User {
  readonly id?: number,
  name: string,
  userId?: number,
  createdAt?: string,
  deletedAt?: string
}

interface Message {
  readonly id?: number,
  userId: number,
  content: string,
  color?: string,
  size?: string,
  createdAt?: string
}

interface BouyomiChanParameter {
  speed: number,
  pitch: number,
  volume: number,
  type: number,
  isEnabled: boolean
}

interface UserState {
  username: string,
  userId: number|null
}

interface ParameterState {
  size: string,
  color: string
}

interface ViewerParameter {
  isNiconico?: boolean,
  isMsgWindowShow?: boolean
}

interface Image {
  filename: string,
  src: string  
}

interface Dictionary<T> {
  [Key: string]: T
}

declare module 'vue-draggable-resizable'

declare module 'vue-js-toggle-button'

interface Window {
  api: any
}





