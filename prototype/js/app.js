/**
 * GEO计费系统 V1.1 - 应用逻辑
 * 状态管理、导航、端口切换、模态框
 */

/* ========================================
   应用状态
   ======================================== */
let currentPort = 'admin';   // 当前端口
let currentPage = 'admin-dashboard';  // 当前页面

/* ========================================
   Lucide Icons 图标映射表
   采用内联 SVG，避免引入构建工具，保证静态原型可直接运行
   ======================================== */
function lucideIcon(paths) {
  return `<svg class="lucide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

const ICON_MAP = {
  'grid': lucideIcon('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'),
  'users': lucideIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  'id-card': lucideIcon('<rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M15 10h2"/><path d="M15 14h2"/><path d="M7 16h4"/>'),
  'banknote': lucideIcon('<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/>'),
  'megaphone': lucideIcon('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
  'chart': lucideIcon('<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>'),
  'settings': lucideIcon('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'),
  'network': lucideIcon('<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>'),
  'package': lucideIcon('<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'),
  'receipt': lucideIcon('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6"/><path d="M16 12H8"/><path d="M13 16H8"/>'),
  'folder': lucideIcon('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
  'book': lucideIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>'),
  'sparkles': lucideIcon('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'),
  'send': lucideIcon('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
  'download': lucideIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>'),
  'file-text': lucideIcon('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>'),
  'trending-up': lucideIcon('<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'),
  'file-signature': lucideIcon('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><path d="M14 2v6h6"/><path d="M8 18h1"/><path d="M18.4 12.6a2.1 2.1 0 1 0-3-3L9 16v3h3Z"/>'),
  'folder-check': lucideIcon('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9 13 2 2 4-4"/>'),
  'shield': lucideIcon('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>'),
  'building': lucideIcon('<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>'),
  'store': lucideIcon('<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-2.7-2.7V7"/><path d="M2 7v3a2 2 0 0 0 2 2v0a2.7 2.7 0 0 0 2.7-2.7V7"/>'),
  'user': lucideIcon('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  'search': lucideIcon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
  'bell': lucideIcon('<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'),
  'x': lucideIcon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  'triangle-alert': lucideIcon('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  'target': lucideIcon('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
  'credit-card': lucideIcon('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>'),
  'handshake': lucideIcon('<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>'),
  'clipboard-list': lucideIcon('<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>'),
  'refresh-cw': lucideIcon('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>'),
  'check': lucideIcon('<path d="M20 6 9 17l-5-5"/>'),
  'message-circle': lucideIcon('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
  'music': lucideIcon('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
  'lightbulb': lucideIcon('<path d="M15 14c.2-1 .7-1.7 1.5-2.5A4.9 4.9 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>'),
  'swords': lucideIcon('<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>'),
  'rotate-ccw': lucideIcon('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
  'clock': lucideIcon('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
  'chevron-down': lucideIcon('<path d="m6 9 6 6 6-6"/>'),
  'plus': lucideIcon('<path d="M5 12h14"/><path d="M12 5v14"/>'),
  'image': lucideIcon('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>'),
  'save': lucideIcon('<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>'),
  'zap': lucideIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  'copy': lucideIcon('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  'edit': lucideIcon('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'),
  'tag': lucideIcon('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'),
  'trash': lucideIcon('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>')
};

window.getLucideIcon = function(name, fallback = 'file-text') {
  return ICON_MAP[name] || ICON_MAP[fallback] || '';
};

/* ========================================
   renderSidebar() 渲染侧边栏导航
   ======================================== */
function renderSidebar() {
  const config = PORT_CONFIG[currentPort];
  if (!config) return '';

  const navHtml = config.nav.map(section => `
    <div class="nav-section">
      <div class="nav-section-title">${section.section}</div>
      ${section.items.map(item => {
        const isActive = item.id === currentPage;
        const icon = ICON_MAP[item.icon] || window.getLucideIcon('file-text');
        return `
          <div class="nav-item ${isActive ? 'active' : ''}" data-page="${item.id}" onclick="navigateTo('${item.id}')">
            <span class="nav-icon">${icon}</span>
            <span class="nav-label">${item.label}</span>
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>`;
      }).join('')}
    </div>`).join('');

  const userHtml = config.user ? `
    <div class="sidebar-user">
      <div class="user-avatar">${config.user.avatar}</div>
      <div class="user-info">
        <div class="user-name">${config.user.name}</div>
        <div class="user-role">${config.user.role}</div>
      </div>
    </div>` : '';

  return `
    <div class="sidebar-logo">
      <div class="logo-icon">G</div>
      <span class="logo-text">GEO计费</span>
      <span class="logo-version">V1.1</span>
    </div>
    <nav class="sidebar-nav">
      ${navHtml}
    </nav>
    ${userHtml}`;
}

/* ========================================
   renderHeader() 更新顶栏
   ======================================== */
function renderHeader() {
  const config = PORT_CONFIG[currentPort];
  const pageTitle = PAGE_TITLES[currentPage] || '页面';

  // 计算总badge数
  let totalBadge = 0;
  if (config && config.nav) {
    config.nav.forEach(section => {
      section.items.forEach(item => {
        if (item.badge) {
          totalBadge += parseInt(item.badge) || 0;
        }
      });
    });
  }

  return `
    <div class="header-breadcrumb">
      <span>${config ? config.name : ''}</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">${pageTitle}</span>
    </div>
    <div class="header-right">
      <div class="port-switcher" id="portSwitcher" onclick="togglePortDropdown()">
        <span class="port-label">${config ? config.name : ''}</span>
        <span class="port-arrow">${window.getLucideIcon ? window.getLucideIcon('chevron-down') : ''}</span>
      </div>
      <button class="header-btn" title="搜索">
        ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
      </button>
      <button class="header-btn" title="通知">
        ${window.getLucideIcon ? window.getLucideIcon('bell') : ''}
        ${totalBadge > 0 ? '<span class="btn-badge"></span>' : ''}
      </button>
    </div>`;
}

/* ========================================
   navigateTo(pageId) 页面导航
   ======================================== */
function navigateTo(pageId) {
  currentPage = pageId;

  // 更新侧边栏
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderSidebar();
  }

  // 更新顶栏
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = renderHeader();
  }

  // 更新内容区
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = renderContent(currentPort, currentPage);
    initCharts();
    // 滚动到顶部
    content.scrollTop = 0;
    
    // 触发页面特定初始化函数
    if (typeof window.csInitBatchCategoryChecks === 'function') {
      setTimeout(() => window.csInitBatchCategoryChecks(), 100);
    }
  }

  // 关闭端口下拉菜单
  closePortDropdown();
}

/* ========================================
   switchPort(port) 端口切换
   ======================================== */
function switchPort(port) {
  if (!PORT_CONFIG[port]) return;

  currentPort = port;

  // 设置默认页面为工作台
  currentPage = port + '-dashboard';

  // 更新侧边栏
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderSidebar();
  }

  // 更新顶栏
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = renderHeader();
  }

  // 更新内容区
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = renderContent(currentPort, currentPage);
    initCharts();
    content.scrollTop = 0;
    
    // 触发页面特定初始化函数
    if (typeof window.csInitBatchCategoryChecks === 'function') {
      setTimeout(() => window.csInitBatchCategoryChecks(), 100);
    }
  }

  // 关闭端口下拉菜单
  closePortDropdown();
}

/* ========================================
   端口下拉菜单
   ======================================== */
function togglePortDropdown() {
  const switcher = document.getElementById('portSwitcher');
  let dropdown = document.getElementById('portDropdown');

  if (dropdown) {
    // 已存在则切换显示
    dropdown.remove();
    switcher.classList.remove('open');
    return;
  }

  switcher.classList.add('open');

  const ports = Object.keys(PORT_CONFIG);
  const dropdownHtml = ports.map(p => {
    const cfg = PORT_CONFIG[p];
    const isActive = p === currentPort;
    const icon = ICON_MAP[cfg.icon] || window.getLucideIcon('file-text');
    return `
      <div class="port-dropdown-item ${isActive ? 'active' : ''}" onclick="switchPort('${p}')">
        <div class="port-icon">${icon}</div>
        <div>
          <div style="font-weight:500">${cfg.name}</div>
        </div>
      </div>`;
  }).join('');

  dropdown = document.createElement('div');
  dropdown.id = 'portDropdown';
  dropdown.className = 'port-dropdown';
  dropdown.innerHTML = dropdownHtml;

  // 定位到switcher下方
  const rect = switcher.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.top = (rect.bottom + 4) + 'px';
  dropdown.style.right = (window.innerWidth - rect.right) + 'px';

  document.body.appendChild(dropdown);

  // 点击外部关闭
  setTimeout(() => {
    document.addEventListener('click', closePortDropdownOutside);
  }, 0);
}

function closePortDropdown() {
  const dropdown = document.getElementById('portDropdown');
  const switcher = document.getElementById('portSwitcher');
  if (dropdown) dropdown.remove();
  if (switcher) switcher.classList.remove('open');
  document.removeEventListener('click', closePortDropdownOutside);
}

function closePortDropdownOutside(e) {
  const dropdown = document.getElementById('portDropdown');
  const switcher = document.getElementById('portSwitcher');
  if (dropdown && !dropdown.contains(e.target) && !switcher.contains(e.target)) {
    closePortDropdown();
  }
}

/* ========================================
   showModal(type) / closeModal() 模态框
   ======================================== */
function showModal(type) {
  let title = '';
  let bodyHtml = '';

  switch (type) {
    case 'create-saas-user':
      title = '创建SAAS租户';
      bodyHtml = `
        <div class="form">
          <div class="form-group">
            <label class="form-label">企业名称 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="请输入企业全称" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">联系人 <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="请输入联系人姓名" />
            </div>
            <div class="form-group">
              <label class="form-label">联系电话 <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="请输入手机号码" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">联系邮箱</label>
              <input type="email" class="form-input" placeholder="请输入邮箱地址" />
            </div>
            <div class="form-group">
              <label class="form-label">套餐版本 <span class="required">*</span></label>
              <select class="form-select">
                <option value="">请选择</option>
                <option value="basic">基础版</option>
                <option value="pro">专业版</option>
                <option value="ultimate">旗舰版</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">管理员账号 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="请设置管理员登录账号" />
            <div class="form-hint">用于系统登录，设置后不可修改</div>
          </div>
          <div class="form-group">
            <label class="form-label">初始密码 <span class="required">*</span></label>
            <input type="password" class="form-input" placeholder="请设置初始密码" />
            <div class="form-hint">至少8位，包含字母和数字</div>
          </div>
          <div class="form-group">
            <label class="form-label">备注</label>
            <textarea class="form-textarea" placeholder="可选，填写备注信息"></textarea>
          </div>
        </div>`;
      break;
    default:
      title = '对话框';
      bodyHtml = '<p>内容区域</p>';
  }

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" onclick="closeModal()">确认创建</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.remove();
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'modalOverlay') {
    closeModal();
  }
}

/* ========================================
   ECharts 图表初始化
   推荐 Apache ECharts：适合 GEO 报表的趋势、分布、对比、漏斗等多维可视化
   ======================================== */
function getChartThemeColor() {
  return {
    primary: '#6C4DF6',
    secondary: '#36A3FF',
    green: '#20C997',
    orange: '#FF9F43',
    purple: '#A66CFF',
    red: '#FF6B6B',
    text: '#5F6B85',
    grid: '#EDF1FA'
  };
}

function buildChartOption(type, title, desc) {
  const c = getChartThemeColor();
  const common = {
    color: [c.primary, c.secondary, c.green, c.orange, c.purple, c.red],
    tooltip: { trigger: type === 'pie' || type === 'funnel' ? 'item' : 'axis', borderWidth: 0, backgroundColor: 'rgba(16, 26, 58, 0.88)', textStyle: { color: '#fff' } },
    grid: { left: 34, right: 18, top: 34, bottom: 28, containLabel: true },
    textStyle: { color: c.text, fontFamily: 'Inter, Noto Sans SC, sans-serif' }
  };
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const days = ['06-01', '06-06', '06-11', '06-16', '06-21', '06-26'];

  if (type === 'pie') {
    return {
      ...common,
      legend: { bottom: 0, icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: { color: c.text } },
      series: [{
        name: title,
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        label: { formatter: '{b}\n{d}%', color: c.text },
        itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 8 },
        data: [
          { value: 38, name: '品牌监控' },
          { value: 26, name: 'AI文章' },
          { value: 21, name: '知识库' },
          { value: 15, name: '媒体投稿' }
        ]
      }]
    };
  }

  if (type === 'bar' || type === 'bar-horizontal') {
    const horizontal = type === 'bar-horizontal';
    const categories = horizontal ? ['项目管理', '品牌监控', '知识库', 'AI文章', '采集任务'] : months;
    const values = horizontal ? [96, 82, 74, 68, 55] : [42, 58, 76, 92, 118, 136];
    return {
      ...common,
      xAxis: horizontal ? { type: 'value', splitLine: { lineStyle: { color: c.grid } } } : { type: 'category', data: categories, axisTick: { show: false }, axisLine: { lineStyle: { color: c.grid } } },
      yAxis: horizontal ? { type: 'category', data: categories, axisTick: { show: false }, axisLine: { show: false } } : { type: 'value', splitLine: { lineStyle: { color: c.grid } } },
      series: [{
        name: title,
        type: 'bar',
        data: values,
        barWidth: horizontal ? 12 : 18,
        itemStyle: { borderRadius: horizontal ? [0, 10, 10, 0] : [10, 10, 0, 0], color: { type: 'linear', x: 0, y: 0, x2: horizontal ? 1 : 0, y2: horizontal ? 0 : 1, colorStops: [{ offset: 0, color: c.primary }, { offset: 1, color: c.secondary }] } }
      }]
    };
  }

  if (type === 'radar') {
    return {
      ...common,
      radar: { radius: '66%', indicator: [{ name: '声量', max: 100 }, { name: '排名', max: 100 }, { name: '知识库', max: 100 }, { name: '投稿', max: 100 }, { name: '采集', max: 100 }], splitLine: { lineStyle: { color: '#E8ECF7' } }, splitArea: { areaStyle: { color: ['#FFFFFF', '#F7F5FF'] } } },
      series: [{ type: 'radar', data: [{ value: [86, 78, 92, 64, 74], name: title, areaStyle: { color: 'rgba(108, 77, 246, 0.18)' } }] }]
    };
  }

  if (type === 'funnel') {
    return {
      ...common,
      series: [{ type: 'funnel', left: '12%', top: 20, width: '76%', bottom: 8, gap: 4, label: { color: c.text }, itemStyle: { borderColor: '#fff', borderWidth: 2 }, data: [
        { value: 100, name: '访问' }, { value: 72, name: '咨询' }, { value: 48, name: '报价' }, { value: 32, name: '签约' }
      ] }]
    };
  }

  const isArea = type === 'area';
  return {
    ...common,
    xAxis: { type: 'category', boundaryGap: false, data: isArea ? days : months, axisTick: { show: false }, axisLine: { lineStyle: { color: c.grid } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: c.grid } } },
    series: [{
      name: title,
      type: 'line',
      smooth: true,
      symbolSize: 7,
      data: isArea ? [120, 180, 230, 310, 420, 520] : [32, 46, 55, 78, 94, 126],
      lineStyle: { width: 3, color: c.primary },
      itemStyle: { color: c.primary, borderColor: '#fff', borderWidth: 2 },
      areaStyle: isArea ? { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(108,77,246,.30)' }, { offset: 1, color: 'rgba(108,77,246,.02)' }] } } : undefined
    }]
  };
}

function initCharts() {
  if (!window.echarts) return;
  document.querySelectorAll('.chart-placeholder').forEach((el) => {
    const chart = echarts.getInstanceByDom(el) || echarts.init(el, null, { renderer: 'svg' });
    const type = el.dataset.chartType || 'line';
    chart.setOption(buildChartOption(type, el.dataset.chartTitle || '数据趋势', el.dataset.chartDesc || ''), true);
  });
}

window.addEventListener('resize', function() {
  if (!window.echarts) return;
  document.querySelectorAll('.chart-placeholder').forEach((el) => {
    const chart = echarts.getInstanceByDom(el);
    if (chart) chart.resize();
  });
});

/* ========================================
   init() 初始化
   ======================================== */
function init() {
  // 渲染侧边栏
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderSidebar();
  }

  // 渲染顶栏
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = renderHeader();
  }

  // 渲染内容区
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = renderContent(currentPort, currentPage);
    initCharts();
    
    // 触发页面特定初始化函数
    if (typeof window.csInitBatchCategoryChecks === 'function') {
      setTimeout(() => window.csInitBatchCategoryChecks(), 100);
    }
  }

  // 键盘事件：ESC关闭模态框
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closePortDropdown();
    }
  });
}

/* ========================================
   全局 Toast 消息提示
   ======================================== */
function showToast(message, type) {
  type = type || 'success';
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${message}</span>`;
  document.body.appendChild(toast);

  // 入场动画
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  // 3秒后自动消失
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

/* ========================================
   大模型官方API接口 - 交互函数
   ======================================== */

// 一级Tab切换
function switchTenantSettingsTab(tabId) {
  window.tenantSettingsTab = tabId;
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = renderContent(currentPort, currentPage);
  }
}

// 二级Tab切换
function switchSubTab(tabId) {
  // 更新二级Tab选中态
  document.querySelectorAll('.sub-tab-item').forEach(el => {
    el.classList.toggle('active', el.dataset.subtab === tabId);
  });

  // 显示/隐藏对应面板
  document.querySelectorAll('.sub-tab-panel').forEach(el => {
    el.style.display = el.dataset.panel === tabId ? 'block' : 'none';
  });
}

// 单选按钮组选择
function selectRadio(el, group) {
  const container = el.closest('.radio-group');
  container.querySelectorAll('.radio-item').forEach(item => {
    item.classList.remove('selected');
  });
  el.classList.add('selected');
}

/* ---------- API采集 ---------- */

// 大模型芯片切换
function switchModelChip(modelId) {
  document.querySelectorAll('.model-chip').forEach(el => {
    el.classList.toggle('active', el.dataset.model === modelId);
  });

  // 加载模型配置到表单
  const config = AI_MODEL_CONFIGS[modelId];
  if (config) {
    const aliasInput = document.getElementById('modelAlias');
    const endpointInput = document.getElementById('modelEndpoint');
    const apiKeyInput = document.getElementById('modelApiKey');
    const modelInput = document.getElementById('modelName');

    if (aliasInput) aliasInput.value = config.alias;
    if (endpointInput) endpointInput.value = config.endpoint;
    if (apiKeyInput) apiKeyInput.value = config.apiKey;
    if (modelInput) modelInput.value = config.model;

    // 更新radio选择
    document.querySelectorAll('#apiConfigForm .radio-group').forEach(group => {
      const groupName = group.closest('.form-group').querySelector('.form-label').textContent;
      if (groupName === '模型用处') {
        group.querySelectorAll('.radio-item').forEach(item => {
          item.classList.toggle('selected', item.dataset.value === config.usage);
        });
      }
      if (groupName === '联网搜索') {
        group.querySelectorAll('.radio-item').forEach(item => {
          item.classList.toggle('selected', item.dataset.value === config.webSearch);
        });
      }
    });
  }
}

// 测试模型连接
function testModelConnection() {
  alert('正在测试模型连接...\n连接成功！');
}

// 保存API配置
function saveApiConfig() {
  alert('API配置已保存！');
}

/* ---------- GEO采集资源 ---------- */

// 当前状态
let currentGeoPackage = 'standard';
let pendingGeoPackage = null;

// Geo资源Tab切换
function switchGeoResourceTab(tabId) {
  window.geoResourceTab = tabId;
  const content = document.getElementById('content');
  if (content) content.innerHTML = renderContent(currentPort, currentPage);
}

// 套餐选择 → 仅高亮，不弹窗
function highlightPackage(packageId) {
  if (packageId === currentGeoPackage) {
    showToast('您已开通此套餐，如需升级请点击"升级套餐"按钮', 'warning');
    return;
  }
  pendingGeoPackage = packageId;

  // 更新UI选中态
  document.querySelectorAll('.package-card').forEach(el => {
    const isActive = el.dataset.package === packageId;
    el.classList.toggle('active', isActive);
  });
}

// 点击卡片上「立即购买」按钮
function purchaseOnePackage(packageId, isUpgrade) {
  if (packageId === currentGeoPackage) {
    showToast('您已开通此套餐，如需升级请点击"升级套餐"按钮', 'warning');
    return;
  }
  showGeoPaymentModal(packageId, isUpgrade);
}

// 点击「立即购买」按钮（底部全局，已废弃）
function purchaseSelectedPackage() {
  if (!pendingGeoPackage || pendingGeoPackage === currentGeoPackage) {
    showToast('请先选择一个方案', 'warning');
    return;
  }
  showGeoPaymentModal(pendingGeoPackage);
}

// 更新价格计算
function updateGeoPriceCalc() {
  const pkg = GEO_RESOURCE_PACKAGES[currentGeoPackage];

  const packageNameEl = document.getElementById('calcPackageName');
  const resourcesEl = document.getElementById('calcResources');
  const unitPriceEl = document.getElementById('calcUnitPrice');
  const totalPriceEl = document.getElementById('calcTotalPrice');

  if (packageNameEl) packageNameEl.textContent = pkg.name;
  if (resourcesEl) resourcesEl.textContent = `${pkg.resources} 条`;
  if (unitPriceEl) unitPriceEl.textContent = `¥${pkg.pricePerUnit}/资源/月`;
  if (totalPriceEl) totalPriceEl.innerHTML = `¥${pkg.totalPrice.toLocaleString()}<span>/月</span>`;
}

// 支付弹窗
function showGeoPaymentModal(packageId, isUpgrade) {
  const pkg = GEO_RESOURCE_PACKAGES[packageId];
  const typeLabel = isUpgrade ? '升级' : '购买';
  const pr = (isUpgrade && packageId === 'pro') ? window._geoProration : null;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  const expireDate = new Date(now.setFullYear(year + 1));
  const expYear = expireDate.getFullYear();
  const expMonth = String(expireDate.getMonth() + 1).padStart(2, '0');
  const expDay = String(expireDate.getDate()).padStart(2, '0');
  const expireStr = `${expYear}-${expMonth}-${expDay}`;
  function fmt(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  const bodyHtml = `
    <div class="payment-plan-summary">
      <div class="payment-plan-header">
        <span class="payment-plan-name">${pkg.name}</span>
        <span class="payment-plan-price">${pr ? '<span style="text-decoration:line-through;color:#94A3B8;font-size:14px;font-weight:400;margin-right:6px">¥' + pkg.totalPrice.toLocaleString() + '</span><span style="color:#10B981">¥' + fmt(pr.afterProration) + '</span>' : '¥' + pkg.totalPrice.toLocaleString()}<small>/月</small></span>
      </div>${pr ? `` : ''}
      <div class="payment-plan-specs">
        ${pr ? `
        <div class="payment-spec-item">
          <span class="payment-spec-label">可折算金额</span>
          <span class="payment-spec-value">¥${fmt(pr.prorationAmount)}</span>
        </div>
        <div class="payment-spec-item">
          <span class="payment-spec-label">折后应付</span>
          <span class="payment-spec-value" style="color:#10B981;font-weight:600">¥${fmt(pr.afterProration)}</span>
        </div>
        ` : ''}
        <div class="payment-spec-item">
          <span class="payment-spec-label">资源通道</span>
          <span class="payment-spec-value">${pkg.resources} 条</span>
        </div>
        <div class="payment-spec-item">
          <span class="payment-spec-label">描述</span>
          <span class="payment-spec-value">${pkg.desc}</span>
        </div>
        <div class="payment-spec-item">
          <span class="payment-spec-label">生效日期</span>
          <span class="payment-spec-value">${today}</span>
        </div>
        <div class="payment-spec-item">
          <span class="payment-spec-label">到期日期</span>
          <span class="payment-spec-value">${expireStr}</span>
        </div>
      </div>
    </div>

    <div class="payment-tabs">
      <div class="payment-tab active" data-paytab="qrcode" onclick="switchPaymentTab('qrcode')">扫码支付</div>
      <div class="payment-tab" data-paytab="balance" onclick="switchPaymentTab('balance')">余额支付</div>
    </div>

    <div class="payment-tab-content active" data-paypanel="qrcode">
      <div class="payment-qrcode-wrap">
        <div class="payment-qrcode-sidebar">
          <div class="payment-qrcode-tab active" data-qr="wechat" onclick="switchQrTab('wechat')">微信支付</div>
          <div class="payment-qrcode-tab" data-qr="alipay" onclick="switchQrTab('alipay')">支付宝</div>
        </div>
        <div class="payment-qrcode-main">
          <div class="payment-qr-panel active" data-qrpanel="wechat">
            <div class="payment-qrcode-img">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect x="0" y="0" width="100" height="100" fill="#fff"/>
                <rect x="10" y="10" width="30" height="30" rx="2" fill="#000"/>
                <rect x="13" y="13" width="24" height="24" rx="1" fill="#fff"/>
                <rect x="17" y="17" width="16" height="16" rx="1" fill="#000"/>
                <rect x="20" y="20" width="10" height="10" rx="1" fill="#fff"/>
                <rect x="23" y="23" width="4" height="4" fill="#000"/>
                <rect x="60" y="10" width="30" height="30" rx="2" fill="#000"/>
                <rect x="63" y="13" width="24" height="24" rx="1" fill="#fff"/>
                <rect x="67" y="17" width="16" height="16" rx="1" fill="#000"/>
                <rect x="70" y="20" width="10" height="10" rx="1" fill="#fff"/>
                <rect x="73" y="23" width="4" height="4" fill="#000"/>
                <rect x="10" y="60" width="30" height="30" rx="2" fill="#000"/>
                <rect x="13" y="63" width="24" height="24" rx="1" fill="#fff"/>
                <rect x="17" y="67" width="16" height="16" rx="1" fill="#000"/>
                <rect x="20" y="70" width="10" height="10" rx="1" fill="#fff"/>
                <rect x="23" y="73" width="4" height="4" fill="#000"/>
                <rect x="45" y="45" width="10" height="10" fill="#000"/>
                <rect x="50" y="50" width="4" height="4" fill="#000"/>
                <rect x="60" y="48" width="8" height="8" fill="#000"/>
                <rect x="48" y="60" width="8" height="8" fill="#000"/>
                <rect x="38" y="38" width="10" height="3" fill="#000"/>
                <rect x="38" y="50" width="3" height="10" fill="#000"/>
                <rect x="52" y="44" width="3" height="10" fill="#000"/>
                <rect x="62" y="38" width="3" height="10" fill="#000"/>
                <rect x="35" y="65" width="12" height="3" fill="#000"/>
                <rect x="44" y="65" width="3" height="12" fill="#000"/>
                <rect x="65" y="62" width="3" height="12" fill="#000"/>
                <rect x="55" y="55" width="8" height="3" fill="#000"/>
                <rect x="55" y="58" width="3" height="8" fill="#000"/>
                <rect x="63" y="58" width="6" height="3" fill="#000"/>
                <rect x="66" y="61" width="3" height="6" fill="#000"/>
              </svg>
            </div>
            <div class="payment-qrcode-hint">请使用微信扫描二维码完成支付</div>
          </div>
          <div class="payment-qr-panel" data-qrpanel="alipay" style="display:none">
            <div class="payment-qrcode-img">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect x="0" y="0" width="100" height="100" fill="#1677FF"/>
                <rect x="15" y="15" width="28" height="28" rx="3" fill="#fff"/>
                <rect x="19" y="19" width="20" height="20" rx="2" fill="#1677FF"/>
                <rect x="57" y="15" width="28" height="28" rx="3" fill="#fff"/>
                <rect x="61" y="19" width="20" height="20" rx="2" fill="#1677FF"/>
                <rect x="15" y="57" width="28" height="28" rx="3" fill="#fff"/>
                <rect x="19" y="61" width="20" height="20" rx="2" fill="#1677FF"/>
                <circle cx="50" cy="50" r="4" fill="#fff"/>
                <rect x="48" y="38" width="4" height="8" fill="#fff" rx="1"/>
                <rect x="38" y="48" width="8" height="4" fill="#fff" rx="1"/>
                <rect x="54" y="48" width="8" height="4" fill="#fff" rx="1"/>
                <rect x="48" y="56" width="4" height="8" fill="#fff" rx="1"/>
                <rect x="43" y="62" width="8" height="3" fill="#fff" rx="1"/>
                <rect x="49" y="62" width="8" height="3" fill="#fff" rx="1"/>
                <rect x="55" y="62" width="3" height="10" fill="#fff" rx="1"/>
                <rect x="62" y="43" width="10" height="3" fill="#fff" rx="1"/>
                <rect x="68" y="55" width="10" height="3" fill="#fff" rx="1"/>
              </svg>
            </div>
            <div class="payment-qrcode-hint">请使用支付宝扫描二维码完成支付</div>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-tab-content" data-paypanel="balance" style="display:none">
      <div class="payment-balance-info">
        <div class="payment-balance-row">
          <span class="payment-balance-label">当前余额</span>
          <span class="payment-balance-value">¥50,000.00</span>
        </div>
        <div class="payment-balance-row">
          <span class="payment-balance-label">应支付</span>
          <span class="payment-balance-value charge">¥${pkg.totalPrice.toLocaleString()}</span>
        </div>
        <div class="payment-balance-divider"></div>
        <div class="payment-balance-row">
          <span class="payment-balance-label">支付后余额</span>
          <span class="payment-balance-value">¥${(50000 - pkg.totalPrice).toLocaleString()}</span>
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:16px" onclick="confirmBalancePay('${packageId}', ${isUpgrade})">确认支付</button>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal modal--payment">
        <div class="modal-header">
          <h2 class="modal-title">${typeLabel}GEO采集资源套餐</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

// 支付方式切换
function switchPaymentTab(tabId) {
  document.querySelectorAll('.payment-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.paytab === tabId);
  });
  document.querySelectorAll('.payment-tab-content').forEach(el => {
    el.style.display = el.dataset.paypanel === tabId ? 'block' : 'none';
  });
}

// 二维码Tab切换
function switchQrTab(tabId) {
  document.querySelectorAll('.payment-qrcode-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.qr === tabId);
  });
  document.querySelectorAll('.payment-qr-panel').forEach(el => {
    el.style.display = el.dataset.qrpanel === tabId ? 'block' : 'none';
  });
}

// 余额支付确认
function confirmBalancePay(packageId, isUpgrade) {
  const pkg = GEO_RESOURCE_PACKAGES[packageId];
  if (isUpgrade) {
    showToast(`升级成功！已升级至「${pkg.name}」，${pkg.resources}条资源通道，月费¥${pkg.totalPrice.toLocaleString()}。有效期已重新计算。`);
  } else {
    showToast(`支付成功！已开通「${pkg.name}」，${pkg.resources}条资源通道，月费¥${pkg.totalPrice.toLocaleString()}`);
  }
  closeModal();
  // 刷新页面
  const content = document.getElementById('content');
  if (content) content.innerHTML = renderContent(currentPort, currentPage);
}

// 从方案对比区点击套餐卡片
function selectGeoPackageFromCard(packageId) {
  document.querySelectorAll('.package-card').forEach(el => {
    const isActive = el.dataset.package === packageId;
    el.classList.toggle('active', isActive);
    const existingBadge = el.querySelector('.package-card-badge');
    if (isActive) {
      if (!existingBadge) {
        const header = el.querySelector('.package-card-header');
        const badge = document.createElement('span');
        badge.className = 'package-card-badge';
        badge.textContent = '已选择';
        header.appendChild(badge);
      }
    } else if (existingBadge) {
      existingBadge.remove();
    }
  });
  updateGeoPriceCalc();
}

// 升级套餐弹窗
function showUpgradeModal() {
  const pkg = GEO_RESOURCE_PACKAGES[currentGeoPackage];
  const upgradeOptions = Object.values(GEO_RESOURCE_PACKAGES).filter(p => p.resources > pkg.resources);
  const pr = window._geoProration;

  function fmt(n) { return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  const optionsHtml = upgradeOptions.map(p => {
    const isThisProrated = pr && p.id === 'pro';
    return `
    <div class="upgrade-option" data-package="${p.id}" onclick="confirmDirectUpgrade('${p.id}')">
      <div class="upgrade-option-left">
        <div class="upgrade-option-name">${p.name}</div>
        <div class="upgrade-option-spec">${p.resources} 条资源通道 · ${p.desc}</div>
        ${isThisProrated ? `
          <div class="upgrade-proration-rows">
            <div class="upgrade-proration-item"><span>可折算金额</span><span>¥${fmt(pr.prorationAmount)}</span></div>
            <div class="upgrade-proration-item"><span>折后应付</span><span style="color:#10B981;font-weight:600">¥${fmt(pr.afterProration)}</span></div>
          </div>
        ` : ''}
      </div>
      <div class="upgrade-option-right">
        <div class="upgrade-option-price">¥${p.totalPrice.toLocaleString()}<small>/月</small></div>
        <button class="btn btn-primary btn-sm">升级</button>
      </div>
    </div>
  `}).join('');

  const bodyHtml = `
    <div class="upgrade-current">
      <span class="upgrade-current-label">当前套餐：</span>
      <span class="upgrade-current-value">${pkg.name}（${pkg.resources}条资源通道）</span>
    </div>
    <div class="upgrade-list">
      ${optionsHtml}
    </div>
    <div class="upgrade-note">
      ⚠️ 升级后，新套餐立即生效，有效期重新计算。旧套餐立即失效，不折算。
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal modal--payment">
        <div class="modal-header">
          <h2 class="modal-title">升级套餐</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

// 续费弹窗
function showRenewModal() {
  const pkg = GEO_RESOURCE_PACKAGES[currentGeoPackage];

  const bodyHtml = `
    <div class="renew-plan-info">
      <div class="renew-plan-name">${pkg.name}</div>
      <div class="renew-plan-specs">
        <div class="renew-spec-item">
          <span class="renew-spec-label">资源通道</span>
          <span class="renew-spec-value">${pkg.resources} 条</span>
        </div>
        <div class="renew-spec-item">
          <span class="renew-spec-label">当前到期</span>
          <span class="renew-spec-value">2026-08-20</span>
        </div>
        <div class="renew-spec-item">
          <span class="renew-spec-label">续费后到期</span>
          <span class="renew-spec-value" style="color:#10B981;font-weight:600">2027-08-20</span>
        </div>
      </div>
    </div>
    <div class="renew-amount">
      <span class="renew-amount-label">续费金额</span>
      <span class="renew-amount-value">¥${pkg.totalPrice.toLocaleString()}</span>
      <small style="color:#94A3B8;font-size:12px">/年</small>
    </div>

    <div class="payment-tabs">
      <div class="payment-tab active" data-paytab="renew-qrcode" onclick="switchPaymentTab('renew-qrcode')">扫码支付</div>
      <div class="payment-tab" data-paytab="renew-balance" onclick="switchPaymentTab('renew-balance')">余额支付</div>
    </div>

    <div class="payment-tab-content active" data-paypanel="renew-qrcode">
      <div class="payment-qrcode-wrap">
        <div class="payment-qrcode-sidebar">
          <div class="payment-qrcode-tab active" data-qr="renew-wechat" onclick="switchQrTab('renew-wechat')">微信支付</div>
          <div class="payment-qrcode-tab" data-qr="renew-alipay" onclick="switchQrTab('renew-alipay')">支付宝</div>
        </div>
        <div class="payment-qrcode-main">
          <div class="payment-qr-panel active" data-qrpanel="renew-wechat">
            <div class="payment-qrcode-img">
              <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="0" y="0" width="100" height="100" fill="#fff"/><rect x="10" y="10" width="30" height="30" rx="2" fill="#000"/><rect x="13" y="13" width="24" height="24" rx="1" fill="#fff"/><rect x="17" y="17" width="16" height="16" rx="1" fill="#000"/><rect x="20" y="20" width="10" height="10" rx="1" fill="#fff"/><rect x="23" y="23" width="4" height="4" fill="#000"/><rect x="60" y="10" width="30" height="30" rx="2" fill="#000"/><rect x="63" y="13" width="24" height="24" rx="1" fill="#fff"/><rect x="67" y="17" width="16" height="16" rx="1" fill="#000"/><rect x="70" y="20" width="10" height="10" rx="1" fill="#fff"/><rect x="73" y="23" width="4" height="4" fill="#000"/><rect x="10" y="60" width="30" height="30" rx="2" fill="#000"/><rect x="13" y="63" width="24" height="24" rx="1" fill="#fff"/><rect x="17" y="67" width="16" height="16" rx="1" fill="#000"/><rect x="20" y="70" width="10" height="10" rx="1" fill="#fff"/><rect x="23" y="73" width="4" height="4" fill="#000"/><rect x="45" y="45" width="10" height="10" fill="#000"/><rect x="50" y="50" width="4" height="4" fill="#000"/><rect x="60" y="48" width="8" height="8" fill="#000"/><rect x="48" y="60" width="8" height="8" fill="#000"/></svg>
            </div>
            <div class="payment-qrcode-hint">请使用微信扫描二维码完成支付</div>
          </div>
          <div class="payment-qr-panel" data-qrpanel="renew-alipay" style="display:none">
            <div class="payment-qrcode-img">
              <svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="0" y="0" width="100" height="100" fill="#1677FF"/><rect x="15" y="15" width="28" height="28" rx="3" fill="#fff"/><rect x="19" y="19" width="20" height="20" rx="2" fill="#1677FF"/><rect x="57" y="15" width="28" height="28" rx="3" fill="#fff"/><rect x="61" y="19" width="20" height="20" rx="2" fill="#1677FF"/><rect x="15" y="57" width="28" height="28" rx="3" fill="#fff"/><rect x="19" y="61" width="20" height="20" rx="2" fill="#1677FF"/><circle cx="50" cy="50" r="4" fill="#fff"/><rect x="48" y="38" width="4" height="8" fill="#fff" rx="1"/><rect x="38" y="48" width="8" height="4" fill="#fff" rx="1"/><rect x="54" y="48" width="8" height="4" fill="#fff" rx="1"/><rect x="48" y="56" width="4" height="8" fill="#fff" rx="1"/></svg>
            </div>
            <div class="payment-qrcode-hint">请使用支付宝扫描二维码完成支付</div>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-tab-content" data-paypanel="renew-balance" style="display:none">
      <div class="payment-balance-info">
        <div class="payment-balance-row">
          <span class="payment-balance-label">当前余额</span>
          <span class="payment-balance-value">¥50,000.00</span>
        </div>
        <div class="payment-balance-row">
          <span class="payment-balance-label">续费金额</span>
          <span class="payment-balance-value charge">¥${pkg.totalPrice.toLocaleString()}</span>
        </div>
        <div class="payment-balance-divider"></div>
        <div class="payment-balance-row">
          <span class="payment-balance-label">支付后余额</span>
          <span class="payment-balance-value">¥${(50000 - pkg.totalPrice).toLocaleString()}</span>
        </div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:16px" onclick="confirmRenewBalancePay()">确认续费</button>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal modal--payment">
        <div class="modal-header">
          <h2 class="modal-title">续费套餐</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function confirmRenewBalancePay() {
  const pkg = GEO_RESOURCE_PACKAGES[currentGeoPackage];
  showToast(`续费成功！「${pkg.name}」有效期已延长至2027-08-20，续费金额¥${pkg.totalPrice.toLocaleString()}`);
  closeModal();
}

// 升级弹窗中直接升级（关闭当前弹窗，一层窗口）
function confirmDirectUpgrade(packageId) {
  closeModal();
  // 关闭升级弹窗后弹出支付弹窗（只有1层）
  setTimeout(() => showGeoPaymentModal(packageId, true), 150);
}

// 未开通用户激活
function activateGeoResource() {
  pendingGeoPackage = 'standard';
  showGeoPaymentModal('standard', false);
}

/* ========================================
   项目提单弹窗
   ======================================== */
function showProjectOrderModal(cdata) {
  let customer = {};
  try {
    customer = JSON.parse(decodeURIComponent(cdata));
  } catch (e) {
    customer = { loginAccount: 'kehui1', company: '钱多多科技有限公司', balance: '¥971.00', assignedEmployee: '厦门钱多多...' };
  }

  const bodyHtml = `
    <div class="order-form-scroll">
      <!-- 客户信息 -->
      <div class="order-header-info">
        <div class="info-item">
          <span class="label">客户账号：</span>
          <span class="value">${customer.loginAccount || 'kehui1'}</span>
        </div>
        <div class="info-item">
          <span class="label">可用余额：</span>
          <span class="value balance">${customer.balance || '¥971.00'}</span>
        </div>
      </div>

      <!-- 主体名称 -->
      <div class="order-form-group">
        <div class="order-form-label">主体名称：</div>
        <input type="text" class="order-input" value="${customer.company || '钱多多科技有限公司'}" readonly>
      </div>

      <!-- 收费模式 -->
      <div class="order-form-group">
        <div class="order-form-label">收费模式：</div>
        <div class="radio-inline-group">
          <label class="radio-inline">
            <input type="radio" name="chargeMode" value="fixed" checked>
            <span>固定收费</span>
          </label>
          <label class="radio-inline">
            <input type="radio" name="chargeMode" value="daily">
            <span>按天收费</span>
            <span class="tag">锁命中</span>
          </label>
        </div>
      </div>

      <!-- 产品选择 -->
      <div class="order-form-group">
        <div class="order-form-label">产品选择：<span class="required-mark">*</span></div>
        <select class="order-select" id="orderProduct">
          <option value="">-- 请选择产品 --</option>
          <option value="seo">GEO收录优化</option>
          <option value="article">AI文章生成</option>
          <option value="keyword">关键词排名</option>
          <option value="brand">品牌保护</option>
        </select>
      </div>

      <!-- 时长选择 -->
      <div class="order-form-group">
        <div class="order-form-label">时长选择：<span class="required-mark">*</span></div>
        <select class="order-select" id="orderDuration">
          <option value="">-- 请选择时长 --</option>
          <option value="1">1个月</option>
          <option value="3">3个月</option>
          <option value="6">6个月</option>
          <option value="12">12个月</option>
        </select>
      </div>

      <!-- 价格 -->
      <div class="order-form-group">
        <div class="order-form-label">价　格：<span class="required-mark">*</span></div>
        <input type="text" class="order-input" id="orderPrice" placeholder="请输入价格">
      </div>

      <!-- 项目名称 -->
      <div class="order-form-group">
        <div class="order-form-label">项目名称*：</div>
        <input type="text" class="order-input" id="orderProjectName" placeholder="请输入项目名称（最多100字）" maxlength="100">
      </div>

      <!-- 所属员工 -->
      <div class="order-form-group">
        <div class="order-form-label">所属员工：</div>
        <select class="order-select" id="orderEmployee">
          <option value="">${customer.assignedEmployee || '厦门钱多多...'}</option>
          <option value="emp1">陈小明</option>
          <option value="emp2">林小红</option>
          <option value="emp3">周大伟</option>
          <option value="emp4">赵玉兰</option>
        </select>
      </div>

      <!-- 主关键词 -->
      <div class="order-form-group">
        <div class="order-form-label">主关键词*：</div>
        <textarea class="order-textarea" id="orderMainKeywords" placeholder="请输入关键词，每行一个或逗号一个"></textarea>
        <div class="order-hint">
          最多添加 <span class="warn">5</span> 个，还可输入 <span class="warn">5</span> 个，多余部分自动删除并去重<br>
          <span class="danger">购买关键词请认真填写，下单后则不予修改。</span>
        </div>
      </div>

      <!-- 品牌关键词 -->
      <div class="order-form-group">
        <div class="order-form-label">品牌关键词*：</div>
        <textarea class="order-textarea" id="orderBrandKeywords" placeholder="请输入关键词，每行一个或逗号一个"></textarea>
        <div class="order-hint">
          最多添加 <span class="warn">5</span> 个，还可输入 <span class="warn">5</span> 个，多余部分自动删除并去重
        </div>
      </div>

      <!-- 备注 -->
      <div class="order-form-group">
        <div class="order-form-label">备　注：</div>
        <textarea class="order-textarea" id="orderRemark" placeholder="选填备注信息"></textarea>
      </div>

      <!-- 行业分类 -->
      <div class="order-form-group">
        <div class="order-form-label">行业分类：</div>
        <select class="order-select" id="orderIndustry">
          <option value="">-- 请选择 --</option>
          <option value="tech">科技/互联网</option>
          <option value="finance">金融/投资</option>
          <option value="education">教育/培训</option>
          <option value="medical">医疗/健康</option>
          <option value="retail">零售/电商</option>
          <option value="manufacture">制造/工业</option>
          <option value="media">传媒/广告</option>
          <option value="other">其他</option>
        </select>
      </div>

      <!-- 服务时长 -->
      <div class="order-form-group">
        <div class="order-form-label">服务时长*：</div>
        <div class="order-date-range">
          <input type="date" class="order-input" id="orderStartDate" value="2025-07-01">
          <span class="range-sep">至</span>
          <input type="date" class="order-input" id="orderEndDate" value="2026-07-01">
        </div>
      </div>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal modal--order">
        <div class="modal-header">
          <h2 class="modal-title">项目提单 — 固定收费</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" onclick="submitProjectOrder()">提交</button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function submitProjectOrder() {
  const product = document.getElementById('orderProduct')?.value;
  const duration = document.getElementById('orderDuration')?.value;
  const price = document.getElementById('orderPrice')?.value;
  const projectName = document.getElementById('orderProjectName')?.value;
  const mainKeywords = document.getElementById('orderMainKeywords')?.value;
  const brandKeywords = document.getElementById('orderBrandKeywords')?.value;

  if (!product) { alert('请选择产品'); return; }
  if (!duration) { alert('请选择时长'); return; }
  if (!price) { alert('请输入价格'); return; }
  if (!projectName) { alert('请输入项目名称'); return; }
  if (!mainKeywords) { alert('请输入主关键词'); return; }
  if (!brandKeywords) { alert('请输入品牌关键词'); return; }

  alert('项目提单提交成功！');
  closeModal();
}
