import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logEvent, logError } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let orderId: string | undefined
  try {
    const body = await req.json()
    orderId = body.orderId

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order || order.status !== 'PENDING') {
      return NextResponse.json({ error: '订单无效或已处理' }, { status: 400 })
    }

    if (order.expireTime && new Date() > order.expireTime) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'EXPIRED' },
      })
      return NextResponse.json({ error: '订单已过期' }, { status: 400 })
    }

    const ua = req.headers.get('user-agent') || ''
    const isWechat = /MicroMessenger/i.test(ua)

    if (isWechat) {
      logEvent('pay_jsapi_created', { orderId, amount: order.amount })
      return NextResponse.json({
        jsapi: true,
        message: '请在微信内完成支付',
        orderId: order.id,
        amount: order.amount,
      })
    }

    // H5支付（需配置微信商户后可用）
    logEvent('pay_h5_created', { orderId, amount: order.amount })
    return NextResponse.json({
      h5: true,
      message: '支付接口待配置微信商户后启用',
      orderId: order.id,
      amount: order.amount,
    })
  } catch (err) {
    logError('pay_create_failed', err as Error, { orderId })
    return NextResponse.json({ error: '支付创建失败' }, { status: 500 })
  }
}
