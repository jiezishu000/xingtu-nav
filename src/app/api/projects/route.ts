import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PROJECTS = [
  { id: 'ai-tools-report', name: 'AI工具体验报告', level: 1, desc: '使用3款以上AI工具，写一篇使用体验对比', category: '认知觉醒', difficulty: 1 },
  { id: 'creative-portfolio', name: 'AI创意作品集', level: 2, desc: '用AI工具创作一组表情包/海报/短视频', category: '工具驾驭', difficulty: 2 },
  { id: 'personal-website', name: '个人网站/博客搭建', level: 3, desc: '搭建个人网站展示作品和想法', category: '项目实战', difficulty: 3 },
  { id: 'fullstack-app', name: '全栈Web应用', level: 4, desc: '从0到1完成一个全栈应用并部署上线', category: '能力构建', difficulty: 4 },
  { id: 'open-source', name: '开源项目贡献', level: 5, desc: '参与或发起一个开源项目', category: '创新突破', difficulty: 5 },
]

export async function GET() {
  return NextResponse.json({ projects: PROJECTS })
}
