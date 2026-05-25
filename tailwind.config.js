/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'star-blue': '#1a73e8',
        'star-gold': '#e8b31a',
        'star-dark': '#0d1d31',
        'star-deeper': '#0c0d13',
        'star-text': '#ffffff',
        'star-muted': 'rgba(255,255,255,0.6)',
        'star-accent': '#6366f1',
        'star-success': '#22c55e',
        'star-warning': '#eab308',
        'star-danger': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'float': '0 8px 32px rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(99,102,241,0.3)',
        'gold-glow': '0 0 20px rgba(232,179,26,0.3)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
