import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logEvent } from '@/lib/logger'

export const dynamic = 'force-dynamic'

const PRICES: Record<string, number> = {
  basic: 990,
  pro: 4990,
  premium: 9990,
}

export async function POST(req: NextRequest) {
  try {
    const { packageType, grade, targetMajor, contactInfo } = await req.json()

    if (!packageType || !contactInfo) {
      return NextResponse.json({ error: '请选择套餐并填写联系方式' }, { status: 400 })
    }

    const amount = PRICES[packageType]
    if (!amount) {
      return NextResponse.json({ error: '无效的套餐' }, { status: 400 })
    }

    const expireTime = new Date(Date.now() + 15 * 60 * 1000)

    const order = await prisma.order.create({
      data: {
        packageType,
        amount,
        status: 'PENDING',
        grade: grade || null,
        targetMajor: targetMajor || null,
        contactInfo,
        expireTime,
      },
    })

    logEvent('order_created', {
      orderId: order.id,
      packageType,
      amount,
    })

    return NextResponse.json({
      orderId: order.id,
      price: amount,
      expireTime: expireTime.toISOString(),
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: '创建订单失败' }, { status: 500 })
  }
}
