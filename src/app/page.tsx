'use client'

import Link from 'next/link'
import { Card } from '@/components/ui'

const HERO_FEATURES = [
  {
    icon: '🎯',
    title: 'AI 画像诊断',
    desc: '18道题定位你的赛道。城市>学校>专业，张雪峰方法论 x AI 时代生存指南。',
    href: '/profile',
    color: 'from-star-blue to-blue-600',
  },
  {
    icon: '🚀',
    title: '项目制生存',
    desc: '不是填志愿，是设计人生。L1-L5 渐进项目体系，让你进大学前就有作品集。',
    href: '/projects',
    color: 'from-star-gold to-yellow-600',
  },
  {
    icon: '🧠',
    title: '11个AI提示词',
    desc: '从冲稳保清单到项目履历反推专业。3个免费引流，8个付费深度诊断。',
    href: '/prompts',
    color: 'from-star-accent to-purple-600',
  },
]

const METHODOLOGY_CARDS = [
  {
    title: '城市 > 学校 > 专业',
    desc: '"对于大多数普通家庭的孩子来说，选城市比选学校重要，选学校比选专业重要。"',
    author: '张雪峰',
  },
  {
    title: '四类专业定位',
    desc: '军工国防型 / 央国企型 / 互联网型 / 体制内型。不同赛道，不同的志愿策略。',
    author: '张雪峰方法论',
  },
  {
    title: '家庭类型策略',
    desc: '腰干家庭要毕业快速赚钱，小康家庭可以支持兴趣，富裕家庭有家族资源。',
    author: '张雪峰方法论',
  },
  {
    title: '冲稳保三梯度',
    desc: '冲（30-50%概率）、稳（50-80%）、保（80%+）。三种可能，三种人生路径。',
    author: '张雪峰方法论',
  },
]

const LEVELS = [
  { level: 'L1', name: '认知觉醒', desc: '了解AI时代的机会与挑战', projects: '用AI工具完成一次调研', icon: '🌱' },
  { level: 'L2', name: '工具驾驭', desc: '掌握主流AI工具的使用', projects: '用AI完成一个创意作品', icon: '🔧' },
  { level: 'L3', name: '项目实战', desc: '独立完成一个小型项目', projects: '开发一个AI辅助应用', icon: '⚡' },
  { level: 'L4', name: '能力构建', desc: '深入技术栈构建专业能力', projects: '完成复杂项目并部署上线', icon: '🔥' },
  { level: 'L5', name: '创新突破', desc: '定义问题并创造解决方案', projects: '开源项目/创业产品', icon: '🌟' },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="py-20 text-center">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/profile"
              className="px-8 py-4 bg-star-blue text-white rounded-button font-semibold hover:bg-blue-600 transition-all shadow-glow text-lg text-center">
              开始 AI 画像
            </Link>
            <Link href="/prompts"
              className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-button font-semibold hover:bg-white/5 transition-all text-lg text-center">
              免费提示词
            </Link>
          </div>
        </div>
      </section>

      {/* 三大核心入口 */}
      <section className="grid md:grid-cols-3 gap-6 mb-20">
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

      {/* 张雪峰方法论 */}
      <section className="mb-20">
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

      {/* L1-L5 项目体系 */}
      <section className="mb-20">
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

      {/* 积分体系 */}
      <section className="mb-20 text-center">
        <Card className="max-w-2xl mx-auto animate-slide-up">
          <h2 className="text-2xl font-bold mb-4">
            ✦ 积分体系
          </h2>
          <p className="text-star-muted mb-6">
            签到得100万积分，解锁提示词、AI蓝图、项目模板。
            <br />
            积累到1亿成为「星座筑梦师」，100亿成为「星云创造主」。
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-star-gold text-xl font-bold">100万</div>
              <div className="text-xs text-star-muted">每日签到</div>
            </div>
            <div>
              <div className="text-star-gold text-xl font-bold">1000万</div>
              <div className="text-xs text-star-muted">AI项目蓝图</div>
            </div>
            <div>
              <div className="text-star-gold text-xl font-bold">100亿</div>
              <div className="text-xs text-star-muted">星云创造主</div>
            </div>
          </div>
          <Link href="/points"
            className="inline-block px-6 py-3 bg-star-gold text-black rounded-button font-semibold hover:bg-yellow-500 transition-all">
            了解积分 →
          </Link>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <div className="animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            高考不是终点，AI不是威胁
          </h2>
          <p className="text-star-muted mb-8 max-w-xl mx-auto">
            是时候重新定义"准备好了"。
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
