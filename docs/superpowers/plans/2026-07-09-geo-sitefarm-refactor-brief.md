# GEO 计费系统 V1.1 站群模块原型重构任务简报

> **项目**：GEO 计费系统 V1.1 站群模块原型  
> **日期**：2026-07-09  
> **目标读者**：产品经理、前端开发、AI 协作者

---

## 一、项目背景

- V1.0 已有一个完整的 `prototype/` 静态站点项目（HTML + CSS + JS），采用左侧导航 + 主内容区的单页应用结构。
- V1.1 新增「站群模块」，涉及超级管理员端、SAAS 租户端、终端用户端三个端口。
- 当前在 `sitefarm/prototype/` 下生成了 3 个独立的超管端 HTML 原型文件，需要被整合进统一的 `prototype/` 项目，以便团队协作、GitHub 版本管理和云服务器部署。

---

## 二、设计规范摘要

### 2.1 视觉风格

- **设计系统**：沿用 V1.0 `prototype/css/styles.css` 中已定义的变量和组件。
- **主色调**：蓝色 `#2563EB`（`--color-primary`）。
- **字体**：Inter + Noto Sans SC，中文优先使用 Noto Sans SC。
- **布局**：左侧固定深色侧边栏 + 顶部白色 Header + 右侧浅灰内容区。
- **组件风格**：
  - 卡片：白色背景、细边框、圆角 12px；
  - 表格：表头浅灰、行 hover 高亮；
  - 按钮：主按钮蓝色实心，次按钮白色描边，文字按钮蓝色链接；
  - 表单：统一圆角输入框、聚焦蓝色边框；
  - 开关：40px × 22px 圆角滑动开关；
  - 弹窗：居中 Modal、遮罩层 50% 透明度深蓝。

### 2.2 交互规范

- 页面通过左侧导航切换，当前页高亮；
- 列表页统一包含：标题 + 数量徽章、搜索框、表格、分页；
- 新增 / 编辑操作统一使用弹窗（Modal）；
- 复杂表单按业务模块分组展示；
- 状态标签使用彩色圆点 + 文字（正常/欠费/冻结）。

### 2.3 页面层级

```
端口（超管 / 租户 / 用户）
├── 模块分组（核心功能 / 站群管理）
│   ├── 页面（列表 / 表单 / 详情）
│   │   ├── 弹窗（新增 / 编辑 / 预览 / 分配）
```

---

## 三、重构目标

把目前零散的站群原型页面整合为一个**统一的、可部署的静态站点项目**：

1. **统一入口**：所有页面通过 `prototype/index.html` 的左侧导航访问；
2. **统一路由**：复用 `js/app.js` + `js/render.js` 的页面渲染机制；
3. **统一导航**：在 `js/data.js` 中为三个端口新增「站群管理」菜单分组；
4. **统一组件**：表格、分页、搜索、弹窗、开关等样式由 `styles.css` 统一控制；
5. **可版本管理**：整个 `prototype/` 文件夹可直接提交 GitHub；
6. **可云部署**：可通过任意静态托管服务（Nginx、OSS、Vercel、GitHub Pages 等）发布。

---

## 四、关键约束

| 约束项 | 说明 |
|--------|------|
| 不改动 V1.0 页面 | 仅新增站群模块页面，不影响 V1.0 已有路由和渲染函数 |
| 不引入构建工具 | 保持纯静态 HTML/CSS/JS，零依赖，降低部署门槛 |
| 复用现有样式变量 | 所有自定义样式必须使用 `styles.css` 中已定义的 CSS 变量 |
| 页面按端口隔离 | 超管 / 租户 / 用户页面分别使用不同导航高亮和路由前缀 |
| 删除独立 HTML | `sitefarm/prototype/` 下 3 个独立 HTML 文件需删除，避免重复维护 |
| 城市选择只到城市 | 不涉及区县 |
| 用户端无创建权限 | 用户端只能查看和编辑基础资料，不能编辑快通内容 |
| 文章管理开关只控制租户端 | 用户端文章菜单不受超管开关控制 |
| 已发布站点新标签页打开 | 快通站点访问走 `_blank` |
| GEO 文章内容在线预览 | 不下载 |

---

## 五、文件结构

### 5.1 重构后整体结构

```
prototype/
├── index.html                  # 统一入口，加载 CSS/JS 并渲染页面
├── css/
│   └── styles.css              # V1.0 设计系统（不改动）
├── js/
│   ├── app.js                  # 应用初始化、路由切换、导航渲染
│   ├── render.js               # 各页面渲染函数（需新增站群页面）
│   ├── data.js                 # 导航配置、用户数据、Mock 数据（需新增站群菜单）
│   └── utils.js                # 工具函数（可选）
├── pages/                      # 页面片段 / 子模块（新增）
│   └── sitefarm/               # 站群模块页面片段
│       ├── admin/
│       │   ├── sitefarm-templates.js   # 超管：网站模板管理
│       │   ├── tdk-variables.js        # 超管：TDK 变量管理
│       │   └── saas-users.js           # 超管：SAAS 用户站群配置
│       ├── tenant/
│       │   ├── sitefarm-profiles.js    # 租户：基础资料管理
│       │   ├── sitefarm-templates.js   # 租户：网站模板管理
│       │   ├── training-words.js       # 租户：训练词管理
│       │   ├── tdk-templates.js        # 租户：TDK 模板管理
│       │   ├── kuaitong.js             # 租户：快通管理
│       │   └── geo-articles.js         # 租户：GEO 文章管理
│       └── enduser/
│           ├── sitefarm-profile.js     # 用户：基本信息
│           ├── kuaitong.js             # 用户：快通管理
│           └── geo-articles.js         # 用户：GEO 文章管理
└── assets/                     # 图片、图标等静态资源
```

### 5.2 新增文件清单

#### 页面片段（`pages/sitefarm/`）

| 文件 | 对应页面 | 端口 |
|------|----------|------|
| `admin/sitefarm-templates.js` | 网站模板管理 | 超管 |
| `admin/tdk-variables.js` | TDK 变量管理 | 超管 |
| `admin/saas-users.js` | SAAS 用户管理（站群配置弹窗） | 超管 |
| `tenant/sitefarm-profiles.js` | 基础资料管理 | 租户 |
| `tenant/sitefarm-templates.js` | 网站模板管理 | 租户 |
| `tenant/training-words.js` | 训练词管理 | 租户 |
| `tenant/tdk-templates.js` | TDK 模板管理 | 租户 |
| `tenant/kuaitong.js` | 快通管理 | 租户 |
| `tenant/geo-articles.js` | GEO 文章管理 | 租户 |
| `enduser/sitefarm-profile.js` | 基本信息 | 用户 |
| `enduser/kuaitong.js` | 快通管理 | 用户 |
| `enduser/geo-articles.js` | GEO 文章管理 | 用户 |

#### 需修改文件

| 文件 | 修改内容 |
|------|----------|
| `js/data.js` | 在三个端口的 `PORT_CONFIG` 中新增「站群管理」菜单分组和页面项 |
| `js/render.js` | 注册 12 个站群页面的 `render` 函数，映射 `pageId` 到页面片段 |
| `js/app.js` | 如有需要，调整路由初始化逻辑（大概率无需改动） |

#### 需删除文件

| 文件 | 说明 |
|------|------|
| `sitefarm/prototype/admin-sitefarm-templates.html` | 独立 HTML，已废弃 |
| `sitefarm/prototype/admin-tdk-variables.html` | 独立 HTML，已废弃 |
| `sitefarm/prototype/admin-saas-users.html` | 独立 HTML，已废弃 |

---

## 六、执行步骤概览

1. **分析现有渲染机制**：阅读 `js/app.js`、`js/render.js`、`js/data.js`，确认页面注册方式；
2. **新增导航配置**：在 `js/data.js` 中为三个端口添加「站群管理」菜单；
3. **迁移超管端 3 个页面**：把独立 HTML 中的内容转换为 `pages/sitefarm/admin/` 下的 JS 渲染片段；
4. **注册渲染函数**：在 `js/render.js` 中注册 `admin-sitefarm-templates`、`admin-tdk-variables`、`admin-saas-users`；
5. **本地验证**：启动本地 HTTP 服务器，确认导航切换和弹窗正常；
6. **按批次生成剩余页面**：租户端 6 个 + 用户端 3 个；
7. **删除独立 HTML 文件**：清理 `sitefarm/prototype/`；
8. **输出部署说明**：README + Git 提交 + 云服务器部署指引。

---

## 七、部署与协作

### 7.1 本地预览

```bash
cd prototype
npx serve .
```

或

```bash
cd prototype
python -m http.server 8080
```

### 7.2 提交 GitHub

```bash
git add prototype/
git commit -m "feat: add sitefarm module prototype pages"
git push origin main
```

### 7.3 云服务器部署

- 将 `prototype/` 文件夹整体上传至服务器；
- 使用 Nginx / Apache / OSS / CDN 配置为静态站点；
- 入口文件为 `index.html`。
