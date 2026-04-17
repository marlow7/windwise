# 风电场智慧运维平台

面向风电场场景的一站式可视化运维管理平台，以数据驱动运维，以智慧赋能管理。

![MIT](https://img.shields.io/badge/License-MIT-green) ![Vue3](https://img.shields.io/badge/Vue-3.x-blue) ![TS](https://img.shields.io/badge/TypeScript-5.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-purple)

---

## 📖 项目简介

WindWise 是一款针对风电场设计的智慧运维可视化系统，旨在解决传统风电场运维中数据分散、监控不直观、运维效率低等问题。平台集成**实时数据监测、风机状态管控、故障预警分析、发电量统计、运维流程管理**等核心功能，通过可视化大屏实现风电场全域数据的集中展示与智能分析，为风电场的安全运行、高效管理与科学决策提供技术支撑。

------

## ✨ 核心功能模块

| 模块         | 功能描述                                                 |
| ------------ | -------------------------------------------------------- |
| **首页大屏** | 风电场整体运行数据概览，关键指标可视化展示，实时状态监控 |
| **风机概览** | 单台风机基础信息、运行状态、历史数据统计与趋势分析       |
| **风机监测** | 风机实时运行数据采集、异常状态预警、故障信息追踪         |
| **运维管理** | 运维任务调度、工单管理、故障处理流程可视化               |
| **数据管理** | 运行数据存储、查询、导出，发电量统计与性能分析           |

------

## 🛠️ 技术栈

### 前端技术

- **框架**：Vue 3 + TypeScript（Composition API）
- **构建工具**：Vite
- **路由管理**：Vue Router
- **可视化图表**：Apache ECharts
- **UI 组件库**：Element Plus
- **样式方案**：SCSS / CSS Modules

### 开发工具与规范

- 包管理：pnpm
- 版本控制：Git + GitHub
- 代码规范：ESLint + Prettier

------

## 📦 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm >= 8.0.0

### 安装依赖

```
pnpm install
```

### 启动开发服务器

```
pnpm dev
```

启动成功后，访问 `http://localhost:5173` 即可查看项目。

------

## 📂 项目结构

```
windwise/
├── public/                # 静态资源（图标、图片等）
├── src/
│   ├── assets/            # 项目资源文件（图片、样式等）
│   ├── components/        # 可复用公共组件
│   ├── router/            # 路由配置文件
│   ├── styles/            # 全局样式文件
│   ├── views/             # 页面组件
│   │   ├── Dashboard.vue # 首页大屏
│   │   ├── Overview.vue  # 风机概览页
│   │   ├── Monitor.vue   # 风机监测页
│   │   ├── Operation.vue # 运维管理页
│   │   └── Data.vue      # 数据管理页
│   ├── App.vue           # 根组件
│   └── main.ts           # 项目入口文件
├── .gitignore             # Git忽略配置文件
├── LICENSE                # MIT开源许可证
├── package.json           # 项目依赖与脚本配置
├── pnpm-lock.yaml         # 依赖版本锁定文件
├── tsconfig.json          # TypeScript配置文件
└── vite.config.ts         # Vite构建配置文件
```

------

## 📜 许可证

本项目采用 **MIT License** 开源协议，详见 [LICENSE](LICENSE) 文件。