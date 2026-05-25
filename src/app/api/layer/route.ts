import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// 阶梯定价信息
export async function GET() {
  return NextResponse.json({
    layers: [
      { id: 'basic', name: '基础版', price: 990, desc: 'AI画像完整报告 + 100万积分' },
      { id: 'pro', name: '进阶版', price: 4990, desc: '项目制生存诊断 + 600万积分' },
      { id: 'premium', name: '专业版', price: 9990, desc: '全套规划方案 + 1500万积分' },
    ],
    currency: 'CNY',
  })
}
