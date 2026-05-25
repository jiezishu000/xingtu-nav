'use client'

import { Card } from '@/components/ui'

const TOOLS = [
  { icon: '🤖', name: 'DeepSeek', desc: '国产最强开源大模型，推理能力强，适合深度分析和代码生成', url: 'https://chat.deepseek.com', tags: ['推理', '代码', '免费'] },
  { icon: '🎨', name: 'Kimichat', desc: '长文本理解之王，支持200万字上下文，适合阅读论文/书籍', url: 'https://kimi.moonshot.cn', tags: ['长文本', '阅读', '免费'] },
  { icon: '📝', name: '通义千问', desc: '阿里出品，支持文档/图片/音频多模态理解', url: 'https://tongyi.aliyun.com', tags: ['多模态', '办公', '免费'] },
  { icon: '🎵', name: '豆包', desc: '字节跳动出品，支持语音对话和图像生成', url: 'https://www.doubao.com', tags: ['语音', '图像', '免费'] },
  { icon: '📊', name: '文心一言', desc: '百度出品，中文理解极强，支持联网搜索', url: 'https://yiyan.baidu.com', tags: ['搜索', '中文', '免费'] },
  { icon: '🎬', name: '剪映', desc: '抖音官方视频剪辑工具，AI辅助剪辑/文案/配音', url: 'https://jianying.com', tags: ['视频', '创作', '免费'] },
  { icon: '💻', name: 'GitHub Copilot', desc: 'AI编程助手，学生可免费申请GitHub Student Pack使用', url: 'https://github.com/features/copilot', tags: ['编程', '效率', '学生免费'] },
  { icon: '📚', name: 'Notion AI', desc: '笔记+AI写作助手，适合整理学习笔记和知识库', url: 'https://www.notion.so', tags: ['笔记', '写作', '效率'] },
  { icon: '🔬', name: 'Perplexity', desc: 'AI搜索引擎，答案带引用来源，适合做研究', url: 'https://www.perplexity.ai', tags: ['搜索', '研究', '免费'] },
  { icon: '🌐', name: 'Gamma', desc: 'AI生成PPT/文档/网页，适合做项目展示', url: 'https://gamma.app', tags: ['PPT', '展示', '免费'] },
  { icon: '🎯', name: 'Claude', desc: 'Anthropic出品，长文本理解+安全对话，适合深度讨论', url: 'https://claude.ai', tags: ['对话', '分析', '免费'] },
  { icon: '🧩', name: 'Coze', desc: '字节AI Bot搭建平台，无需编程创建自定义AI助手', url: 'https://www.coze.com', tags: ['Bot', '免代码', '免费'] },
  { icon: '📖', name: '百度文库AI', desc: 'AI辅助写作+文档生成，适合写报告和作业', url: 'https://wenku.baidu.com', tags: ['写作', '文档', '免费'] },
  { icon: '🎓', name: '可灵AI', desc: '快手出品，AI视频生成，适合创意内容制作', url: 'https://klingai.com', tags: ['视频', '创意', '免费'] },
  { icon: '⚡', name: 'Stable Diffusion', desc: '开源图像生成，可本地部署，完全免费', url: 'https://stability.ai', tags: ['图像', '开源', '免费'] },
]

const CATEGORIES = ['全部', '对话助手', '创作工具', '编程开发', '学习研究', '效率工具']

export default function NavPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-blue">✦</span> AI + 高考工具导航
        </h1>
        <p className="text-star-muted max-w-xl mx-auto">
          精选15款AI工具，覆盖对话/创作/编程/学习/效率，大部分对学生免费。
          每个工具都标注了用途和获取方式。
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool, i) => (
          <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
            className="animate-slide-up block" style={{ animationDelay: `${i * 50}ms` }}>
            <Card className="h-full hover:border-star-blue/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{tool.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold mb-1">{tool.name}</h3>
                  <p className="text-star-muted text-sm leading-relaxed">{tool.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-white/10 text-star-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
