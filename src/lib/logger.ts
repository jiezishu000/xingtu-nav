import pino from 'pino'

const isDev = process.env.NODE_ENV !== 'production'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDev ? {
    target: 'pino-pretty',
    options: { colorize: true, translateTime: 'yyyy-mm-dd HH:MM:ss', ignore: 'pid,hostname' },
  } : undefined,
  base: { service: 'xingtu-nav', version: '1.0.0' },
})

export function logEvent(event: string, data: Record<string, unknown>) {
  logger.info({ event, ...data })
}

export function logError(event: string, error: Error, data?: Record<string, unknown>) {
  logger.error({ event, error: error.message, stack: error.stack, ...data })
}
