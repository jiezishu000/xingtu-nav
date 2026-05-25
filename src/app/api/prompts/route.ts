import { NextResponse } from 'next/server'
import { getPrompts } from '@/lib/prompts-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ prompts: getPrompts() })
}
