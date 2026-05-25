'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, Button } from '@/components/ui'
import { getPromptById } from '@/lib/prompts-data'

export default function PromptDetailPage() {
  const params = useParams()
  const prompt = getPromptById(params.id as string)

  if (!prompt) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">提示词未找到</h1>
        <Link href="/prompts" className="text-star-blue hover:underline">返回提示词列表</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/prompts" className="text-sm text-star-muted hover:text-white transition-colors mb-6 inline-block">
        ← 返回提示词列表
      </Link>

      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-2 py-1 rounded bg-white/10 text-star-muted">{prompt.category}</span>
          {prompt.isFree ? (
            <span className="text-xs px-2 py-1 rounded bg-star-success/20 text-star-success">免费</span>
          ) : (
            <span className="text-xs px-2 py-1 rounded bg-star-gold/20 text-star-gold">
              {parseInt(prompt.pointsRequired) >= 1000000
                ? `${parseInt(prompt.pointsRequired) / 10000}万积分`
                : `${prompt.pointsRequired}积分`}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">{prompt.name}</h1>
        <p className="text-star-muted mb-8">{prompt.description}</p>

        {prompt.methodology && (
          <div className="text-xs text-star-muted/60 mb-6">
            方法论：{prompt.methodology}
          </div>
        )}

        <Card className="mb-8">
          <h2 className="font-bold mb-4 text-star-gold">提示词内容</h2>
          <pre className="text-sm text-star-muted whitespace-pre-wrap font-sans leading-relaxed">
            {prompt.content}
          </pre>
        </Card>

        <div className="flex gap-4">
          <Button variant="primary" className="flex-1 max-w-xs"
            onClick={() => navigator.clipboard.writeText(prompt.content)}>
            复制提示词
          </Button>
          {!prompt.isFree && (
            <Button variant="gold" className="flex-1 max-w-xs">
              解锁（{parseInt(prompt.pointsRequired) >= 1000000
                ? `${parseInt(prompt.pointsRequired) / 10000}万`
                : prompt.pointsRequired}积分）
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
