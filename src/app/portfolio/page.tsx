'use client'

import { Card, Button } from '@/components/ui'
import Link from 'next/link'

const DEFAULT_PORTFOLIOS = [
  {
    title: '我的AI工具体验报告',
    desc: '对比了DeepSeek、通义千问、豆包三款AI工具，产出了一份详细对比报告',
    status: 'completed',
    skills: ['信息检索', '工具使用'],
    techStack: ['DeepSeek', '通义千问'],
  },
  {
    title: '个人网站搭建',
    desc: '用Next.js搭建了个人作品展示网站，已部署上线',
    status: 'in_progress',
    skills: ['前端开发', '部署'],
    techStack: ['Next.js', 'Vercel'],
  },
]

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-accent">✦</span> 我的项目履历
        </h1>
        <p className="text-star-muted">
          双轨核心：项目履历（给大厂看） + 志愿方案（给大学看）。
          你做过什么，比你学过什么更重要。
        </p>
      </div>

      {/* 双轨说明 */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <Card highlight>
          <h3 className="font-bold mb-2 text-star-gold">🎯 给大厂看</h3>
          <p className="text-xs text-star-muted leading-relaxed">
            项目履历：展示你解决问题的能力。
            大厂不看文凭看作品，你的GitHub就是新简历。
          </p>
        </Card>
        <Card>
          <h3 className="font-bold mb-2 text-star-blue">📚 给大学看</h3>
          <p className="text-xs text-star-muted leading-relaxed">
            志愿方案：基于你的项目经验反推最适合的大学专业。
            让大学知道你不是一张白纸。
          </p>
        </Card>
      </div>

      {/* 项目列表 */}
      <div className="space-y-4 mb-8">
        {DEFAULT_PORTFOLIOS.map((p, i) => (
          <div key={p.title} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-star-muted text-sm mt-1">{p.desc}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                p.status === 'completed'
                  ? 'bg-star-success/20 text-star-success'
                  : 'bg-star-warning/20 text-star-warning'
              }`}>
                {p.status === 'completed' ? '已完成' : '进行中'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 bg-white/10 rounded text-star-muted">{s}</span>
              ))}
              {p.techStack.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 bg-star-accent/20 text-star-accent rounded">{t}</span>
              ))}
            </div>
          </Card>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/projects">
          <Button variant="gold" className="max-w-xs mx-auto">
            开始新项目 →
          </Button>
        </Link>
      </div>
    </div>
  )
}
