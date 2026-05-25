# 星途导航站 (xingtu-nav)

高考 AI 导航站 — 青少年项目制生存操作系统

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Docker

## 开发

```bash
npm install
npx prisma generate
npm run dev
```

## 部署

```bash
docker compose up -d --build
```

端口: 3001

## 功能

- AI 画像报告
- 项目制生存诊断
- 高校信息导航
- 积分商城
- 付费系统 (微信支付)
