// AI模块：Cloudflare AI Gateway → 直连DeepSeek → 降级模板
// 三层降级确保AI不可用时页面不报错

export interface AICallOptions {
  messages: { role: string; content: string }[]
  cache_ttl?: number
}

export async function aiCall(options: AICallOptions) {
  // 方案A：Cloudflare AI Gateway
  if (process.env.CF_GATEWAY_URL && process.env.CF_API_KEY) {
    try {
      const res = await fetch(`${process.env.CF_GATEWAY_URL}/deepseek`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: options.messages,
        }),
      })
      if (res.ok) return await res.json()
    } catch (e) {
      console.warn('Cloudflare AI Gateway不可用，降级到直连', e)
    }
  }

  // 方案B：直连 DeepSeek API
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: options.messages,
          max_tokens: 2000,
        }),
      })
      if (res.ok) return await res.json()
    } catch (e) {
      console.warn('DeepSeek直连不可用，使用降级模板', e)
    }
  }

  // 方案C：降级模板
  return getDefaultResponse(options.messages)
}

function getDefaultResponse(messages: { role: string; content: string }[]) {
  const lastMsg = messages[messages.length - 1]?.content || ''

  // 根据消息内容匹配不同的降级回复
  if (lastMsg.includes('画像') || lastMsg.includes('portrait')) {
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            track: '互联网>央国企>体制内',
            recommend: '建议优先选择计算机、电子信息类专业',
            risk: '中',
            fallback: true,
          })
        }
      }]
    }
  }

  if (lastMsg.includes('院校') || lastMsg.includes('college') || lastMsg.includes('冲稳保')) {
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            cushion: ['建议选择本地省会城市一本院校作为保底'],
            stable: ['考虑本省重点大学的优势专业'],
           冲刺: ['冲击985/211院校的新工科专业'],
            fallback: true,
          })
        }
      }]
    }
  }

  return {
    choices: [{
      message: {
        content: JSON.stringify({
          msg: 'AI服务暂时不可用，请稍后再试',
          fallback: true,
        })
      }
    }]
  }
}

// OpenAI Codex 项目蓝图生成（含本地缓存）
interface ProjectBlueprint {
  title: string
  description: string
  techStack: string[]
  steps: string[]
  duration: string
  skills: string[]
}

const blueprintCache = new Map<string, ProjectBlueprint>()

export async function generateBlueprint(idea: string, level: number): Promise<ProjectBlueprint> {
  const cacheKey = `${level}:${idea.slice(0, 50)}`
  if (blueprintCache.has(cacheKey)) {
    return blueprintCache.get(cacheKey)!
  }

  const result = await aiCall({
    messages: [
      {
        role: 'system',
        content: `你是一个AI项目导师。根据学生的想法和级别(L1-L5)，
生成一个可执行的项目蓝图。包含：标题、描述、技术栈、步骤、耗时、技能点。
L1=入门(无代码) L2=低代码 L3=有辅助编码 L4=独立开发 L5=复杂项目。`,
      },
      {
        role: 'user',
        content: `想法：${idea}，级别：L${level}`,
      },
    ],
  })

  try {
    const content = result.choices?.[0]?.message?.content
    if (content) {
      const parsed = JSON.parse(content) as ProjectBlueprint
      blueprintCache.set(cacheKey, parsed)
      return parsed
    }
  } catch { /* fall through to default */ }

  const fallback: ProjectBlueprint = {
    title: idea.slice(0, 30),
    description: `基于"${idea}"的项目实践`,
    techStack: ['HTML/CSS', 'JavaScript', 'Git'],
    steps: ['需求分析', '原型设计', '编码实现', '测试发布'],
    duration: '2-4周',
    skills: ['问题拆解', '信息检索', '动手实践'],
  }
  blueprintCache.set(cacheKey, fallback)
  return fallback
}
