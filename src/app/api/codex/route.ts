import { NextRequest, NextResponse } from 'next/server'
import { generateBlueprint } from '@/lib/ai'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { idea, level } = await req.json()

    if (!idea || !level) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    const blueprint = await generateBlueprint(idea, level)
    return NextResponse.json({ blueprint })
  } catch (error) {
    return NextResponse.json(
      { error: '蓝图生成失败', fallback: true },
      { status: 500 }
    )
  }
}
