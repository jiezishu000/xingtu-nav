import { NextRequest, NextResponse } from 'next/server'
import { aiCall } from '@/lib/ai'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `你是一个高考志愿填报专家，精通中国各省份录取政策和院校数据。
根据用户输入的分数、省份、选科和意向专业，输出JSON格式的志愿推荐。

输出格式必须严格遵循以下JSON结构：
{
  "assessment": "一句话评估考生情况，包含分数段分析和机会点",
  "cushion": [
    { "school": "保底院校名称", "major": "推荐专业", "reason": "推荐理由", "probability": "80%+" }
  ],
  "stable": [
    { "school": "稳妥院校名称", "major": "推荐专业", "reason": "推荐理由", "probability": "50-80%" }
  ],
  "rush": [
    { "school": "冲刺院校名称", "major": "推荐专业", "reason": "推荐理由", "probability": "30-50%" }
  ],
  "tips": ["填报建议1", "填报建议2", "填报建议3"]
}

要求：
1. 保底至少2所，稳妥至少2所，冲刺至少2所
2. probability用中文如"85%"、"65%"、"40%"
3. reason要具体
4. 推荐的院校要符合用户的分数段和省份
5. tips给出3-5条针对性建议
6. 如果用户没提供选科，默认理科生`

function getFallbackRecommendation(score: number, province: string, majorPref?: string) {
  // 根据分数段生成有意义的示例推荐
  // 当 DeepSeek API 不可用时使用
  const scoreLevel = score >= 600 ? 'high' : score >= 500 ? 'mid' : 'low'
  const major = majorPref || '计算机类'

  const recommendations: Record<string, any> = {
    high: {
      assessment: `你的${score}分在${province}属于高分段考生，有较大机会冲击985/211院校。建议优先考虑城市和学校层次，专业选择可以兼顾兴趣和就业前景。`,
      cushion: [
        { school: '省内重点一本大学', major, reason: '录取概率高，可作为稳妥的最后一档', probability: '90%' },
        { school: '省外211大学（地理位置较远）', major, reason: '因地理位置因素分数线相对较低，性价比高', probability: '85%' },
      ],
      stable: [
        { school: '中流985大学', major, reason: '你的分数在往年录取线中段，把握较大', probability: '65%' },
        { school: '行业特色强校（如北邮、华电）', major, reason: '虽然不是985但专业实力强劲，就业质量高', probability: '70%' },
      ],
      rush: [
        { school: '顶尖985大学', major, reason: '可以尝试冲击，往年有降分录取的先例', probability: '35%' },
        { school: '热门城市985大学', major, reason: '城市好但竞争激烈，值得一冲', probability: '30%' },
      ],
      tips: [
        '高分段建议优先选城市（北上广深）和学校层次，专业可进校后再转',
        '注意各校对加分政策的认可差异，部分985只认裸分',
        '建议填报时留足分差，避免滑档到下一批次',
        '可以关注高校的强基计划和综合评价招生渠道',
      ],
    },
    mid: {
      assessment: `你的${score}分在${province}属于中等偏上分数段，选择空间较大。建议采取"冲稳保"结合的策略，重点关注性价比高的学校和专业。`,
      cushion: [
        { school: '省内一本大学', major, reason: '省内招生名额多，录取概率高', probability: '90%' },
        { school: '省外普通一本', major, reason: '可作为保底选择，地理位置可接受', probability: '85%' },
      ],
      stable: [
        { school: '省属重点大学', major, reason: '往年录取位次与你匹配度较高', probability: '65%' },
        { school: '行业特色院校', major, reason: '虽然不是211，但该专业行业认可度高', probability: '70%' },
      ],
      rush: [
        { school: '211工程大学（非热门地区）', major, reason: '偏远地区211分数线可能适中，值得冲击', probability: '40%' },
        { school: '热门一本院校', major, reason: '可以尝试冲击其冷门专业', probability: '35%' },
      ],
      tips: [
        '中等分数段建议优先考虑专业而非学校排名',
        '可以关注"新一线城市"的高校，性价比高于北上广',
        '注意查看院校的"专业级差"政策，避免专业调剂到不喜欢的专业',
        '建议至少填报3-5个保底志愿，确保不滑档',
      ],
    },
    low: {
      assessment: `你的${score}分在${province}属于中等分数段。建议以专业和就业为导向来选择院校，可以考虑专升本路径或职业技能型院校。`,
      cushion: [
        { school: '本二批公办院校', major, reason: '录取概率高，学费适中', probability: '90%' },
        { school: '本二批中外合作院校', major, reason: '录取门槛相对较低', probability: '85%' },
      ],
      stable: [
        { school: '应用型本科院校', major, reason: '注重实践教学，就业导向明确', probability: '65%' },
        { school: '职业本科院校', major, reason: '近年来就业率持续走高', probability: '70%' },
      ],
      rush: [
        { school: '热门城市本二院校', major, reason: '可以尝试热门城市，实习机会多', probability: '40%' },
        { school: '有特色专业的本一院校', major, reason: '尝试在一本院校中寻找冷门但就业好的专业', probability: '30%' },
      ],
      tips: [
        '建议优先考虑就业率高的专业，而不是学校名气',
        '新一线城市的二本院校也是不错的选择，实习机会多',
        '可以考虑"专升本"路径：先读专科再升本，同样能拿到本科文凭',
        '关注职业技能型院校，就业导向明确',
      ],
    },
  }

  return recommendations[scoreLevel]
}

export async function POST(req: NextRequest) {
  let score = 500
  let province = '广东'
  let subjects: string | undefined
  let majorPreference: string | undefined

  try {
    const body = await req.json()
    score = body.score || 500
    province = body.province || '广东'
    subjects = body.subjects || undefined
    majorPreference = body.majorPreference || undefined
  } catch {
    return NextResponse.json(
      { error: '请求数据格式错误' },
      { status: 400 }
    )
  }

  if (!score || !province) {
    return NextResponse.json(
      { error: '请提供高考分数和省份' },
      { status: 400 }
    )
  }

  try {
    const userInput = [
      `分数：${score}分`,
      `省份：${province}`,
      subjects ? `选科：${subjects}` : '',
      majorPreference ? `意向专业：${majorPreference}` : '',
    ].filter(Boolean).join('\n')

    const result = await aiCall({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userInput },
      ],
    })

    const content = result.choices?.[0]?.message?.content
    if (content) {
      const parsed = JSON.parse(content)
      if (parsed.fallback) {
        // DeepSeek not available — use hardcoded fallback
        return NextResponse.json({
          choices: [{
            message: {
              content: JSON.stringify(getFallbackRecommendation(score, province, majorPreference)),
            },
          }],
          _note: '使用预设推荐，配置DeepSeek API Key后自动升级为AI生成',
        })
      }
    }

    return NextResponse.json(result)
  } catch {
    // Final fallback on any error
    return NextResponse.json({
      choices: [{
        message: {
          content: JSON.stringify(getFallbackRecommendation(score, province, majorPreference)),
        },
      }],
      _note: 'AI服务异常，使用预设推荐',
    })
  }
}
