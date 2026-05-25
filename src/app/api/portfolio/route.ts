import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // 模拟数据 - 后续对接Prisma
  const portfolios = [
    { id: '1', title: '我的AI工具体验报告', status: 'completed', skills: ['信息检索', '工具使用'], techStack: ['DeepSeek', '通义千问'] },
    { id: '2', title: '个人网站搭建', status: 'in_progress', skills: ['前端开发', '部署'], techStack: ['Next.js', 'Vercel'] },
  ]

  return NextResponse.json({ portfolios })
}
