import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StarField } from '@/components/star-field'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: '星途导航 · 高考AI导航站',
  description: '以项目制生存规划高考，不是填志愿，是设计人生。张雪峰方法论 × AI 时代生存指南。',
  keywords: ['高考', 'AI', '志愿填报', '张雪峰', '项目制学习', '新高考'],
  authors: [{ name: '星途科技' }],
  openGraph: {
    title: '星途导航 · 高考AI导航站',
    description: '以项目制生存规划高考，不是填志愿，是设计人生。',
    type: 'website',
    url: 'https://xingtu-nav.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: '星途导航',
    description: '以项目制生存规划高考',
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0c0d13',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <StarField />
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
