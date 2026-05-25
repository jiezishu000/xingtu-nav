'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Button, Input, StepIndicator } from '@/components/ui'

const STEPS = [
  { title: '基本信息', fields: ['grade', 'province', 'score', 'rank'] },
  { title: '城市偏好', fields: ['cityType', 'cityPreference'] },
  { title: '兴趣方向', fields: ['interests', 'strengths'] },
  { title: '家庭情况', fields: ['familyType', 'goal'] },
]

// 简化的问卷：18个问题→4步搞定
export default function ProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    grade: '', province: '', score: '', rank: '',
    cityType: '', cityPreference: '',
    interests: '', strengths: '',
    familyType: '', goal: '',
  })

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const canNext = () => {
    const fields = STEPS[step].fields
    return fields.every((f) => form[f as keyof typeof form].trim().length > 0)
  }

  const handleSubmit = () => {
    // 保存到sessionStorage，跳转到结果页
    sessionStorage.setItem('profileForm', JSON.stringify(form))
    router.push('/profile/result')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold mb-4">AI 画像诊断</h1>
        <p className="text-star-muted">
          18道题定位你的赛道。填完即得：推荐赛道 + 推荐专业 + 推荐项目类型。
        </p>
      </div>

      <div className="mb-8">
        <StepIndicator current={step + 1} total={STEPS.length} />
      </div>

      <Card className="animate-slide-up">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">📋 基本信息</h2>
            <div>
              <label className="text-sm text-star-muted mb-1 block">当前年级</label>
              <Input placeholder="高一 / 高二 / 高三 / 大一" value={form.grade} onChange={(v) => update('grade', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">所在省份</label>
              <Input placeholder="如：广东" value={form.province} onChange={(v) => update('province', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">预估分数（选填）</label>
              <Input placeholder="如：550" value={form.score} onChange={(v) => update('score', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">位次（选填）</label>
              <Input placeholder="如：35000" value={form.rank} onChange={(v) => update('rank', v)} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">🏙️ 城市偏好</h2>
            <div>
              <label className="text-sm text-star-muted mb-1 block">意向城市类型</label>
              <Input placeholder="一线 / 新一线 / 省会 / 地级市 / 回老家" value={form.cityType} onChange={(v) => update('cityType', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">具体意向城市</label>
              <Input placeholder="如：北京、上海、深圳、成都..." value={form.cityPreference} onChange={(v) => update('cityPreference', v)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">🎯 兴趣方向</h2>
            <div>
              <label className="text-sm text-star-muted mb-1 block">感兴趣的领域</label>
              <Input placeholder="编程 / 设计 / 商业 / 医学..." value={form.interests} onChange={(v) => update('interests', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">擅长的科目/技能</label>
              <Input placeholder="数学 / 写作 / 动手 / 社交..." value={form.strengths} onChange={(v) => update('strengths', v)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">👨‍👩‍👧‍👦 家庭情况</h2>
            <div>
              <label className="text-sm text-star-muted mb-1 block">家庭经济类型</label>
              <Input placeholder="腰干（需要早赚钱） / 小康（支持兴趣） / 富裕（有资源）" value={form.familyType} onChange={(v) => update('familyType', v)} />
            </div>
            <div>
              <label className="text-sm text-star-muted mb-1 block">长期目标</label>
              <Input placeholder="大厂就业 / 考研深造 / 创业 / 考公 / 留学" value={form.goal} onChange={(v) => update('goal', v)} />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              上一步
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button variant="primary" disabled={!canNext()} onClick={() => setStep(step + 1)}>
              下一步
            </Button>
          ) : (
            <Button variant="gold" disabled={!canNext()} onClick={handleSubmit}>
              生成画像
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
