'use client'

import { Card } from '@/components/ui'

const ITEMS = [
  { name: '城市·学校·专业 权重配置', price: '免费', type: '提示词', badge: 'free' },
  { name: '四类赛道精准定位', price: '100万积分', type: '提示词', badge: 'paid' },
  { name: '项目履历反推大学专业', price: '100万积分', type: '提示词', badge: 'paid' },
  { name: '⭐ 项目制生存诊断', price: '500万积分', type: '提示词', badge: 'paid' },
  { name: '项目履历模板（基础版）', price: '200万积分', type: '模板', badge: 'paid' },
  { name: '项目履历模板（专业版）', price: '500万积分', type: '模板', badge: 'paid' },
  { name: 'AI项目蓝图生成（3次）', price: '1000万积分', type: 'AI服务', badge: 'premium' },
  { name: 'AI项目蓝图生成（10次）', price: '3000万积分', type: 'AI服务', badge: 'premium' },
]

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animate-slide-up">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-star-gold">✦</span> 积分商城
        </h1>
        <p className="text-star-muted">用积分兑换提示词、模板和AI服务</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {ITEMS.map((item, i) => (
          <div key={item.name} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
          <Card className={`h-full ${item.badge === 'premium' ? 'border-star-gold/30' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-star-muted">{item.type}</span>
                </div>
                <h3 className="font-bold">{item.name}</h3>
              </div>
              <span className={`text-sm font-bold whitespace-nowrap ml-4 ${
                item.badge === 'free' ? 'text-star-success' :
                item.badge === 'premium' ? 'text-star-gold' : 'text-star-muted'
              }`}>
                {item.price}
              </span>
            </div>
          </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
