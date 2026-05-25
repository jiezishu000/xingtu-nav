import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { logEvent } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const xmlBody = await req.text()

    // 简单解析XML获取订单号
    const outTradeNo = xmlBody.match(/<out_trade_no><!\[CDATA\[(.*?)\]\]><\/out_trade_no>/)
    const resultCode = xmlBody.match(/<result_code><!\[CDATA\[(.*?)\]\]><\/result_code>/)
    const transactionId = xmlBody.match(/<transaction_id><!\[CDATA\[(.*?)\]\]><\/transaction_id>/)

    const orderNo = outTradeNo?.[1]
    const txnId = transactionId?.[1]
    const success = resultCode?.[1] === 'SUCCESS'

    if (!orderNo || !success) {
      logEvent('wechat_notify_invalid', { body: xmlBody.slice(0, 200) })
      return NextResponse.json({ code: 'FAIL', message: 'Invalid notification' })
    }

    // 幂等性检查
    const existing = await prisma.order.findUnique({
      where: { id: orderNo },
    })

    if (!existing || existing.status === 'PAID') {
      return NextResponse.json({ code: 'SUCCESS' })
    }

    // 更新订单状态
    await prisma.order.update({
      where: { id: orderNo },
      data: {
        status: 'PAID',
        payTime: new Date(),
        transactionId: txnId || undefined,
      },
    })

    logEvent('order_paid', {
      orderId: orderNo,
      amount: existing.amount,
      packageType: existing.packageType,
    })

    return NextResponse.json({ code: 'SUCCESS' })
  } catch (err) {
    console.error('wechat_notify_error', err)
    return NextResponse.json({ code: 'FAIL', message: 'System error' })
  }
}
