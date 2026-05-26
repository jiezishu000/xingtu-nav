'use client'

import { useState } from 'react'
import { Card, Button } from '@/components/ui'
import Link from 'next/link'

const RANKS = [
  { name: '星芽公民', minPoints: '0', icon: '🌱', days: '注册即得' },
  { name: '星团成员', minPoints: '10000000', icon: '⭐', days: '约10天' },
  { name: '星座筑梦师', minPoints: '100000000', icon: '🌟', days: '完成1个项目' },
  { name: '星系领航者', minPoints: '1000000000', icon: '🌌', days: 'L3项目+邀请10人' },
  { name: '星云创造主', minPoints: '10000000000', icon: '✨', days: '持续活跃3个月' },
]

const EARN_RULES = [
  { action: '每日签到', points: '100万', pointsValue: '1000000' },
  { action: '分享站点', points: '500万', pointsValue: '5000000' },
  { action: '邀请好友', points: '2000万', pointsValue: '20000000' },
  { action: '完成L1项目', points: '1亿', pointsValue: '100000000' },
  { action: '完成L3项目', points: '10亿', pointsValue: '1000000000' },
]

export default function PointsPage() {
  const [checkedIn, setCheckedIn] = useState(false)
  const [points] = useState('5000000') // 模拟：用户有500万积分

  const formatPts = (p: string) => {
    const n = BigInt(p)
    if (n >= 100_000_000n) return `${(n / 100_000_000n).toLocaleString()}亿`
    if (n >= 10_000n) return `${(n / 10_000n).toLocaleString()}万`
    return p
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-gold">✦</span> 积分中心
        </h1>
        <p className="text-star-muted">
          签到、做项目、邀请好友赚积分。积分体现你的活跃度与贡献。
        </p>
      </div>

      {/* 积分余额 */}
      <Card className="text-center mb-8 animate-slide-up" highlight>
        <p className="text-star-muted text-sm mb-2">当前积分</p>
        <p className="text-4xl font-bold text-star-gold">{formatPts(points)}</p>
        <div className="mt-4">
          <Button variant={checkedIn ? 'success' : 'gold'} onClick={() => setCheckedIn(true)} className="max-w-xs mx-auto">
            {checkedIn ? '✅ 今日已签到' : '签到 +100万'}
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 获取规则 */}
        <Card className="animate-slide-up">
          <h2 className="font-bold text-lg mb-4">📈 获取积分</h2>
          <div className="space-y-3">
            {EARN_RULES.map((r) => (
              <div key={r.action} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-sm">{r.action}</span>
                <span className="text-sm font-bold text-star-success">+{r.points}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* 称谓体系 */}
      <div className="mt-10 animate-slide-up">
        <h2 className="font-bold text-xl text-center mb-6">🏆 称谓体系</h2>
        <div className="grid grid-cols-5 gap-3">
          {RANKS.map((r) => (
            <Card key={r.name} className="text-center">
              <div className="text-2xl mb-2">{r.icon}</div>
              <div className="text-xs font-bold mb-1">{r.name}</div>
              <div className="text-[10px] text-star-muted">{r.days}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
