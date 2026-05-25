import { NextRequest, NextResponse } from 'next/server'
import { aiCall } from '@/lib/ai'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const result = await aiCall({
      messages: [{
        role: 'system',
        content: '你是一个高考志愿画像诊断AI。根据用户输入输出JSON格式的画像结果。',
      }, {
        role: 'user',
        content: JSON.stringify(body),
      }],
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: '画像生成失败', fallback: true },
      { status: 500 }
    )
  }
}
