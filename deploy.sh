#!/bin/bash
# 星途导航站 · 部署脚本（在 VPS 上执行）
set -euo pipefail

PROJECT_DIR="/root/xingtu-nav"

echo ">>> 1. 创建项目目录"
mkdir -p "$PROJECT_DIR"

echo ">>> 2. 生成安全密钥"
JWT_SECRET=$(openssl rand -hex 32)
POSTGRES_PASSWORD=$(openssl rand -hex 16)
echo "  JWT_SECRET 已生成"
echo "  POSTGRES_PASSWORD 已生成"

echo ">>> 3. 创建 .env"
cd "$PROJECT_DIR"
cp .env.production .env 2>/dev/null || true
# 如果已有 .env 则保留，否则生成
if [ ! -f .env ]; then
  cat > .env << EOF
DATABASE_URL=postgresql://xingtu:\${POSTGRES_PASSWORD}@db:5432/xingtu
REDIS_URL=redis://redis:6379
JWT_SECRET=$JWT_SECRET
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=http://23.95.8.83:3001
LOG_LEVEL=info
LOG_PRETTY=false
DEEPSEEK_API_KEY=
KIMI_API_KEY=
CF_GATEWAY_URL=
CF_API_KEY=
EOF
  echo "  .env 已生成"
fi

echo ">>> 4. 检查 Docker"
if ! docker info >/dev/null 2>&1; then
    echo "错误: Docker 未运行"
    exit 1
fi
ss -tlnp | grep -q ":3001" && echo "  注意: 3001 端口已被占用" || echo "  3001 端口可用"

echo ">>> 5. Docker Compose 构建并启动"
cd "$PROJECT_DIR"
docker compose up -d --build

echo ">>> 6. 等待数据库就绪"
for i in $(seq 1 30); do
    if docker compose exec -T db pg_isready -U xingtu 2>/dev/null; then
        echo "  数据库就绪!"
        break
    fi
    echo "  等待数据库... $i/30"
    sleep 2
done

echo ">>> 7. 数据库迁移"
docker compose exec -T app npx prisma migrate deploy 2>&1 || echo "  迁移跳过（需手动初始化）"

echo ">>> 8. 等待应用启动"
for i in $(seq 1 20); do
    code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/healthz 2>/dev/null || echo "000")
    echo "  等待应用... $i/20 (HTTP $code)"
    if [ "$code" = "200" ]; then
        echo "  应用就绪!"
        break
    fi
    sleep 3
done

echo ""
echo "=== 最终状态 ==="
docker compose ps

echo ""
echo "=== Health Check ==="
curl -s http://localhost:3001/api/healthz 2>/dev/null || echo "  Health Check 不可用"

echo ""
echo "=== 部署完成 ==="
echo "  访问: http://23.95.8.83:3001"
echo "  SpaceX星途: http://23.95.8.83:3000"
