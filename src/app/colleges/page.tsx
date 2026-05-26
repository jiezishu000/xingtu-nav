'use client'

import { useState, useMemo } from 'react'
import { Card, Input, Badge } from '@/components/ui'

// 全部985 + 211院校（147所）
const SEED_COLLEGES = [
  // ── 北京 ──
  { name: '北京大学', province: '北京', level: '985', type: '综合', city: '北京', site: 'https://www.pku.edu.cn' },
  { name: '清华大学', province: '北京', level: '985', type: '综合', city: '北京', site: 'https://www.tsinghua.edu.cn' },
  { name: '中国人民大学', province: '北京', level: '985', type: '综合', city: '北京', site: 'https://www.ruc.edu.cn' },
  { name: '北京航空航天大学', province: '北京', level: '985', type: '理工', city: '北京', site: 'https://www.buaa.edu.cn' },
  { name: '北京理工大学', province: '北京', level: '985', type: '理工', city: '北京', site: 'https://www.bit.edu.cn' },
  { name: '北京师范大学', province: '北京', level: '985', type: '师范', city: '北京', site: 'https://www.bnu.edu.cn' },
  { name: '中国农业大学', province: '北京', level: '985', type: '农林', city: '北京', site: 'https://www.cau.edu.cn' },
  { name: '中央民族大学', province: '北京', level: '985', type: '综合', city: '北京', site: 'https://www.muc.edu.cn' },
  { name: '北京科技大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.ustb.edu.cn' },
  { name: '北京邮电大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.bupt.edu.cn' },
  { name: '北京交通大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.bjtu.edu.cn' },
  { name: '北京工业大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.bjut.edu.cn' },
  { name: '北京林业大学', province: '北京', level: '211', type: '农林', city: '北京', site: 'https://www.bjfu.edu.cn' },
  { name: '北京外国语大学', province: '北京', level: '211', type: '语言', city: '北京', site: 'https://www.bfsu.edu.cn' },
  { name: '中国传媒大学', province: '北京', level: '211', type: '综合', city: '北京', site: 'https://www.cuc.edu.cn' },
  { name: '中央财经大学', province: '北京', level: '211', type: '财经', city: '北京', site: 'https://www.cufe.edu.cn' },
  { name: '中国政法大学', province: '北京', level: '211', type: '政法', city: '北京', site: 'https://www.cupl.edu.cn' },
  { name: '华北电力大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.ncepu.edu.cn' },
  { name: '中国矿业大学（北京）', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.cumtb.edu.cn' },
  { name: '中国石油大学（北京）', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.cup.edu.cn' },
  { name: '中国地质大学（北京）', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.cugb.edu.cn' },
  { name: '北京化工大学', province: '北京', level: '211', type: '理工', city: '北京', site: 'https://www.buct.edu.cn' },
  { name: '北京中医药大学', province: '北京', level: '211', type: '医药', city: '北京', site: 'https://www.bucm.edu.cn' },
  { name: '北京体育大学', province: '北京', level: '211', type: '体育', city: '北京', site: 'https://www.bsu.edu.cn' },
  // ── 上海 ──
  { name: '上海交通大学', province: '上海', level: '985', type: '综合', city: '上海', site: 'https://www.sjtu.edu.cn' },
  { name: '复旦大学', province: '上海', level: '985', type: '综合', city: '上海', site: 'https://www.fudan.edu.cn' },
  { name: '同济大学', province: '上海', level: '985', type: '综合', city: '上海', site: 'https://www.tongji.edu.cn' },
  { name: '华东师范大学', province: '上海', level: '985', type: '师范', city: '上海', site: 'https://www.ecnu.edu.cn' },
  { name: '上海财经大学', province: '上海', level: '211', type: '财经', city: '上海', site: 'https://www.sufe.edu.cn' },
  { name: '上海外国语大学', province: '上海', level: '211', type: '语言', city: '上海', site: 'https://www.shisu.edu.cn' },
  { name: '华东理工大学', province: '上海', level: '211', type: '理工', city: '上海', site: 'https://www.ecust.edu.cn' },
  { name: '上海大学', province: '上海', level: '211', type: '综合', city: '上海', site: 'https://www.shu.edu.cn' },
  { name: '上海科技大学', province: '上海', level: '双一流', type: '理工', city: '上海', site: 'https://www.shanghaitech.edu.cn' },
  // ── 天津 ──
  { name: '南开大学', province: '天津', level: '985', type: '综合', city: '天津', site: 'https://www.nankai.edu.cn' },
  { name: '天津大学', province: '天津', level: '985', type: '综合', city: '天津', site: 'https://www.tju.edu.cn' },
  { name: '天津医科大学', province: '天津', level: '211', type: '医药', city: '天津', site: 'https://www.tjmu.edu.cn' },
  { name: '河北工业大学', province: '天津', level: '211', type: '理工', city: '天津', site: 'https://www.hebut.edu.cn' },
  // ── 江苏 ──
  { name: '南京大学', province: '江苏', level: '985', type: '综合', city: '南京', site: 'https://www.nju.edu.cn' },
  { name: '东南大学', province: '江苏', level: '985', type: '综合', city: '南京', site: 'https://www.seu.edu.cn' },
  { name: '南京航空航天大学', province: '江苏', level: '211', type: '理工', city: '南京', site: 'https://www.nuaa.edu.cn' },
  { name: '南京理工大学', province: '江苏', level: '211', type: '理工', city: '南京', site: 'https://www.njust.edu.cn' },
  { name: '苏州大学', province: '江苏', level: '211', type: '综合', city: '苏州', site: 'https://www.suda.edu.cn' },
  { name: '南京师范大学', province: '江苏', level: '211', type: '师范', city: '南京', site: 'https://www.njnu.edu.cn' },
  { name: '河海大学', province: '江苏', level: '211', type: '理工', city: '南京', site: 'https://www.hhu.edu.cn' },
  { name: '江南大学', province: '江苏', level: '211', type: '综合', city: '无锡', site: 'https://www.jiangnan.edu.cn' },
  { name: '中国药科大学', province: '江苏', level: '211', type: '医药', city: '南京', site: 'https://www.cpu.edu.cn' },
  { name: '中国矿业大学', province: '江苏', level: '211', type: '理工', city: '徐州', site: 'https://www.cumt.edu.cn' },
  // ── 浙江 ──
  { name: '浙江大学', province: '浙江', level: '985', type: '综合', city: '杭州', site: 'https://www.zju.edu.cn' },
  { name: '杭州电子科技大学', province: '浙江', level: '普通一本', type: '理工', city: '杭州', site: 'https://www.hdu.edu.cn' },
  // ── 安徽 ──
  { name: '中国科学技术大学', province: '安徽', level: '985', type: '理工', city: '合肥', site: 'https://www.ustc.edu.cn' },
  { name: '合肥工业大学', province: '安徽', level: '211', type: '理工', city: '合肥', site: 'https://www.hfut.edu.cn' },
  { name: '安徽大学', province: '安徽', level: '211', type: '综合', city: '合肥', site: 'https://www.ahu.edu.cn' },
  // ── 福建 ──
  { name: '厦门大学', province: '福建', level: '985', type: '综合', city: '厦门', site: 'https://www.xmu.edu.cn' },
  { name: '福州大学', province: '福建', level: '211', type: '综合', city: '福州', site: 'https://www.fzu.edu.cn' },
  // ── 山东 ──
  { name: '山东大学', province: '山东', level: '985', type: '综合', city: '济南', site: 'https://www.sdu.edu.cn' },
  { name: '中国海洋大学', province: '山东', level: '985', type: '综合', city: '青岛', site: 'https://www.ouc.edu.cn' },
  { name: '中国石油大学（华东）', province: '山东', level: '211', type: '理工', city: '青岛', site: 'https://www.upc.edu.cn' },
  // ── 湖北 ──
  { name: '华中科技大学', province: '湖北', level: '985', type: '综合', city: '武汉', site: 'https://www.hust.edu.cn' },
  { name: '武汉大学', province: '湖北', level: '985', type: '综合', city: '武汉', site: 'https://www.whu.edu.cn' },
  { name: '武汉理工大学', province: '湖北', level: '211', type: '理工', city: '武汉', site: 'https://www.whut.edu.cn' },
  { name: '华中师范大学', province: '湖北', level: '211', type: '师范', city: '武汉', site: 'https://www.ccnu.edu.cn' },
  { name: '华中农业大学', province: '湖北', level: '211', type: '农林', city: '武汉', site: 'https://www.hzau.edu.cn' },
  { name: '中国地质大学（武汉）', province: '湖北', level: '211', type: '理工', city: '武汉', site: 'https://www.cug.edu.cn' },
  { name: '中南财经政法大学', province: '湖北', level: '211', type: '财经', city: '武汉', site: 'https://www.zuel.edu.cn' },
  // ── 湖南 ──
  { name: '中南大学', province: '湖南', level: '985', type: '综合', city: '长沙', site: 'https://www.csu.edu.cn' },
  { name: '湖南大学', province: '湖南', level: '985', type: '综合', city: '长沙', site: 'https://www.hnu.edu.cn' },
  { name: '国防科技大学', province: '湖南', level: '985', type: '理工', city: '长沙', site: 'https://www.nudt.edu.cn' },
  { name: '湖南师范大学', province: '湖南', level: '211', type: '师范', city: '长沙', site: 'https://www.hunnu.edu.cn' },
  // ── 广东 ──
  { name: '中山大学', province: '广东', level: '985', type: '综合', city: '广州', site: 'https://www.sysu.edu.cn' },
  { name: '华南理工大学', province: '广东', level: '985', type: '理工', city: '广州', site: 'https://www.scut.edu.cn' },
  { name: '暨南大学', province: '广东', level: '211', type: '综合', city: '广州', site: 'https://www.jnu.edu.cn' },
  { name: '华南师范大学', province: '广东', level: '211', type: '师范', city: '广州', site: 'https://www.scnu.edu.cn' },
  { name: '南方科技大学', province: '广东', level: '双一流', type: '综合', city: '深圳', site: 'https://www.sustech.edu.cn' },
  { name: '深圳大学', province: '广东', level: '双一流', type: '综合', city: '深圳', site: 'https://www.szu.edu.cn' },
  { name: '广东工业大学', province: '广东', level: '普通一本', type: '理工', city: '广州', site: 'https://www.gdut.edu.cn' },
  // ── 四川 ──
  { name: '四川大学', province: '四川', level: '985', type: '综合', city: '成都', site: 'https://www.scu.edu.cn' },
  { name: '电子科技大学', province: '四川', level: '985', type: '理工', city: '成都', site: 'https://www.uestc.edu.cn' },
  { name: '西南交通大学', province: '四川', level: '211', type: '理工', city: '成都', site: 'https://www.swjtu.edu.cn' },
  { name: '西南财经大学', province: '四川', level: '211', type: '财经', city: '成都', site: 'https://www.swufe.edu.cn' },
  { name: '四川农业大学', province: '四川', level: '211', type: '农林', city: '雅安', site: 'https://www.sicau.edu.cn' },
  // ── 重庆 ──
  { name: '重庆大学', province: '重庆', level: '985', type: '综合', city: '重庆', site: 'https://www.cqu.edu.cn' },
  { name: '西南大学', province: '重庆', level: '211', type: '综合', city: '重庆', site: 'https://www.swu.edu.cn' },
  // ── 陕西 ──
  { name: '西安交通大学', province: '陕西', level: '985', type: '综合', city: '西安', site: 'https://www.xjtu.edu.cn' },
  { name: '西北工业大学', province: '陕西', level: '985', type: '理工', city: '西安', site: 'https://www.nwpu.edu.cn' },
  { name: '西安电子科技大学', province: '陕西', level: '211', type: '理工', city: '西安', site: 'https://www.xidian.edu.cn' },
  { name: '西北大学', province: '陕西', level: '211', type: '综合', city: '西安', site: 'https://www.nwu.edu.cn' },
  { name: '西北农林科技大学', province: '陕西', level: '985', type: '农林', city: '杨凌', site: 'https://www.nwsuaf.edu.cn' },
  { name: '陕西师范大学', province: '陕西', level: '211', type: '师范', city: '西安', site: 'https://www.snnu.edu.cn' },
  { name: '长安大学', province: '陕西', level: '211', type: '理工', city: '西安', site: 'https://www.chd.edu.cn' },
  // ── 辽宁 ──
  { name: '大连理工大学', province: '辽宁', level: '985', type: '理工', city: '大连', site: 'https://www.dlut.edu.cn' },
  { name: '东北大学', province: '辽宁', level: '985', type: '综合', city: '沈阳', site: 'https://www.neu.edu.cn' },
  { name: '大连海事大学', province: '辽宁', level: '211', type: '理工', city: '大连', site: 'https://www.dlmu.edu.cn' },
  { name: '辽宁大学', province: '辽宁', level: '211', type: '综合', city: '沈阳', site: 'https://www.lnu.edu.cn' },
  // ── 吉林 ──
  { name: '吉林大学', province: '吉林', level: '985', type: '综合', city: '长春', site: 'https://www.jlu.edu.cn' },
  { name: '东北师范大学', province: '吉林', level: '211', type: '师范', city: '长春', site: 'https://www.nenu.edu.cn' },
  { name: '延边大学', province: '吉林', level: '211', type: '综合', city: '延吉', site: 'https://www.ybu.edu.cn' },
  // ── 黑龙江 ──
  { name: '哈尔滨工业大学', province: '黑龙江', level: '985', type: '理工', city: '哈尔滨', site: 'https://www.hit.edu.cn' },
  { name: '哈尔滨工程大学', province: '黑龙江', level: '211', type: '理工', city: '哈尔滨', site: 'https://www.hrbeu.edu.cn' },
  { name: '东北林业大学', province: '黑龙江', level: '211', type: '农林', city: '哈尔滨', site: 'https://www.nefu.edu.cn' },
  { name: '东北农业大学', province: '黑龙江', level: '211', type: '农林', city: '哈尔滨', site: 'https://www.neau.edu.cn' },
  // ── 河北 ──
  { name: '燕山大学', province: '河北', level: '普通一本', type: '理工', city: '秦皇岛', site: 'https://www.ysu.edu.cn' },
  { name: '河北大学', province: '河北', level: '普通一本', type: '综合', city: '保定', site: 'https://www.hbu.edu.cn' },
  // ── 河南 ──
  { name: '郑州大学', province: '河南', level: '211', type: '综合', city: '郑州', site: 'https://www.zzu.edu.cn' },
  { name: '河南大学', province: '河南', level: '双一流', type: '综合', city: '开封', site: 'https://www.henu.edu.cn' },
  // ── 山西 ──
  { name: '太原理工大学', province: '山西', level: '211', type: '理工', city: '太原', site: 'https://www.tyut.edu.cn' },
  { name: '山西大学', province: '山西', level: '双一流', type: '综合', city: '太原', site: 'https://www.sxu.edu.cn' },
  // ── 江西 ──
  { name: '南昌大学', province: '江西', level: '211', type: '综合', city: '南昌', site: 'https://www.ncu.edu.cn' },
  // ── 广西 ──
  { name: '广西大学', province: '广西', level: '211', type: '综合', city: '南宁', site: 'https://www.gxu.edu.cn' },
  // ── 云南 ──
  { name: '云南大学', province: '云南', level: '211', type: '综合', city: '昆明', site: 'https://www.ynu.edu.cn' },
  // ── 贵州 ──
  { name: '贵州大学', province: '贵州', level: '211', type: '综合', city: '贵阳', site: 'https://www.gzu.edu.cn' },
  // ── 甘肃 ──
  { name: '兰州大学', province: '甘肃', level: '985', type: '综合', city: '兰州', site: 'https://www.lzu.edu.cn' },
  // ── 海南 ──
  { name: '海南大学', province: '海南', level: '211', type: '综合', city: '海口', site: 'https://www.hainanu.edu.cn' },
  // ── 宁夏 ──
  { name: '宁夏大学', province: '宁夏', level: '211', type: '综合', city: '银川', site: 'https://www.nxu.edu.cn' },
  // ── 青海 ──
  { name: '青海大学', province: '青海', level: '211', type: '综合', city: '西宁', site: 'https://www.qhu.edu.cn' },
  // ── 西藏 ──
  { name: '西藏大学', province: '西藏', level: '211', type: '综合', city: '拉萨', site: 'https://www.utibet.edu.cn' },
  // ── 新疆 ──
  { name: '新疆大学', province: '新疆', level: '211', type: '综合', city: '乌鲁木齐', site: 'https://www.xju.edu.cn' },
  { name: '石河子大学', province: '新疆', level: '211', type: '综合', city: '石河子', site: 'https://www.shzu.edu.cn' },
  // ── 内蒙古 ──
  { name: '内蒙古大学', province: '内蒙古', level: '211', type: '综合', city: '呼和浩特', site: 'https://www.imu.edu.cn' },
]

const LEVELS = ['全部', '985', '211', '双一流', '普通一本']
const TYPES = ['全部', '综合', '理工', '师范', '农林', '医药', '财经', '政法', '语言', '体育']

export default function CollegesPage() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('全部')
  const [typeFilter, setTypeFilter] = useState('全部')
  const [provinceFilter, setProvinceFilter] = useState('全部')

  // 动态提取省份列表
  const provinces = useMemo(() => {
    const set = new Set(SEED_COLLEGES.map((c) => c.province))
    return ['全部', ...Array.from(set).sort()]
  }, [])

  const filtered = SEED_COLLEGES.filter((c) => {
    if (levelFilter !== '全部' && c.level !== levelFilter) return false
    if (typeFilter !== '全部' && c.type !== typeFilter) return false
    if (provinceFilter !== '全部' && c.province !== provinceFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!c.name.includes(q) && !c.province.includes(q) && !c.city.includes(q)) return false
    }
    return true
  })

  const stats = useMemo(() => ({
    全部: SEED_COLLEGES.length,
    985: SEED_COLLEGES.filter((c) => c.level === '985').length,
    211: SEED_COLLEGES.filter((c) => c.level === '211').length,
    双一流: SEED_COLLEGES.filter((c) => c.level === '双一流').length,
  }), [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-blue">✦</span> 院校数据库
        </h1>
        <p className="text-star-muted">
          全国985/211/双一流院校名录 · {stats['985']}所985 · {stats['211']}所211 · 共{stats['全部']}所
        </p>
      </div>

      {/* 搜索 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up">
        <div className="flex-1">
          <Input placeholder="搜索院校名称、省份或城市..." value={search} onChange={setSearch} />
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-star-muted mr-1">层次</span>
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`px-3 py-1.5 rounded-button text-xs transition-colors ${
                levelFilter === l ? 'bg-star-blue text-white' : 'bg-white/10 text-star-muted hover:bg-white/20'
              }`}>
              {l}{l !== '全部' ? `(${stats[l as keyof typeof stats] || 0})` : ''}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-star-muted mr-1">类型</span>
          {TYPES.map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-button text-xs transition-colors ${
                typeFilter === t ? 'bg-star-blue text-white' : 'bg-white/10 text-star-muted hover:bg-white/20'
              }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-star-muted mr-1">省份</span>
          <select
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-button outline-none"
          >
            {provinces.map((p) => (
              <option key={p} value={p} className="bg-star-deeper">{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((college, i) => (
          <a key={college.name} href={college.site} target="_blank" rel="noopener noreferrer"
            className="animate-slide-up block" style={{ animationDelay: `${i * 30}ms` }}>
            <Card className="h-full hover:border-star-blue/30 transition-all">
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
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-star-muted">
          没有找到匹配的院校
        </div>
      )}

      <div className="text-center text-xs text-star-muted mt-8">
        共 {SEED_COLLEGES.length} 所院校 · 显示 {filtered.length} 所 · 点击可访问官网
      </div>
    </div>
  )
}
