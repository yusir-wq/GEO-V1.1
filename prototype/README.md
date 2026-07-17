# GEO 计费系统 V1.1 — 站群模块原型

纯静态 HTML/CSS/JS 原型项目，零构建工具依赖，开箱即用。

## 项目结构

```
prototype/
├── index.html                  # 单页应用入口
├── css/
│   └── styles.css              # 全局样式 + 设计系统 + 站群组件
├── js/
│   ├── data.js                 # 端口配置 / 导航菜单 / 页面标题
│   ├── render.js               # 路由分发 → 各页面渲染函数
│   └── app.js                  # 状态管理 / 侧边栏 / Modal / 图标
└── pages/
    └── sitefarm/
        ├── admin/              # 超管端（3 页）
        │   ├── sitefarm-templates.js
        │   ├── tdk-variables.js
        │   └── saas-users.js
        ├── tenant/             # 租户端（6 页）
        │   ├── sitefarm-profiles.js
        │   ├── sitefarm-templates.js
        │   ├── training-words.js
        │   ├── tdk-templates.js
        │   ├── kuaitong.js
        │   └── geo-articles.js
        └── enduser/            # 用户端（3 页）
            ├── sitefarm-profile.js
            ├── kuaitong.js
            └── geo-articles.js
```

## 端口与页面清单

| 端口 | 站群管理页面 |
|------|-------------|
| 超级管理员 | 网站模板管理、TDK变量管理、SAAS用户站群配置 |
| 租户管理 | 基础资料管理、网站模板管理、训练词管理、TDK模板管理、快通管理、GEO文章管理 |
| 终端用户 | 基本信息、快通管理、GEO文章管理 |

## 本地预览

无需安装任何依赖，用任意静态文件服务器即可运行：

### 方式一：Python（推荐）

```bash
cd prototype
python -m http.server 8080
```

浏览器访问 `http://localhost:8080`

### 方式二：Node.js

```bash
cd prototype
npx serve -l 8080
```

### 方式三：VS Code Live Server

安装 Live Server 插件 → 右键 `index.html` → Open with Live Server

> 直接双击 `index.html` 用 `file://` 协议打开也可运行，但部分浏览器可能限制本地文件加载，建议使用上述 HTTP 服务器方式。

## 技术架构

### 渲染流程

```
用户点击导航
  → app.js navigateTo(pageId)
  → render.js renderContent(port, pageId)
  → switch(pageId) → 对应 renderXxx() 函数
  → 返回 HTML 字符串 → 注入 #content
```

### 页面片段开发规范

每个站群页面是一个独立 JS 文件，遵循以下模式：

```javascript
// 1. 导出渲染函数（函数名与 render.js 中 case 对应）
function renderTenantXxx() {
  return H.pageHeader('页面标题', '页面描述') +
    H.table(...) +
    // ... 页面 HTML
    `<div class="modal-overlay" id="xxxModal" onclick="closeXxxModalOnOverlay(event)">
      <!-- 弹窗内容 -->
    </div>`;
}

// 2. Modal 控制函数
function openXxxModal() {
  const m = document.getElementById('xxxModal');
  if (m) m.classList.add('active');
}

function closeXxxModal() {
  const m = document.getElementById('xxxModal');
  if (m) m.classList.remove('active');
}

function closeXxxModalOnOverlay(e) {
  if (e.target.id === 'xxxModal') closeXxxModal();
}
```

### H 工具对象

| 方法 | 用途 |
|------|------|
| `H.pageHeader(title, subtitle)` | 页面头部 |
| `H.stats(array)` | 统计卡片行 |
| `H.table(headers, rows)` | 数据表格 |
| `H.chartRow(id, title)` | 图表容器行 |
| `H.tabRow(tabs)` | 标签切换行 |

### CSS 设计系统

核心变量（定义于 `:root`）：

```css
--color-primary: #2563EB;
--color-bg-card: #FFFFFF;
--color-border: #E2E8F0;
--radius-md: 8px;
--radius-lg: 12px;
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07);
```

站群补充组件：`.alert-tip`、`.switch`、`.code-tag`、`.status-badge`、`.tag-list`、`.search-input`、`.modal-section`、`.switch-row`、`.preview-modal`、`.form-upload`、`.site-selector`、`.city-select`、`.publish-stats`

### Modal 机制

- `.modal-overlay` 默认 `display: none`
- 添加 `.active` 类后 `display: flex` 显示
- 站群页面内联 Modal：通过 `classList.add/remove('active')` 控制
- app.js 动态 Modal：创建时直接写入 `class="modal-overlay active"`，关闭时 `remove()` 整个节点

### 图标系统

使用 Lucide 内联 SVG 方案：

```javascript
// 在 ICON_MAP 中注册图标名 → SVG 路径
// 页面中使用：
window.getLucideIcon('plus')  // 返回 <svg>...</svg> 字符串
```

## Git 提交

```bash
# 初始化（如果尚未初始化）
git init

# 添加原型目录
git add prototype/

# 提交
git commit -m "feat(sitefarm): 站群模块原型整合进统一 prototype 项目

- 超管端新增 3 个站群页面（模板管理/TDK变量/SAAS用户配置）
- 租户端新增 6 个站群页面（基础资料/模板/训练词/TDK/快通/GEO文章）
- 用户端新增 3 个站群页面（基本信息/快通/GEO文章）
- 统一 CSS 设计系统，新增站群专用组件样式
- 修复 modal 显示机制（display:none + .active 类控制）
- 删除 sitefarm/prototype/ 下 3 个废弃独立 HTML
- 补充 data.js 导航配置与 PAGE_TITLES 映射
- 注册 render.js 路由分发"
```

## 云服务器部署

### Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/geo-prototype;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|svg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

部署步骤：

```bash
# 1. 上传 prototype/ 目录到服务器
scp -r prototype/ user@server:/var/www/geo-prototype/

# 2. 配置 Nginx
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/geo-prototype
# 编辑配置文件，写入上面的 server 块
sudo ln -s /etc/nginx/sites-available/geo-prototype /etc/nginx/sites-enabled/
sudo nginx -t          # 测试配置
sudo systemctl reload nginx

# 3. 访问验证
curl -I http://your-domain.com
```

### 其他部署方式

- **Vercel / Netlify**：直接上传 `prototype/` 目录，框架选 "Other"，构建命令留空
- **GitHub Pages**：推送至仓库后，Settings → Pages → Source 选 main 分支 `/prototype` 目录
- **Docker**：

```dockerfile
FROM nginx:alpine
COPY prototype/ /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t geo-prototype .
docker run -d -p 8080:80 geo-prototype
```

## 版本说明

- **版本号**：V1.1
- **站群模块版本**：sitefarm-20260709
- **基础框架版本**：charts-20260612
- **CSS 版本**：lucide-20260608
