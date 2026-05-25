'use client'

import { ReactNode } from 'react'

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'danger' | 'success' | 'gold'
  disabled?: boolean
  className?: string
}) {
  const base = 'w-full h-14 rounded-button flex items-center justify-center font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  const variants = {
    primary: 'bg-star-blue text-white hover:bg-blue-600 shadow-glow',
    ghost: 'bg-transparent border border-white/20 text-white hover:bg-white/5',
    danger: 'bg-transparent border border-star-danger/50 text-star-danger hover:bg-star-danger/10',
    success: 'bg-star-success text-white hover:bg-green-600',
    gold: 'bg-star-gold text-black hover:bg-yellow-500 shadow-gold-glow',
  }

  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Card({
  children,
  className = '',
  highlight = false,
}: {
  children: ReactNode
  className?: string
  highlight?: boolean
}) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-card p-6 transition-all duration-300 ${
      highlight ? 'border border-star-blue/30 shadow-glow' : 'border border-white/10 hover:border-white/20'
    } ${className}`}>
      {children}
    </div>
  )
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  center = false,
  maxLength,
}: {
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  className?: string
  center?: boolean
  maxLength?: number
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className={`w-full h-14 bg-white/5 border border-white/20 rounded-button px-4 text-white placeholder-star-muted outline-none transition-all duration-300 focus:border-star-blue focus:bg-white/10 focus:shadow-glow ${center ? 'text-center' : ''} ${className}`}
    />
  )
}

export function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
            i + 1 <= current ? 'bg-star-blue text-white' : 'bg-white/10 text-star-muted'
          }`}>
            {i + 1}
          </div>
          {i < total - 1 && (
            <div className="w-6 h-0.5 mx-1 bg-white/10">
              <div className={`h-full bg-star-blue transition-all duration-500 ${i + 1 < current ? 'w-full' : 'w-0'}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function Badge({ label, color = 'blue' }: { label: string; color?: 'blue' | 'gold' | 'green' | 'red' }) {
  const colors = { blue: 'bg-star-blue/20 text-star-blue', gold: 'bg-star-gold/20 text-star-gold', green: 'bg-star-success/20 text-star-success', red: 'bg-star-danger/20 text-star-danger' }
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>{label}</span>
}

export function ProgressBar({ value, max = 100, color = 'blue' }: { value: number; max?: number; color?: 'blue' | 'red' | 'green' | 'gold' }) {
  const pct = Math.min(100, (value / max) * 100)
  const colors = { blue: 'bg-star-blue', red: 'bg-star-danger', green: 'bg-star-success', gold: 'bg-star-gold' }
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div className={`h-full ${colors[color]} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
    </div>
  )
}
