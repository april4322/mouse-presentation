import axios from 'axios'

export const rand = (max: number): number => {
  return Math.floor(max * Math.random())
}

export const isAdmin = async (): Promise<boolean> => {
  const res = await axios.get('/api/session')
  return res.data.isAdmin
}

export const getImages = async (): Promise<Dictionary<any>> => {
  const res = await axios.get('/api/file/images')
  const images: Dictionary<any> = {}
  Object.keys(res.data.filenames).forEach((folder: any) => {
    const files = res.data.filenames[folder].map((file: string) => {
      const filename = file.split('.')[0]
      return {
        filename: filename,
        src: require(`@/img/${folder}/${filename}.png`)
      }
    })
    images[folder] = files
  })
  return images
}

export const emoteFilenames = (emotes: Image[]) => {
  const emoteFilenameList = emotes.map((emote: Image) => {
    return ` ${emote.filename} `
  })
  return new RegExp(emoteFilenameList.join('|'))
}

export const createNode = (message: string, emotes: Image[]) => {
  const emoteFiles = emotes.map((emote: Image) => {
    return emote.filename
  })

  const mappingEmote: Dictionary<any> = {}
  emotes.forEach((emote: Image) => {
    mappingEmote[emote.filename] = emote.src
  })
  const msgs = message.split(' ')
  const div = document.createElement('div')

  msgs.map((msg) => {
    if(emoteFiles.indexOf(msg) >= 0) {
      const img = document.createElement('img')
      img.src = mappingEmote[msg]
      img.style.width = '2.5rem'
      img.style.verticalAlign = 'middle'
      div.appendChild(img)
    } else {
      const span = document.createElement('span')
      span.innerText = msg
      div.appendChild(span)
    }
  })
  return div
}