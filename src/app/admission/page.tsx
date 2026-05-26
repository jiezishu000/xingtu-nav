'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'

const PROVINCES = [
  '北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江',
  '江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南',
  '广东','广西','海南','四川','贵州','云南','西藏','陕西','甘肃',
  '青海','宁夏','新疆','内蒙古',
]

type CollegeRec = {
  school: string
  major: string
  reason: string
  probability: string
}

type AdmissionResult = {
  assessment: string
  cushion: CollegeRec[]
  stable: CollegeRec[]
  rush: CollegeRec[]
  tips: string[]
}

export default function AdmissionPage() {
  const [score, setScore] = useState('')
  const [province, setProvince] = useState('')
  const [subjects, setSubjects] = useState('')
  const [majorPref, setMajorPref] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AdmissionResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!score || !province) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: parseInt(score),
          province,
          subjects: subjects || undefined,
          majorPreference: majorPref || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '请求失败')
        return
      }

      // aiCall returns { choices: [{ message: { content: "..." } }] }
      const content = data.choices?.[0]?.message?.content
      if (!content) {
        // Check for fallback
        if (data.choices?.[0]?.message?.content) {
          setResult(JSON.parse(data.choices[0].message.content))
        } else {
          setError('AI服务暂时不可用，请稍后再试')
        }
        return
      }

      try {
        const parsed = JSON.parse(content) as AdmissionResult
        setResult(parsed)
      } catch {
        setError('AI返回数据格式异常，请重试')
      }
    } catch {
      setError('网络错误，请检查连接后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* ── Hero ── */}
      <section className="text-center animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-blue">✦</span> AI 志愿填报
        </h1>
        <p className="text-star-muted max-w-2xl mx-auto leading-relaxed">
          输入你的高考分数和省份，AI 基于历年录取数据和招生政策，
          为你生成 <span className="text-star-gold font-semibold">冲·稳·保</span> 三梯度志愿推荐方案。
        </p>
      </section>

      {/* ── Form ── */}
      <section className="max-w-xl mx-auto w-full animate-slide-up">
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 分数 */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                高考分数 <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="例如：580"
                min={0}
                max={750}
                required
                className="w-full h-12 bg-white/5 border border-white/20 rounded-button px-4 text-white placeholder-star-muted outline-none focus:border-star-blue text-lg"
              />
            </div>

            {/* 省份 */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                省份 <span className="text-red-400">*</span>
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="w-full h-12 bg-white/5 border border-white/20 rounded-button px-4 text-white outline-none focus:border-star-blue appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-gray-900">选择省份</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p} className="bg-gray-900">{p}</option>
                ))}
              </select>
            </div>

            {/* 选科 */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                选科组合 <span className="text-star-muted text-xs font-normal">（选填）</span>
              </label>
              <input
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                placeholder="例如：物理+化学+生物 或 历史+政治+地理"
                className="w-full h-12 bg-white/5 border border-white/20 rounded-button px-4 text-white placeholder-star-muted outline-none focus:border-star-blue"
              />
            </div>

            {/* 意向专业 */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                意向专业 <span className="text-star-muted text-xs font-normal">（选填）</span>
              </label>
              <input
                value={majorPref}
                onChange={(e) => setMajorPref(e.target.value)}
                placeholder="例如：计算机、医学、金融"
                className="w-full h-12 bg-white/5 border border-white/20 rounded-button px-4 text-white placeholder-star-muted outline-none focus:border-star-blue"
              />
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-14 bg-star-blue text-white rounded-button font-bold text-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {loading ? 'AI 正在分析...' : '开始 AI 智能填报'}
            </button>
          </form>
        </Card>
      </section>

      {/* ── Loading ── */}
      {loading && (
        <section className="text-center animate-slide-up">
          <Card className="max-w-xl mx-auto p-8">
            <div className="text-4xl mb-4 animate-pulse">🧠</div>
            <p className="text-star-gold font-semibold mb-2">AI 正在分析你的志愿方案...</p>
            <p className="text-star-muted text-sm">正在结合历年录取数据和招生政策生成推荐</p>
            <div className="flex justify-center gap-1 mt-4">
              {[0,1,2].map((i) => (
                <div key={i} className="w-2 h-2 bg-star-blue rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* ── Error ── */}
      {error && (
        <section className="max-w-xl mx-auto w-full animate-slide-up">
          <Card className="p-6 border-red-500/30 text-center">
            <p className="text-red-400 font-semibold">{error}</p>
            <p className="text-star-muted text-sm mt-2">请检查输入后重试</p>
          </Card>
        </section>
      )}

      {/* ── Results ── */}
      {result && (
        <>
          {/* Assessment */}
          <section className="animate-slide-up">
            <Card className="p-6 border-star-blue/30">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h2 className="text-xl font-bold mb-2">综合评估</h2>
                  <p className="text-star-muted leading-relaxed">{result.assessment}</p>
                </div>
              </div>
            </Card>
          </section>

          {/* 冲稳保 columns */}
          <section className="grid md:grid-cols-3 gap-4 animate-slide-up">
            {/* 冲刺 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <h3 className="text-lg font-bold">冲刺</h3>
                <span className="text-xs text-star-muted">30-50%</span>
              </div>
              <div className="space-y-3">
                {result.rush.map((col, i) => (
                  <CollegeRecCard key={i} rec={col} color="red" />
                ))}
                {result.rush.length === 0 && (
                  <p className="text-star-muted text-sm">暂无推荐</p>
                )}
              </div>
            </div>

            {/* 稳妥 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <h3 className="text-lg font-bold">稳妥</h3>
                <span className="text-xs text-star-muted">50-80%</span>
              </div>
              <div className="space-y-3">
                {result.stable.map((col, i) => (
                  <CollegeRecCard key={i} rec={col} color="yellow" />
                ))}
                {result.stable.length === 0 && (
                  <p className="text-star-muted text-sm">暂无推荐</p>
                )}
              </div>
            </div>

            {/* 保底 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <h3 className="text-lg font-bold">保底</h3>
                <span className="text-xs text-star-muted">80%+</span>
              </div>
              <div className="space-y-3">
                {result.cushion.map((col, i) => (
                  <CollegeRecCard key={i} rec={col} color="green" />
                ))}
                {result.cushion.length === 0 && (
                  <p className="text-star-muted text-sm">暂无推荐</p>
                )}
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="animate-slide-up">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-lg mb-3">填报建议</h3>
                  <ul className="space-y-2">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-star-muted">
                        <span className="text-star-gold mt-1">•</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Disclaimer */}
          <section className="text-center animate-slide-up">
            <Card className="max-w-xl mx-auto p-4 border-white/10">
              <p className="text-xs text-star-muted/60 leading-relaxed">
                ⚠️ AI 生成的志愿方案仅供参考，最终填报请结合各省教育考试院官方数据
                和招生章程进行决策。建议使用 <a href="/nav" className="text-star-blue hover:underline">各省教育考试院导航</a> 核实官方信息。
              </p>
            </Card>
          </section>
        </>
      )}
    </div>
  )
}

function CollegeRecCard({ rec, color }: { rec: CollegeRec; color: 'red' | 'yellow' | 'green' }) {
  const borderMap = {
    red: 'hover:border-red-500/30',
    yellow: 'hover:border-yellow-500/30',
    green: 'hover:border-green-500/30',
  }

  return (
    <Card className={`p-4 ${borderMap[color]} transition-all`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-bold text-sm leading-tight">{rec.school}</h4>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ml-2 ${
          color === 'red' ? 'bg-red-500/20 text-red-400' :
          color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {rec.probability}
        </span>
      </div>
      <p className="text-xs text-star-muted mb-2">{rec.major}</p>
      <p className="text-[11px] text-star-muted/60 leading-relaxed">{rec.reason}</p>
    </Card>
  )
}
