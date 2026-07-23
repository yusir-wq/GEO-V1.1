/**
 * GEO计费系统 V1.1 - 渲染函数
 * 包含工具函数、路由分发、各端口页面渲染
 */

/* ========================================
   图标工具 - 将页面内 emoji/语义名统一转换为 Lucide 图标
   ======================================== */
const EMOJI_ICON_MAP = {
  '📊': 'chart', '📈': 'trending-up', '📉': 'trending-up', '💰': 'banknote', '💵': 'banknote',
  '💳': 'credit-card', '👥': 'users', '👤': 'user', '🏢': 'building', '🏪': 'store',
  '🤝': 'handshake', '📋': 'clipboard-list', '📦': 'package', '🧾': 'receipt',
  '📁': 'folder', '📖': 'book', '📄': 'file-text', '✍️': 'file-signature',
  '✨': 'sparkles', '📤': 'send', '⬇️': 'download', '📢': 'megaphone',
  '🔍': 'search', '🔔': 'bell', '⚠️': 'triangle-alert', '🎯': 'target',
  '✅': 'check', '🔄': 'refresh-cw', '🍩': 'chart', '🔥': 'trending-up',
  '🤖': 'sparkles', '🫘': 'sparkles', '🌙': 'sparkles', '🔮': 'sparkles',
  '💡': 'lightbulb', '💬': 'message-circle', '🎵': 'music', '⚔️': 'swords',
  '↩️': 'rotate-ccw', '⏱️': 'clock'
};

function uiIcon(icon, fallback = 'file-text') {
  if (!icon) return window.getLucideIcon ? window.getLucideIcon(fallback) : '';
  if (typeof icon === 'string' && icon.includes('<svg')) return icon;
  const key = EMOJI_ICON_MAP[icon] || icon;
  return window.getLucideIcon ? window.getLucideIcon(key, fallback) : '';
}

function detectChartType(text = '') {
  const value = String(text);
  if (/饼图|占比|比例|分布|构成|来源/.test(value)) return 'pie';
  if (/横向柱状图/.test(value)) return 'bar-horizontal';
  if (/柱状图|柱图|增长|对比|Top10|热度/.test(value)) return 'bar';
  if (/面积图|声量趋势|活跃度/.test(value)) return 'area';
  if (/雷达|能力|评分|覆盖/.test(value)) return 'radar';
  if (/漏斗|转化/.test(value)) return 'funnel';
  return 'line';
}

/* ========================================
   H 工具对象 - 通用组件生成
   ======================================== */
const H = {

  /**
   * 生成统计卡片网格
   * @param {Array} cards - 卡片配置数组 [{label, value, change, changeDir, icon, color}]
   * @returns {string} HTML字符串
   */
  stats(cards) {
    return `<div class="stats-grid">${cards.map(c => `
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">${c.label}</span>
          <div class="stat-card-icon ${c.color || 'blue'}">${uiIcon(c.icon, 'chart')}</div>
        </div>
        <div class="stat-card-value">${c.value}</div>
        ${c.change ? `<div class="stat-card-change ${c.changeDir || 'up'}">${c.changeDir === 'up' ? '↑' : '↓'} ${c.change}</div>` : ''}
      </div>`).join('')}</div>`;
  },

  /**
   * 生成数据表格
   * @param {Object} config - 表格配置 {title, count, columns, rows, actions}
   * @returns {string} HTML字符串
   */
  table(config) {
    const thHtml = config.columns.map(col => `<th>${col.label}</th>`).join('');
    const trHtml = config.rows.map(row => {
      const tdHtml = config.columns.map(col => {
        if (col.render) return `<td>${col.render(row[col.key], row)}</td>`;
        return `<td>${row[col.key] || '-'}</td>`;
      }).join('');
      return `<tr>${tdHtml}</tr>`;
    }).join('');

    return `
      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar-left">
            <span class="table-toolbar-title">${config.title}</span>
            ${config.count ? `<span class="table-toolbar-count">共 ${config.count} 条</span>` : ''}
          </div>
          <div class="table-toolbar-right">
            <div class="table-search">
              <span class="table-search-icon">${uiIcon('search', 'search')}</span>
              <input type="text" placeholder="搜索...">
            </div>
            ${config.actions || ''}
          </div>
        </div>
        <table class="data-table">
          <thead><tr>${thHtml}</tr></thead>
          <tbody>${trHtml}</tbody>
        </table>
        <div class="pagination">
          <div class="pagination-info">显示 1-${config.rows.length} 条，共 ${config.count || config.rows.length} 条</div>
          <div class="pagination-pages">
            <button class="pagination-btn disabled">‹</button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">›</button>
          </div>
        </div>
      </div>`;
  },

  /**
   * 生成页头
   * @param {string} title - 页面标题
   * @param {string} desc - 描述文字
   * @param {string} actions - 右侧操作按钮HTML
   * @returns {string} HTML字符串
   */
  pageHeader(title, desc, actions) {
    return `
      <div class="page-header">
        <div class="page-header-left">
          <h1 class="page-header-title">${title}</h1>
          ${desc ? `<p class="page-header-desc">${desc}</p>` : ''}
        </div>
        ${actions ? `<div class="page-header-actions">${actions}</div>` : ''}
      </div>`;
  },

  /**
   * 生成图表行（两列布局）
   * @param {Array} charts - 图表配置数组 [{title, subtitle, icon}]
   * @returns {string} HTML字符串
   */
  chartRow(charts) {
    return `<div class="chart-row">${charts.map(c => `
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-card-title-group">
            <span class="chart-card-icon">${uiIcon(c.icon, 'chart')}</span>
            <div>
              <div class="chart-card-title">${c.title}</div>
              ${c.subtitle ? `<div class="chart-card-subtitle">${c.subtitle}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="chart-placeholder" data-chart-type="${c.type || detectChartType(c.placeholder || c.title)}" data-chart-title="${c.title}" data-chart-desc="${c.placeholder || c.subtitle || ''}"></div>
      </div>`).join('')}</div>`;
  },

  /**
   * 生成标签行
   * @param {Array} tabs - 标签配置 [{id, label, active}]
   * @param {string} content - 标签内容HTML
   * @returns {string} HTML字符串
   */
  tabRow(tabs, content) {
    const tabHtml = tabs.map(t =>
      `<div class="tab-item ${t.active ? 'active' : ''}" data-tab="${t.id}">${t.label}</div>`
    ).join('');
    return `
      <div class="tabs">${tabHtml}</div>
      <div class="tab-content">${content}</div>`;
  }
};

/* ========================================
   renderContent() 路由分发函数
   ======================================== */
function renderContent(port, pageId) {
  switch (port) {
    case 'admin':
      return renderAdmin(pageId);
    case 'tenant':
      return renderTenant(pageId);
    case 'agent':
      return renderAgent(pageId);
    case 'enduser':
      return renderEndUser(pageId);
    default:
      return `<div class="empty-state"><span class="empty-icon">${uiIcon('triangle-alert', 'triangle-alert')}</span><div class="empty-title">未知端口</div></div>`;
  }
}

/* ========================================
   renderAdmin() 超级管理员页面
   ======================================== */
function renderAdmin(pageId) {
  switch (pageId) {
    case 'admin-dashboard':
      return renderAdminDashboard();
    case 'admin-saas-users':
      return renderAdminSaasUsers();
    case 'admin-employees':
      return renderAdminEmployees();
    case 'admin-roles':
      return renderAdminRoles();
    case 'admin-media':
      return window.renderAdminMedia ? window.renderAdminMedia() : renderAdminMediaFallback();
    case 'admin-finance':
      return renderFinance('admin');
    case 'admin-settings':
      return renderAdminSettings();
    case 'admin-announcements':
      return renderAdminAnnouncements();
    case 'admin-logs':
      return renderAdminLogs();
    case 'admin-account':
      return renderAdminAccount();
    case 'admin-sitefarm-templates':
      return renderAdminSitefarmTemplates();
    case 'admin-tdk-variables':
      return renderAdminTdkVariables();
    case 'admin-sitefarm-saas-users':
      return renderAdminSitefarmSaasUsers();
    default:
      return H.pageHeader('页面未找到', '该页面不存在');
  }
}

/* --- 超级管理员 - 工作台 --- */
function renderAdminDashboard() {
  return H.pageHeader('工作台', '系统运营概览') +
    H.stats([
      { label: 'SAAS租户总数', value: '128', change: '12% 较上月', changeDir: 'up', icon: '🏢', color: 'blue' },
      { label: '活跃代理商', value: '356', change: '8% 较上月', changeDir: 'up', icon: '🤝', color: 'green' },
      { label: '终端用户数', value: '12,847', change: '23% 较上月', changeDir: 'up', icon: '👥', color: 'purple' },
      { label: '本月营收', value: '¥856,320', change: '15% 较上月', changeDir: 'up', icon: '💰', color: 'orange' }
    ]) +
    H.chartRow([
      { title: '营收趋势', subtitle: '近6个月营收数据', icon: '📈', placeholder: '折线图 - 营收趋势' },
      { title: '用户增长', subtitle: '各端口用户注册趋势', icon: '📊', placeholder: '柱状图 - 用户增长' }
    ]);
}

/* --- 超级管理员 - SAAS用户管理 --- */
function renderAdminSaasUsers() {
  return H.pageHeader('SAAS用户管理', '管理所有SAAS租户账户',
    '<button class="btn btn-primary" onclick="showModal(\'create-saas-user\')">+ 创建租户</button>'
  ) +
    H.table({
      title: '租户列表',
      count: 128,
      columns: [
        { key: 'company', label: '企业名称' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'plan', label: '套餐版本' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '正常' ? 'success' : val === '过期' ? 'danger' : 'warning'}">${val}</span>` },
        { key: 'created', label: '创建时间' },
        { key: 'actions', label: '操作', render: (val, row) =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">禁用</button></div>'
        }
      ],
      rows: [
        { company: '杭州星辰科技有限公司', contact: '张经理', phone: '138****5678', plan: '旗舰版', status: '正常', created: '2025-03-15' },
        { company: '上海云帆网络科技', contact: '李总', phone: '139****1234', plan: '专业版', status: '正常', created: '2025-04-22' },
        { company: '北京智联传媒有限公司', contact: '王主管', phone: '136****9876', plan: '旗舰版', status: '正常', created: '2025-05-10' },
        { company: '深圳海纳百川科技', contact: '赵经理', phone: '137****4567', plan: '基础版', status: '过期', created: '2025-01-08' },
        { company: '广州万通信息技术', contact: '刘总', phone: '135****3456', plan: '专业版', status: '正常', created: '2025-06-01' }
      ]
    });
}

/* --- 超级管理员 - 员工管理 --- */
function renderAdminEmployees() {
  return H.pageHeader('员工管理', '管理系统内部员工账号',
    '<button class="btn btn-primary">+ 添加员工</button>'
  ) +
    H.table({
      title: '员工列表',
      count: 24,
      columns: [
        { key: 'name', label: '姓名' },
        { key: 'dept', label: '部门' },
        { key: 'role', label: '角色' },
        { key: 'phone', label: '手机号' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '在职' ? 'success' : 'danger'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { name: '陈晓明', dept: '技术部', role: '超级管理员', phone: '138****0001', status: '在职' },
        { name: '林小红', dept: '运营部', role: '运营主管', phone: '138****0002', status: '在职' },
        { name: '周大伟', dept: '财务部', role: '财务专员', phone: '138****0003', status: '在职' },
        { name: '吴美丽', dept: '客服部', role: '客服专员', phone: '138****0004', status: '在职' }
      ]
    });
}

/* --- 超级管理员 - 消息公告 --- */
function renderAdminAnnouncements() {
  return H.pageHeader('消息公告', '发布和管理系统公告',
    '<button class="btn btn-primary">+ 发布公告</button>'
  ) +
    H.table({
      title: '公告列表',
      count: 15,
      columns: [
        { key: 'title', label: '公告标题' },
        { key: 'type', label: '类型', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'author', label: '发布人' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '已发布' ? 'success' : 'warning'}">${val}</span>` },
        { key: 'date', label: '发布时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { title: '系统升级通知 - V1.1版本发布', type: '系统通知', author: '陈晓明', status: '已发布', date: '2025-06-01' },
        { title: '端午节放假安排通知', type: '节假日', author: '林小红', status: '已发布', date: '2025-05-28' },
        { title: '新功能上线：AI文章生成', type: '功能更新', author: '陈晓明', status: '已发布', date: '2025-05-20' },
        { title: '服务器维护通知', type: '系统通知', author: '陈晓明', status: '草稿', date: '-' }
      ]
    });
}

/* --- 超级管理员 - 运营分析 --- */
function renderAdminAnalytics() {
  return H.pageHeader('运营分析', '平台整体运营数据分析') +
    H.stats([
      { label: '今日活跃用户', value: '3,256', change: '5.2%', changeDir: 'up', icon: '👤', color: 'blue' },
      { label: '今日订单数', value: '89', change: '12%', changeDir: 'up', icon: '📋', color: 'green' },
      { label: '转化率', value: '23.5%', change: '1.8%', changeDir: 'down', icon: '🎯', color: 'orange' },
      { label: '客户满意度', value: '4.8/5', change: '0.2', changeDir: 'up', icon: '⭐', color: 'purple' }
    ]) +
    H.chartRow([
      { title: '用户活跃度', subtitle: '近30天DAU/MAU', icon: '📈', placeholder: '面积图 - 用户活跃度' },
      { title: '订单分布', subtitle: '各套餐订单占比', icon: '🍩', placeholder: '饼图 - 订单分布' }
    ]) +
    H.chartRow([
      { title: '端口使用分布', subtitle: '各端口活跃度对比', icon: '📊', placeholder: '柱状图 - 端口分布' },
      { title: '功能使用热度', subtitle: 'Top10功能使用频次', icon: '🔥', placeholder: '横向柱状图 - 功能热度' }
    ]);
}

/* --- 超级管理员 - 系统设置 --- */
function renderAdminSettings() {
  const tabsContent = `
    <div class="form">
      <div class="form-group">
        <label class="form-label">系统名称 <span class="required">*</span></label>
        <input type="text" class="form-input" value="GEO计费系统" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">默认语言</label>
          <select class="form-select">
            <option selected>简体中文</option>
            <option>English</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">时区</label>
          <select class="form-select">
            <option selected>Asia/Shanghai (UTC+8)</option>
            <option>Asia/Tokyo (UTC+9)</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">系统Logo</label>
        <input type="file" class="form-input" />
        <div class="form-hint">建议尺寸 200x60px，支持PNG/JPG格式</div>
      </div>
      <div class="form-group">
        <label class="form-label">API接口地址</label>
        <input type="text" class="form-input" value="https://api.geo-billing.com/v1" />
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存设置</button>
        <button class="btn btn-secondary">重置</button>
      </div>
    </div>`;

  return H.pageHeader('系统设置', '全局系统参数配置') +
    H.tabRow([
      { id: 'basic', label: '基本设置', active: true },
      { id: 'security', label: '安全设置' },
      { id: 'notification', label: '通知设置' },
      { id: 'api', label: '接口配置' }
    ], tabsContent);
}

/* ========================================
   renderDashboard() 共享工作台
   ======================================== */
function renderDashboard(port, stats, charts) {
  return H.pageHeader('工作台', '业务概览与数据总览') +
    H.stats(stats) +
    (charts ? H.chartRow(charts) : '');
}

/* ========================================
   renderFinance() 共享财务页面
   ======================================== */
function renderFinance(port) {
  let statsData, tableData;

  if (port === 'admin') {
    statsData = [
      { label: '平台总营收', value: '¥3,256,800', change: '18% 较上月', changeDir: 'up', icon: '💰', color: 'blue' },
      { label: '本月收入', value: '¥856,320', change: '15% 较上月', changeDir: 'up', icon: '📈', color: 'green' },
      { label: '待结算金额', value: '¥125,600', change: '3笔待处理', changeDir: 'up', icon: '⏳', color: 'orange' },
      { label: '退款金额', value: '¥12,350', change: '2笔退款', changeDir: 'down', icon: '↩️', color: 'red' }
    ];
    tableData = {
      title: '财务流水明细',
      count: 256,
      rows: [
        { id: 'TXN20250601001', type: '租户充值', amount: '+¥50,000', balance: '¥1,256,800', port: '租户-星辰科技', time: '2025-06-01 10:23' },
        { id: 'TXN20250601002', type: '订单收入', amount: '+¥8,500', balance: '¥1,306,800', port: '代理商-李总', time: '2025-06-01 11:05' },
        { id: 'TXN20250601003', type: '退款', amount: '-¥2,000', balance: '¥1,304,800', port: '终端用户-王女士', time: '2025-06-01 14:30' },
        { id: 'TXN20250531001', type: '订单收入', amount: '+¥12,000', balance: '¥1,306,800', port: '代理商-赵总', time: '2025-05-31 16:45' },
        { id: 'TXN20250531002', type: '平台服务费', amount: '-¥1,200', balance: '¥1,294,800', port: '系统扣费', time: '2025-05-31 23:59' }
      ]
    };
  } else if (port === 'tenant') {
    statsData = [
      { label: '账户余额', value: '¥256,800', change: '已充值', changeDir: 'up', icon: '💰', color: 'blue' },
      { label: '本月收入', value: '¥128,500', change: '22% 较上月', changeDir: 'up', icon: '📈', color: 'green' },
      { label: '本月支出', value: '¥45,200', change: '8% 较上月', changeDir: 'up', icon: '📉', color: 'orange' },
      { label: '待收款', value: '¥32,000', change: '5笔待收', changeDir: 'up', icon: '⏳', color: 'purple' }
    ];
    tableData = {
      title: '财务流水明细',
      count: 89,
      rows: [
        { id: 'TXN20250601001', type: '代理商充值', amount: '+¥20,000', balance: '¥256,800', port: '代理商-李总', time: '2025-06-01 09:15' },
        { id: 'TXN20250601002', type: '订单收入', amount: '+¥5,500', balance: '¥276,800', port: '客户-王女士', time: '2025-06-01 10:30' },
        { id: 'TXN20250601003', type: '服务采购', amount: '-¥8,000', balance: '¥268,800', port: '媒体采购', time: '2025-06-01 14:00' }
      ]
    };
  } else {
    statsData = [
      { label: '账户余额', value: '¥15,800', change: '可用余额', changeDir: 'up', icon: '💰', color: 'blue' },
      { label: '本月消费', value: '¥8,500', change: '套餐扣费', changeDir: 'up', icon: '💳', color: 'orange' },
      { label: '累计充值', value: '¥50,000', change: '充值3次', changeDir: 'up', icon: '📈', color: 'green' },
      { label: '待支付', value: '¥0', change: '无待支付', changeDir: 'up', icon: '✅', color: 'green' }
    ];
    tableData = {
      title: '财务记录',
      count: 23,
      rows: [
        { id: 'TXN20250601001', type: '套餐续费', amount: '-¥8,500', balance: '¥15,800', port: 'GEO标准套餐', time: '2025-06-01 00:00' },
        { id: 'TXN20250515001', type: '充值', amount: '+¥20,000', balance: '¥24,300', port: '在线支付', time: '2025-05-15 14:20' },
        { id: 'TXN20250501001', type: '套餐续费', amount: '-¥8,500', balance: '¥4,300', port: 'GEO标准套餐', time: '2025-05-01 00:00' }
      ]
    };
  }

  return H.pageHeader(port === 'admin' ? '财务流水' : port === 'tenant' ? '财务管理' : '财务记录', '收支明细与账户概览') +
    H.stats(statsData) +
    H.table({
      title: tableData.title,
      count: tableData.count,
      columns: [
        { key: 'id', label: '交易编号' },
        { key: 'type', label: '交易类型' },
        { key: 'amount', label: '金额', render: (val) => `<span class="${val.startsWith('+') ? 'text-success' : 'text-danger'}" style="font-weight:600">${val}</span>` },
        { key: 'balance', label: '余额' },
        { key: 'port', label: '来源/去向' },
        { key: 'time', label: '时间' }
      ],
      rows: tableData.rows
    });
}

/* ========================================
   renderTenant() 租户管理页面
   ======================================== */
function renderTenant(pageId) {
  switch (pageId) {
    case 'tenant-dashboard':
      return renderDashboard('tenant', [
        { label: '代理商数量', value: '45', change: '3个本月新增', changeDir: 'up', icon: '🤝', color: 'blue' },
        { label: '客户总数', value: '1,256', change: '12% 较上月', changeDir: 'up', icon: '👥', color: 'green' },
        { label: '本月订单', value: '89', change: '15% 较上月', changeDir: 'up', icon: '📋', color: 'orange' },
        { label: '本月营收', value: '¥128,500', change: '22% 较上月', changeDir: 'up', icon: '💰', color: 'purple' }
      ], [
        { title: '订单趋势', subtitle: '近6个月订单数据', icon: '📈', placeholder: '折线图 - 订单趋势' },
        { title: '套餐销售分布', subtitle: '各套餐销售占比', icon: '🍩', placeholder: '饼图 - 套餐分布' }
      ]);
    case 'tenant-projects':
      return renderTenantProjects();
    case 'tenant-customers':
      return renderTenantCustomers();
    case 'tenant-agents':
      return renderTenantAgents();
    case 'tenant-products':
      return renderTenantProducts();
    case 'tenant-ai-article':
      return renderTenantAiArticle();
    case 'tenant-geo-articles':
      return renderTenantGeoArticles();
    case 'tenant-knowledge':
      return renderTenantKnowledge();
    case 'tenant-media':
      return window.renderTenantMedia ? window.renderTenantMedia() : renderTenantMediaFallback();
    case 'tenant-reports':
      return renderTenantReports();
    case 'tenant-crawl':
      return renderTenantCrawl();
    case 'tenant-cases':
      return renderTenantCases();
    case 'tenant-finance':
      return renderFinance('tenant');
    case 'tenant-employees':
      return renderTenantEmployees();
    case 'tenant-settings':
      return renderTenantSettings();
    case 'tenant-announcements':
      return renderTenantAnnouncements();
    case 'tenant-messages':
      return renderTenantMessages();
    case 'tenant-logs':
      return renderTenantLogs();
    case 'tenant-account':
      return renderTenantAccount();
    case 'tenant-report-settings':
      return renderReportSettings();
    case 'tenant-collection-settings':
      return renderTenantCollectionSettings();
    case 'tenant-sitefarm-profiles':
      return renderTenantSitefarmProfiles();
    case 'tenant-sitefarm-templates':
      return renderTenantSitefarmTemplates();
    case 'tenant-training-words':
      return renderTenantTrainingWords();
    case 'tenant-tdk-templates':
      return renderTenantTdkTemplates();
    case 'tenant-kuaitong':
      return renderTenantKuaitong();
    default:
      return H.pageHeader('页面未找到', '该页面不存在');
  }
}

/* --- 租户 - 代理商管理 --- */
function renderTenantAgents() {
  return H.pageHeader('代理商管理', '管理下级代理商信息',
    '<button class="btn btn-primary">+ 添加代理商</button>'
  ) +
    H.table({
      title: '代理商列表',
      count: 45,
      columns: [
        { key: 'name', label: '代理商名称' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'level', label: '等级', render: (val) => `<span class="badge badge-${val === '金牌' ? 'warning' : val === '银牌' ? 'info' : 'neutral'}">${val}</span>` },
        { key: 'clients', label: '客户数' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '正常' ? 'success' : 'danger'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">详情</button><button class="btn btn-ghost btn-sm">编辑</button></div>'
        }
      ],
      rows: [
        { name: '杭州优联科技', contact: '李总', phone: '138****5678', level: '金牌', clients: 86, status: '正常' },
        { name: '上海锐智传媒', contact: '赵经理', phone: '139****1234', level: '银牌', clients: 45, status: '正常' },
        { name: '北京博纳科技', contact: '王总', phone: '136****9876', level: '铜牌', clients: 23, status: '正常' },
        { name: '深圳创想网络', contact: '刘经理', phone: '137****4567', level: '银牌', clients: 38, status: '正常' },
        { name: '广州天际信息', contact: '陈总', phone: '135****3456', level: '金牌', clients: 92, status: '正常' }
      ]
    });
}

/* --- 租户 - 产品套餐 --- */
function renderTenantProducts() {
  return H.pageHeader('产品套餐', '管理GEO产品套餐定价',
    '<button class="btn btn-primary">+ 新建套餐</button>'
  ) +
    `<div class="card-grid">
      <div class="card-item">
        <div class="card-item-title">GEO基础套餐</div>
        <div class="card-item-desc">适合中小企业，包含基础GEO优化服务</div>
        <div class="card-item-footer">
          <div class="card-item-price">¥3,800<span style="font-size:12px;color:#94A3B8;font-weight:400">/月</span></div>
          <span class="badge badge-success">在售</span>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-title">GEO标准套餐</div>
        <div class="card-item-desc">适合中型企业，含多平台GEO优化与监测</div>
        <div class="card-item-footer">
          <div class="card-item-price">¥8,500<span style="font-size:12px;color:#94A3B8;font-weight:400">/月</span></div>
          <span class="badge badge-success">在售</span>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-title">GEO旗舰套餐</div>
        <div class="card-item-desc">适合大型企业，全平台GEO优化+AI内容生成</div>
        <div class="card-item-footer">
          <div class="card-item-price">¥15,800<span style="font-size:12px;color:#94A3B8;font-weight:400">/月</span></div>
          <span class="badge badge-success">在售</span>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-title">GEO定制套餐</div>
        <div class="card-item-desc">根据企业需求定制专属GEO服务方案</div>
        <div class="card-item-footer">
          <div class="card-item-price">面议</div>
          <span class="badge badge-info">定制</span>
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-title">AI内容增强包</div>
        <div class="card-item-desc">AI文章生成+媒体投稿增值服务</div>
        <div class="card-item-footer">
          <div class="card-item-price">¥2,000<span style="font-size:12px;color:#94A3B8;font-weight:400">/月</span></div>
          <span class="badge badge-success">在售</span>
        </div>
      </div>
      <div class="card-item" style="border:2px dashed #E2E8F0;display:flex;align-items:center;justify-content:center;min-height:140px">
        <div style="text-align:center;color:#94A3B8">
          <div style="font-size:24px;margin-bottom:8px">+</div>
          <div style="font-size:13px">新建套餐</div>
        </div>
      </div>
    </div>`;
}

/* --- 租户 - 订单管理 --- */
function renderTenantOrders() {
  return H.pageHeader('订单管理', '查看和管理所有业务订单',
    '<button class="btn btn-secondary">导出订单</button>'
  ) +
    H.table({
      title: '订单列表',
      count: 89,
      columns: [
        { key: 'id', label: '订单号' },
        { key: 'customer', label: '客户名称' },
        { key: 'product', label: '产品' },
        { key: 'amount', label: '金额' },
        { key: 'status', label: '状态', render: (val) => {
          const map = { '待确认': 'warning', '进行中': 'info', '已完成': 'success', '已取消': 'neutral' };
          return `<span class="badge badge-${map[val] || 'neutral'}">${val}</span>`;
        }},
        { key: 'date', label: '下单时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">详情</button><button class="btn btn-ghost btn-sm">处理</button></div>'
        }
      ],
      rows: [
        { id: 'ORD20250601001', customer: '杭州星辰科技', product: 'GEO标准套餐', amount: '¥8,500', status: '待确认', date: '2025-06-01' },
        { id: 'ORD20250601002', customer: '上海云帆网络', product: 'GEO旗舰套餐', amount: '¥15,800', status: '进行中', date: '2025-06-01' },
        { id: 'ORD20250531001', customer: '北京智联传媒', product: 'GEO基础套餐', amount: '¥3,800', status: '已完成', date: '2025-05-31' },
        { id: 'ORD20250530001', customer: '深圳海纳百川', product: 'AI内容增强包', amount: '¥2,000', status: '已取消', date: '2025-05-30' }
      ]
    });
}

/* --- 租户 - 客户管理 --- */
function renderTenantCustomers() {
  const columns = [
    { key: 'index', label: '序号' },
    { key: 'customerId', label: '客户ID' },
    { key: 'loginAccount', label: '登录账号' },
    { key: 'company', label: '主体名称/公司' },
    { key: 'customerType', label: '客户属性' },
    { key: 'group', label: '分组' },
    { key: 'idType', label: '证件类型' },
    { key: 'idNumber', label: '证件号码' },
    { key: 'industry', label: '行业分类' },
    { key: 'contactPerson', label: '联系人' },
    { key: 'contactInfo', label: '联系方式' },
    { key: 'assignedEmployee', label: '所属员工' },
    { key: 'projectCount', label: '项目数' },
    { key: 'balance', label: '余额' },
    { key: 'frozenBalance', label: '冻结余额' },
    { key: 'createdAt', label: '创建时间' },
    { key: 'lastLogin', label: '最近登录' },
    { key: 'remark', label: '备注' },
    { key: 'expireAt', label: '账号到期时间' },
    { key: 'status', label: '状态' },
    { key: 'actions', label: '操作' }
  ];

  const rows = [
    {
      index: 1, customerId: 'C001', loginAccount: 'zhangjingli', company: '杭州星辰科技有限公司',
      customerType: '企业', group: 'VIP客户', idType: '营业执照', idNumber: '91330100MA2********',
      industry: '科技', contactPerson: '张经理',
      contactInfo: { phone: '138****5678', email: 'zhang@xingchen.com', qq: '12****89', wechat: 'zj****li', other: '-' },
      assignedEmployee: '陈小明', projectCount: 5, balance: '¥50,000.00', frozenBalance: '¥0.00',
      createdAt: '2025-01-15', lastLogin: '2025-06-22', remark: '', expireAt: '2026-01-15', status: '正常'
    },
    {
      index: 2, customerId: 'C002', loginAccount: 'lizong_sh', company: '上海云帆网络科技有限公司',
      customerType: '企业', group: 'VIP客户', idType: '营业执照', idNumber: '91310115MA1********',
      industry: '互联网', contactPerson: '李总',
      contactInfo: { phone: '139****1234', email: 'lizong@yunfan.cn', qq: '23****56', wechat: 'lz_yunfan', other: '-' },
      assignedEmployee: '林小红', projectCount: 3, balance: '¥128,500.00', frozenBalance: '¥5,000.00',
      createdAt: '2025-02-20', lastLogin: '2025-06-21', remark: '重点客户', expireAt: '2026-02-20', status: '正常'
    },
    {
      index: 3, customerId: 'C003', loginAccount: 'wangzhuguan', company: '北京智联传媒有限公司',
      customerType: '企业', group: '普通客户', idType: '营业执照', idNumber: '91110108MA0********',
      industry: '传媒', contactPerson: '王主管',
      contactInfo: { phone: '136****9876', email: 'wang@zhilian.com', qq: '34****67', wechat: 'wz_zlcm', other: '-' },
      assignedEmployee: '周大伟', projectCount: 2, balance: '¥2,350.00', frozenBalance: '¥0.00',
      createdAt: '2025-03-10', lastLogin: '2025-06-18', remark: '即将续费', expireAt: '2025-07-10', status: '即将到期'
    },
    {
      index: 4, customerId: 'C004', loginAccount: 'liuzong_wt', company: '广州万通信息技术有限公司',
      customerType: '企业', group: '普通客户', idType: '营业执照', idNumber: '91440101MA5********',
      industry: '信息技术', contactPerson: '刘总',
      contactInfo: { phone: '135****3456', email: 'liu@wantong.com', qq: '45****78', wechat: 'lz_wtxx', other: '-' },
      assignedEmployee: '吴美丽', projectCount: 1, balance: '¥15,800.00', frozenBalance: '¥0.00',
      createdAt: '2025-04-05', lastLogin: '2025-06-15', remark: '', expireAt: '2026-04-05', status: '正常'
    },
    {
      index: 5, customerId: 'C005', loginAccount: 'chenzong_sz', company: '深圳前沿科技有限公司',
      customerType: '企业', group: 'VIP客户', idType: '营业执照', idNumber: '91440300MA5********',
      industry: '硬件制造', contactPerson: '陈总',
      contactInfo: { phone: '137****7890', email: 'chen@qianyan.cn', qq: '56****90', wechat: 'cz_qytech', other: '-' },
      assignedEmployee: '陈小明', projectCount: 8, balance: '¥89,200.00', frozenBalance: '¥12,000.00',
      createdAt: '2024-11-01', lastLogin: '2025-06-22', remark: '大客户', expireAt: '2025-11-01', status: '正常'
    },
    {
      index: 6, customerId: 'C006', loginAccount: 'huangjingli', company: '成都锦程贸易有限公司',
      customerType: '企业', group: '普通客户', idType: '营业执照', idNumber: '91510100MA6********',
      industry: '贸易', contactPerson: '黄经理',
      contactInfo: { phone: '134****6789', email: 'huang@jincheng.cn', qq: '67****01', wechat: 'hj_jincheng', other: '-' },
      assignedEmployee: '赵玉兰', projectCount: 1, balance: '¥3,800.00', frozenBalance: '¥3,800.00',
      createdAt: '2025-05-12', lastLogin: '2025-06-10', remark: '', expireAt: '2025-08-12', status: '正常'
    },
    {
      index: 7, customerId: 'C007', loginAccount: 'wangwd', company: '王大伟（个人）',
      customerType: '个人', group: '普通客户', idType: '身份证', idNumber: '3301**********1234',
      industry: '自媒体', contactPerson: '王大伟',
      contactInfo: { phone: '158****9012', email: 'wangdw@qq.com', qq: '78****12', wechat: 'wdw_media', other: '抖音号: @大伟说科技' },
      assignedEmployee: '林小红', projectCount: 1, balance: '¥1,200.00', frozenBalance: '¥0.00',
      createdAt: '2025-06-01', lastLogin: '2025-06-22', remark: '个人自媒体', expireAt: '2026-06-01', status: '正常'
    },
    {
      index: 8, customerId: 'C008', loginAccount: 'dingzong', company: '南京博纳生物科技有限公司',
      customerType: '企业', group: '普通客户', idType: '营业执照', idNumber: '91320100MA1********',
      industry: '生物医药', contactPerson: '丁总',
      contactInfo: { phone: '133****3456', email: 'ding@bona-bio.cn', qq: '89****23', wechat: 'dz_bona', other: '-' },
      assignedEmployee: '周大伟', projectCount: 3, balance: '¥45,600.00', frozenBalance: '¥0.00',
      createdAt: '2024-08-20', lastLogin: '2025-04-05', remark: '已3个月未登录', expireAt: '2025-08-20', status: '已禁用'
    }
  ];

  const thHtml = columns.map(col => `<th>${col.label}</th>`).join('');
  const trHtml = rows.map(row => {
    const tdHtml = columns.map(col => {
      const key = col.key;
      if (key === 'status') {
        const map = { '正常': 'success', '即将到期': 'warning', '已禁用': 'danger' };
        const cls = map[row[key]] || 'neutral';
        return `<td><span class="badge badge-${cls}" style="white-space:nowrap">${row[key]}</span></td>`;
      }
      if (key === 'contactInfo') {
        const c = row[key];
        return `<td style="font-size:12px;line-height:1.6;white-space:nowrap">
          <span title="手机">📱</span>${c.phone}<br>
          <span title="邮箱">📧</span>${c.email}<br>
          <span title="QQ">💬</span>${c.qq}<br>
          <span title="微信">💚</span>${c.wechat}
          ${c.other !== '-' ? `<br><span title="其他">📎</span>${c.other}` : ''}
        </td>`;
      }
      if (key === 'actions') {
        const cdata = encodeURIComponent(JSON.stringify({
          customerId: row.customerId,
          loginAccount: row.loginAccount,
          company: row.company,
          balance: row.balance,
          assignedEmployee: row.assignedEmployee
        }));
        return `<td style="white-space:nowrap">
          <div class="table-actions" style="gap:4px;flex-wrap:wrap">
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px">修改</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px;color:#F59E0B">充值</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px;color:#6366F1">价格</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px" onclick="showProjectOrderModal('${cdata}')">提单</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px;color:#10B981">登录</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px;color:#8B5CF6">实名</button>
            <button class="btn btn-ghost btn-sm" style="padding:3px 7px;font-size:11px;color:#EF4444">禁用</button>
          </div>
        </td>`;
      }
      return `<td style="white-space:nowrap">${row[key] !== undefined ? row[key] : '-'}</td>`;
    }).join('');
    return `<tr>${tdHtml}</tr>`;
  }).join('');

  const tableHtml = `
    <div class="table-container" style="overflow-x:auto">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">客户列表</span>
          <span class="table-toolbar-count">共 ${rows.length} 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="table-search">
            <span class="table-search-icon">${uiIcon('search', 'search')}</span>
            <input type="text" placeholder="搜索...">
          </div>
        </div>
      </div>
      <table class="data-table" style="min-width:2000px;table-layout:auto">
        <thead><tr>${thHtml}</tr></thead>
        <tbody>${trHtml}</tbody>
      </table>
      <div class="pagination">
        <div class="pagination-info">显示 1-${rows.length} 条，共 ${rows.length} 条</div>
        <div class="pagination-pages">
          <button class="pagination-btn disabled">‹</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn">›</button>
        </div>
      </div>
    </div>`;

  return H.pageHeader('客户管理', '管理终端客户信息',
    '<button class="btn btn-primary">+ 添加客户</button>'
  ) + tableHtml;
}

/* --- 租户 - 项目管理 (已迁移至 pages/sitefarm/tenant/project-management.js) --- */
function renderTenantProjects() {
  return window.renderTenantProjects ? window.renderTenantProjects() : '<div class="empty-state">项目管理模块未加载</div>';
}

/* --- 租户 - 企业知识库 --- */
function renderTenantKnowledge() {
  return H.pageHeader('企业知识库', '管理企业知识文档和资料',
    '<button class="btn btn-primary">+ 上传文档</button>'
  ) +
    H.table({
      title: '文档列表',
      count: 34,
      columns: [
        { key: 'title', label: '文档标题' },
        { key: 'category', label: '分类', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'author', label: '上传人' },
        { key: 'size', label: '大小' },
        { key: 'date', label: '更新时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">下载</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { title: 'GEO优化操作手册V2.0', category: '操作指南', author: '林小红', size: '2.4MB', date: '2025-05-28' },
        { title: '产品套餐说明文档', category: '产品资料', author: '周大伟', size: '1.8MB', date: '2025-05-20' },
        { title: '客户服务话术模板', category: '服务规范', author: '吴美丽', size: '560KB', date: '2025-05-15' },
        { title: '行业分析报告-2025Q1', category: '行业报告', author: '林小红', size: '3.2MB', date: '2025-04-10' }
      ]
    });
}

/* --- 租户 - AI文章生成 --- */
function renderTenantAiArticle() {
  return H.pageHeader('AI文章生成', '使用AI智能生成GEO优化文章',
    '<button class="btn btn-primary">+ 生成新文章</button>'
  ) +
    H.table({
      title: '文章列表',
      count: 56,
      columns: [
        { key: 'title', label: '文章标题' },
        { key: 'keywords', label: '关键词' },
        { key: 'platform', label: '目标平台' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '已发布' ? 'success' : val === '待审核' ? 'warning' : 'info'}">${val}</span>` },
        { key: 'date', label: '生成时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">编辑</button></div>'
        }
      ],
      rows: [
        { title: '企业数字化转型中的GEO策略', keywords: '数字化转型,GEO', platform: '百度', status: '已发布', date: '2025-06-01' },
        { title: '2025年SEO行业趋势分析', keywords: 'SEO趋势,行业分析', platform: '知乎', status: '待审核', date: '2025-06-01' },
        { title: '如何提升企业品牌网络曝光度', keywords: '品牌曝光,网络营销', platform: '微信公众号', status: '生成中', date: '2025-05-31' }
      ]
    });
}

/* --- 租户 - 官媒投稿 (已迁移至 pages/sitefarm/tenant/official-media.js) --- */
function renderTenantMediaFallback() {
  return H.pageHeader('媒体投稿', '管理媒体投稿和发布渠道',
    '<button class="btn btn-primary">+ 新建投稿</button>'
  ) +
    H.table({
      title: '投稿记录',
      count: 78,
      columns: [
        { key: 'title', label: '文章标题' },
        { key: 'media', label: '媒体平台' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '已发布' ? 'success' : val === '审核中' ? 'warning' : val === '被退回' ? 'danger' : 'info'}">${val}</span>` },
        { key: 'date', label: '投稿时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">重新投稿</button></div>'
        }
      ],
      rows: [
        { title: '企业数字化转型中的GEO策略', media: '百度百家号', status: '已发布', date: '2025-06-01' },
        { title: 'GEO优化实战经验分享', media: '知乎专栏', status: '审核中', date: '2025-05-31' },
        { title: '品牌网络形象管理指南', media: '搜狐号', status: '被退回', date: '2025-05-30' }
      ]
    });
}

/* --- 租户 - 采集任务 --- */
function renderTenantCrawl() {
  return H.pageHeader('采集任务', '管理数据采集和监控任务',
    '<button class="btn btn-primary">+ 新建任务</button>'
  ) +
    H.table({
      title: '任务列表',
      count: 23,
      columns: [
        { key: 'name', label: '任务名称' },
        { key: 'type', label: '类型', render: (val) => `<span class="badge badge-info">${val}</span>` },
        { key: 'frequency', label: '频率' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '运行中' ? 'success' : val === '已暂停' ? 'warning' : 'neutral'}">${val}</span>` },
        { key: 'lastRun', label: '最近执行' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">暂停</button></div>'
        }
      ],
      rows: [
        { name: '百度排名监控', type: '排名采集', frequency: '每日', status: '运行中', lastRun: '2025-06-01 08:00' },
        { name: '竞品关键词监控', type: '关键词采集', frequency: '每周', status: '运行中', lastRun: '2025-05-28 00:00' },
        { name: '行业资讯采集', type: '内容采集', frequency: '每日', status: '已暂停', lastRun: '2025-05-20 08:00' }
      ]
    });
}

/* --- 租户 - 员工管理 --- */
function renderTenantEmployees() {
  return H.pageHeader('员工管理', '管理企业员工账号和权限',
    '<button class="btn btn-primary">+ 添加员工</button>'
  ) +
    H.table({
      title: '员工列表',
      count: 18,
      columns: [
        { key: 'name', label: '姓名' },
        { key: 'dept', label: '部门' },
        { key: 'role', label: '角色' },
        { key: 'phone', label: '手机号' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '在职' ? 'success' : 'danger'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">禁用</button></div>'
        }
      ],
      rows: [
        { name: '张经理', dept: '管理层', role: '租户管理员', phone: '138****5678', status: '在职' },
        { name: '林小红', dept: '运营部', role: '运营主管', phone: '139****1234', status: '在职' },
        { name: '周大伟', dept: '技术部', role: '技术专员', phone: '136****9876', status: '在职' }
      ]
    });
}

/* --- 租户 - 消息公告（只读） --- */
function renderTenantAnnouncements() {
  return H.pageHeader('消息公告', '查看系统公告和通知') +
    H.table({
      title: '公告列表',
      count: 8,
      columns: [
        { key: 'title', label: '公告标题' },
        { key: 'type', label: '类型', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'author', label: '发布人' },
        { key: 'date', label: '发布时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button></div>'
        }
      ],
      rows: [
        { title: '系统升级通知 - V1.1版本发布', type: '系统通知', author: '系统管理员', date: '2025-06-01' },
        { title: '端午节放假安排通知', type: '节假日', author: '系统管理员', date: '2025-05-28' },
        { title: '新功能上线：AI文章生成', type: '功能更新', author: '系统管理员', date: '2025-05-20' }
      ]
    });
}

/* --- 租户 - 操作日志 --- */
function renderTenantLogs() {
  return H.pageHeader('操作日志', '查看系统操作记录') +
    H.table({
      title: '日志列表',
      count: 456,
      columns: [
        { key: 'operator', label: '操作人' },
        { key: 'action', label: '操作类型' },
        { key: 'target', label: '操作对象' },
        { key: 'ip', label: 'IP地址' },
        { key: 'time', label: '操作时间' }
      ],
      rows: [
        { operator: '张经理', action: '登录系统', target: '-', ip: '192.168.1.100', time: '2025-06-01 09:00:15' },
        { operator: '林小红', action: '创建订单', target: 'ORD20250601001', ip: '192.168.1.101', time: '2025-06-01 09:15:32' },
        { operator: '张经理', action: '修改套餐', target: 'GEO标准套餐', ip: '192.168.1.100', time: '2025-06-01 10:30:00' },
        { operator: '周大伟', action: '上传文档', target: '操作手册V2.0', ip: '192.168.1.102', time: '2025-06-01 11:20:45' }
      ]
    });
}

/* --- 租户 - 数据报表 --- */
function renderTenantReports() {
  return H.pageHeader('数据报表', '业务数据统计与分析') +
    H.stats([
      { label: '本月订单总额', value: '¥128,500', change: '22% 较上月', changeDir: 'up', icon: '💰', color: 'blue' },
      { label: '客户续费率', value: '92.3%', change: '3.5% 较上月', changeDir: 'up', icon: '🔄', color: 'green' },
      { label: '平均项目周期', value: '45天', change: '缩短5天', changeDir: 'up', icon: '⏱️', color: 'orange' },
      { label: '客户满意度', value: '4.7/5', change: '0.1', changeDir: 'up', icon: '⭐', color: 'purple' }
    ]) +
    H.chartRow([
      { title: '月度营收趋势', subtitle: '近12个月营收数据', icon: '📈', placeholder: '折线图 - 营收趋势' },
      { title: '套餐销售占比', subtitle: '各套餐销售比例', icon: '🍩', placeholder: '饼图 - 套餐占比' }
    ]);
}

/* ========================================
   租户 - 系统设置
   ======================================== */
function renderTenantSettings() {
  const tabs = [
    { id: 'oem', label: 'OEM定制' },
    { id: 'notification', label: '通知设置' },
    { id: 'llm-api', label: '大模型官方API接口' },
    { id: 'geo-resource', label: '购买GEO采集资源' },
    { id: 'security', label: '安全设置' }
  ];
  const activeTab = window.tenantSettingsTab || 'oem';

  const tabHtml = tabs.map(t =>
    `<div class="tab-item ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}" onclick="switchTenantSettingsTab('${t.id}')">${t.label}</div>`
  ).join('');

  let contentHtml = '';
  switch (activeTab) {
    case 'oem':
      contentHtml = renderTenantSettingsOem();
      break;
    case 'notification':
      contentHtml = renderTenantSettingsNotification();
      break;
    case 'llm-api':
      contentHtml = renderTenantSettingsLlmApi();
      break;
    case 'geo-resource':
      contentHtml = renderTenantSettingsGeoResource();
      break;
    case 'security':
      contentHtml = renderTenantSettingsSecurity();
      break;
    default:
      contentHtml = renderTenantSettingsOem();
  }

  return H.pageHeader('系统设置', 'OEM品牌定制与系统配置') +
    `<div class="tabs">${tabHtml}</div><div class="tab-content">${contentHtml}</div>`;
}

function renderTenantSettingsOem() {
  return `
    <div class="form">
      <div class="form-group">
        <label class="form-label">企业名称 <span class="required">*</span></label>
        <input type="text" class="form-input" value="杭州星辰科技有限公司" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">企业Logo</label>
          <input type="file" class="form-input" />
          <div class="form-hint">建议尺寸 200x60px，支持PNG/JPG格式</div>
        </div>
        <div class="form-group">
          <label class="form-label">品牌主色</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="color" value="#2563EB" style="width:40px;height:36px;border:1px solid #E2E8F0;border-radius:8px;cursor:pointer" />
            <input type="text" class="form-input" value="#2563EB" style="flex:1" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">自定义域名</label>
        <input type="text" class="form-input" placeholder="例如：app.yourcompany.com" />
        <div class="form-hint">配置后可通过自有域名访问系统</div>
      </div>
      <div class="form-group">
        <label class="form-label">系统公告</label>
        <textarea class="form-textarea" placeholder="输入自定义公告内容..."></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存设置</button>
        <button class="btn btn-secondary">重置</button>
      </div>
    </div>`;
}

function renderTenantSettingsNotification() {
  return `
    <div class="form">
      <div class="form-group">
        <label class="form-label">邮件通知</label>
        <div class="radio-group">
          <div class="radio-item selected" data-value="on" onclick="selectRadio(this, 'email')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">开启</div>
              <div class="radio-desc">系统将通过邮件发送重要通知</div>
            </div>
          </div>
          <div class="radio-item" data-value="off" onclick="selectRadio(this, 'email')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">关闭</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">短信通知</label>
        <div class="radio-group">
          <div class="radio-item selected" data-value="on" onclick="selectRadio(this, 'sms')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">开启</div>
              <div class="radio-desc">系统将通过短信发送紧急通知</div>
            </div>
          </div>
          <div class="radio-item" data-value="off" onclick="selectRadio(this, 'sms')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">关闭</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存设置</button>
      </div>
    </div>`;
}

function renderTenantSettingsSecurity() {
  return `
    <div class="form">
      <div class="form-group">
        <label class="form-label">登录密码</label>
        <input type="password" class="form-input" placeholder="输入当前密码" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">新密码</label>
          <input type="password" class="form-input" placeholder="输入新密码" />
        </div>
        <div class="form-group">
          <label class="form-label">确认新密码</label>
          <input type="password" class="form-input" placeholder="再次输入新密码" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">双重验证</label>
        <div class="radio-group">
          <div class="radio-item" data-value="on" onclick="selectRadio(this, '2fa')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">开启</div>
              <div class="radio-desc">登录时需要输入手机验证码</div>
            </div>
          </div>
          <div class="radio-item selected" data-value="off" onclick="selectRadio(this, '2fa')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">关闭</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存设置</button>
      </div>
    </div>`;
}

/* ========================================
   租户 - 大模型官方API接口
   ======================================== */
function renderTenantSettingsLlmApi() {
  return renderApiCollectionPanel();
}

function renderApiCollectionPanel() {
  const models = [
    { id: 'deepseek', name: 'DeepSeek', icon: 'D', active: true },
    { id: 'doubao', name: '豆包', icon: '豆', active: false },
    { id: 'yuanbao', name: '元宝', icon: '元', active: false },
    { id: 'tongyi', name: '通义', icon: '通', active: false },
    { id: 'wenxin', name: '文心', icon: '文', active: false },
    { id: 'minimax', name: 'Minimax', icon: 'M', active: false },
    { id: 'kimi', name: 'Kimi', icon: 'K', active: false },
    { id: 'zhipu', name: '智谱', icon: '智', active: false }
  ];

  const modelChips = models.map(m => `
    <div class="model-chip ${m.active ? 'active' : ''}" data-model="${m.id}" onclick="switchModelChip('${m.id}')">
      <span class="model-chip-icon">${m.icon}</span>
      <span>${m.name}</span>
    </div>
  `).join('');

  return `
    <div class="model-selector" id="modelSelector">
      ${modelChips}
    </div>
    <div class="form" id="apiConfigForm">
      <div class="form-group">
        <label class="form-label">自定义别名</label>
        <input type="text" class="form-input" id="modelAlias" value="deepseek" />
      </div>
      <div class="form-group">
        <label class="form-label">模型用处</label>
        <div class="radio-group">
          <div class="radio-item" data-value="index_only" onclick="selectRadio(this, 'usage')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">仅做收录</div>
            </div>
          </div>
          <div class="radio-item selected" data-value="search_write" onclick="selectRadio(this, 'usage')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">查收录+写作</div>
              <div class="radio-desc">开启写作模式的话，该模型可用于写文章，开启多个则随机抽取一个写作</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">联网搜索</label>
        <div class="radio-group">
          <div class="radio-item" data-value="off" onclick="selectRadio(this, 'websearch')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">关闭</div>
            </div>
          </div>
          <div class="radio-item selected" data-value="on" onclick="selectRadio(this, 'websearch')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">开启</div>
              <div class="radio-desc">开启联网搜索后可以快速查到实时收录，同时也会让查询费用增加（不开启联网的话收录查询会很慢）</div>
            </div>
          </div>
          <div class="radio-item" data-value="auto" onclick="selectRadio(this, 'websearch')">
            <div class="radio-circle"></div>
            <div class="radio-content">
              <div class="radio-label">手动查询时自动开启</div>
              <div class="radio-desc">选择手动查询时自动开启的话，仅手动点击查询时会联网，自动查询不联网</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">请求接口</label>
        <input type="text" class="form-input" id="modelEndpoint" value="https://ai.chinaz.net/v1" />
      </div>
      <div class="form-group">
        <label class="form-label">API-KEY</label>
        <input type="password" class="form-input" id="modelApiKey" value="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
      </div>
      <div class="form-group">
        <label class="form-label">模型</label>
        <input type="text" class="form-input" id="modelName" value="deepseek-v4-pro" />
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="testModelConnection()">测试模型</button>
        <button class="btn btn-primary" onclick="saveApiConfig()">保存</button>
      </div>
    </div>`;
}

function renderTenantSettingsGeoResource() {
  const activeTab = window.geoResourceTab || 'purchased';
  const activePlan = { name: '标准版', resources: 5, status: '生效中', expireDate: '2026-08-20', remainingDays: 58, totalPrice: 1000 };
  const expiredPlan = { name: '标准版', resources: 5, status: '已到期', expireDate: '2026-06-01', remainingDays: 0 };

  const allPackages = [
    { id: 'lite', name: '轻量版', resources: 2, desc: '适合少量任务，低频使用', unitPrice: 300, totalPrice: 600 },
    { id: 'standard', name: '标准版', resources: 5, desc: '适合日常任务，稳定交付', unitPrice: 200, totalPrice: 1000 },
    { id: 'pro', name: '极速版', resources: 10, desc: '适合批量任务，高速交付', unitPrice: 150, totalPrice: 1500 }
  ];

  // ── 折算计算 ──
  function formatPrice(val) {
    return '¥' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function calcProration(targetTotalPrice) {
    var remainingDays = activePlan.remainingDays;
    if (remainingDays <= 0) return null;
    // 实际剩余自然日
    var today = new Date(); today.setHours(0,0,0,0);
    var expire = new Date(activePlan.expireDate); expire.setHours(0,0,0,0);
    var realRemaining = Math.max(1, Math.ceil((expire - today) / (1000 * 60 * 60 * 24)));
    // 生效总天数按 30 天/月
    var subscriptionDays = 30;
    var rawProration = Math.round((activePlan.totalPrice / subscriptionDays) * realRemaining);
    // 折算后价格 = 新套餐价格 - 折算金额（最低为卡片显示价 500）
    var afterProration = Math.max(500, targetTotalPrice - rawProration);
    return {
      remainingDays: realRemaining,
      prorationAmount: targetTotalPrice - afterProration,
      afterProration: afterProration,
      isFree: rawProration >= targetTotalPrice
    };
  }

  // 存储折算数据供 app.js 使用
  var proProration = calcProration(1500);
  window._geoProration = proProration;

  const tabItems = [
    { id: 'unpurchased', label: '未购买' },
    { id: 'purchased', label: '已购买' },
    { id: 'expired', label: '已到期' }
  ];
  const tabsHtml = tabItems.map(t =>
    `<div class="geo-tab-item ${t.id === activeTab ? 'active' : ''}" data-geotab="${t.id}" onclick="switchGeoResourceTab('${t.id}')">${t.label}</div>`
  ).join('');

  const introCard = `
    <div class="plan-intro-card" style="margin-bottom:20px">
      💡 平台已内置采集资源，订阅后即可执行 GEO 采集任务并获取效果报表，无需配置大模型官方 API；创建采集任务时选择「平台资源采集」即可。
    </div>`;

  function calcTime(resources) {
    const rounds = Math.ceil(100 / resources);
    const maxMinutes = rounds * 10;
    const maxH = (maxMinutes / 60).toFixed(1);
    return `${maxH} 小时`;
  }

  function renderPackageCards(packages, opts) {
    opts = opts || {};
    const recommendId = opts.recommendId || 'pro';
    return packages.map(p => {
      const timeDesc = calcTime(p.resources);
      const isRecommended = p.id === recommendId;
      const isCurrent = p.id === currentGeoPackage && !opts.expired;
      // 已购买 Tab 中极速版卡片显示折算
      const showProration = opts.showProration && p.id === 'pro' && proProration;
      let btnHtml;
      if (opts.forceBuy) {
        btnHtml = `<button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="event.stopPropagation();purchaseOnePackage('${p.id}')">立即购买</button>`;
      } else if (isCurrent) {
        btnHtml = `<button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="event.stopPropagation();showRenewModal()">立即续费</button>`;
      } else {
        btnHtml = `<button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="event.stopPropagation();purchaseOnePackage('${p.id}',true)">立即升级</button>`;
      }
      const priceHtml = showProration
        ? `<div class="package-card-price-row"><div class="package-card-price"><span style="text-decoration:line-through;color:#94A3B8;font-size:14px;font-weight:400;margin-right:8px">¥${p.totalPrice.toLocaleString()}</span><span style="color:#10B981;font-size:18px;font-weight:700">¥500</span><span style="font-size:13px;color:#94A3B8;font-weight:400">/月</span></div><div class="package-card-proration-note">折算金额自动抵扣新套餐费用</div></div>`
        : `<div class="package-card-price">¥${p.totalPrice.toLocaleString()}<span style="font-size:13px;color:#94A3B8;font-weight:400">/月</span></div>`;
      return `
        <div class="package-card ${isRecommended ? 'active' : ''}" data-package="${p.id}">
          <div class="package-card-header">
            <div class="package-card-name">${p.name}</div>
            ${isRecommended ? '<span class="package-card-badge">推荐</span>' : ''}
          </div>
          <div class="package-card-features">
            <div class="package-card-feature"><strong>${p.resources}</strong> 条资源通道</div>
            <div class="package-card-feature">支持6个平台：DeepSeek、百度文心、豆包、通义千问、腾讯元宝、Kimi</div>
            <div class="package-card-feature">100个问题约 ${timeDesc}</div>
            <div class="package-card-feature">${p.desc}</div>
          </div>
          ${priceHtml}
          ${btnHtml}
        </div>`;
    }).join('');
  }

  const rulesHtml = `
    <div class="geo-rules">
      <div class="geo-rules-section">
        <div class="geo-rules-title">订阅说明</div>
        <div class="geo-rules-content">
          <div class="geo-rule-item">
            <div class="geo-rule-text">1. 套餐续费：续费后将在当前到期时间基础上延长服务时长。<br>2. 套餐升级：升级后新套餐立即生效，有效期重新计算。原套餐剩余时间不再累计或折算。<br>3. 套餐降级：当前订阅周期内暂不支持降级，可在套餐到期后重新选择套餐。<br>4. 资源到期：资源到期后，已提交的任务会继续完成；新任务需续费后使用，或切换至自有 API 采集。${proProration ? '<br>5. 折算计费：按剩余天数折算，公式：套餐总价÷生效天数×剩余天数' : ''}</div>
          </div>
        </div>
      </div>
    </div>`;

  // ── 已购买 Tab ──
  const purchasedStatusCard = `
    <div class="plan-status-card">
      <div class="plan-status-header">
        <div class="plan-status-title">当前套餐</div>
        <div class="plan-status-header-right">
          <div class="plan-status-badge active">${activePlan.status}</div>
          <button class="btn btn-ghost btn-sm" style="margin-left:10px;font-size:11px;padding:2px 8px" onclick="navigateTo('tenant-finance')">查看账单</button>
        </div>
      </div>
      <div class="plan-status-body">
        <div class="plan-status-name">${activePlan.name}</div>
        <div class="plan-status-details">
          <div class="plan-status-row"><span class="plan-status-label">采集资源</span><span class="plan-status-value">${activePlan.resources} 个</span></div>
          <div class="plan-status-row"><span class="plan-status-label">到期时间</span><span class="plan-status-value">${activePlan.expireDate}</span></div>
          <div class="plan-status-row"><span class="plan-status-label">剩余天数</span><span class="plan-status-value highlight">${activePlan.remainingDays} 天</span></div>
        </div>
      </div>
    </div>`;

  // 已购买：只显示当前级别及以上的方案
  const purchasedPackages = allPackages.filter(p => p.resources >= activePlan.resources);

  const purchasedHtml = `
    ${introCard}
    <div class="section-title">已购资源</div>
    ${purchasedStatusCard}
    <div class="section-title" style="margin-top:24px">续费&升级方案</div>
    <div class="section-desc">升级套餐可获得更多资源通道，轻松应对批量任务。</div>
    <div class="package-grid">${renderPackageCards(purchasedPackages, { recommendId: 'pro', showProration: true })}</div>
    ${rulesHtml}`;

  // ── 已到期 Tab ──
  const expiredStatusCard = `
    <div class="plan-status-card" style="border-color:#EF4444;background:#FEF2F2">
      <div class="plan-status-header">
        <div class="plan-status-title">上次资源方案</div>
        <div class="plan-status-header-right">
          <div class="plan-status-badge expired">${expiredPlan.status}</div>
          <button class="btn btn-ghost btn-sm" style="margin-left:10px;font-size:11px;padding:2px 8px" onclick="navigateTo('tenant-finance')">查看账单</button>
        </div>
      </div>
      <div class="plan-status-body">
        <div class="plan-status-name">${expiredPlan.name}</div>
        <div class="plan-status-details">
          <div class="plan-status-row"><span class="plan-status-label">资源通道</span><span class="plan-status-value">${expiredPlan.resources} 个</span></div>
          <div class="plan-status-row"><span class="plan-status-label">到期时间</span><span class="plan-status-value" style="color:#EF4444">${expiredPlan.expireDate}</span></div>
          <div class="plan-status-row"><span class="plan-status-label">状态</span><span class="plan-status-value" style="color:#EF4444">已到期</span></div>
        </div>
      </div>
    </div>`;

  const expiredHtml = `
    ${introCard}
    <div class="section-title">已购资源</div>
    ${expiredStatusCard}
    <div class="section-title" style="margin-top:24px">选择资源方案</div>
    <div class="section-desc">根据您的任务规模选择合适的资源方案，资源通道越多，采集速度越快。</div>
    <div class="package-grid">${renderPackageCards(allPackages, { expired: true, forceBuy: true, recommendId: 'standard' })}</div>
    ${rulesHtml}`;

  // ── 未购买 Tab ──
  const unpurchasedHtml = `
    ${introCard}
    <div class="section-title">选择资源方案</div>
    <div class="section-desc">根据您的任务规模选择合适的资源方案，资源通道越多，采集速度越快。</div>
    <div class="package-grid">${renderPackageCards(allPackages, { forceBuy: true, recommendId: 'standard' })}</div>
    ${rulesHtml}`;

  let bodyHtml = '';
  if (activeTab === 'purchased') bodyHtml = purchasedHtml;
  else if (activeTab === 'expired') bodyHtml = expiredHtml;
  else bodyHtml = unpurchasedHtml;

  return `
    <div class="geo-tabs">${tabsHtml}</div>
    <div class="geo-tab-content" style="margin-top:20px">${bodyHtml}</div>`;
}

/* ========================================
   renderAgent() 代理商页面
   ======================================== */
function renderAgent(pageId) {
  switch (pageId) {
    case 'agent-dashboard':
      return renderDashboard('agent', [
        { label: '客户总数', value: '86', change: '5个本月新增', changeDir: 'up', icon: '👥', color: 'blue' },
        { label: '进行中项目', value: '12', change: '2个本周新增', changeDir: 'up', icon: '📋', color: 'green' },
        { label: '本月收益', value: '¥45,600', change: '18% 较上月', changeDir: 'up', icon: '💰', color: 'orange' },
        { label: '待处理订单', value: '2', change: '需要处理', changeDir: 'up', icon: '⏳', color: 'red' }
      ], [
        { title: '收益趋势', subtitle: '近6个月收益数据', icon: '📈', placeholder: '折线图 - 收益趋势' },
        { title: '客户行业分布', subtitle: '各行业客户占比', icon: '🍩', placeholder: '饼图 - 行业分布' }
      ]);
    case 'agent-projects':
      return renderAgentProjects();
    case 'agent-customers':
      return renderAgentCustomers();
    case 'agent-sub-agents':
      return renderAgentSubAgents();
    case 'agent-products':
      return renderAgentProducts();
    case 'agent-reports':
      return renderAgentReports();
    case 'agent-cases':
      return renderAgentCases();
    case 'agent-finance':
      return renderFinance('agent');
    case 'agent-employees':
      return renderAgentEmployees();
    case 'agent-settings':
      return renderAgentSettings();
    case 'agent-announcements':
      return renderAgentAnnouncements();
    case 'agent-messages':
      return renderAgentMessages();
    case 'agent-logs':
      return renderAgentLogs();
    case 'agent-account':
      return renderAgentAccount();
    default:
      return H.pageHeader('页面未找到', '该页面不存在');
  }
}

/* --- 代理商 - 产品管理（含定价） --- */
function renderAgentProducts() {
  return H.pageHeader('产品管理', '管理可售产品及定价策略',
    '<button class="btn btn-primary">+ 添加产品</button>'
  ) +
    H.table({
      title: '产品列表',
      count: 12,
      columns: [
        { key: 'name', label: '产品名称' },
        { key: 'category', label: '分类', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'costPrice', label: '成本价' },
        { key: 'salePrice', label: '销售价' },
        { key: 'profit', label: '利润率', render: (val) => `<span class="text-success" style="font-weight:600">${val}</span>` },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '在售' ? 'success' : 'neutral'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm">定价</button></div>'
        }
      ],
      rows: [
        { name: 'GEO基础套餐', category: 'GEO服务', costPrice: '¥2,800', salePrice: '¥3,800', profit: '26.3%', status: '在售' },
        { name: 'GEO标准套餐', category: 'GEO服务', costPrice: '¥6,000', salePrice: '¥8,500', profit: '29.4%', status: '在售' },
        { name: 'GEO旗舰套餐', category: 'GEO服务', costPrice: '¥11,000', salePrice: '¥15,800', profit: '30.4%', status: '在售' },
        { name: 'AI内容增强包', category: '增值服务', costPrice: '¥1,200', salePrice: '¥2,000', profit: '40.0%', status: '在售' }
      ]
    });
}

/* --- 代理商 - 客户管理 --- */
function renderAgentCustomers() {
  return H.pageHeader('客户管理', '管理直接客户信息',
    '<button class="btn btn-primary">+ 添加客户</button>'
  ) +
    H.table({
      title: '客户列表',
      count: 86,
      columns: [
        { key: 'company', label: '企业名称' },
        { key: 'contact', label: '联系人' },
        { key: 'industry', label: '行业' },
        { key: 'package', label: '当前套餐' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '活跃' ? 'success' : 'warning'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">详情</button><button class="btn btn-ghost btn-sm">跟进</button></div>'
        }
      ],
      rows: [
        { company: '杭州星辰科技有限公司', contact: '张经理', industry: '科技', package: 'GEO标准套餐', status: '活跃' },
        { company: '温州天宇贸易', contact: '陈总', industry: '贸易', package: 'GEO基础套餐', status: '活跃' },
        { company: '宁波海港物流', contact: '黄经理', industry: '物流', package: 'GEO旗舰套餐', status: '即将到期' }
      ]
    });
}

/* --- 代理商 - 二级代理商管理 --- */
function renderAgentSubAgents() {
  return H.pageHeader('代理商管理', '管理下级二级代理商',
    '<button class="btn btn-primary">+ 添加代理商</button>'
  ) +
    H.table({
      title: '二级代理商列表',
      count: 8,
      columns: [
        { key: 'name', label: '代理商名称' },
        { key: 'contact', label: '联系人' },
        { key: 'phone', label: '联系电话' },
        { key: 'clients', label: '客户数' },
        { key: 'commission', label: '佣金比例' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '正常' ? 'success' : 'danger'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm">设置佣金</button></div>'
        }
      ],
      rows: [
        { name: '温州优联科技', contact: '孙经理', phone: '137****1111', clients: 15, commission: '15%', status: '正常' },
        { name: '宁波锐智传媒', contact: '钱总', phone: '138****2222', clients: 8, commission: '12%', status: '正常' },
        { name: '嘉兴博纳信息', contact: '吴经理', phone: '139****3333', clients: 5, commission: '10%', status: '正常' }
      ]
    });
}

/* --- 代理商 - 合同管理 --- */
function renderAgentContracts() {
  return H.pageHeader('合同管理', '管理客户合同和协议',
    '<button class="btn btn-primary">+ 新建合同</button>'
  ) +
    H.table({
      title: '合同列表',
      count: 34,
      columns: [
        { key: 'id', label: '合同编号' },
        { key: 'customer', label: '客户名称' },
        { key: 'product', label: '产品' },
        { key: 'amount', label: '合同金额' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '生效中' ? 'success' : val === '待签署' ? 'warning' : 'neutral'}">${val}</span>` },
        { key: 'endDate', label: '到期日' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">续签</button></div>'
        }
      ],
      rows: [
        { id: 'CT202501001', customer: '杭州星辰科技', product: 'GEO标准套餐', amount: '¥102,000', status: '生效中', endDate: '2026-01-15' },
        { id: 'CT202502001', customer: '温州天宇贸易', product: 'GEO基础套餐', amount: '¥45,600', status: '生效中', endDate: '2026-02-01' },
        { id: 'CT202503001', customer: '宁波海港物流', product: 'GEO旗舰套餐', amount: '¥189,600', status: '待签署', endDate: '-' }
      ]
    });
}

/* --- 代理商 - 项目订单 --- */
function renderAgentOrders() {
  return H.pageHeader('项目订单', '查看和管理项目订单',
    '<button class="btn btn-secondary">导出订单</button>'
  ) +
    H.table({
      title: '订单列表',
      count: 56,
      columns: [
        { key: 'id', label: '订单号' },
        { key: 'customer', label: '客户名称' },
        { key: 'product', label: '产品' },
        { key: 'amount', label: '金额' },
        { key: 'status', label: '状态', render: (val) => {
          const map = { '待确认': 'warning', '进行中': 'info', '已完成': 'success', '已取消': 'neutral' };
          return `<span class="badge badge-${map[val] || 'neutral'}">${val}</span>`;
        }},
        { key: 'date', label: '下单时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">详情</button><button class="btn btn-ghost btn-sm">处理</button></div>'
        }
      ],
      rows: [
        { id: 'A-ORD20250601001', customer: '杭州星辰科技', product: 'GEO标准套餐续费', amount: '¥8,500', status: '待确认', date: '2025-06-01' },
        { id: 'A-ORD20250601002', customer: '温州天宇贸易', product: 'GEO基础套餐', amount: '¥3,800', status: '进行中', date: '2025-06-01' },
        { id: 'A-ORD20250531001', customer: '宁波海港物流', product: 'GEO旗舰套餐', amount: '¥15,800', status: '已完成', date: '2025-05-31' }
      ]
    });
}

/* --- 代理商 - 收益中心 --- */
function renderAgentRevenue() {
  return H.pageHeader('收益中心', '查看收益明细与提现管理') +
    H.stats([
      { label: '累计收益', value: '¥356,800', change: '总收益', changeDir: 'up', icon: '💰', color: 'blue' },
      { label: '本月收益', value: '¥45,600', change: '18% 较上月', changeDir: 'up', icon: '📈', color: 'green' },
      { label: '可提现金额', value: '¥28,500', change: '可提现', changeDir: 'up', icon: '💳', color: 'orange' },
      { label: '已提现', value: '¥328,300', change: '累计提现', changeDir: 'up', icon: '✅', color: 'purple' }
    ]) +
    H.chartRow([
      { title: '收益趋势', subtitle: '近6个月收益数据', icon: '📈', placeholder: '折线图 - 收益趋势' },
      { title: '收益构成', subtitle: '各产品收益占比', icon: '🍩', placeholder: '饼图 - 收益构成' }
    ]) +
    H.table({
      title: '收益明细',
      count: 145,
      columns: [
        { key: 'id', label: '编号' },
        { key: 'type', label: '类型' },
        { key: 'amount', label: '金额', render: (val) => `<span class="text-success" style="font-weight:600">${val}</span>` },
        { key: 'source', label: '来源' },
        { key: 'date', label: '时间' }
      ],
      rows: [
        { id: 'REV20250601001', type: '订单佣金', amount: '+¥1,275', source: '星辰科技-标准套餐', date: '2025-06-01' },
        { id: 'REV20250601002', type: '二级代理分成', amount: '+¥380', source: '温州优联科技', date: '2025-06-01' },
        { id: 'REV20250531001', type: '订单佣金', amount: '+¥2,370', source: '宁波海港物流-旗舰套餐', date: '2025-05-31' }
      ]
    });
}

/* --- 代理商 - 员工管理 --- */
function renderAgentEmployees() {
  return H.pageHeader('员工管理', '管理代理商员工账号',
    '<button class="btn btn-primary">+ 添加员工</button>'
  ) +
    H.table({
      title: '员工列表',
      count: 8,
      columns: [
        { key: 'name', label: '姓名' },
        { key: 'role', label: '角色' },
        { key: 'phone', label: '手机号' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '在职' ? 'success' : 'danger'}">${val}</span>` },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { name: '李总', role: '代理商负责人', phone: '138****5678', status: '在职' },
        { name: '小王', role: '销售专员', phone: '139****1234', status: '在职' },
        { name: '小陈', role: '客服专员', phone: '136****9876', status: '在职' }
      ]
    });
}

/* --- 代理商 - 操作日志 --- */
function renderAgentLogs() {
  return H.pageHeader('操作日志', '查看操作记录') +
    H.table({
      title: '日志列表',
      count: 234,
      columns: [
        { key: 'operator', label: '操作人' },
        { key: 'action', label: '操作类型' },
        { key: 'target', label: '操作对象' },
        { key: 'ip', label: 'IP地址' },
        { key: 'time', label: '操作时间' }
      ],
      rows: [
        { operator: '李总', action: '登录系统', target: '-', ip: '10.0.1.50', time: '2025-06-01 08:30:00' },
        { operator: '小王', action: '创建订单', target: 'A-ORD20250601001', ip: '10.0.1.51', time: '2025-06-01 09:15:00' },
        { operator: '李总', action: '修改定价', target: 'GEO标准套餐', ip: '10.0.1.50', time: '2025-06-01 10:00:00' }
      ]
    });
}

/* --- 代理商 - 系统设置（OEM） --- */
function renderAgentSettings() {
  const tabsContent = `
    <div class="form">
      <div class="form-group">
        <label class="form-label">代理商名称 <span class="required">*</span></label>
        <input type="text" class="form-input" value="杭州优联科技有限公司" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">代理商Logo</label>
          <input type="file" class="form-input" />
          <div class="form-hint">建议尺寸 200x60px，支持PNG/JPG格式</div>
        </div>
        <div class="form-group">
          <label class="form-label">联系电话</label>
          <input type="text" class="form-input" value="0571-88888888" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">企业简介</label>
        <textarea class="form-textarea" placeholder="输入企业简介...">杭州优联科技是一家专业的互联网营销服务公司，致力于为企业提供全方位的GEO优化解决方案。</textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存设置</button>
        <button class="btn btn-secondary">重置</button>
      </div>
    </div>`;

  return H.pageHeader('系统设置', 'OEM品牌定制与系统配置') +
    H.tabRow([
      { id: 'oem', label: 'OEM定制', active: true },
      { id: 'commission', label: '佣金设置' },
      { id: 'notification', label: '通知设置' }
    ], tabsContent);
}

/* ========================================
   renderEndUser() 终端用户页面
   ======================================== */
function renderEndUser(pageId) {
  switch (pageId) {
    case 'enduser-dashboard':
      return renderEndUserDashboard();
    case 'enduser-projects':
      return renderEndUserProjects();
    case 'enduser-reports':
      return renderEndUserReports();
    case 'enduser-knowledge-intro':
      return renderEndUserKnowledgeIntro();
    case 'enduser-knowledge-album':
      return renderEndUserKnowledgeAlbum();
    case 'enduser-finance':
      return renderFinance('enduser');
    case 'enduser-messages':
      return renderEndUserMessages();
    case 'enduser-account':
      return renderEndUserAccount();
    default:
      return H.pageHeader('页面未找到', '该页面不存在');
  }
}

/* --- 终端用户 - 工作台 --- */
function renderEndUserDashboard() {
  return H.pageHeader('工作台', '欢迎回来，查看您的GEO服务概览') +
    H.stats([
      { label: '当前套餐', value: 'GEO标准', change: '有效期至 2025-12-31', changeDir: 'up', icon: '📦', color: 'blue' },
      { label: '项目进度', value: '75%', change: '进行中', changeDir: 'up', icon: '📊', color: 'green' },
      { label: '本月声量', value: '12,560', change: '28% 较上月', changeDir: 'up', icon: '📢', color: 'orange' },
      { label: '关键词排名', value: 'Top 15', change: '提升3位', changeDir: 'up', icon: '🎯', color: 'purple' }
    ]) +
    H.chartRow([
      { title: 'GEO声量趋势', subtitle: '近30天品牌声量变化', icon: '📈', placeholder: '面积图 - 声量趋势' },
      { title: '关键词排名变化', subtitle: '核心关键词排名走势', icon: '📊', placeholder: '折线图 - 排名变化' }
    ]);
}

/* --- 终端用户 - 我的套餐 --- */
function renderEndUserPackages() {
  return H.pageHeader('我的套餐', '查看和管理已购套餐') +
    `<div class="card-grid" style="grid-template-columns: repeat(2, 1fr)">
      <div class="card-item" style="border: 2px solid var(--color-primary)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <span class="badge badge-success badge-dot">使用中</span>
          <span style="font-size:12px;color:#94A3B8">2025-01-01 至 2025-12-31</span>
        </div>
        <div class="card-item-title">GEO标准套餐</div>
        <div class="card-item-desc">多平台GEO优化与监测，含百度、知乎、微信、抖音四大平台</div>
        <div style="margin:16px 0;padding:12px;background:#F8FAFC;border-radius:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;color:#475569">品牌声量监测</span>
            <span style="font-size:13px;color:#10B981;font-weight:500">已开通</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;color:#475569">关键词优化</span>
            <span style="font-size:13px;color:#10B981;font-weight:500">20个关键词</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;color:#475569">AI文章生成</span>
            <span style="font-size:13px;color:#10B981;font-weight:500">10篇/月</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:13px;color:#475569">媒体投稿</span>
            <span style="font-size:13px;color:#10B981;font-weight:500">5篇/月</span>
          </div>
        </div>
        <div class="card-item-footer">
          <div class="card-item-price">¥8,500<span style="font-size:12px;color:#94A3B8;font-weight:400">/月</span></div>
          <button class="btn btn-secondary btn-sm">续费</button>
        </div>
      </div>
      <div class="card-item">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <span class="badge badge-neutral">已过期</span>
          <span style="font-size:12px;color:#94A3B8">2024-01-01 至 2024-12-31</span>
        </div>
        <div class="card-item-title">GEO基础套餐</div>
        <div class="card-item-desc">基础GEO优化服务，适合初创企业</div>
        <div style="margin:16px 0;padding:12px;background:#F8FAFC;border-radius:8px">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:13px;color:#94A3B8">品牌声量监测</span>
            <span style="font-size:13px;color:#94A3B8">已过期</span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span style="font-size:13px;color:#94A3B8">关键词优化</span>
            <span style="font-size:13px;color:#94A3B8">5个关键词</span>
          </div>
        </div>
        <div class="card-item-footer">
          <div class="card-item-price" style="color:#94A3B8">¥3,800<span style="font-size:12px;font-weight:400">/月</span></div>
          <button class="btn btn-secondary btn-sm">重新购买</button>
        </div>
      </div>
    </div>`;
}

/* --- 终端用户 - GEO效果报表 --- */
function renderEndUserGeoReport() {
  return H.pageHeader('GEO效果报表', '查看GEO优化效果数据') +
    H.stats([
      { label: '百度声量', value: '5,230', change: '↑ 15%', changeDir: 'up', icon: '🔍', color: 'blue' },
      { label: '知乎声量', value: '3,120', change: '↑ 22%', changeDir: 'up', icon: '💡', color: 'blue' },
      { label: '微信声量', value: '2,890', change: '↑ 18%', changeDir: 'up', icon: '💬', color: 'green' },
      { label: '抖音声量', value: '1,320', change: '↑ 35%', changeDir: 'up', icon: '🎵', color: 'orange' }
    ]) +
    H.chartRow([
      { title: '各平台声量趋势', subtitle: '近30天四大平台声量变化', icon: '📈', placeholder: '多线折线图 - 平台声量趋势' },
      { title: '声量来源分布', subtitle: '各渠道声量占比', icon: '🍩', placeholder: '饼图 - 声量来源分布' }
    ]) +
    H.chartRow([
      { title: '关键词排名走势', subtitle: 'Top10关键词排名变化', icon: '📊', placeholder: '折线图 - 关键词排名' },
      { title: '竞品对比', subtitle: '与主要竞品声量对比', icon: '⚔️', placeholder: '柱状图 - 竞品对比' }
    ]);
}

/* --- 终端用户 - 交付成果 --- */
function renderEndUserDeliverables() {
  return H.pageHeader('交付成果', '查看项目交付物和成果') +
    H.table({
      title: '交付列表',
      count: 23,
      columns: [
        { key: 'title', label: '交付物名称' },
        { key: 'type', label: '类型', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'project', label: '所属项目' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '已交付' ? 'success' : val === '制作中' ? 'info' : 'warning'}">${val}</span>` },
        { key: 'date', label: '交付时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">下载</button><button class="btn btn-ghost btn-sm">预览</button></div>'
        }
      ],
      rows: [
        { title: '6月GEO效果分析报告', type: '报告', project: 'GEO优化项目', status: '已交付', date: '2025-06-01' },
        { title: '品牌关键词优化方案V3', type: '方案', project: 'GEO优化项目', status: '已交付', date: '2025-05-28' },
        { title: 'AI生成文章-数字化转型系列(5篇)', type: '文章', project: '内容营销', status: '制作中', date: '-' },
        { title: 'Q2竞品分析报告', type: '报告', project: 'GEO优化项目', status: '待审核', date: '-' }
      ]
    });
}

/* --- 终端用户 - 企业知识库 --- */
function renderEndUserKnowledge() {
  return H.pageHeader('企业知识库', '浏览企业知识文档') +
    H.table({
      title: '文档列表',
      count: 15,
      columns: [
        { key: 'title', label: '文档标题' },
        { key: 'category', label: '分类', render: (val) => `<span class="badge badge-primary">${val}</span>` },
        { key: 'author', label: '上传人' },
        { key: 'size', label: '大小' },
        { key: 'date', label: '更新时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">下载</button></div>'
        }
      ],
      rows: [
        { title: 'GEO优化操作手册V2.0', category: '操作指南', author: '服务方', size: '2.4MB', date: '2025-05-28' },
        { title: '产品套餐说明文档', category: '产品资料', author: '服务方', size: '1.8MB', date: '2025-05-20' },
        { title: '5月GEO效果分析报告', category: '项目报告', author: '项目经理', size: '3.5MB', date: '2025-06-01' }
      ]
    });
}

/* --- 终端用户 - 账户设置 --- */
function renderEndUserSettings() {
  const tabsContent = `
    <div class="form">
      <div class="form-group">
        <label class="form-label">企业名称 <span class="required">*</span></label>
        <input type="text" class="form-input" value="杭州星辰科技有限公司" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">联系人 <span class="required">*</span></label>
          <input type="text" class="form-input" value="张经理" />
        </div>
        <div class="form-group">
          <label class="form-label">联系电话 <span class="required">*</span></label>
          <input type="text" class="form-input" value="138****5678" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">联系邮箱</label>
        <input type="email" class="form-input" value="zhang@startech.com" />
      </div>
      <div class="form-group">
        <label class="form-label">企业地址</label>
        <input type="text" class="form-input" value="浙江省杭州市西湖区xxx路xxx号" />
      </div>
      <div class="form-actions">
        <button class="btn btn-primary">保存修改</button>
        <button class="btn btn-secondary">取消</button>
      </div>
    </div>`;

  return H.pageHeader('账户设置', '管理账户信息与安全设置') +
    H.tabRow([
      { id: 'profile', label: '基本信息', active: true },
      { id: 'security', label: '安全设置' },
      { id: 'notification', label: '通知偏好' }
    ], tabsContent);
}

/* ========================================
   新增占位渲染函数 — 菜单调整后补充
   ======================================== */

/* --- 超管 - 角色管理 --- */
function renderAdminRoles() {
  return H.pageHeader('角色管理', '配置平台角色模板与权限组合',
    '<button class="btn btn-primary">+ 新增角色</button>'
  ) +
    H.table({
      title: '角色列表',
      count: 6,
      columns: [
        { key: 'name', label: '角色名称' },
        { key: 'desc', label: '描述' },
        { key: 'modules', label: '包含模块' },
        { key: 'users', label: '关联用户数' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { name: '超级管理员', desc: '拥有全部权限', modules: '全部', users: '2' },
        { name: '运营主管', desc: '负责日常运营管理', modules: 'SAAS用户、财务流水、消息公告', users: '3' },
        { name: '技术支持', desc: '负责系统配置与维护', modules: '系统设置、系统日志', users: '5' }
      ]
    });
}

/* --- 超管 - 官媒投稿 --- */
function renderAdminMedia() {
  return H.pageHeader('官媒投稿', '管理上游媒体资源与投稿财务流水') +
    H.tabRow([
      { id: 'media-list', label: '官媒列表', active: true },
      { id: 'media-finance', label: '投稿财务流水' }
    ], `
    <div class="table-toolbar">
      <div class="table-toolbar-left"><span class="table-toolbar-title">官媒列表</span><span class="table-toolbar-count">共 320 家</span></div>
      <div class="table-toolbar-right"><div class="table-search"><span class="table-search-icon">${uiIcon('search','search')}</span><input type="text" placeholder="搜索媒体名称..."></div><button class="btn btn-primary">+ 添加官媒</button></div>
    </div>
    <table class="data-table"><thead><tr><th>媒体名称</th><th>分类</th><th>售价</th><th>状态</th><th>操作</th></tr></thead><tbody>
      <tr><td>新华网</td><td>官方媒体</td><td>¥500/篇</td><td><span class="badge badge-success">启用</span></td><td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button></div></td></tr>
      <tr><td>人民网</td><td>官方媒体</td><td>¥480/篇</td><td><span class="badge badge-success">启用</span></td><td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button></div></td></tr>
      <tr><td>中国日报</td><td>行业媒体</td><td>¥350/篇</td><td><span class="badge badge-success">启用</span></td><td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button></div></td></tr>
    </tbody></table>`);
}

/* --- 超管 - 系统日志 --- */
function renderAdminLogs() {
  return H.pageHeader('系统日志', '全平台操作审计日志') +
    H.table({
      title: '操作日志',
      count: 8562,
      columns: [
        { key: 'time', label: '操作时间' },
        { key: 'user', label: '操作人' },
        { key: 'action', label: '操作类型' },
        { key: 'module', label: '模块' },
        { key: 'detail', label: '详情' },
        { key: 'ip', label: 'IP地址' }
      ],
      rows: [
        { time: '2026-07-22 14:32:18', user: '超级管理员', action: '创建', module: 'SAAS用户', detail: '创建租户「杭州星辰科技」', ip: '192.168.1.100' },
        { time: '2026-07-22 13:15:42', user: '运营主管', action: '充值', module: '财务流水', detail: '为租户「上海云帆」充值 ¥50,000', ip: '192.168.1.101' },
        { time: '2026-07-22 11:08:55', user: '技术支持', action: '修改', module: '系统设置', detail: '更新官媒平台接入配置', ip: '192.168.1.102' }
      ]
    });
}

/* --- 超管 - 账号设置 --- */
function renderAdminAccount() {
  return H.pageHeader('账号设置', '管理超管账号基础信息') +
    `<div class="card" style="max-width:600px">
      <div class="form">
        <div class="form-group"><label class="form-label">用户名</label><input type="text" class="form-input" value="admin" disabled /></div>
        <div class="form-group"><label class="form-label">姓名</label><input type="text" class="form-input" value="超级管理员" /></div>
        <div class="form-group"><label class="form-label">联系电话</label><input type="text" class="form-input" value="138****0000" /></div>
        <div class="form-group"><label class="form-label">邮箱</label><input type="email" class="form-input" value="admin@geo-saas.com" /></div>
        <div class="form-actions"><button class="btn btn-primary">保存修改</button></div>
      </div>
    </div>`;
}

/* --- 租户 - 案例库 --- */
function renderTenantCases() {
  return H.pageHeader('案例库', '标杆案例展示与效果数据') +
    H.stats([
      { label: '总案例数', value: '36', change: '', icon: '📁', color: 'blue' },
      { label: '本月新增', value: '4', change: '', icon: '📈', color: 'green' },
      { label: '平均覆盖平台', value: '6.2个', change: '', icon: '🌐', color: 'purple' }
    ]) +
    H.table({
      title: '案例列表',
      count: 36,
      columns: [
        { key: 'name', label: '案例名称' },
        { key: 'client', label: '客户' },
        { key: 'platforms', label: '覆盖平台' },
        { key: 'keywords', label: '关键词数' },
        { key: 'date', label: '创建时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">分享</button></div>'
        }
      ],
      rows: [
        { name: '防黄剂行业GEO优化案例', client: '温州天宇贸易', platforms: '6个', keywords: '25', date: '2026-07-15' },
        { name: '物流行业品牌曝光提升', client: '宁波海港物流', platforms: '8个', keywords: '32', date: '2026-07-10' },
        { name: '科技企业AI搜索优化', client: '杭州星辰科技', platforms: '7个', keywords: '18', date: '2026-07-05' }
      ]
    });
}

/* --- 租户 - 系统消息 --- */
function renderTenantMessages() {
  return H.pageHeader('系统消息', '业务事件通知') +
    `<div class="message-list">
      <div class="message-item unread"><div class="message-item-header"><span class="badge badge-primary">提单</span><span class="message-time">2026-07-22 14:30</span></div><div class="message-item-body">客户「温州天宇贸易」的提单已被拒绝，原因：关键词不符合规范</div></div>
      <div class="message-item unread"><div class="message-item-header"><span class="badge badge-warning">到期</span><span class="message-time">2026-07-22 10:00</span></div><div class="message-item-body">客户「宁波海港物流」的项目将于7天后到期，请及时跟进续费</div></div>
      <div class="message-item"><div class="message-item-header"><span class="badge badge-success">充值</span><span class="message-time">2026-07-21 16:45</span></div><div class="message-item-body">代理商「杭州分部」充值成功，金额 ¥20,000</div></div>
      <div class="message-item"><div class="message-item-header"><span class="badge badge-primary">投稿</span><span class="message-time">2026-07-21 09:20</span></div><div class="message-item-body">批量投稿任务已完成，共投稿 15 篇文章至 8 家官媒</div></div>
    </div>`;
}

/* --- 租户 - 账号设置 --- */
function renderTenantAccount() {
  return H.pageHeader('账号设置', '基础信息、实名认证与权益功能') +
    H.tabRow([
      { id: 'profile', label: '基本信息', active: true },
      { id: 'auth', label: '实名认证' },
      { id: 'rights', label: '权益功能' }
    ], `
    <div class="form" style="max-width:600px">
      <div class="form-group"><label class="form-label">企业名称 <span class="required">*</span></label><input type="text" class="form-input" value="杭州星辰科技有限公司" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">联系人</label><input type="text" class="form-input" value="张经理" /></div>
        <div class="form-group"><label class="form-label">联系电话</label><input type="text" class="form-input" value="138****5678" /></div>
      </div>
      <div class="form-group"><label class="form-label">联系邮箱</label><input type="email" class="form-input" value="zhang@startech.com" /></div>
      <div class="form-actions"><button class="btn btn-primary">保存修改</button><button class="btn btn-secondary">取消</button></div>
    </div>`);
}

/* --- 代理商 - 项目管理 --- */
function renderAgentProjects() {
  return H.pageHeader('项目管理', '管理本代理下的客户项目',
    '<button class="btn btn-primary">+ 新建项目</button>'
  ) +
    H.table({
      title: '项目列表',
      count: 42,
      columns: [
        { key: 'id', label: '项目ID' },
        { key: 'client', label: '客户' },
        { key: 'product', label: '产品' },
        { key: 'keywords', label: '关键词数' },
        { key: 'status', label: '状态', render: (val) => `<span class="badge badge-${val === '生效中' ? 'success' : val === '已过期' ? 'danger' : 'warning'}">${val}</span>` },
        { key: 'expire', label: '到期时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm">续费</button></div>'
        }
      ],
      rows: [
        { id: 'P20260701', client: '杭州星辰科技', product: 'GEO标准套餐', keywords: '20', status: '生效中', expire: '2027-01-01' },
        { id: 'P20260615', client: '温州天宇贸易', product: 'GEO基础套餐', keywords: '10', status: '生效中', expire: '2026-12-15' },
        { id: 'P20260520', client: '宁波海港物流', product: 'GEO旗舰套餐', keywords: '35', status: '即将到期', expire: '2026-07-29' }
      ]
    });
}

/* --- 代理商 - 效果报表 --- */
function renderAgentReports() {
  return H.pageHeader('效果报表', '查看客户项目效果数据') +
    `<div class="filter-bar" style="display:flex;gap:12px;margin-bottom:16px">
      <input type="text" class="form-input" placeholder="输入项目ID查询" style="width:240px" />
      <select class="form-input" style="width:160px"><option>全部平台</option><option>百度文心</option><option>DeepSeek</option><option>豆包</option></select>
      <button class="btn btn-primary">查询</button>
    </div>` +
    H.table({
      title: '效果数据',
      count: 156,
      columns: [
        { key: 'keyword', label: '训练词' },
        { key: 'question', label: '问题' },
        { key: 'platform', label: '平台' },
        { key: 'source', label: '来源' },
        { key: 'date', label: '采集时间' }
      ],
      rows: [
        { keyword: '防黄剂厂家', question: '防黄剂厂家哪家好', platform: '百度文心', source: '官媒投稿', date: '2026-07-22' },
        { keyword: '防黄剂工厂', question: '推荐防黄剂工厂', platform: 'DeepSeek', source: '官媒投稿', date: '2026-07-22' },
        { keyword: '防黄剂公司', question: '防黄剂公司排名', platform: '豆包', source: '官媒投稿', date: '2026-07-21' }
      ]
    });
}

/* --- 代理商 - 案例库 --- */
function renderAgentCases() {
  return H.pageHeader('案例库', '参考标杆案例') +
    H.table({
      title: '案例列表',
      count: 12,
      columns: [
        { key: 'name', label: '案例名称' },
        { key: 'industry', label: '行业' },
        { key: 'platforms', label: '覆盖平台' },
        { key: 'keywords', label: '关键词数' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button></div>'
        }
      ],
      rows: [
        { name: '防黄剂行业GEO优化案例', industry: '化工', platforms: '6个', keywords: '25' },
        { name: '物流行业品牌曝光提升', industry: '物流', platforms: '8个', keywords: '32' },
        { name: '科技企业AI搜索优化', industry: '科技', platforms: '7个', keywords: '18' }
      ]
    });
}

/* --- 代理商 - 消息公告 --- */
function renderAgentAnnouncements() {
  return H.pageHeader('消息公告', '接收上级公告通知') +
    `<div class="message-list">
      <div class="message-item unread"><div class="message-item-header"><span class="badge badge-primary">公告</span><span class="message-time">2026-07-20 09:00</span></div><div class="message-item-body">系统将于7月25日凌晨2:00-4:00进行升级维护，届时部分功能可能暂时不可用</div></div>
      <div class="message-item"><div class="message-item-header"><span class="badge badge-primary">公告</span><span class="message-time">2026-07-15 10:30</span></div><div class="message-item-body">新增Kimi平台效果采集功能已上线，欢迎使用</div></div>
    </div>`;
}

/* --- 代理商 - 系统消息 --- */
function renderAgentMessages() {
  return H.pageHeader('系统消息', '业务事件通知') +
    `<div class="message-list">
      <div class="message-item unread"><div class="message-item-header"><span class="badge badge-warning">到期</span><span class="message-time">2026-07-22 10:00</span></div><div class="message-item-body">客户「宁波海港物流」的项目将于7天后到期</div></div>
      <div class="message-item"><div class="message-item-header"><span class="badge badge-success">充值</span><span class="message-time">2026-07-21 16:45</span></div><div class="message-item-body">您的账户充值成功，金额 ¥10,000</div></div>
    </div>`;
}

/* --- 代理商 - 账号设置 --- */
function renderAgentAccount() {
  return H.pageHeader('账号设置', '基础信息管理') +
    `<div class="card" style="max-width:600px">
      <div class="form">
        <div class="form-group"><label class="form-label">代理商名称</label><input type="text" class="form-input" value="杭州分部" /></div>
        <div class="form-group"><label class="form-label">联系人</label><input type="text" class="form-input" value="李总" /></div>
        <div class="form-group"><label class="form-label">联系电话</label><input type="text" class="form-input" value="139****1234" /></div>
        <div class="form-group"><label class="form-label">联系邮箱</label><input type="email" class="form-input" value="li@agent.com" /></div>
        <div class="form-actions"><button class="btn btn-primary">保存修改</button></div>
      </div>
    </div>`;
}

/* --- 终端用户 - 我的项目 --- */
function renderEndUserProjects() {
  return H.pageHeader('我的项目', '查看已购买的GEO项目详情') +
    `<div class="card-grid" style="grid-template-columns: repeat(2, 1fr)">
      <div class="card-item" style="border: 2px solid var(--color-primary)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <span class="badge badge-success badge-dot">生效中</span>
          <span style="font-size:12px;color:#94A3B8">P20260701</span>
        </div>
        <div class="card-item-title">GEO标准套餐</div>
        <div class="card-item-desc">多平台GEO优化与监测</div>
        <div style="margin:12px 0;padding:12px;background:#F8FAFC;border-radius:8px;font-size:13px;color:#475569">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>关键词数</span><span style="font-weight:500">20个</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span>覆盖平台</span><span style="font-weight:500">6个</span></div>
          <div style="display:flex;justify-content:space-between"><span>有效期至</span><span style="font-weight:500">2027-01-01</span></div>
        </div>
        <button class="btn btn-ghost btn-sm" style="width:100%">查看详情</button>
      </div>
    </div>`;
}

/* --- 终端用户 - 效果报表 --- */
function renderEndUserReports() {
  return H.pageHeader('效果报表', '按项目ID查询关键词在AI平台的效果数据') +
    `<div class="filter-bar" style="display:flex;gap:12px;margin-bottom:16px">
      <input type="text" class="form-input" placeholder="输入项目ID查询" style="width:240px" />
      <select class="form-input" style="width:160px"><option>全部平台</option><option>百度文心</option><option>DeepSeek</option><option>豆包</option></select>
      <button class="btn btn-primary">查询</button>
    </div>` +
    H.table({
      title: '效果数据',
      count: 86,
      columns: [
        { key: 'keyword', label: '训练词' },
        { key: 'question', label: '问题' },
        { key: 'platform', label: '平台' },
        { key: 'source', label: '来源' },
        { key: 'date', label: '采集时间' }
      ],
      rows: [
        { keyword: '防黄剂厂家', question: '防黄剂厂家哪家好', platform: '百度文心', source: '官媒投稿', date: '2026-07-22' },
        { keyword: '防黄剂工厂', question: '推荐防黄剂工厂', platform: 'DeepSeek', source: '官媒投稿', date: '2026-07-22' },
        { keyword: '防黄剂公司', question: '防黄剂公司排名', platform: '豆包', source: '官媒投稿', date: '2026-07-21' }
      ]
    });
}

/* --- 终端用户 - 企业介绍 --- */
function renderEndUserKnowledgeIntro() {
  return H.pageHeader('企业介绍', '管理企业文字资料，供AI文章生成引用',
    '<button class="btn btn-primary">+ 新增资料</button>'
  ) +
    H.table({
      title: '企业资料',
      count: 5,
      columns: [
        { key: 'title', label: '资料标题' },
        { key: 'category', label: '分类' },
        { key: 'words', label: '字数' },
        { key: 'date', label: '更新时间' },
        { key: 'actions', label: '操作', render: () =>
          '<div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div>'
        }
      ],
      rows: [
        { title: '公司简介', category: '企业概况', words: '1,200', date: '2026-07-15' },
        { title: '核心产品介绍', category: '产品资料', words: '2,500', date: '2026-07-10' },
        { title: '企业资质与荣誉', category: '资质证明', words: '800', date: '2026-06-28' }
      ]
    });
}

/* --- 终端用户 - 企业相册 --- */
function renderEndUserKnowledgeAlbum() {
  return H.pageHeader('企业相册', '管理产品图片相册，供AI文章生成引用',
    '<button class="btn btn-primary">+ 上传图片</button>'
  ) +
    `<div class="card-grid" style="grid-template-columns: repeat(4, 1fr)">
      <div class="card-item" style="text-align:center;padding:16px">
        <div style="width:100%;height:120px;background:#F1F5F9;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:24px">🖼️</div>
        <div style="margin-top:8px;font-size:13px;color:#475569">产品图1</div>
      </div>
      <div class="card-item" style="text-align:center;padding:16px">
        <div style="width:100%;height:120px;background:#F1F5F9;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:24px">🖼️</div>
        <div style="margin-top:8px;font-size:13px;color:#475569">产品图2</div>
      </div>
      <div class="card-item" style="text-align:center;padding:16px">
        <div style="width:100%;height:120px;background:#F1F5F9;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:24px">🖼️</div>
        <div style="margin-top:8px;font-size:13px;color:#475569">工厂照片</div>
      </div>
    </div>`;
}

/* --- 终端用户 - 系统消息 --- */
function renderEndUserMessages() {
  return H.pageHeader('系统消息', '业务通知') +
    `<div class="message-list">
      <div class="message-item unread"><div class="message-item-header"><span class="badge badge-success">项目</span><span class="message-time">2026-07-22 10:00</span></div><div class="message-item-body">您的项目 P20260701 已成功创建，预计3个工作日内开始采集数据</div></div>
      <div class="message-item"><div class="message-item-header"><span class="badge badge-primary">效果</span><span class="message-time">2026-07-20 09:30</span></div><div class="message-item-body">您有3个关键词排名上升，请查看效果报表</div></div>
    </div>`;
}

/* --- 终端用户 - 账号设置 --- */
function renderEndUserAccount() {
  return H.pageHeader('账号设置', '基础信息与实名认证') +
    H.tabRow([
      { id: 'profile', label: '基本信息', active: true },
      { id: 'auth', label: '实名认证' }
    ], `
    <div class="form" style="max-width:600px">
      <div class="form-group"><label class="form-label">企业名称 <span class="required">*</span></label><input type="text" class="form-input" value="杭州星辰科技有限公司" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">联系人</label><input type="text" class="form-input" value="王女士" /></div>
        <div class="form-group"><label class="form-label">联系电话</label><input type="text" class="form-input" value="137****5678" /></div>
      </div>
      <div class="form-group"><label class="form-label">联系邮箱</label><input type="email" class="form-input" value="wang@startech.com" /></div>
      <div class="form-actions"><button class="btn btn-primary">保存修改</button><button class="btn btn-secondary">取消</button></div>
    </div>`);
}
