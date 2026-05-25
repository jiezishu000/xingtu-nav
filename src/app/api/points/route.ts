import { NextRequest, NextResponse } from 'next/server'
import { addPoints, subPoints } from '@/lib/points'

export const dynamic = 'force-dynamic'

// 模拟用户积分（无数据库时使用）
let mockPoints = '5000000'

export async function GET() {
  return NextResponse.json({ points: mockPoints })
}

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json()

    switch (action) {
      case 'checkin':
        mockPoints = addPoints(mockPoints, '1000000')
        return NextResponse.json({ points: mockPoints, reward: '1000000', message: '签到成功 +100万' })

      case 'spend': {
        const { amount } = await req.json()
        const newPoints = subPoints(mockPoints, amount)
        if (newPoints === mockPoints && BigInt(amount) > 0) {
          return NextResponse.json({ error: '积分不足' }, { status: 400 })
        }
        mockPoints = newPoints
        return NextResponse.json({ points: mockPoints, spent: amount })
      }

      default:
        return NextResponse.json({ error: '未知操作' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: '积分操作失败' }, { status: 500 })
  }
}
