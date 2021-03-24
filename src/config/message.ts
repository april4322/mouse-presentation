export const fontSize = {
  small: '28px',
  normal: '40px',
  large: '52px'
}

export const fontColor = {
  white: '#eeeeee',
  black: '#181818',
  red: '#c34848',
  green: '#56a052',
  blue: '#0191f7'
}

export const messageStyle = {
  position: 'fixed',
  top: window.innerHeight - 100,
  whiteSpace: 'nowrap',
  textShadow: '1px 0 0 rgba(24, 24, 24, .7), 0 1px 0 rgba(24, 24, 24, .7), -1px 0 0 rgba(24, 24, 24, .7), 0 -1px 0 rgba(24, 24, 24, .7)'
}

const messageAnimateKeyframes = [
  { transform: 'translateX(' + window.innerWidth + 'px)' },
  { transform: 'translateX(' + -window.innerWidth + 'px)' }
]

const messageAnimateOptions = {
  duration: 20000,
  iterations: 1,
  easing: 'linear'
}

export const messageAnimation = {
  keyframes: messageAnimateKeyframes,
  options: messageAnimateOptions
}