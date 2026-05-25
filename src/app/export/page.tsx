'use client'

import { Card, Button } from '@/components/ui'

export default function ExportPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold mb-4">📤 志愿方案导出</h1>
        <p className="text-star-muted mb-10">
          完成AI画像诊断后，可导出完整的志愿方案报告。
          支持PDF/图片格式，方便与家人讨论。
        </p>

        <Card className="mb-8">
          <div className="text-star-muted py-10">
            <div className="text-5xl mb-4">📄</div>
            <p>请先完成 AI 画像诊断</p>
          </div>
        </Card>

        <Button variant="primary" className="max-w-xs mx-auto" disabled>
          导出报告（需先完成画像）
        </Button>

        <div className="mt-6">
          <a href="/profile" className="text-star-blue text-sm hover:underline">
            去做AI画像 →
          </a>
        </div>
      </div>
    </div>
  )
}
