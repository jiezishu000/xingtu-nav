'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/', label: '首页' },
  { href: '/prompts', label: 'AI提示词' },
  { href: '/nav', label: '工具导航' },
  { href: '/profile', label: 'AI画像' },
  { href: '/colleges', label: '院校库' },
  { href: '/projects', label: '项目体系' },
  { href: '/points', label: '积分' },
  { href: '/portfolio', label: '履历' },
]

const PAY_ITEM = { href: '/pay', label: '付费' }

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-star-deeper/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <span className="text-star-gold">✦</span>
            <span className="text-white ml-1">星途导航</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-star-muted hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={PAY_ITEM.href}
            className="text-sm px-4 py-1.5 rounded-full bg-star-gold/20 text-star-gold border border-star-gold/30 hover:bg-star-gold/30 transition-colors font-medium"
          >
            {PAY_ITEM.label}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-star-deeper/95 backdrop-blur-md border-b border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-star-muted hover:text-white transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={PAY_ITEM.href}
              onClick={() => setOpen(false)}
              className="text-sm px-4 py-2 rounded-full bg-star-gold/20 text-star-gold border border-star-gold/30 hover:bg-star-gold/30 transition-colors font-medium inline-block self-start"
            >
              {PAY_ITEM.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
