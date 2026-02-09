import { pino } from 'pino'
import { env } from '../config/env.js'

// Use process.env.NODE_ENV directly for logger to ensure correct detection in production
const nodeEnv = process.env.NODE_ENV || env.NODE_ENV
const isDevelopment = nodeEnv === 'development'
const isStaging = nodeEnv === 'staging'
const isProduction = nodeEnv === 'production'

const level = (() => {
  if (isProduction) return 'info'
  if (isStaging) return 'info'
  return 'debug'
})()

// Use pino-pretty in all environments for readable logs
// Disable colorize in production/staging since Vercel logs don't support colors
const transport = {
  target: 'pino-pretty',
  options: {
    colorize: isDevelopment,
    translateTime: 'HH:MM:ss Z',
    ignore: 'pid,hostname',
  },
}

export const logger = pino({
  level,
  transport,
  // Ensure Error instances logged under the `error` key include message & stack,
  // so we see full error details and not just status codes.
  serializers: {
    error: (err) => {
      if (err instanceof Error) {
        return {
          type: err.name,
          message: err.message,
          stack: err.stack,
        }
      }
      return err
    },
  },
})