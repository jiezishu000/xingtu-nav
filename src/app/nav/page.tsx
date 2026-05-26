'use client'

import { useState } from 'react'
import { Card } from '@/components/ui'

// ── 34省教育考试院 ──
const PROVINCES = [
  { name: '北京', url: 'https://www.bjeea.cn', label: '北京教育考试院' },
  { name: '天津', url: 'https://www.zhaokao.net', label: '天津市教育招生考试院' },
  { name: '上海', url: 'https://www.shmeea.edu.cn', label: '上海市教育考试院' },
  { name: '重庆', url: 'https://www.cqksy.cn', label: '重庆市教育考试院' },
  { name: '河北', url: 'https://www.hebeea.edu.cn', label: '河北省教育考试院' },
  { name: '山西', url: 'http://www.sxkszx.cn', label: '山西省招生考试管理中心' },
  { name: '辽宁', url: 'https://www.lnzsks.com', label: '辽宁省招生考试办公室' },
  { name: '吉林', url: 'http://www.jleea.com.cn', label: '吉林省教育考试院' },
  { name: '黑龙江', url: 'https://www.lzk.hl.cn', label: '黑龙江省招生考试信息港' },
  { name: '江苏', url: 'https://www.jseea.cn', label: '江苏省教育考试院' },
  { name: '浙江', url: 'https://www.zjzs.net', label: '浙江省教育考试院' },
  { name: '安徽', url: 'https://www.ahzsks.cn', label: '安徽省教育招生考试院' },
  { name: '福建', url: 'https://www.eeafj.cn', label: '福建省教育考试院' },
  { name: '江西', url: 'http://www.jxeea.cn', label: '江西省教育考试院' },
  { name: '山东', url: 'https://www.sdzk.cn', label: '山东省教育招生考试院' },
  { name: '河南', url: 'https://www.haeea.cn', label: '河南省教育考试院' },
  { name: '湖北', url: 'http://www.hbea.edu.cn', label: '湖北省教育考试院' },
  { name: '湖南', url: 'https://www.hneeb.cn', label: '湖南省教育考试院' },
  { name: '广东', url: 'https://eea.gd.gov.cn', label: '广东省教育考试院' },
  { name: '广西', url: 'https://www.gxeea.cn', label: '广西招生考试院' },
  { name: '海南', url: 'http://ea.hainan.gov.cn', label: '海南省考试局' },
  { name: '四川', url: 'https://www.sceea.cn', label: '四川省教育考试院' },
  { name: '贵州', url: 'http://zsksy.guizhou.gov.cn', label: '贵州省招生考试院' },
  { name: '云南', url: 'https://www.ynzs.cn', label: '云南省招生考试院' },
  { name: '西藏', url: 'http://zsks.edu.xizang.gov.cn', label: '西藏自治区教育考试院' },
  { name: '陕西', url: 'https://www.sneea.cn', label: '陕西省教育考试院' },
  { name: '甘肃', url: 'https://www.ganseea.cn', label: '甘肃省教育考试院' },
  { name: '青海', url: 'http://www.qhjyks.com', label: '青海省教育考试网' },
  { name: '宁夏', url: 'https://www.nxjyks.cn', label: '宁夏教育考试院' },
  { name: '新疆', url: 'http://www.xjzk.gov.cn', label: '新疆招生网' },
  { name: '内蒙古', url: 'https://www.nm.zsks.cn', label: '内蒙古招生考试信息网' },
]

const GAOKAO_PORTALS = [
  { icon: '📚', name: '阳光高考', desc: '教育部官方高考信息平台，含招生计划、院校库、专业库', url: 'https://gaokao.chsi.com.cn' },
  { icon: '🎯', name: '掌上高考', desc: '中国教育在线旗下，AI志愿填报+分数线+招生简章', url: 'https://www.gaokao.cn' },
  { icon: '⭐', name: '夸克高考', desc: '夸克AI志愿填报，录取概率测算', url: 'https://gaokao.quark.cn' },
  { icon: '📊', name: '中国教育在线', desc: '20年权威数据，历年分数线+院校对比', url: 'https://gaokao.eol.cn' },
  { icon: '🔍', name: '学信网', desc: '教育部学历查询平台，学籍/成绩/学历认证', url: 'https://www.chsi.com.cn' },
  { icon: '📋', name: '教育部官网', desc: '最新高考政策、招生规定、考试时间', url: 'https://www.moe.gov.cn' },
  { icon: '✍️', name: '志愿填报模拟', desc: '优志愿，专业志愿填报推荐系统', url: 'https://www.youzy.cn' },
  { icon: '📱', name: '百度AI志愿助手', desc: '百度搜索AI志愿推荐，智能选校', url: 'https://gaokao.baidu.com' },
]

const AI_TOOLS = [
  { icon: '🤖', name: 'DeepSeek', desc: '国产最强开源大模型，推理能力强，适合深度分析和代码生成', url: 'https://chat.deepseek.com', tags: ['推理', '代码', '免费'] },
  { icon: '🎨', name: 'Kimichat', desc: '长文本理解之王，支持200万字上下文，适合阅读论文/书籍', url: 'https://kimi.moonshot.cn', tags: ['长文本', '阅读', '免费'] },
  { icon: '📝', name: '通义千问', desc: '阿里出品，支持文档/图片/音频多模态理解', url: 'https://tongyi.aliyun.com', tags: ['多模态', '办公', '免费'] },
  { icon: '🎵', name: '豆包', desc: '字节跳动出品，支持语音对话和图像生成', url: 'https://www.doubao.com', tags: ['语音', '图像', '免费'] },
  { icon: '📊', name: '文心一言', desc: '百度出品，中文理解极强，支持联网搜索', url: 'https://yiyan.baidu.com', tags: ['搜索', '中文', '免费'] },
  { icon: '💻', name: 'GitHub Copilot', desc: 'AI编程助手，学生可免费申请GitHub Student Pack使用', url: 'https://github.com/features/copilot', tags: ['编程', '效率', '学生免费'] },
  { icon: '📚', name: 'Notion AI', desc: '笔记+AI写作助手，适合整理学习笔记和知识库', url: 'https://www.notion.so', tags: ['笔记', '写作', '效率'] },
  { icon: '🔬', name: 'Perplexity', desc: 'AI搜索引擎，答案带引用来源，适合做研究', url: 'https://www.perplexity.ai', tags: ['搜索', '研究', '免费'] },
  { icon: '🌐', name: 'Gamma', desc: 'AI生成PPT/文档/网页，适合做项目展示', url: 'https://gamma.app', tags: ['PPT', '展示', '免费'] },
  { icon: '🎯', name: 'Claude', desc: 'Anthropic出品，长文本理解+安全对话，适合深度讨论', url: 'https://claude.ai', tags: ['对话', '分析', '免费'] },
  { icon: '🧩', name: 'Coze', desc: '字节AI Bot搭建平台，无需编程创建自定义AI助手', url: 'https://www.coze.com', tags: ['Bot', '免代码', '免费'] },
  { icon: '🎬', name: '剪映', desc: '抖音官方视频剪辑工具，AI辅助剪辑/文案/配音', url: 'https://jianying.com', tags: ['视频', '创作', '免费'] },
  { icon: '📖', name: '百度文库AI', desc: 'AI辅助写作+文档生成，适合写报告和作业', url: 'https://wenku.baidu.com', tags: ['写作', '文档', '免费'] },
  { icon: '🎓', name: '可灵AI', desc: '快手出品，AI视频生成，适合创意内容制作', url: 'https://klingai.com', tags: ['视频', '创意', '免费'] },
  { icon: '⚡', name: 'Stable Diffusion', desc: '开源图像生成，可本地部署，完全免费', url: 'https://stability.ai', tags: ['图像', '开源', '免费'] },
]

export default function NavPage() {
  const [searchProvince, setSearchProvince] = useState('')

  const filteredProvinces = PROVINCES.filter((p) =>
    !searchProvince || p.name.includes(searchProvince) || p.label.includes(searchProvince)
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* header */}
      <div className="text-center animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-star-blue">✦</span> 高考资源导航
        </h1>
        <p className="text-star-muted max-w-xl mx-auto">
          从各省考试院到AI工具，一个入口找到所有高考需要的东西
        </p>
      </div>

      {/* ── 各省教育考试院 ── */}
      <section className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-star-gold">📋</span> 各省教育考试院
          </h2>
          <span className="text-xs text-star-muted bg-white/5 px-3 py-1 rounded-full">
            {PROVINCES.length} 个省级行政区
          </span>
        </div>
        <div className="mb-4">
          <input
            placeholder="搜索省份..."
            value={searchProvince}
            onChange={(e) => setSearchProvince(e.target.value)}
            className="w-full h-12 bg-white/5 border border-white/20 rounded-button px-4 text-white placeholder-star-muted outline-none focus:border-star-blue"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filteredProvinces.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-star-blue/30 transition-all text-center group">
              <div className="font-bold text-sm group-hover:text-star-gold transition-colors">{p.name}</div>
              <div className="text-[10px] text-star-muted truncate mt-0.5">{p.label}</div>
            </a>
          ))}
        </div>
        {filteredProvinces.length === 0 && (
          <div className="text-center py-8 text-star-muted">没有匹配的省份</div>
        )}
      </section>

      {/* ── 高考官方入口 ── */}
      <section className="animate-slide-up">
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-star-blue">🎯</span> 高考官方平台
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAOKAO_PORTALS.map((p, i) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className="animate-slide-up block" style={{ animationDelay: `${i * 50}ms` }}>
              <Card className="h-full hover:border-star-blue/30 transition-all">
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className="font-bold mb-1 text-sm">{p.name}</h3>
                <p className="text-star-muted text-xs leading-relaxed">{p.desc}</p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* ── AI 工具 ── */}
      <section className="animate-slide-up">
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-star-accent">🤖</span> AI 工具集
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool, i) => (
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
      </section>
    </div>
  )
}
