'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui'
import { useRouter } from 'next/navigation'

const QUICK_ENTRIES = [
  { icon: '🏫', title: '院校查询', desc: '全国985/211院校数据库', href: '/colleges', color: 'from-star-blue to-blue-600' },
  { icon: '📋', title: '专业查询', desc: '本科专业目录与就业数据', href: '/colleges', color: 'from-star-gold to-yellow-600' },
  { icon: '📊', title: '分数线', desc: '历年录取分数与位次', href: '/colleges', color: 'from-star-accent to-purple-600' },
  { icon: '🤖', title: 'AI志愿填报', desc: 'AI 生成冲稳保志愿方案', href: '/admission', color: 'from-green-500 to-emerald-600' },
  { icon: '📰', title: '政策解读', desc: '最新高考政策与备考攻略', href: '/prompts', color: 'from-red-500 to-rose-600' },
]

const HERO_FEATURES = [
  {
    icon: '🎯',
    title: 'AI 画像诊断',
    desc: '18道题定位你的赛道。城市>学校>专业，张雪峰方法论 x AI 时代生存指南。',
    href: '/profile',
  },
  {
    icon: '🚀',
    title: '项目制生存',
    desc: '不是填志愿，是设计人生。L1-L5 渐进项目体系，让你进大学前就有作品集。',
    href: '/projects',
  },
  {
    icon: '🧠',
    title: '11个AI提示词',
    desc: '从冲稳保清单到项目履历反推专业。3个免费引流，8个付费深度诊断。',
    href: '/prompts',
  },
]

const METHODOLOGY_CARDS = [
  { title: '城市 > 学校 > 专业', desc: '"对于大多数普通家庭的孩子来说，选城市比选学校重要，选学校比选专业重要。"', author: '张雪峰' },
  { title: '四类专业定位', desc: '军工国防型 / 央国企型 / 互联网型 / 体制内型。不同赛道，不同的志愿策略。', author: '张雪峰方法论' },
  { title: '家庭类型策略', desc: '腰干家庭要毕业快速赚钱，小康家庭可以支持兴趣，富裕家庭有家族资源。', author: '张雪峰方法论' },
  { title: '冲稳保三梯度', desc: '冲（30-50%概率）、稳（50-80%）、保（80%+）。三种可能，三种人生路径。', author: '张雪峰方法论' },
]

const LEVELS = [
  { level: 'L1', name: '认知觉醒', desc: '了解AI时代的机会与挑战', projects: '用AI工具完成一次调研', icon: '🌱' },
  { level: 'L2', name: '工具驾驭', desc: '掌握主流AI工具的使用', projects: '用AI完成一个创意作品', icon: '🔧' },
  { level: 'L3', name: '项目实战', desc: '独立完成一个小型项目', projects: '开发一个AI辅助应用', icon: '⚡' },
  { level: 'L4', name: '能力构建', desc: '深入技术栈构建专业能力', projects: '完成复杂项目并部署上线', icon: '🔥' },
  { level: 'L5', name: '创新突破', desc: '定义问题并创造解决方案', projects: '开源项目/创业产品', icon: '🌟' },
]

const HOT_PROVINCES = [
  '北京', '上海', '广东', '浙江', '江苏', '四川', '湖北', '陕西',
  '山东', '天津', '辽宁', '湖南', '重庆', '福建', '河南', '安徽',
]

export default function HomePage() {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchText.trim()) {
      router.push(`/colleges?q=${encodeURIComponent(searchText.trim())}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* ── Hero ── */}
      <section className="py-16 text-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            <span className="text-star-gold">✦</span>{' '}
            <span>高考只是节点，</span>
            <br />
            <span className="bg-gradient-to-r from-star-blue to-star-accent bg-clip-text text-transparent">
              项目制生存才是坐标
            </span>
          </h1>
          <p className="text-star-muted text-lg md:text-xl max-w-2xl mx-auto mt-6">
            张雪峰方法论 × AI 时代生存指南。不是填志愿，是设计人生。
            <br />
            让每个青少年在 AI 时代拥有一份属于自己的项目履历。
          </p>
        </div>

        {/* 搜索栏 */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8 animate-slide-up">
          <div className="relative">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="🔍  搜索院校名称、省份..."
              className="w-full h-14 bg-white/10 border border-white/20 rounded-full px-6 pr-32 text-white placeholder-star-muted outline-none focus:border-star-blue focus:shadow-glow text-lg"
            />
            <button type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-star-blue text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-all">
              搜索
            </button>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/admission" className="px-8 py-3 bg-star-blue text-white rounded-button font-semibold hover:bg-blue-600 transition-all text-sm shadow-glow">
              AI 智能填报
            </Link>
            <Link href="/profile" className="px-8 py-3 bg-star-gold/20 text-star-gold rounded-button font-semibold hover:bg-star-gold/30 transition-all text-sm">
              开始 AI 画像
            </Link>
            <Link href="/nav" className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-button font-semibold hover:bg-white/5 transition-all text-sm">
              高考资源导航
            </Link>
          </div>
        </form>
      </section>

      {/* ── 5大快捷入口 ── */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
        {QUICK_ENTRIES.map((e, i) => (
          <Link key={e.title} href={e.href}
            className="animate-slide-up block" style={{ animationDelay: `${i * 80}ms` }}>
            <Card className="text-center h-full hover:border-star-blue/30 transition-all cursor-pointer">
              <div className="text-2xl mb-2">{e.icon}</div>
              <h3 className="font-bold text-sm mb-1">{e.title}</h3>
              <p className="text-star-muted text-[10px] leading-tight">{e.desc}</p>
            </Card>
          </Link>
        ))}
      </section>

      {/* ── 三大核心入口 ── */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {HERO_FEATURES.map((f, i) => (
          <Link key={f.title} href={f.href} style={{ animationDelay: `${(i + 1) * 150}ms` }}
            className="block animate-slide-up">
            <Card className="h-full hover:border-star-blue/30 transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-star-muted text-sm leading-relaxed">{f.desc}</p>
            </Card>
          </Link>
        ))}
      </section>

      {/* ── 张雪峰方法论 ── */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          张雪峰<span className="text-star-gold">·</span>方法论
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {METHODOLOGY_CARDS.map((m) => (
            <Card key={m.title} className="animate-slide-up">
              <h3 className="text-lg font-bold mb-2 text-star-gold">{m.title}</h3>
              <p className="text-star-muted text-sm leading-relaxed mb-2">{m.desc}</p>
              <p className="text-xs text-star-muted/60">— {m.author}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── L1-L5 项目体系 ── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            L1 → L5<span className="text-star-gold">·</span>渐进项目体系
          </h2>
          <p className="text-star-muted">从零开始，一步步构建你的 AI 时代项目履历</p>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          {LEVELS.map((l) => (
            <Card key={l.level} className="text-center animate-slide-up">
              <div className="text-3xl mb-3">{l.icon}</div>
              <div className="text-star-gold font-bold text-sm mb-1">{l.level}</div>
              <h3 className="font-bold mb-2">{l.name}</h3>
              <p className="text-star-muted text-xs leading-relaxed mb-2">{l.desc}</p>
              <p className="text-xs text-star-blue">{l.projects}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/projects"
            className="inline-block px-6 py-3 bg-star-gold/20 text-star-gold rounded-button font-semibold hover:bg-star-gold/30 transition-all">
            查看全部项目 →
          </Link>
        </div>
      </section>

      {/* ── 各省考试院快捷导航 ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-star-gold">📋</span> 各省教育考试院
          </h2>
          <Link href="/nav" className="text-xs text-star-blue hover:underline">
            查看全部31省 →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {HOT_PROVINCES.map((p) => (
            <Link key={p} href="/nav"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-star-blue/30 transition-all text-sm">
              {p}
            </Link>
          ))}
          <Link href="/nav"
            className="px-4 py-2 rounded-lg bg-star-blue/20 text-star-blue border border-star-blue/30 hover:bg-star-blue/30 transition-all text-sm">
            更多 →
          </Link>
        </div>
      </section>

      {/* ── 全部免费 ── */}
      <section className="mb-16 text-center">
        <Card className="max-w-2xl mx-auto animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">✦ 全部功能免费开放</h2>
          <p className="text-star-muted mb-6">
            所有 AI 提示词、志愿填报、项目蓝图全部免费。
            <br />
            积分仅用于记录活跃度，不做任何付费限制。
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-star-gold text-xl font-bold">免费</div>
              <div className="text-xs text-star-muted">全部提示词</div>
            </div>
            <div>
              <div className="text-star-gold text-xl font-bold">免费</div>
              <div className="text-xs text-star-muted">AI 志愿填报</div>
            </div>
            <div>
              <div className="text-star-gold text-xl font-bold">免费</div>
              <div className="text-xs text-star-muted">项目体系</div>
            </div>
          </div>
          <Link href="/prompts"
            className="inline-block px-6 py-3 bg-star-gold text-black rounded-button font-semibold hover:bg-yellow-500 transition-all">
            开始使用 →
          </Link>
        </Card>
      </section>

      {/* ── CTA ── */}
      <section className="text-center pb-16">
        <div className="animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            高考不是终点，AI不是威胁
          </h2>
          <p className="text-star-muted mb-8 max-w-xl mx-auto">
            是时候重新定义&ldquo;准备好了&rdquo;。
            让项目履历成为你进入大学的第二份准考证。
          </p>
          <Link href="/profile"
            className="px-10 py-4 bg-star-blue text-white rounded-button font-bold hover:bg-blue-600 transition-all shadow-glow text-lg inline-block">
            开始你的项目制生存 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-star-muted/60">
        <p>© 2026 星途科技 · 高考AI导航站</p>
        <p className="mt-1">以项目制生存规划高考，不是填志愿，是设计人生。</p>
      </footer>
    </div>
  )
}
