import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SEED_COLLEGES = [
  { name: '清华大学', province: '北京', level: '985', type: '综合', city: '北京' },
  { name: '北京大学', province: '北京', level: '985', type: '综合', city: '北京' },
  { name: '浙江大学', province: '浙江', level: '985', type: '综合', city: '杭州' },
  { name: '上海交通大学', province: '上海', level: '985', type: '综合', city: '上海' },
  { name: '复旦大学', province: '上海', level: '985', type: '综合', city: '上海' },
  { name: '南京大学', province: '江苏', level: '985', type: '综合', city: '南京' },
  { name: '华中科技大学', province: '湖北', level: '985', type: '综合', city: '武汉' },
  { name: '中山大学', province: '广东', level: '985', type: '综合', city: '广州' },
  { name: '哈尔滨工业大学', province: '黑龙江', level: '985', type: '理工', city: '哈尔滨' },
  { name: '西安交通大学', province: '陕西', level: '985', type: '综合', city: '西安' },
  { name: '北京邮电大学', province: '北京', level: '211', type: '理工', city: '北京' },
  { name: '西安电子科技大学', province: '陕西', level: '211', type: '理工', city: '西安' },
  { name: '深圳大学', province: '广东', level: '双一流', type: '综合', city: '深圳' },
  { name: '杭州电子科技大学', province: '浙江', level: '普通一本', type: '理工', city: '杭州' },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const level = searchParams.get('level')

  let filtered = SEED_COLLEGES

  if (q) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.province.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    )
  }

  if (level && level !== '全部') {
    filtered = filtered.filter((c) => c.level === level)
  }

  return NextResponse.json({ colleges: filtered, total: SEED_COLLEGES.length })
}
