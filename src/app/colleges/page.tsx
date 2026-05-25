'use client'

import { useState } from 'react'
import { Card, Input, Badge } from '@/components/ui'

// 种子数据：985/211/双一流核心名单
const SEED_COLLEGES = [
  { name: '清华大学', province: '北京', level: '985', type: '综合', city: '北京' },
  { name: '北京大学', province: '北京', level: '985', type: '综合', city: '北京' },
  { name: '浙江大学', province: '浙江', level: '985', type: '综合', city: '杭州' },
  { name: '上海交通大学', province: '上海', level: '985', type: '综合', city: '上海' },
  { name: '复旦大学', province: '上海', level: '985', type: '综合', city: '上海' },
  { name: '南京大学', province: '江苏', level: '985', type: '综合', city: '南京' },
  { name: '中国科学技术大学', province: '安徽', level: '985', type: '理工', city: '合肥' },
  { name: '华中科技大学', province: '湖北', level: '985', type: '综合', city: '武汉' },
  { name: '武汉大学', province: '湖北', level: '985', type: '综合', city: '武汉' },
  { name: '西安交通大学', province: '陕西', level: '985', type: '综合', city: '西安' },
  { name: '中山大学', province: '广东', level: '985', type: '综合', city: '广州' },
  { name: '四川大学', province: '四川', level: '985', type: '综合', city: '成都' },
  { name: '哈尔滨工业大学', province: '黑龙江', level: '985', type: '理工', city: '哈尔滨' },
  { name: '北京航空航天大学', province: '北京', level: '985', type: '理工', city: '北京' },
  { name: '东南大学', province: '江苏', level: '985', type: '综合', city: '南京' },
  { name: '同济大学', province: '上海', level: '985', type: '综合', city: '上海' },
  { name: '中国人民大学', province: '北京', level: '985', type: '综合', city: '北京' },
  { name: '北京理工大学', province: '北京', level: '985', type: '理工', city: '北京' },
  { name: '南开大学', province: '天津', level: '985', type: '综合', city: '天津' },
  { name: '天津大学', province: '天津', level: '985', type: '综合', city: '天津' },
  { name: '山东大学', province: '山东', level: '985', type: '综合', city: '济南' },
  { name: '厦门大学', province: '福建', level: '985', type: '综合', city: '厦门' },
  { name: '吉林大学', province: '吉林', level: '985', type: '综合', city: '长春' },
  { name: '华南理工大学', province: '广东', level: '985', type: '理工', city: '广州' },
  { name: '大连理工大学', province: '辽宁', level: '985', type: '理工', city: '大连' },
  { name: '西北工业大学', province: '陕西', level: '985', type: '理工', city: '西安' },
  { name: '北京邮电大学', province: '北京', level: '211', type: '理工', city: '北京' },
  { name: '西安电子科技大学', province: '陕西', level: '211', type: '理工', city: '西安' },
  { name: '南京航空航天大学', province: '江苏', level: '211', type: '理工', city: '南京' },
  { name: '上海科技大学', province: '上海', level: '双一流', type: '理工', city: '上海' },
  { name: '南方科技大学', province: '广东', level: '双一流', type: '综合', city: '深圳' },
  { name: '深圳大学', province: '广东', level: '双一流', type: '综合', city: '深圳' },
  { name: '杭州电子科技大学', province: '浙江', level: '普通一本', type: '理工', city: '杭州' },
  { name: '广东工业大学', province: '广东', level: '普通一本', type: '理工', city: '广州' },
]

const LEVELS = ['全部', '985', '211', '双一流', '普通一本']

export default function CollegesPage() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('全部')

  const filtered = SEED_COLLEGES.filter((c) => {
    if (levelFilter !== '全部' && c.level !== levelFilter) return false
    if (search && !c.name.includes(search) && !c.province.includes(search) && !c.city.includes(search)) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-blue">✦</span> 院校数据库
        </h1>
        <p className="text-star-muted">
          985/211/双一流院校名录，含项目适配度标签
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
        <div className="flex-1">
          <Input placeholder="搜索院校名称、省份或城市..." value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`px-4 py-2 rounded-button text-sm transition-colors ${
                levelFilter === l ? 'bg-star-blue text-white' : 'bg-white/10 text-star-muted hover:bg-white/20'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((college, i) => (
          <div key={college.name} className="animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
          <Card className="h-full">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold">{college.name}</h3>
              <Badge label={college.level} color={
                college.level === '985' ? 'gold' :
                college.level === '211' ? 'blue' :
                college.level === '双一流' ? 'green' : 'red'
              } />
            </div>
            <div className="flex gap-3 text-xs text-star-muted">
              <span>{college.province} {college.city}</span>
              <span>|</span>
              <span>{college.type}</span>
            </div>
          </Card>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-star-muted">
          没有找到匹配的院校
        </div>
      )}

      <div className="text-center text-xs text-star-muted mt-8">
        数据仍在完善中，共 {SEED_COLLEGES.length} 所院校
      </div>
    </div>
  )
}
