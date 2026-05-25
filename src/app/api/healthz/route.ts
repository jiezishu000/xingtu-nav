import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'xingtu-nav',
    version: '1.0.0',
  }

  return NextResponse.json(status, { status: 200 })
}
