import { prisma } from './db'
import { logger } from './logger'

export async function trackFunnelEvent(
  eventType: string,
  data: {
    userId?: string
    page: string
    variant?: string
    utmSource?: string
    utmMedium?: string
    metadata?: Record<string, unknown>
    ip?: string
    ua?: string
  }
) {
  try {
    await prisma.funnelEvent.create({
      data: {
        eventType,
        userId: data.userId,
        page: data.page,
        variant: data.variant,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        metadata: data.metadata as any,
        ip: data.ip,
        ua: data.ua,
      },
    })
  } catch (error) {
    logger.error({ event: 'funnel_track_error', error, eventType })
  }
}
