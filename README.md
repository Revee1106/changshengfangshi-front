# changshengfangshi-front

《长生坊市》前端工程。

这是一个基于 Next.js 的现代修仙 Dashboard 前端，用于展示角色成长、修炼、心神采集、行囊、突破和日志等低频长期养成玩法界面。

## 当前版本

- 版本：`0.0.3`

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- lucide-react

## 后端接口

默认后端地址：

```text
http://localhost:3001/api/v1
```

可通过环境变量覆盖：

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
```

前端当前采用 API 优先、mock 兜底的方式：后端可用时读取后端数据，后端不可用时回退到 `src/data/mock-player.ts`，避免页面直接不可用。

## 当前已完成内容

- 基础应用壳：桌面端左侧导航、移动端顶部资源条、移动端底部 Tab 导航。
- 登录页：支持快速登录和账号密码登录，并调用后端 `/auth/login`。
- 角色创建页：调用后端 `/characters` 创建角色。
- 总览页：通过 `/overview` 读取四维与最近日志。
- 修炼页：通过 `/cultivation/actions`、`/cultivation/places` 读取配置，并通过 `/cultivation/start` 发起修炼。
- 心神页：通过 `/mind/directions`、`/gathering/places` 读取配置，并通过 `/gathering/attempt` 发起采集。
- 行囊页：通过 `/inventory/items` 读取物品，并支持调用使用、出售接口。
- 角色页：通过 `/characters/current/profile` 读取角色档案、资源、四维和成长统计。
- 突破页：通过 `/breakthrough/current` 读取突破信息，并通过 `/breakthrough/attempt` 发起突破。
- 全局状态栏：通过 `/characters/current/summary` 读取角色核心状态。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

常用检查：

```bash
npm run lint
npm run typecheck
npm run build
```

## 版本记录

### 0.0.3 - 2026-05-20

- 新增统一 API client，默认连接 `http://localhost:3001/api/v1`，支持 `NEXT_PUBLIC_API_BASE_URL` 覆盖。
- 将总览、角色、突破等服务端页面接入后端接口，并保留 mock 兜底。
- 将修炼、心神采集、行囊、登录、创建角色等客户端页面接入后端接口。
- 修炼、采集、突破、物品使用和出售按钮已调用后端结算接口。
- 新增 `.env.example`，说明前端连接后端 API 的环境变量。

### 0.0.2 - 2026-05-19

- 统一修炼场所与心神采集地点卡片样式。
- 新增左侧角色状态卡“可突破”入口。
- 新增突破页，包含突破风险、成功率、突破丹药选择、开始突破按钮和不可突破遮罩。
- 调整 mock 角色数据为满足突破条件，方便验证突破入口与突破页流程。
- 补充笔记本显示器自适应要求，避免卡片挤压、文本重叠和横向滚动。

### 0.0.1 - 2026-05-19

- 初始化《长生坊市》前端工程。
- 完成现代修仙 Dashboard 基础布局。
- 完成总览、修炼、心神、行囊、角色五个核心页面的静态 mock data UI。
- 建立基础 UI 组件和游戏展示组件。
