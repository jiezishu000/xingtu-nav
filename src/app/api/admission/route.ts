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
1. 保底(cushion)至少2所，稳妥(stable)至少2所，冲刺(rush)至少2所
2. probability用中文如"85%"、"65%"、"40%"
3. reason要具体，比如"该校计算机专业为国家级特色专业，就业率95%+"
4. 推荐的院校要符合用户的分数段和省份
5. tips给出3-5条针对性建议
6. 如果用户没提供选科，默认理科生
7. 如果用户没提供意向专业，默认推荐该校优势专业`

export async function POST(req: NextRequest) {
  try {
    const { score, province, subjects, majorPreference } = await req.json()

    if (!score || !province) {
      return NextResponse.json(
        { error: '请提供高考分数和省份', fallback: true },
        { status: 400 }
      )
    }

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

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'AI志愿填报服务暂时不可用，请稍后再试', fallback: true },
      { status: 500 }
    )
  }
}
