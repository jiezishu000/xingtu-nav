import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logEvent } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order || order.status !== 'PENDING') {
      return NextResponse.json({ error: '订单不存在或已处理' }, { status: 400 })
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    })

    logEvent('order_cancelled', { orderId })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '取消失败' }, { status: 500 })
  }
}
