const stampSize = {
  width: 200,
  height: 200
}

export const stampStyle = {
  position: 'fixed',
  top: window.innerHeight - stampSize.width,
  left: window.innerWidth - stampSize.height
}

const stampAnimateKeyFrams = [
  { opacity: 0.0, transform: 'scale(0.2)' },
  { opacity: 1.0, transform: 'scale(0.3)' },
  { opacity: 0.0, transform: 'scale(0.4)' }
]

const stampAnimateOptions = {
  duration: 1000,
  iterations: 1,
  easing: 'ease'
}

export const stampAnimation = {
  keyframes: stampAnimateKeyFrams,
  options: stampAnimateOptions
}
