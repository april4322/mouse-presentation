import { checkSchema, ValidationChain } from 'express-validator'

export const userLoginRule = (): ValidationChain[] => {
  return checkSchema({username: {
      in: ['body'],
      isLength: {
        options: { max: 20 },
      },
      exists: true
    }
  })
}

export const messageRule = (): ValidationChain[] => {
  return checkSchema({
    userId: {
      in: ['body'],
      isLength: {
        options: { max: 10000 }
      },
      isInt: true,
      toInt: true,
      exists: true
    },
    content: {
      in: ['body'],
      isLength: {
        options: { max: 70 }
      },
      exists: true
    }
  })
}

export const bouyomichanRule = (): ValidationChain[] => {
  return checkSchema({
    speed: {
      in: ['body'],
      isLength: {
        options: { min: -1, max: 200 }
      },
      isInt: true,
      toInt: true,
      exists: true
    },
    pitch: {
      in: ['body'],
      isLength: {
        options: { min: -1, max: 200 }
      },
      isInt: true,
      toInt: true,
      exists: true
    },
    volume: {
      in: ['body'],
      isLength: {
        options: { min: -1, max: 200 }
      },
      isInt: true,
      toInt: true,
      exists: true
    },
    type: {
      in: ['body'],
      isLength: {
        options: { min: 0, max: 8 }
      },
      isInt: true,
      toInt: true,
      exists: true
    },
    isEnabled: {
      in: ['body'],
      isBoolean: true,
      toBoolean: true,
      exists: true
    },
  })
}