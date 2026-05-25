'use client'

import { useState } from 'react'
import { Card, Button } from '@/components/ui'

const PACKAGES = [
  {
    id: 'basic',
    name: '基础版',
    price: 9.9,
    originalPrice: 19.9,
    desc: 'AI画像完整报告 + 100万积分',
    features: ['AI画像深度分析', '专业方向推荐', '100万积分（价值¥10）'],
    badge: '热销',
    color: 'blue',
  },
  {
    id: 'pro',
    name: '进阶版',
    price: 49.9,
    originalPrice: 99.9,
    desc: '项目制生存诊断 + 600万积分',
    features: ['含基础版全部', '项目制生存诊断（杀手级提示词）', '600万积分（价值¥50）', 'L1-L3项目蓝图'],
    badge: '推荐',
    color: 'gold',
  },
  {
    id: 'premium',
    name: '专业版',
    price: 99.9,
    originalPrice: 199.9,
    desc: '全套规划方案 + 1500万积分',
    features: ['含进阶版全部', '全套高考规划方案', '1500万积分（价值¥150）', 'L1-L5全部项目蓝图', '专属AI助手优先通道'],
    badge: '超值',
    color: 'purple',
  },
]

export default function PayPage() {
  const [selected, setSelected] = useState('pro')
  const [step, setStep] = useState<'select' | 'info' | 'pay'>('select')
  const [grade, setGrade] = useState('')
  const [targetMajor, setTargetMajor] = useState('')
  const [contact, setContact] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)

  const pkg = PACKAGES.find(p => p.id === selected)!

  const handleSubmit = async () => {
    if (!contact) return
    setLoading(true)
    try {
      const res = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageType: selected,
          grade,
          targetMajor,
          contactInfo: contact,
        }),
      })
      const data = await res.json()
      if (data.orderId) {
        setOrderId(data.orderId)
        setStep('pay')
      } else {
        alert(data.error || '创建订单失败')
      }
    } catch {
      alert('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handlePay = async () => {
    setPaying(true)
    try {
      const res = await fetch('/api/pay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })
      const data = await res.json()
      if (data.payUrl) {
        window.location.href = data.payUrl
      } else if (data.jsapi) {
        alert('请在微信内打开完成支付')
      } else {
        alert('支付系统配置中，请稍后再试')
      }
    } catch {
      alert('支付发起失败')
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-gold">✦</span> 解锁全部能力
        </h1>
        <p className="text-star-muted">
          选择适合你的套餐，开启项目制生存之旅
        </p>
      </div>

      {step === 'select' && (
        <>
          {/* 套餐选择 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {PACKAGES.map((p, i) => (
              <div
                key={p.id}
                className={`animate-slide-up cursor-pointer transition-all ${
                  selected === p.id ? 'scale-105' : 'opacity-70 hover:opacity-90'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => setSelected(p.id)}
              >
                <Card className={`h-full relative ${
                  selected === p.id
                    ? p.color === 'gold' ? 'border-star-gold/50' : 'border-star-blue/50'
                    : ''
                }`}>
                  {p.badge && (
                    <span className={`absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                      p.color === 'gold'
                        ? 'bg-star-gold text-star-dark'
                        : p.color === 'blue'
                        ? 'bg-star-blue text-white'
                        : 'bg-purple-500 text-white'
                    }`}>
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-2xl font-bold ${
                      p.color === 'gold' ? 'text-star-gold' : p.color === 'blue' ? 'text-star-blue' : 'text-purple-400'
                    }`}>
                      ¥{p.price}
                    </span>
                    <span className="text-sm text-star-muted line-through">¥{p.originalPrice}</span>
                  </div>
                  <p className="text-sm text-star-muted mb-3">{p.desc}</p>
                  <ul className="space-y-1">
                    {p.features.map(f => (
                      <li key={f} className="text-xs text-star-muted flex items-center gap-1">
                        <span className="text-star-success">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>

          {/* 联系信息表单 */}
          <div className="max-w-md mx-auto space-y-4 mb-8">
            <input
              value={grade}
              onChange={e => setGrade(e.target.value)}
              placeholder="年级（如：高二）"
              className="w-full h-14 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-star-muted focus:outline-none focus:border-star-gold/50"
            />
            <input
              value={targetMajor}
              onChange={e => setTargetMajor(e.target.value)}
              placeholder="感兴趣的专业方向（选填）"
              className="w-full h-14 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-star-muted focus:outline-none focus:border-star-gold/50"
            />
            <input
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="手机号/微信号（用于接收服务）"
              className="w-full h-14 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-star-muted focus:outline-none focus:border-star-gold/50"
            />
            <Button
              variant="gold"
              onClick={handleSubmit}
              disabled={loading || !contact}
            >
              {loading ? '创建订单中...' : `立即购买 ¥${pkg.price}`}
            </Button>
          </div>

          {/* 信任标识 */}
          <div className="text-center text-xs text-star-muted space-y-1">
            <p>微信支付安全交易保障 · 7天无理由退款</p>
            <p>购买后即刻生效，无需等待</p>
          </div>
        </>
      )}

      {step === 'pay' && (
        <div className="max-w-md mx-auto text-center animate-slide-up">
          <Card>
            <h3 className="font-bold text-lg mb-2">订单已创建</h3>
            <p className="text-star-muted text-sm mb-4">{pkg.name} · ¥{pkg.price}</p>
            <p className="text-xs text-star-muted mb-6">订单号：{orderId?.slice(0, 12)}...</p>
            <Button
              variant="gold"
              onClick={handlePay}
              disabled={paying}
            >
              {paying ? '跳转支付中...' : `微信支付 ¥${pkg.price}`}
            </Button>
            <button
              onClick={() => setStep('select')}
              className="block mx-auto mt-4 text-sm text-star-muted hover:text-white"
            >
              返回重新选择
            </button>
          </Card>
        </div>
      )}
    </div>
  )
}
