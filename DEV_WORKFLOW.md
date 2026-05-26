# 星途导航 · 开发工作流

## 分支策略

```
master         生产分支，自动部署到 VPS
  └─ dev       开发集成分支
       ├─ feature/<name>   新功能
       └─ fix/<name>       修复
```

| 分支 | 用途 | 部署 |
|------|------|------|
| `master` | 生产就绪代码 | Docker → VPS (23.95.8.83:3001) |
| `dev` | 开发集成 | 本地 `npm run dev` |
| `feature/*` | 单个功能开发 | 本地 |
| `fix/*` | 紧急修复 | 本地 |

## 开发流程

### 1. 开始新功能

```bash
git checkout dev          # 切到 dev
git pull origin dev       # 同步最新
git checkout -b feature/<name>  # 建功能分支
# ... 写代码 ...
```

### 2. 提交

```bash
git add <files>
git commit -m "类型: 描述"
```

提交类型:
- `feat:` 新功能
- `fix:` 修 bug
- `refactor:` 重构
- `style:` UI/样式
- `docs:` 文档

### 3. 合并到 dev

```bash
git checkout dev
git merge feature/<name>
# 本地测试: npm run dev → 浏览器打开 http://localhost:3000
```

### 4. 发布到 master + 部署

```bash
git checkout master
git merge dev
git push origin master

# 在 VPS 部署:
ssh root@23.95.8.83 "cd /root/xingtu-nav && git pull origin master && docker compose up -d --build app"
```

## 国内网络操作

### npm install

```bash
npm install --registry=https://registry.npmmirror.com
```

### Git push (GitHub 被墙)

如果 `git push` 连不上：
```bash
# 方案1: 走代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
git push
# 完成后取消:
git config --global --unset http.proxy
git config --global --unset https.proxy

# 方案2: 存本地等网络好再推
git push  # 重试即可，commit 一直在本地
```

## VPS 部署

```bash
# SSH 登录
ssh root@23.95.8.83

# 拉最新代码 + 重建
cd /root/xingtu-nav
git pull origin master
docker compose up -d --build app

# 检查状态
docker compose ps
curl http://localhost:3001/healthz
```

### 首次部署 (已做)

VPS 上已有完整部署：
1. `git clone` 到 `/root/xingtu-nav/`
2. `.env` 文件包含所有密钥（不在 git 中）
3. Docker Compose 管理 3 个容器（app/db/redis）

### 健康检查

```bash
curl http://localhost:3001/healthz    # 预期: 200 OK
curl http://localhost:3001/           # 预期: HTML 首页
```

## 文件跟踪策略

| 文件 | 是否跟踪 | 理由 |
|------|---------|------|
| `Dockerfile` | ✅ | 构建定义必须版本化 |
| `docker-compose.yml` | ✅ | 部署配置必须版本化 |
| `deploy.sh` | ✅ | 部署脚本必须版本化 |
| `.env` | ❌ gitignored | 含 API Key 等密钥 |
| `.next/` | ❌ gitignored | 构建缓存，可重新生成 |
| `node_modules/` | ❌ gitignored | 依赖包 |
