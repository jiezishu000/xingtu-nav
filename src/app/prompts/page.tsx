'use client'

import Link from 'next/link'
import { Card } from '@/components/ui'
import { PROMPTS } from '@/lib/prompts-data'

const CATEGORIES = ['全部', '志愿规划', 'AI趋势', '赛道诊断', '项目履历', '生存指南', '学习规划', '家长指南', '项目制生存']

export default function PromptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-gold">✦</span> AI 提示词库
        </h1>
        <p className="text-star-muted max-w-xl mx-auto">
          11个AI提示词全部免费开放。基于张雪峰方法论 × AI时代生存指南，
          从志愿填报到项目履历，一站式规划你的 AI 时代生存路径。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROMPTS.map((prompt, i) => (
          <Link key={prompt.id} href={`/prompts/${prompt.id}`} className="animate-slide-up block"
            style={{ animationDelay: `${i * 80}ms` }}>
            <Card className="h-full flex flex-col hover:border-star-blue/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-star-muted">
                  {prompt.category}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-star-success/20 text-star-success">免费</span>
              </div>
              <h3 className="font-bold mb-2">{prompt.name}</h3>
              <p className="text-star-muted text-sm leading-relaxed flex-1">{prompt.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
