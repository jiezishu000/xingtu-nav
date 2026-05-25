'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui'

interface ProfileResult {
  grade: string
  province: string
  score: string
  rank: string
  cityType: string
  cityPreference: string
  interests: string
  strengths: string
  familyType: string
  goal: string
}

export default function ProfileResultPage() {
  const [data, setData] = useState<ProfileResult | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('profileForm')
    if (saved) setData(JSON.parse(saved))
  }, [])

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">未找到画像数据</h1>
        <p className="text-star-muted mb-6">请先完成AI画像诊断</p>
        <Link href="/profile" className="text-star-blue hover:underline">去做画像 →</Link>
      </div>
    )
  }

  // 根据输入生成建议（本地逻辑，无需AI）
  const getRecommendation = () => {
    const hasScore = parseInt(data.score) > 0
    const techInterest = /编程|计算机|数学|代码/i.test(data.interests + data.strengths)
    const bizInterest = /商业|管理|经济|金融|创业/i.test(data.interests + data.strengths)
    const designInterest = /设计|艺术|创意|媒体/i.test(data.interests + data.strengths)
    const medInterest = /医学|生物|化学|医药/i.test(data.interests + data.strengths)

    let tracks: string[] = []
    let majors: string[] = []
    let projects: string[] = []

    if (techInterest) {
      tracks.push('互联网型（技术方向）')
      majors.push('计算机科学与技术', '软件工程', '人工智能')
      projects.push('L3: 开发一个AI辅助应用', 'L4: 参与开源项目', 'L5: 独立完成一个SaaS产品')
    }
    if (bizInterest) {
      tracks.push('互联网型（产品/运营方向）', '央国企型')
      majors.push('电子商务', '市场营销', '工商管理')
      projects.push('L2: 用AI做市场调研报告', 'L3: 运营一个社交媒体账号', 'L4: 策划一次线上活动')
    }
    if (designInterest) {
      tracks.push('互联网型（设计方向）')
      majors.push('数字媒体技术', '视觉传达设计', '工业设计')
      projects.push('L2: 用AI工具创作一套表情包', 'L3: 设计一个APP原型', 'L4: 完成一个品牌视觉方案')
    }
    if (medInterest) {
      tracks.push('体制内型', '军工国防型')
      majors.push('临床医学', '药学', '生物医学工程')
      projects.push('L2: AI辅助医学文献综述', 'L3: 健康数据分析项目', 'L4: 医学科普内容创作')
    }

    if (tracks.length === 0) {
      tracks = ['互联网型（综合方向）']
      majors = ['计算机科学与技术', '信息管理与信息系统', '电子商务']
      projects = ['L1: 用AI工具完成一次调研', 'L2: 用AI完成一个创意作品', 'L3: 体验AI辅助开发']
    }

    return {
      tracks: tracks.slice(0, 3),
      majors: majors.slice(0, 3),
      projects: projects.slice(0, 3),
      hasScore,
      score: data.score,
      cityType: data.cityType,
      familyType: data.familyType,
      goal: data.goal,
    }
  }

  const rec = getRecommendation()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-center mb-2">✨ 你的AI画像诊断报告</h1>
        <p className="text-star-muted text-center mb-8">基于你提供的信息，生成了以下定制化建议</p>

        {/* 基本信息摘要 */}
        <Card className="mb-6">
          <h2 className="font-bold mb-4">📋 信息摘要</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-star-muted">年级：</span>{data.grade}</div>
            <div><span className="text-star-muted">省份：</span>{data.province}</div>
            {data.score && <div><span className="text-star-muted">分数：</span>{data.score}</div>}
            <div><span className="text-star-muted">意向城市：</span>{data.cityPreference || data.cityType}</div>
            <div><span className="text-star-muted">家庭情况：</span>{data.familyType}</div>
            <div><span className="text-star-muted">目标：</span>{data.goal}</div>
          </div>
        </Card>

        {/* 推荐赛道 */}
        <Card className="mb-6" highlight>
          <h2 className="font-bold mb-4">🎯 推荐赛道</h2>
          <div className="space-y-2">
            {rec.tracks.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-star-gold">✦</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 推荐专业 */}
        <Card className="mb-6">
          <h2 className="font-bold mb-4">📚 推荐大学专业</h2>
          <div className="space-y-2">
            {rec.majors.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-star-blue">{i + 1}.</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 推荐项目 */}
        <Card className="mb-6" highlight>
          <h2 className="font-bold mb-4">🚀 推荐项目（渐进路线）</h2>
          <div className="space-y-2">
            {rec.projects.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-star-success">▸</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link href="/projects" className="text-star-blue text-sm hover:underline">
              查看完整项目体系 →
            </Link>
          </div>
        </Card>

        {/* 行动建议 */}
        <Card>
          <h2 className="font-bold mb-4">💡 现在就能做的3件事</h2>
          <ol className="space-y-2 text-sm text-star-muted list-decimal list-inside">
            <li>注册并开始使用至少2款AI工具（建议从DeepSeek+剪映开始）</li>
            <li>找一个感兴趣的方向，开始你的L1项目</li>
            <li>用项目履历反推你的大学专业选择</li>
          </ol>
        </Card>
      </div>
    </div>
  )
}
