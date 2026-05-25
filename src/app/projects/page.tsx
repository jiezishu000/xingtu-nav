'use client'

import { Card } from '@/components/ui'
import Link from 'next/link'

const LEVELS = [
  {
    level: 'L1', name: '认知觉醒', icon: '🌱', color: 'from-green-500/20 to-green-500/5',
    desc: '了解AI时代的机会与挑战，建立项目制生存思维',
    projects: [
      { title: 'AI工具体验报告', desc: '使用3款以上AI工具，写一篇使用体验对比', tools: ['DeepSeek', '通义千问'], duration: '3天', difficulty: '1/5' },
      { title: 'AI时代生存清单', desc: '调研AI对各行业的影响，制作一份个人生存清单', tools: ['Perplexity', 'Notion AI'], duration: '5天', difficulty: '1/5' },
    ],
    skills: ['信息检索', '工具使用', '批判性思维'],
  },
  {
    level: 'L2', name: '工具驾驭', icon: '🔧', color: 'from-blue-500/20 to-blue-500/5',
    desc: '掌握主流AI工具，用AI完成创意作品',
    projects: [
      { title: 'AI创意作品集', desc: '用AI工具创作一组表情包/海报/短视频', tools: ['Stable Diffusion', '剪映'], duration: '1周', difficulty: '2/5' },
      { title: 'AI辅助研究报告', desc: '选择感兴趣的话题，用AI完成深度研究报告', tools: ['Kimichat', 'Perplexity'], duration: '1周', difficulty: '2/5' },
    ],
    skills: ['AI工具链', '创意表达', '信息整合'],
  },
  {
    level: 'L3', name: '项目实战', icon: '⚡', color: 'from-yellow-500/20 to-yellow-500/5',
    desc: '独立完成一个小型项目，获得可展示的作品',
    projects: [
      { title: '个人网站/博客', desc: '搭建个人网站展示作品和想法', tools: ['GitHub Pages', 'Vercel'], duration: '2周', difficulty: '3/5' },
      { title: 'AI辅助应用原型', desc: '用低代码/AI工具开发一个简单应用', tools: ['Coze', 'Dify'], duration: '2周', difficulty: '3/5' },
    ],
    skills: ['项目管理', '基础编码', '产品思维'],
  },
  {
    level: 'L4', name: '能力构建', icon: '🔥', color: 'from-orange-500/20 to-orange-500/5',
    desc: '深入技术栈，构建可部署的完整项目',
    projects: [
      { title: '全栈Web应用', desc: '从0到1完成一个全栈应用并部署上线', tools: ['Next.js', 'GitHub Copilot'], duration: '1月', difficulty: '4/5' },
      { title: '数据分析可视化', desc: '用Python进行数据分析并制作可视化报告', tools: ['Python', 'Streamlit'], duration: '3周', difficulty: '4/5' },
    ],
    skills: ['全栈开发', '数据分析', '系统设计'],
  },
  {
    level: 'L5', name: '创新突破', icon: '🌟', color: 'from-purple-500/20 to-purple-500/5',
    desc: '定义问题并创造解决方案，打造差异化竞争力',
    projects: [
      { title: '开源项目贡献', desc: '参与或发起一个开源项目', tools: ['Git', 'GitHub'], duration: '持续', difficulty: '5/5' },
      { title: 'AI应用创新', desc: '结合AI能力解决真实世界问题', tools: ['OpenAI API', 'Cloudflare'], duration: '2月', difficulty: '5/5' },
    ],
    skills: ['技术创新', '社区协作', '产品定义'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-gold">✦</span> L1 → L5 项目体系
        </h1>
        <p className="text-star-muted max-w-xl mx-auto">
          从零开始，一步步构建你的 AI 时代项目履历。每个级别都有明确的目标、
          实战项目和技能点，完成后获得对应积分奖励。
        </p>
      </div>

      <div className="space-y-8">
        {LEVELS.map((level, li) => (
          <div key={level.level} className="animate-slide-up" style={{ animationDelay: `${li * 100}ms` }}>
            <Card>
              <div className={`p-4 rounded-card mb-4 bg-gradient-to-r ${level.color}`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{level.icon}</span>
                  <div>
                    <div className="text-sm text-star-gold font-bold">{level.level}</div>
                    <h2 className="text-xl font-bold">{level.name}</h2>
                  </div>
                </div>
                <p className="text-star-muted text-sm mt-3">{level.desc}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {level.projects.map((p) => (
                  <div key={p.title} className="bg-white/5 rounded-card p-4">
                    <h3 className="font-bold text-sm mb-2">{p.title}</h3>
                    <p className="text-star-muted text-xs leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-star-muted">
                      <span className="px-2 py-0.5 bg-white/5 rounded">🛠 {p.tools.join(', ')}</span>
                      <span className="px-2 py-0.5 bg-white/5 rounded">⏱ {p.duration}</span>
                      <span className="px-2 py-0.5 bg-white/5 rounded">难度 {p.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {level.skills.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-star-accent/20 text-star-accent">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/profile"
          className="inline-block px-8 py-4 bg-star-gold text-black rounded-button font-bold hover:bg-yellow-500 transition-all">
          先做AI画像，找到最适合你的项目 →
        </Link>
      </div>
    </div>
  )
}
