/**
 * 租户端 - 官媒投稿
 * 对齐 F:\workbuddy\docs\manual\租户端\国内GEO管理\官媒投稿\ 下的截图
 * 包含：官媒列表、投稿记录、投稿财务流水、投稿收藏 四个Tab
 * 以及官媒投稿弹窗
 */

/* ========================================
   局部样式
   ======================================== */
(function injectOfficialMediaStyles() {
  if (document.getElementById('official-media-styles')) return;
  const style = document.createElement('style');
  style.id = 'official-media-styles';
  style.textContent = `
    /* Tab 导航 */
    .om-tabs {
      display: flex; gap: 0; border-bottom: 2px solid var(--color-border);
      margin-bottom: 16px;
    }
    .om-tab {
      padding: 10px 24px; font-size: 14px; font-weight: 500;
      color: var(--color-text-secondary); cursor: pointer;
      border-bottom: 2px solid transparent; margin-bottom: -2px;
      transition: all 0.2s; background: none; border-top: none;
      border-left: none; border-right: none;
    }
    .om-tab:hover { color: var(--color-primary); }
    .om-tab.active {
      color: var(--color-primary); border-bottom-color: var(--color-primary);
      font-weight: 600;
    }

    /* 筛选区域 */
    .om-filter-section {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 16px;
    }
    .om-filter-desc {
      font-size: 13px; color: var(--color-text-secondary); margin-bottom: 12px;
    }
    .om-filter-row {
      display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .om-filter-row:last-child { margin-bottom: 0; }
    .om-filter-label {
      font-size: 13px; color: var(--color-text-secondary); min-width: 64px;
      text-align: right; flex-shrink: 0;
    }
    .om-filter-tags {
      display: flex; flex-wrap: wrap; gap: 6px; flex: 1;
    }
    .om-tag {
      padding: 4px 12px; font-size: 12px; border-radius: 4px;
      border: 1px solid var(--color-border); background: var(--color-bg-card);
      color: var(--color-text-primary); cursor: pointer; transition: all 0.15s;
      white-space: nowrap;
    }
    .om-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .om-tag.active {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .om-tag.tag-all {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }

    /* 搜索栏 */
    .om-search-bar {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 16px; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      margin-bottom: 16px;
    }
    .om-search-bar input {
      flex: 1; padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      background: var(--color-bg-card);
    }
    .om-search-bar input:focus { border-color: var(--color-primary); }
    .om-search-bar select {
      padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      background: var(--color-bg-card); min-width: 140px;
    }

    /* 表格 */
    .om-table-wrap {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); overflow: hidden;
    }
    .om-table {
      width: 100%; border-collapse: collapse; font-size: 13px;
    }
    .om-table thead th {
      background: #f8f9fb; padding: 10px 12px; text-align: left;
      font-weight: 600; color: var(--color-text-secondary);
      border-bottom: 1px solid var(--color-border); white-space: nowrap;
    }
    .om-table tbody td {
      padding: 10px 12px; border-bottom: 1px solid var(--color-border);
      color: var(--color-text-primary); vertical-align: middle;
    }
    .om-table tbody tr:last-child td { border-bottom: none; }
    .om-table tbody tr:hover { background: #f5f7ff; }

    /* 收藏星 */
    .om-star {
      cursor: pointer; font-size: 18px; color: #d0d0d0; transition: color 0.2s;
    }
    .om-star:hover, .om-star.active { color: #f5a623; }

    /* 资源名称链接 */
    .om-resource-name {
      color: var(--color-primary); cursor: pointer; font-weight: 500;
    }
    .om-resource-name:hover { text-decoration: underline; }
    .om-resource-id {
      font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;
    }

    /* 状态标签 */
    .om-badge {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 500;
    }
    .om-badge-success { background: #e6f7ee; color: #1a9d5a; }
    .om-badge-warning { background: #fff7e6; color: #d48806; }
    .om-badge-danger { background: #fff1f0; color: #cf1322; }
    .om-badge-info { background: #e6f4ff; color: #096dd9; }
    .om-badge-neutral { background: #f0f0f0; color: #666; }

    /* 操作按钮 */
    .om-btn {
      padding: 4px 14px; font-size: 12px; border-radius: 4px;
      border: none; cursor: pointer; transition: all 0.15s; font-weight: 500;
    }
    .om-btn-primary {
      background: var(--color-primary); color: #fff;
    }
    .om-btn-primary:hover { background: #1d4ed8; }
    .om-btn-ghost {
      background: transparent; color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
    .om-btn-ghost:hover { background: #f0f4ff; }
    .om-btn-danger {
      background: transparent; color: #cf1322;
      border: 1px solid #cf1322;
    }
    .om-btn-danger:hover { background: #fff1f0; }

    /* 分页 */
    .om-pagination {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; font-size: 13px; color: var(--color-text-secondary);
    }
    .om-pagination .page-info { font-weight: 500; }
    .om-pagination .page-controls {
      display: flex; align-items: center; gap: 6px;
    }
    .om-pagination .page-btn {
      width: 28px; height: 28px; display: flex; align-items: center;
      justify-content: center; border: 1px solid var(--color-border);
      border-radius: 4px; cursor: pointer; font-size: 13px;
      background: var(--color-bg-card); color: var(--color-text-primary);
    }
    .om-pagination .page-btn.active {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .om-pagination .page-btn:hover:not(.active) { border-color: var(--color-primary); }
    .om-pagination .page-jump {
      display: flex; align-items: center; gap: 4px; font-size: 13px;
    }
    .om-pagination .page-jump input {
      width: 40px; padding: 4px 6px; border: 1px solid var(--color-border);
      border-radius: 4px; font-size: 13px; text-align: center; outline: none;
    }

    /* 余额栏 */
    .om-balance-bar {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 12px; margin-bottom: 12px; font-size: 13px;
    }
    .om-balance-bar .balance-text { color: var(--color-text-secondary); }
    .om-balance-bar .balance-amount { color: var(--color-primary); font-weight: 600; font-size: 15px; }

    /* 投稿弹窗 */
    .om-modal-content {
      background: var(--color-bg-card); border-radius: var(--radius-lg);
      width: 918px; max-width: 90vw; max-height: 80vh; overflow: hidden;
      display: flex; flex-direction: column;
    }
    .om-modal-header {
      padding: 20px 24px 0; display: flex; justify-content: space-between;
      align-items: flex-start;
    }
    .om-modal-title { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
    .om-modal-subtitle { font-size: 13px; color: var(--color-text-secondary); margin-top: 4px; }
    .om-modal-close {
      background: none; border: none; font-size: 20px; cursor: pointer;
      color: var(--color-text-secondary); padding: 4px;
    }
    .om-modal-close:hover { color: var(--color-text-primary); }
    .om-modal-body { padding: 16px 24px; overflow-y: auto; flex: 1; }
    .om-modal-search {
      display: flex; gap: 8px; margin-bottom: 12px;
    }
    .om-modal-search input {
      flex: 1; padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
    }
    .om-modal-search input:focus { border-color: var(--color-primary); }
    .om-modal-price {
      display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
      font-size: 13px;
    }
    .om-modal-price select {
      padding: 6px 10px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
    }
    .om-article-list {
      border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      max-height: 260px; overflow-y: auto;
    }
    .om-article-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-bottom: 1px solid var(--color-border);
      font-size: 13px;
    }
    .om-article-item:last-child { border-bottom: none; }
    .om-article-item input[type="checkbox"] {
      width: 16px; height: 16px; accent-color: var(--color-primary);
      cursor: pointer; flex-shrink: 0;
    }
    .om-article-info { flex: 1; min-width: 0; }
    .om-article-title {
      font-weight: 500; color: var(--color-text-primary);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .om-article-client {
      font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;
    }
    .om-article-date {
      font-size: 12px; color: var(--color-text-secondary); flex-shrink: 0;
    }
    .om-modal-footer {
      padding: 12px 24px 20px; display: flex; flex-direction: column; gap: 12px;
    }
    .om-total-cost {
      font-size: 14px; color: var(--color-text-primary);
    }
    .om-total-cost strong { color: var(--color-primary); font-size: 16px; }
    .om-modal-actions {
      display: flex; justify-content: flex-end; gap: 10px;
    }
    .om-modal-actions .btn-cancel {
      padding: 8px 20px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); background: var(--color-bg-card);
      font-size: 13px; cursor: pointer; color: var(--color-text-primary);
    }
    .om-modal-actions .btn-cancel:hover { border-color: var(--color-primary); }
    .om-modal-actions .btn-confirm {
      padding: 8px 20px; border: none; border-radius: var(--radius-sm);
      background: var(--color-primary); color: #fff; font-size: 13px;
      cursor: pointer; font-weight: 500;
    }
    .om-modal-actions .btn-confirm:hover { background: #1d4ed8; }

    /* 财务流水金额颜色 */
    .om-amount-positive { color: #cf1322; font-weight: 600; }
    .om-amount-negative { color: #1a9d5a; font-weight: 600; }

    /* 备注列 */
    .om-note-cell {
      max-width: 200px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; font-size: 12px; color: var(--color-text-secondary);
    }

    /* 多选 checkbox */
    .om-checkbox {
      width: 16px; height: 16px; accent-color: var(--color-primary);
      cursor: pointer;
    }

    /* 底部操作栏 */
    .om-action-bar {
      position: fixed; bottom: 0; left: 220px; right: 0;
      background: #fff; border-top: 1px solid var(--color-border);
      box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
      z-index: 100; display: none; flex-direction: column;
    }
    .om-action-bar.visible { display: flex; }
    .om-action-bar-top {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      padding: 10px 20px 6px; min-height: 36px;
    }
    .om-selected-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; background: #f0f4ff; border: 1px solid #d6e0ff;
      border-radius: 4px; font-size: 12px; color: var(--color-primary);
      white-space: nowrap;
    }
    .om-selected-tag .tag-price { color: #cf1322; font-weight: 600; }
    .om-selected-tag .tag-remove {
      cursor: pointer; margin-left: 2px; font-size: 14px;
      color: #999; line-height: 1;
    }
    .om-selected-tag .tag-remove:hover { color: #cf1322; }
    .om-action-bar-bottom {
      display: flex; align-items: center; gap: 12px; padding: 8px 20px 12px;
    }
    .om-action-bar-bottom .ab-left { flex: 1; }
    .om-action-bar-bottom .ab-center {
      display: flex; align-items: center; gap: 12px;
    }
    .om-action-bar-bottom .ab-right { flex: 1; display: flex; justify-content: flex-end; }
    .om-action-bar-bottom .ab-btn {
      padding: 7px 20px; font-size: 13px; border-radius: 4px;
      border: 1px solid var(--color-border); cursor: pointer;
      background: var(--color-bg-card); color: var(--color-text-primary);
      transition: all 0.15s;
    }
    .om-action-bar-bottom .ab-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .om-action-bar-bottom .ab-btn-clear { color: #666; }
    .om-action-bar-bottom .ab-btn-switch { color: var(--color-primary); border-color: var(--color-primary); }
    .om-action-bar-bottom .ab-btn-submit {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary); font-weight: 600;
    }
    .om-action-bar-bottom .ab-btn-submit:hover { background: #1d4ed8; }
    .om-action-bar-bottom .ab-summary {
      font-size: 14px; color: var(--color-text-primary); font-weight: 500;
    }
    .om-action-bar-bottom .ab-summary strong { color: #cf1322; }

    /* 气泡确认弹窗 */
    .om-confirm-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3); z-index: 200;
      display: flex; align-items: center; justify-content: center;
    }
    .om-confirm-card {
      background: #fff; border-radius: 12px; padding: 28px 32px 24px;
      width: 380px; max-width: 90vw; box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      text-align: center;
    }
    .om-confirm-icon {
      width: 48px; height: 48px; margin: 0 auto 16px;
      background: #fff7e6; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    }
    .om-confirm-title {
      font-size: 16px; font-weight: 600; color: var(--color-text-primary);
      margin-bottom: 8px;
    }
    .om-confirm-desc {
      font-size: 13px; color: var(--color-text-secondary); margin-bottom: 24px;
    }
    .om-confirm-actions {
      display: flex; gap: 12px; justify-content: center;
    }
    .om-confirm-actions .om-cf-btn {
      padding: 8px 28px; border-radius: 6px; font-size: 13px;
      cursor: pointer; border: 1px solid var(--color-border);
      background: var(--color-bg-card); color: var(--color-text-primary);
      transition: all 0.15s;
    }
    .om-confirm-actions .om-cf-btn:hover { border-color: var(--color-primary); }
    .om-confirm-actions .om-cf-btn-primary {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .om-confirm-actions .om-cf-btn-primary:hover { background: #1d4ed8; }
  `;
  document.head.appendChild(style);
})();

/* ========================================
   模拟数据
   ======================================== */
const OM_MEDIA_LIST = [
  {
    id: '1192052178936922127', name: '中国经济新闻网-科技', mediaType: '网络媒体',
    channelType: 'IT科技', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 4, specialIndustry: '-',
    loadTime: '18:00', note: '收录好，不可带联系方式，偏...', status: '可用',
    prices: [{ type: '主售价', amount: 60 }]
  },
  {
    id: '119091140954769679', name: '壹生网（GEO排名方案）', mediaType: '网络媒体',
    channelType: '生活消费', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 4, specialIndustry: '-',
    loadTime: '20:00', note: '审核松 出稿快，GEO排名稿件', status: '可用',
    prices: [{ type: '头条价格', amount: 23 }, { type: '普条价格', amount: 20 }]
  },
  {
    id: '1190353082236141583', name: '八方资源网(GEO排名方案)', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 3, specialIndustry: '-',
    loadTime: '20:00', note: '可发geo排名稿件，广告法禁...', status: '可用',
    prices: [{ type: '直发价格', amount: 20 }, { type: '任务价格', amount: 20 }, { type: '转发价格', amount: 25 }]
  },
  {
    id: '1189477108646117391', name: '中原区人民政府网（GEO方案）', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '河南', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 1, specialIndustry: '-',
    loadTime: '20:00', note: '可发GEO稿件，政府网站', status: '可用',
    prices: [{ type: '主售价', amount: 55 }]
  },
  {
    id: '1187198398942015503', name: '养拉网', mediaType: '网络媒体',
    channelType: '健康医疗', portal: '其他门户', region: '全国', linkType: '可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 0, specialIndustry: '健康,医疗',
    loadTime: '22:00', note: '医疗、医美专业发布平台，AI...', status: '可用',
    prices: [{ type: '主售价', amount: 98 }]
  },
  {
    id: '1188532866486720767', name: '红黑网（广告排名方案）', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '不可发', weight: 1, specialIndustry: '-',
    loadTime: '18:00', note: '限图3张，审核松，可发GEO排...', status: '可用',
    prices: [{ type: '主售价', amount: 35 }]
  },
  {
    id: '1188532866486720768', name: '新华社客户端首发（限指数授权）', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '新华网', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '不可发', weight: 1, specialIndustry: '-',
    loadTime: '18:00', note: '秒出一手资源 改稿不通知', status: '可用',
    prices: [{ type: '主售价', amount: 1250 }]
  }
];

const OM_SUBMISSION_RECORDS = [
  {
    channel: '官媒1', article: '露营打除了照明，还有哪些神奇功能让你惊艳？',
    mediaResource: '站长之家（知乎号）', mediaType: '网络媒体', priceType: '默认价格',
    deduction: 25.00, status: '投稿失败', upstreamNo: '-',
    receipt: '上游投稿失败: upstream rejected re...', createTime: '2026-06-30 09:23:26'
  }
];

const OM_FINANCIAL_RECORDS = [
  {
    channel: '官媒1', flowType: '退款', amount: 25.00, balance: 10000.00,
    article: '露营打除了照明，还有哪些神奇功能让你惊艳？',
    mediaResource: '站长之家（知乎号）', user: 'xmdl', enterprise: '-',
    note: '上游投稿失败: upstream rejected request: code="ERROR00015", message="资源信息不存在"',
    genTime: '2026-06-30 09:34:04'
  },
  {
    channel: '官媒1', flowType: '扣款', amount: -25.00, balance: 9975.00,
    article: '露营打除了照明，还有哪些神奇功能让你惊艳？',
    mediaResource: '站长之家（知乎号）', user: 'xmdl', enterprise: '-',
    note: '官媒投稿扣款', genTime: '2026-06-30 09:23:26'
  }
];

const OM_FAVORITES = [
  {
    channel: '官媒1', user: 'xmdl', resourceName: '中国经济新闻网-科技',
    mediaType: '网络媒体', price: 120.00, status: '可用',
    favoriteTime: '2026-07-15 10:49:35'
  }
];

const OM_ARTICLES = [
  { title: '香薰机', client: '蓝玉科技有限公司', date: '2026-06-29', checked: true },
  { title: '半夜被子翻，嗓子像吞沙子？打开它，呼吸都变温柔了', client: '蓝玉科技有限公司', date: '2026-06-29', checked: true },
  { title: '冬季干燥救星！横评6款热销加湿器后，这3个选购误区你可能也中招了', client: '蓝玉科技有限公司', date: '2026-06-29', checked: true },
  { title: '加湿技术进入「微生态调控」时代：从盲目加湿到环境自适应系统的底层商业变局', client: '蓝玉科技有限公司', date: '2026-06-29', checked: false },
  { title: '从照明工具到营地能源与氛围中枢，重塑精致户外新范式', client: '蓝玉科技有限公司', date: '2026-06-24', checked: false }
];

/* ========================================
   当前Tab状态
   ======================================== */
let omCurrentTab = 'media-list';

/* ========================================
   已选资源状态
   ======================================== */
let omSelectedIds = new Set();
let omSelectedPrices = {}; // 存储每个资源选中的价格类型 { id: { type, amount } }

/* ========================================
   主渲染函数
   ======================================== */
function renderTenantMedia() {
  // 默认渲染官媒列表内容
  const html = `
    <div class="om-tabs">
      <button class="om-tab ${omCurrentTab === 'media-list' ? 'active' : ''}" onclick="switchOmTab('media-list')">官媒列表</button>
      <button class="om-tab ${omCurrentTab === 'submission-records' ? 'active' : ''}" onclick="switchOmTab('submission-records')">投稿记录</button>
      <button class="om-tab ${omCurrentTab === 'financial-records' ? 'active' : ''}" onclick="switchOmTab('financial-records')">投稿财务流水</button>
      <button class="om-tab ${omCurrentTab === 'favorites' ? 'active' : ''}" onclick="switchOmTab('favorites')">投稿收藏</button>
    </div>
    <div id="om-tab-content">${renderOmTabContent(omCurrentTab)}</div>
  `;
  // 渲染后更新操作栏
  setTimeout(() => {
    if (omCurrentTab === 'media-list') omUpdateActionBar();
  }, 0);
  return html;
}

function switchOmTab(tab) {
  omCurrentTab = tab;
  const content = document.getElementById('om-tab-content');
  if (!content) return;
  content.innerHTML = renderOmTabContent(tab);
  // 更新tab样式
  document.querySelectorAll('.om-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.om-tab');
  const tabMap = { 'media-list': 0, 'submission-records': 1, 'financial-records': 2, 'favorites': 3 };
  if (tabs[tabMap[tab]]) tabs[tabMap[tab]].classList.add('active');
  // 渲染后更新操作栏
  if (tab === 'media-list') {
    setTimeout(() => omUpdateActionBar(), 0);
  }
}

function renderOmTabContent(tab) {
  switch (tab) {
    case 'media-list': return renderOmMediaList();
    case 'submission-records': return renderOmSubmissionRecords();
    case 'financial-records': return renderOmFinancialRecords();
    case 'favorites': return renderOmFavorites();
    default: return '';
  }
}

/* ========================================
   Tab 1: 官媒列表
   ======================================== */
function renderOmMediaList() {
  const mediaTypes = ['网络媒体', '自媒体', '微信', '微博', '贴吧', '论坛', '问答', '友链', '文案代写', '小红书', '百度百科', '品牌宝', '短视频'];
  const channelTypes = ['IT科技', '财经金融', '新闻资讯', '健康医疗', '汽车行业', '留学教育', '家装家居', '房产行业', '生活消费', '酒店旅游', '女性时尚', '游戏行业', '娱乐行业', '文化艺术', '亲子母婴', '贸易能源', '食品餐饮', '体育运动', '区块链', '公益', '其他'];
  const portals = ['搜狐网', '新浪网', '凤凰网', '网易网', '腾讯网', '中国网', '人民网', '央视网', '中国日报网', '其他门户', '中国经济网', '官方百家号', '中国广播网', '中国新闻网', '光明网', '环球网', '中国青年网', '国际在线', '和讯网'];
  const regions = ['全国', '海外资源', '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '澳门'];
  const linkTypes = ['不可带网址', '可带网址'];
  const collectionStatuses = ['包网页收录', '不包网页收录', '包资讯收录', '不包资讯收录'];
  const weekends = ['不可发', '可发'];
  const weights = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const specialIndustries = ['金融', '健康', '加盟', '微商', '特殊', '医疗'];
  const loadTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];
  const overseas = ['是', '否'];
  const aiRecords = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  function tagRow(label, items, activeIdx) {
    return `<div class="om-filter-row">
      <span class="om-filter-label">${label}</span>
      <div class="om-filter-tags">
        <span class="om-tag tag-all">不限</span>
        ${items.map((item, i) => `<span class="om-tag ${i === activeIdx ? 'active' : ''}">${item}</span>`).join('')}
      </div>
    </div>`;
  }

  return `
    <div class="om-filter-section">
      <div class="om-filter-desc">筛选官媒资源并收藏常用投稿渠道</div>
      ${tagRow('媒体类型', mediaTypes, 0)}
      ${tagRow('频道类型', channelTypes, -1)}
      ${tagRow('综合门户', portals, -1)}
      ${tagRow('所在地区', regions, -1)}
      ${tagRow('链接类型', linkTypes, -1)}
      ${tagRow('收录情况', collectionStatuses, -1)}
      ${tagRow('周末可发', weekends, -1)}
      ${tagRow('媒体权重', weights, -1)}
      ${tagRow('特别行业', specialIndustries, -1)}
      ${tagRow('截稿时间', loadTimes, -1)}
      ${tagRow('海外资源', overseas, -1)}
      ${tagRow('AI收录', aiRecords, -1)}
    </div>

    <div class="om-search-bar">
      <input type="text" placeholder="输入资源名称或资源 ID" />
      <button class="om-btn om-btn-primary" style="padding:8px 24px;">查询</button>
      <button class="om-btn om-btn-ghost" style="padding:8px 20px;">重置</button>
    </div>

    <div class="om-table-wrap">
      <table class="om-table">
        <thead>
          <tr>
            <th style="width:40px;"><input type="checkbox" class="om-checkbox" id="om-select-all" onchange="omToggleAll(this)" /></th>
            <th style="width:40px;">收藏</th>
            <th>资源名称</th>
            <th>媒体类型</th>
            <th>频道类型</th>
            <th>综合门户</th>
            <th>所在地区</th>
            <th>链接类型</th>
            <th>收录情况</th>
            <th>周末可发</th>
            <th>媒体权重</th>
            <th>特别行业</th>
            <th>截稿时间</th>
            <th>媒体备注</th>
            <th>价格</th>
            <th style="white-space:nowrap;">状态</th>
            <th style="white-space:nowrap;">操作</th>
          </tr>
        </thead>
        <tbody>
          ${OM_MEDIA_LIST.map(item => {
            const hasMultiplePrices = item.prices.length > 1;
            const priceHtml = hasMultiplePrices
              ? item.prices.map((p, idx) => `
                <div style="display:flex;align-items:center;gap:4px;margin-bottom:${idx < item.prices.length - 1 ? '4px' : '0'};">
                  <input type="radio" name="price-${item.id}" class="om-price-radio" data-id="${item.id}" data-price-type="${p.type}" data-price="${p.amount}" ${idx === 0 ? 'checked' : ''} onchange="omSelectPrice(this)" />
                  <span style="white-space:nowrap;">${p.type}：¥${p.amount}元</span>
                </div>
              `).join('')
              : `<span style="white-space:nowrap;">${item.prices[0].type}：¥${item.prices[0].amount}元</span>`;
            return `
            <tr>
              <td><input type="checkbox" class="om-checkbox om-row-cb" data-id="${item.id}" data-name="${item.name}" data-price="${item.prices[0].amount}" ${omSelectedIds.has(item.id) ? 'checked' : ''} onchange="omToggleRow(this)" /></td>
              <td><span class="om-star" onclick="omToggleFavorite(this, '${item.id}')">☆</span></td>
              <td>
                <div class="om-resource-name">${item.name}</div>
                <div class="om-resource-id">ID: ${item.id}</div>
              </td>
              <td>${item.mediaType}</td>
              <td>${item.channelType}</td>
              <td>${item.portal}</td>
              <td>${item.region}</td>
              <td>${item.linkType}</td>
              <td>${item.collectionStatus}</td>
              <td>${item.weekend}</td>
              <td>${item.weight}</td>
              <td>${item.specialIndustry}</td>
              <td>${item.loadTime}</td>
              <td class="om-note-cell" title="${item.note}">${item.note}</td>
              <td style="white-space:nowrap;">${priceHtml}</td>
              <td style="white-space:nowrap;"><span class="om-badge om-badge-success">${item.status}</span></td>
              <td style="white-space:nowrap;">
                <button class="om-btn om-btn-primary" onclick="openOmSubmitModal('${item.id}')">投稿</button>
                <button class="om-btn om-btn-ghost" style="margin-left:4px;">收藏</button>
              </td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    </div>

    <div class="om-action-bar ${omSelectedIds.size > 0 ? 'visible' : ''}" id="om-action-bar">
      <div class="om-action-bar-top" id="om-selected-tags"></div>
      <div class="om-action-bar-bottom">
        <div class="ab-left"></div>
        <div class="ab-center">
          <button class="ab-btn ab-btn-clear" onclick="omClearSelection()">清除</button>
          <button class="ab-btn ab-btn-submit" onclick="openOmSubmitModal()">快速投稿</button>
          <span class="ab-summary">已选资源 <strong id="om-selected-count">${omSelectedIds.size}</strong> 个 &nbsp; 合计 <strong id="om-selected-total">${omCalcTotal()}</strong> 元</span>
        </div>
        <div class="ab-right">
          <button class="ab-btn ab-btn-switch">导出已选资源</button>
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   Tab 2: 投稿记录
   ======================================== */
function renderOmSubmissionRecords() {
  return `
    <div class="om-filter-desc" style="margin-bottom:12px;">查看官媒投稿状态、扣费金额和上游回执。</div>
    <div class="om-search-bar">
      <select>
        <option>全部官媒渠道</option>
        <option>官媒1</option>
      </select>
      <select>
        <option>全部状态</option>
        <option>投稿成功</option>
        <option>投稿失败</option>
        <option>审核中</option>
      </select>
      <button class="om-btn om-btn-primary" style="padding:8px 24px;">查询</button>
    </div>

    <div class="om-table-wrap">
      <table class="om-table">
        <thead>
          <tr>
            <th>官媒渠道</th>
            <th>文章</th>
            <th>媒体资源</th>
            <th>媒体类型</th>
            <th>价格类型</th>
            <th>扣费金额</th>
            <th>投稿状态</th>
            <th>上游单号</th>
            <th>回执</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${OM_SUBMISSION_RECORDS.map(item => `
            <tr>
              <td>${item.channel}</td>
              <td class="om-note-cell" title="${item.article}">${item.article}</td>
              <td>${item.mediaResource}</td>
              <td>${item.mediaType}</td>
              <td>${item.priceType}</td>
              <td>${item.deduction.toFixed(2)}</td>
              <td><span class="om-badge om-badge-danger">${item.status}</span></td>
              <td>${item.upstreamNo}</td>
              <td class="om-note-cell" title="${item.receipt}">${item.receipt}</td>
              <td>${item.createTime}</td>
              <td><button class="om-btn om-btn-ghost">退稿</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="om-pagination">
      <span class="page-info">第 1 页，共 1 条</span>
      <div class="page-controls">
        <span class="page-btn">&lt;</span>
        <span class="page-btn active">1</span>
        <span class="page-btn">&gt;</span>
        <div class="page-jump">
          跳至 <input type="text" value="" /> 页
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   Tab 3: 投稿财务流水
   ======================================== */
function renderOmFinancialRecords() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div class="om-filter-desc" style="margin-bottom:0;">查看官媒投稿产生的扣款、退款和冲正明细。</div>
      <div class="om-balance-bar">
        <span class="balance-text">余额要大于所投稿文章的金额才能投稿</span>
        <span class="balance-text">余额：</span>
        <span class="balance-amount">10000.00 元</span>
        <button class="om-btn om-btn-primary" style="padding:6px 16px;">充值</button>
      </div>
    </div>

    <div class="om-search-bar">
      <select>
        <option>全部官媒渠道</option>
        <option>官媒1</option>
      </select>
      <select>
        <option>全部流水类型</option>
        <option>扣款</option>
        <option>退款</option>
        <option>冲正</option>
      </select>
      <input type="text" placeholder="投稿文章" style="flex:0.8;" />
      <input type="text" placeholder="媒体资源" style="flex:0.8;" />
      <button class="om-btn om-btn-primary" style="padding:8px 24px;">查询</button>
    </div>

    <div class="om-table-wrap">
      <table class="om-table">
        <thead>
          <tr>
            <th>官媒渠道</th>
            <th>流水类型</th>
            <th>金额</th>
            <th>余额快照</th>
            <th>投稿文章</th>
            <th>媒体资源</th>
            <th>用户</th>
            <th>企业</th>
            <th>备注</th>
            <th>生成时间</th>
          </tr>
        </thead>
        <tbody>
          ${OM_FINANCIAL_RECORDS.map(item => `
            <tr>
              <td>${item.channel}</td>
              <td><span class="om-badge ${item.flowType === '退款' ? 'om-badge-success' : 'om-badge-danger'}">${item.flowType}</span></td>
              <td class="${item.amount > 0 ? 'om-amount-positive' : 'om-amount-negative'}">${item.amount.toFixed(2)}</td>
              <td>${item.balance.toFixed(2)}</td>
              <td class="om-note-cell" title="${item.article}">${item.article}</td>
              <td>${item.mediaResource}</td>
              <td>${item.user}</td>
              <td>${item.enterprise}</td>
              <td class="om-note-cell" title="${item.note}">${item.note}</td>
              <td>${item.genTime}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="om-pagination">
      <span class="page-info">第 1 页，共 2 条</span>
      <div class="page-controls">
        <span class="page-btn">&lt;</span>
        <span class="page-btn active">1</span>
        <span class="page-btn">&gt;</span>
        <div class="page-jump">
          跳至 <input type="text" value="" /> 页
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   Tab 4: 投稿收藏
   ======================================== */
function renderOmFavorites() {
  return `
    <div class="om-filter-desc" style="margin-bottom:12px;">查看 SaaS 用户收藏的常用广告资源</div>
    <div class="om-search-bar">
      <select>
        <option>全部官媒渠道</option>
        <option>官媒1</option>
      </select>
      <button class="om-btn om-btn-primary" style="padding:8px 24px;">查询</button>
    </div>

    <div class="om-table-wrap">
      <table class="om-table">
        <thead>
          <tr>
            <th>官媒渠道</th>
            <th>收藏用户</th>
            <th>广告资源名称</th>
            <th>媒体类型</th>
            <th>价格</th>
            <th style="white-space:nowrap;">资源状态</th>
            <th>收藏时间</th>
            <th style="white-space:nowrap;">操作</th>
          </tr>
        </thead>
        <tbody>
          ${OM_FAVORITES.map(item => `
            <tr>
              <td>${item.channel}</td>
              <td>${item.user}</td>
              <td>${item.resourceName}</td>
              <td>${item.mediaType}</td>
              <td style="white-space:nowrap;">¥${item.price.toFixed(2)}元</td>
              <td style="white-space:nowrap;"><span class="om-badge om-badge-success">${item.status}</span></td>
              <td>${item.favoriteTime}</td>
              <td style="white-space:nowrap;"><button class="om-btn om-btn-danger">取消收藏</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="om-pagination">
      <span class="page-info">第 1 页，共 1 条</span>
      <div class="page-controls">
        <span class="page-btn">&lt;</span>
        <span class="page-btn active">1</span>
        <span class="page-btn">&gt;</span>
        <div class="page-jump">
          跳至 <input type="text" value="" /> 页
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   官媒投稿弹窗
   ======================================== */
function openOmSubmitModal(singleResourceId) {
  // 关闭已有弹窗
  closeOmSubmitModal();

  let selectedResources = [];
  let isSingleResource = false;

  if (singleResourceId) {
    // 单个资源投稿（点击"投稿"按钮）
    isSingleResource = true;
    const item = OM_MEDIA_LIST.find(m => m.id === singleResourceId);
    if (item) {
      selectedResources = [{
        id: item.id,
        name: item.name,
        prices: item.prices
      }];
    }
  } else {
    // 快速投稿（底部操作栏）
    selectedResources = Array.from(omSelectedIds).map(id => {
      const item = OM_MEDIA_LIST.find(m => m.id === id);
      if (!item) return null;
      const selectedPrice = omSelectedPrices[id] || item.prices[0];
      return {
        id: item.id,
        name: item.name,
        selectedPrice: selectedPrice
      };
    }).filter(Boolean);
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'om-submit-modal';
  
  let bodyHtml = '';
  
  if (isSingleResource && selectedResources.length > 0) {
    // 单个资源投稿：显示全部价格选项
    const resource = selectedResources[0];
    const resourceSummary = `${resource.name}`;
    
    bodyHtml = `
      <div class="om-modal-header">
        <div>
          <div class="om-modal-title">官媒投稿</div>
          <div class="om-modal-subtitle">${resourceSummary}</div>
        </div>
        <button class="om-modal-close" onclick="closeOmSubmitModal()">✕</button>
      </div>
      <div class="om-modal-body">
        <div style="margin-bottom:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:500;white-space:nowrap;">选择价格类型：</span>
          ${resource.prices.map((p, idx) => `
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
              <input type="radio" name="modal-price" value="${p.type}" data-amount="${p.amount}" ${idx === 0 ? 'checked' : ''} onchange="updateOmModalTotal()" />
              <span>${p.type}</span>
              <span style="color:#cf1322;font-weight:600;">¥${p.amount}元</span>
            </label>
          `).join('')}
        </div>
        <div class="om-modal-search">
          <input type="text" placeholder="搜索文章标题、关键词、客户" />
          <button class="om-btn om-btn-primary" style="padding:8px 20px;">查询</button>
        </div>
        <div class="om-article-list">
          ${OM_ARTICLES.map((article, i) => `
            <div class="om-article-item">
              <input type="checkbox" ${article.checked ? 'checked' : ''} onchange="updateOmModalTotal()" />
              <div class="om-article-info">
                <div class="om-article-title">${article.title}</div>
                <div class="om-article-client">${article.client}</div>
              </div>
              <div class="om-article-date">${article.date}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="om-modal-footer">
        <div class="om-total-cost">费用合计：<strong id="om-total-amount">0.00</strong></div>
        <div class="om-modal-actions">
          <button class="btn-cancel" onclick="closeOmSubmitModal()">取消</button>
          <button class="btn-confirm" onclick="confirmOmSubmit()">确认投稿</button>
        </div>
      </div>
    `;
  } else {
    // 快速投稿：显示所有已选资源的名称和价格
    const resourceSummary = selectedResources.map(r => `${r.name}（${r.selectedPrice.type}：¥${r.selectedPrice.amount}元）`).join('、');
    const resourceTotal = selectedResources.reduce((sum, r) => sum + r.selectedPrice.amount, 0);
    
    bodyHtml = `
      <div class="om-modal-header">
        <div>
          <div class="om-modal-title">快速投稿</div>
          <div class="om-modal-subtitle">${resourceSummary || '未选择资源'}</div>
        </div>
        <button class="om-modal-close" onclick="closeOmSubmitModal()">✕</button>
      </div>
      <div class="om-modal-body">
        <div class="om-modal-search">
          <input type="text" placeholder="搜索文章标题、关键词、客户" />
          <button class="om-btn om-btn-primary" style="padding:8px 20px;">查询</button>
        </div>
        <div class="om-article-list">
          ${OM_ARTICLES.map((article, i) => `
            <div class="om-article-item">
              <input type="checkbox" ${article.checked ? 'checked' : ''} onchange="updateOmTotal(${resourceTotal})" />
              <div class="om-article-info">
                <div class="om-article-title">${article.title}</div>
                <div class="om-article-client">${article.client}</div>
              </div>
              <div class="om-article-date">${article.date}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="om-modal-footer">
        <div class="om-total-cost">费用合计：<strong id="om-total-amount">${(resourceTotal * OM_ARTICLES.filter(a => a.checked).length).toFixed(2)}</strong></div>
        <div class="om-modal-actions">
          <button class="btn-cancel" onclick="closeOmSubmitModal()">取消</button>
          <button class="btn-confirm" onclick="confirmOmSubmit()">确认投稿</button>
        </div>
      </div>
    `;
  }
  
  overlay.innerHTML = `<div class="om-modal-content">${bodyHtml}</div>`;
  document.body.appendChild(overlay);
  
  // 初始化总计
  if (isSingleResource) {
    updateOmModalTotal();
  }
}

function updateOmModalTotal() {
  const priceRadio = document.querySelector('#om-submit-modal input[name="modal-price"]:checked');
  const checkboxes = document.querySelectorAll('#om-submit-modal .om-article-item input[type="checkbox"]');
  
  if (!priceRadio) return;
  
  const price = parseFloat(priceRadio.getAttribute('data-amount'));
  let count = 0;
  checkboxes.forEach(cb => { if (cb.checked) count++; });
  
  const total = (price * count).toFixed(2);
  const el = document.getElementById('om-total-amount');
  if (el) el.textContent = total;
}

function closeOmSubmitModal() {
  const modal = document.getElementById('om-submit-modal');
  if (modal) modal.remove();
}

function updateOmTotal(resourceTotal) {
  const checkboxes = document.querySelectorAll('#om-submit-modal .om-article-item input[type="checkbox"]');
  let count = 0;
  checkboxes.forEach(cb => { if (cb.checked) count++; });
  const total = ((resourceTotal || 0) * count).toFixed(2);
  const el = document.getElementById('om-total-amount');
  if (el) el.textContent = total;
}

function confirmOmSubmit() {
  const checkboxes = document.querySelectorAll('#om-submit-modal .om-article-item input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    showToast('请至少选择一篇文章', 'warning');
    return;
  }
  closeOmSubmitModal();
  showToast('投稿任务已创建，等待上游提交。', 'success');
}

// 点击遮罩关闭
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'om-submit-modal') {
    closeOmSubmitModal();
  }
});

/* ========================================
   多选交互逻辑
   ======================================== */
function omCalcTotal() {
  let total = 0;
  omSelectedIds.forEach(id => {
    const selectedPrice = omSelectedPrices[id];
    if (selectedPrice) {
      total += selectedPrice.amount;
    } else {
      const item = OM_MEDIA_LIST.find(m => m.id === id);
      if (item) total += item.prices[0].amount;
    }
  });
  return total.toFixed(2);
}

function omUpdateActionBar() {
  const bar = document.getElementById('om-action-bar');
  if (!bar) return;

  if (omSelectedIds.size === 0) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');

  // 更新已选标签
  const tagsContainer = document.getElementById('om-selected-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = Array.from(omSelectedIds).map(id => {
      const item = OM_MEDIA_LIST.find(m => m.id === id);
      if (!item) return '';
      const selectedPrice = omSelectedPrices[id] || item.prices[0];
      return `<span class="om-selected-tag">${item.name} <span class="tag-price">${selectedPrice.type}：¥${selectedPrice.amount}元</span> <span class="tag-remove" onclick="omRemoveSelected('${id}')">✕</span></span>`;
    }).join('');
  }

  // 更新计数和合计
  const countEl = document.getElementById('om-selected-count');
  if (countEl) countEl.textContent = omSelectedIds.size;
  const totalEl = document.getElementById('om-selected-total');
  if (totalEl) totalEl.textContent = omCalcTotal();

  // 更新全选 checkbox 状态
  const selectAll = document.getElementById('om-select-all');
  if (selectAll) {
    const allCbs = document.querySelectorAll('.om-row-cb');
    selectAll.checked = allCbs.length > 0 && omSelectedIds.size === allCbs.length;
  }
}

function omToggleAll(el) {
  const checkboxes = document.querySelectorAll('.om-row-cb');
  checkboxes.forEach(cb => {
    cb.checked = el.checked;
    const id = cb.getAttribute('data-id');
    if (el.checked) {
      omSelectedIds.add(id);
    } else {
      omSelectedIds.delete(id);
    }
  });
  omUpdateActionBar();
}

function omToggleRow(el) {
  const id = el.getAttribute('data-id');
  const item = OM_MEDIA_LIST.find(m => m.id === id);
  
  if (el.checked) {
    // 检查是否是多价格资源
    if (item && item.prices.length > 1) {
      // 检查是否已选择价格
      const selectedRadio = document.querySelector(`input[name="price-${id}"]:checked`);
      if (!selectedRadio) {
        el.checked = false;
        showToast('请选择右侧对应的资源价格', 'warning');
        return;
      }
      omSelectedPrices[id] = {
        type: selectedRadio.getAttribute('data-price-type'),
        amount: parseFloat(selectedRadio.getAttribute('data-price'))
      };
    } else if (item) {
      // 单价格资源，使用默认价格
      omSelectedPrices[id] = {
        type: item.prices[0].type,
        amount: item.prices[0].amount
      };
    }
    omSelectedIds.add(id);
  } else {
    omSelectedIds.delete(id);
    delete omSelectedPrices[id];
  }
  omUpdateActionBar();
}

function omSelectPrice(el) {
  const id = el.getAttribute('data-id');
  const priceType = el.getAttribute('data-price-type');
  const price = parseFloat(el.getAttribute('data-price'));
  
  // 更新选中的价格
  omSelectedPrices[id] = { type: priceType, amount: price };
  
  // 如果该行已勾选，更新操作栏
  if (omSelectedIds.has(id)) {
    omUpdateActionBar();
  }
}

function omToggleFavorite(el, id) {
  const item = OM_MEDIA_LIST.find(m => m.id === id);
  
  // 检查是否是多价格资源
  if (item && item.prices.length > 1) {
    // 检查是否已选择价格
    const selectedRadio = document.querySelector(`input[name="price-${id}"]:checked`);
    if (!selectedRadio) {
      showToast('请选择右侧对应的资源价格', 'warning');
      return;
    }
  }
  
  // 切换收藏状态
  el.classList.toggle('active');
  if (el.classList.contains('active')) {
    el.textContent = '★';
    showToast('已收藏', 'success');
  } else {
    el.textContent = '☆';
    showToast('已取消收藏', 'success');
  }
}

function omRemoveSelected(id) {
  omSelectedIds.delete(id);
  const cb = document.querySelector(`.om-row-cb[data-id="${id}"]`);
  if (cb) cb.checked = false;
  omUpdateActionBar();
}

function omClearSelection() {
  if (omSelectedIds.size === 0) return;
  omShowConfirm(
    '确认清除',
    `确定要清除已选的 ${omSelectedIds.size} 个资源吗？`,
    () => {
      omSelectedIds.clear();
      document.querySelectorAll('.om-row-cb').forEach(cb => cb.checked = false);
      const selectAll = document.getElementById('om-select-all');
      if (selectAll) selectAll.checked = false;
      omUpdateActionBar();
    }
  );
}

function omShowConfirm(title, desc, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'om-confirm-overlay';
  overlay.id = 'om-confirm-overlay';
  overlay.innerHTML = `
    <div class="om-confirm-card">
      <div class="om-confirm-icon">⚠️</div>
      <div class="om-confirm-title">${title}</div>
      <div class="om-confirm-desc">${desc}</div>
      <div class="om-confirm-actions">
        <button class="om-cf-btn" onclick="omCloseConfirm()">取消</button>
        <button class="om-cf-btn om-cf-btn-primary" id="om-cf-ok">确认</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('om-cf-ok').onclick = function() {
    omCloseConfirm();
    onConfirm();
  };
}

function omCloseConfirm() {
  const overlay = document.getElementById('om-confirm-overlay');
  if (overlay) overlay.remove();
}

// 暴露全局渲染函数
window.renderTenantMedia = renderTenantMedia;
