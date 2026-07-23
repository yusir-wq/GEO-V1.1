/**
 * 超管端 - 官媒投稿
 * 对齐 F:\workbuddy\docs\manual\超管端\官媒投稿\ 下的截图
 * 包含：官媒列表、财务流水 两个Tab
 * 以及编辑售价弹窗
 */

/* ========================================
   局部样式
   ======================================== */
(function injectAdminMediaStyles() {
  if (document.getElementById('admin-media-styles-v3')) return;
  const style = document.createElement('style');
  style.id = 'admin-media-styles-v3';
  style.textContent = `
    /* Tab 导航 */
    .am-tabs {
      display: flex; gap: 0; border-bottom: 2px solid var(--color-border);
      margin-bottom: 16px;
    }
    .am-tab {
      padding: 10px 24px; font-size: 14px; font-weight: 500;
      color: var(--color-text-secondary); cursor: pointer;
      border-bottom: 2px solid transparent; margin-bottom: -2px;
      transition: all 0.2s; background: none; border-top: none;
      border-left: none; border-right: none;
    }
    .am-tab:hover { color: var(--color-primary); }
    .am-tab.active {
      color: var(--color-primary); border-bottom-color: var(--color-primary);
      font-weight: 600;
    }

    /* 筛选区域 */
    .am-filter-section {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 16px;
    }
    .am-filter-desc {
      font-size: 13px; color: var(--color-text-secondary); margin-bottom: 12px;
    }
    .am-filter-row {
      display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .am-filter-row:last-child { margin-bottom: 0; }
    .am-filter-label {
      font-size: 13px; color: var(--color-text-secondary); min-width: 64px;
      text-align: right; flex-shrink: 0;
    }
    .am-filter-tags {
      display: flex; flex-wrap: wrap; gap: 6px; flex: 1;
    }
    .am-tag {
      padding: 4px 12px; font-size: 12px; border-radius: 4px;
      border: 1px solid var(--color-border); background: var(--color-bg-card);
      color: var(--color-text-primary); cursor: pointer; transition: all 0.15s;
      white-space: nowrap;
    }
    .am-tag:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .am-tag.active {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .am-tag.tag-all {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }

    /* 搜索栏 */
    .am-search-bar {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 16px; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      margin-bottom: 16px;
    }
    .am-search-bar input[type="text"] {
      width: 260px; padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      background: var(--color-bg-card); flex-shrink: 0;
    }
    .am-search-bar input[type="text"]:focus { border-color: var(--color-primary); }
    .am-search-bar select {
      padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      background: var(--color-bg-card); min-width: 140px;
    }
    .am-search-bar .am-search-left {
      display: flex; align-items: center; gap: 10px;
    }
    .am-search-bar .am-search-right {
      display: flex; align-items: center; gap: 12px; margin-left: auto;
    }
    .am-balance-text { font-size: 13px; color: var(--color-text-secondary); white-space: nowrap; }
    .am-balance-text strong { color: var(--color-primary); font-weight: 600; font-size: 15px; }
    .am-btn-batch {
      padding: 8px 20px; font-size: 13px; border-radius: var(--radius-sm);
      background: var(--color-primary); color: #fff; border: none;
      cursor: pointer; font-weight: 500; white-space: nowrap;
    }
    .am-btn-batch:hover { background: #1d4ed8; }

    /* 批量调价弹窗 */
    .am-batch-modal-content {
      background: var(--color-bg-card); border-radius: var(--radius-lg);
      width: 918px; max-width: 95vw; max-height: 85vh; overflow-y: auto;
    }
    .am-batch-modal-header {
      padding: 20px 24px 16px; display: flex; justify-content: space-between;
      align-items: center; border-bottom: 1px solid var(--color-border);
    }
    .am-batch-modal-title { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
    .am-batch-modal-body { padding: 20px 24px; }

    /* 媒体类型 Tabs */
    .am-batch-media-tabs {
      display: flex; gap: 0; border-bottom: 2px solid var(--color-border);
      margin-bottom: 20px; flex-wrap: wrap;
    }
    .am-batch-media-tab {
      padding: 8px 14px; font-size: 13px; font-weight: 500;
      color: var(--color-text-secondary); cursor: pointer;
      border-bottom: 2px solid transparent; margin-bottom: -2px;
      transition: all 0.2s; background: none; border-top: none;
      border-left: none; border-right: none; white-space: nowrap;
    }
    .am-batch-media-tab:hover { color: var(--color-primary); }
    .am-batch-media-tab.active {
      color: var(--color-primary); border-bottom-color: var(--color-primary);
      font-weight: 600;
    }

    /* 规则行 */
    .am-batch-rule-row {
      display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
      flex-wrap: nowrap; font-size: 13px;
    }
    .am-batch-rule-row label { color: var(--color-text-secondary); white-space: nowrap; }
    .am-batch-rule-row input[type="number"] {
      width: 70px; padding: 6px 8px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      background: var(--color-bg-card); flex-shrink: 0;
    }
    .am-batch-rule-row input[type="number"]:focus { border-color: var(--color-primary); }
    .am-batch-rule-row .rule-sep { color: var(--color-text-secondary); flex-shrink: 0; }
    .am-batch-rule-row .radio-group {
      display: inline-flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 4px !important;
      flex-shrink: 0 !important;
      white-space: nowrap !important;
      flex-wrap: nowrap !important;
    }
    .am-batch-rule-row .radio-group label {
      font-size: 12px !important;
      cursor: pointer !important;
      display: inline !important;
      white-space: nowrap !important;
    }
    .am-batch-rule-row .radio-group input[type="radio"] {
      margin: 0 !important;
      flex-shrink: 0 !important;
      display: inline-block !important;
    }
    .am-batch-rule-row .price-inputs {
      display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; white-space: nowrap;
    }
    .am-batch-rule-row .price-inputs label { font-size: 12px; min-width: auto; }
    .am-batch-rule-row .price-inputs input { width: 60px; }
    .am-batch-rule-row .btn-delete-rule {
      padding: 4px 12px; font-size: 12px; border-radius: 4px;
      border: 1px solid #ffccc7; background: #fff; color: #cf1322;
      cursor: pointer; flex-shrink: 0;
    }
    .am-batch-rule-row .btn-delete-rule:hover { background: #fff1f0; }
    .am-batch-actions {
      display: flex; gap: 10px; margin-top: 16px; padding-top: 16px;
      border-top: 1px solid var(--color-border);
    }
    .am-batch-actions .btn-add-rule {
      padding: 8px 20px; font-size: 13px; border-radius: var(--radius-sm);
      background: var(--color-primary); color: #fff; border: none;
      cursor: pointer; font-weight: 500;
    }
    .am-batch-actions .btn-add-rule:hover { background: #1d4ed8; }
    .am-batch-actions .btn-save-rule {
      padding: 8px 20px; font-size: 13px; border-radius: var(--radius-sm);
      background: var(--color-primary); color: #fff; border: none;
      cursor: pointer; font-weight: 500;
    }
    .am-batch-actions .btn-save-rule:hover { background: #1d4ed8; }

    /* 表格 */
    .am-table-wrap {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); overflow: hidden;
    }
    .am-table {
      width: 100%; border-collapse: collapse; font-size: 13px;
    }
    .am-table thead th {
      background: #f8f9fb; padding: 10px 12px; text-align: left;
      font-weight: 600; color: var(--color-text-secondary);
      border-bottom: 1px solid var(--color-border); white-space: nowrap;
    }
    .am-table tbody td {
      padding: 10px 12px; border-bottom: 1px solid var(--color-border);
      color: var(--color-text-primary); vertical-align: middle;
    }
    .am-table tbody tr:last-child td { border-bottom: none; }
    .am-table tbody tr:hover { background: #f5f7ff; }

    /* 资源名称链接 */
    .am-resource-name {
      color: var(--color-primary); cursor: pointer; font-weight: 500;
    }
    .am-resource-name:hover { text-decoration: underline; }
    .am-resource-id {
      font-size: 11px; color: var(--color-text-secondary); margin-top: 2px;
    }

    /* 状态标签 */
    .am-badge {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 500;
    }
    .am-badge-success { background: #e6f7ee; color: #1a9d5a; }
    .am-badge-warning { background: #fff7e6; color: #d48806; }
    .am-badge-danger { background: #fff1f0; color: #cf1322; }
    .am-badge-info { background: #e6f4ff; color: #096dd9; }
    .am-badge-neutral { background: #f0f0f0; color: #666; }

    /* 操作按钮 */
    .am-btn {
      padding: 4px 14px; font-size: 12px; border-radius: 4px;
      border: none; cursor: pointer; transition: all 0.15s; font-weight: 500;
    }
    .am-btn-primary {
      background: var(--color-primary); color: #fff;
    }
    .am-btn-primary:hover { background: #1d4ed8; }
    .am-btn-ghost {
      background: transparent; color: var(--color-primary);
      border: 1px solid var(--color-primary);
    }
    .am-btn-ghost:hover { background: #f0f4ff; }

    /* 分页 */
    .am-pagination {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px; font-size: 13px; color: var(--color-text-secondary);
    }
    .am-pagination .page-info { font-weight: 500; }
    .am-pagination .page-controls {
      display: flex; align-items: center; gap: 6px;
    }
    .am-pagination .page-btn {
      width: 28px; height: 28px; display: flex; align-items: center;
      justify-content: center; border: 1px solid var(--color-border);
      border-radius: 4px; cursor: pointer; font-size: 13px;
      background: var(--color-bg-card); color: var(--color-text-primary);
    }
    .am-pagination .page-btn.active {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .am-pagination .page-btn:hover:not(.active) { border-color: var(--color-primary); }
    .am-pagination .page-jump {
      display: flex; align-items: center; gap: 4px; font-size: 13px;
    }
    .am-pagination .page-jump input {
      width: 40px; padding: 4px 6px; border: 1px solid var(--color-border);
      border-radius: 4px; font-size: 13px; text-align: center; outline: none;
    }

    /* 余额栏 */
    .am-balance-bar {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 12px; margin-bottom: 12px; font-size: 13px;
    }
    .am-balance-bar .balance-text { color: var(--color-text-secondary); }
    .am-balance-bar .balance-amount { color: var(--color-primary); font-weight: 600; font-size: 15px; }

    /* 编辑售价弹窗 */
    .am-modal-content {
      background: var(--color-bg-card); border-radius: var(--radius-lg);
      width: 480px; max-width: 90vw; overflow: hidden;
    }
    .am-modal-header {
      padding: 20px 24px 0; display: flex; justify-content: space-between;
      align-items: flex-start;
    }
    .am-modal-title { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
    .am-modal-close {
      background: none; border: none; font-size: 20px; cursor: pointer;
      color: var(--color-text-secondary); padding: 4px;
    }
    .am-modal-close:hover { color: var(--color-text-primary); }
    .am-modal-body { padding: 16px 24px; }
    .am-modal-resource-name {
      font-size: 14px; font-weight: 600; color: var(--color-text-primary);
      margin-bottom: 16px;
    }
    .am-modal-form-row {
      display: flex; gap: 16px; margin-bottom: 16px;
    }
    .am-modal-form-group { flex: 1; }
    .am-modal-form-group label {
      display: block; font-size: 13px; color: var(--color-text-secondary);
      margin-bottom: 6px;
    }
    .am-modal-form-group input,
    .am-modal-form-group select {
      width: 100%; padding: 8px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; outline: none;
      box-sizing: border-box;
    }
    .am-modal-form-group input:focus,
    .am-modal-form-group select:focus { border-color: var(--color-primary); }
    .am-modal-footer {
      padding: 12px 24px 20px; display: flex; justify-content: flex-end; gap: 10px;
    }
    .am-modal-footer .btn-cancel {
      padding: 8px 20px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); background: var(--color-bg-card);
      font-size: 13px; cursor: pointer; color: var(--color-text-primary);
    }
    .am-modal-footer .btn-cancel:hover { border-color: var(--color-primary); }
    .am-modal-footer .btn-confirm {
      padding: 8px 20px; border: none; border-radius: var(--radius-sm);
      background: var(--color-primary); color: #fff; font-size: 13px;
      cursor: pointer; font-weight: 500;
    }
    .am-modal-footer .btn-confirm:hover { background: #1d4ed8; }

    /* 财务流水金额颜色 */
    .am-amount-positive { color: #cf1322; font-weight: 600; }
    .am-amount-negative { color: #1a9d5a; font-weight: 600; }

    /* 备注列 */
    .am-note-cell {
      max-width: 200px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; font-size: 12px; color: var(--color-text-secondary);
    }

    /* 价格变动标签 */
    .am-price-change-tag {
      display: inline-block; background: #fff7e6; color: #d48806;
      font-size: 11px; padding: 1px 6px; border-radius: 3px;
      border: 1px solid #ffe58f; margin-left: 6px; font-weight: 500;
      vertical-align: middle; white-space: nowrap;
    }

    /* 价格列排版 */
    .am-price-cell { line-height: 1.7; }
    .am-price-cell .price-current { color: var(--color-text-primary); font-weight: 500; }
    .am-price-cell .price-prev {
      color: #bbb; font-size: 11px; text-decoration: line-through;
      font-weight: 400;
    }
    .am-price-cell .price-line { display: block; }
  `;
  document.head.appendChild(style);
})();

/* ========================================
   模拟数据
   ======================================== */
const AM_MEDIA_LIST = [
  {
    id: '1192052178936922127', name: '中国经济新闻网-科技', mediaType: '网络媒体',
    channelType: 'IT科技', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 4, specialIndustry: '-',
    loadTime: '18:00', note: '收录好，不可带联系方式，偏...',
    costPrice: 10.00, referencePrice: 10.00, actualPrice: 14.00, status: '不可用',
    priceChanged: true, prevCostPrice: 14.00, prevReferencePrice: 14.00
  },
  {
    id: '119091140954769679', name: '壹生网（GEO排名方案）', mediaType: '网络媒体',
    channelType: '生活消费', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 4, specialIndustry: '-',
    loadTime: '20:00', note: '审核松 出稿快，GEO排名稿件',
    costPrice: 5.00, referencePrice: 5.00, actualPrice: 8.00, status: '可用',
    priceChanged: false
  },
  {
    id: '1190353082236141583', name: '八方资源网(GEO排名方案)', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 3, specialIndustry: '-',
    loadTime: '20:00', note: '可发geo排名稿件，广告法禁...',
    costPrice: 3.00, referencePrice: 3.00, actualPrice: 5.00, status: '可用',
    priceChanged: false
  },
  {
    id: '1189477108646117391', name: '中原区人民政府网（GEO方案）', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '河南', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 1, specialIndustry: '-',
    loadTime: '20:00', note: '可发GEO稿件，政府网站',
    costPrice: 110.00, referencePrice: 110.00, actualPrice: 120.00, status: '可用',
    priceChanged: false
  },
  {
    id: '1187198398942015503', name: '养拉网', mediaType: '网络媒体',
    channelType: '健康医疗', portal: '其他门户', region: '全国', linkType: '可带网址',
    collectionStatus: '不包网页收录', weekend: '可发', weight: 0, specialIndustry: '健康,医疗',
    loadTime: '22:00', note: '医疗、医美专业发布平台，AI...',
    costPrice: 5.00, referencePrice: 5.00, actualPrice: 8.00, status: '可用',
    priceChanged: false
  },
  {
    id: '1188532866486720767', name: '红黑网（广告排名方案）', mediaType: '网络媒体',
    channelType: '新闻资讯', portal: '其他门户', region: '全国', linkType: '不可带网址',
    collectionStatus: '不包网页收录', weekend: '不可发', weight: 1, specialIndustry: '-',
    loadTime: '18:00', note: '限图3张，审核松，可发GEO排...',
    costPrice: 98.00, referencePrice: 98.00, actualPrice: 55.00, status: '可用',
    priceChanged: false
  }
];

const AM_FINANCIAL_RECORDS = [
  {
    channel: '官媒1', flowType: '退款', amount: 25.00, balance: 10000.00,
    article: '露营打除了照明，还有哪些神奇功能让你惊艳？',
    mediaResource: '站长之家（知乎号）', user: 'xmdl', enterprise: '厦门享联科技有限公司',
    note: '上游投稿失败: upstream rejected request: code="ERROR00015", message="资源信息不存在"',
    genTime: '2026-06-30'
  },
  {
    channel: '官媒1', flowType: '扣款', amount: -25.00, balance: 9975.00,
    article: '露营打除了照明，还有哪些神奇功能让你惊艳？',
    mediaResource: '站长之家（知乎号）', user: 'xmdl', enterprise: '厦门享联科技有限公司',
    note: '官媒投稿扣款', genTime: '2026-06-30'
  }
];

/* ========================================
   当前Tab状态
   ======================================== */
let amCurrentTab = 'media-list';

/* ========================================
   多选状态
   ======================================== */
let amSelectedIds = new Set();

/* ========================================
   主渲染函数
   ======================================== */
function renderAdminMedia() {
  const html = `
    <div class="am-tabs">
      <button class="am-tab ${amCurrentTab === 'media-list' ? 'active' : ''}" onclick="switchAmTab('media-list')">官媒列表</button>
      <button class="am-tab ${amCurrentTab === 'financial-records' ? 'active' : ''}" onclick="switchAmTab('financial-records')">财务流水</button>
    </div>
    <div id="am-tab-content">${renderAmTabContent(amCurrentTab)}</div>
  `;
  return html;
}

function switchAmTab(tab) {
  amCurrentTab = tab;
  const content = document.getElementById('am-tab-content');
  if (!content) return;
  content.innerHTML = renderAmTabContent(tab);
  // 更新tab样式
  document.querySelectorAll('.am-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.am-tab');
  const tabMap = { 'media-list': 0, 'financial-records': 1 };
  if (tabs[tabMap[tab]]) tabs[tabMap[tab]].classList.add('active');
}

function renderAmTabContent(tab) {
  switch (tab) {
    case 'media-list': return renderAmMediaList();
    case 'financial-records': return renderAmFinancialRecords();
    default: return '';
  }
}

/* ========================================
   Tab 1: 官媒列表
   ======================================== */
function renderAmMediaList() {
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
    return `<div class="am-filter-row">
      <span class="am-filter-label">${label}</span>
      <div class="am-filter-tags">
        <span class="am-tag tag-all">不限</span>
        ${items.map((item, i) => `<span class="am-tag ${i === activeIdx ? 'active' : ''}">${item}</span>`).join('')}
      </div>
    </div>`;
  }

  return `
    <div class="am-filter-desc" style="margin-bottom:12px;">维护上游价格、本地售价和资源状态</div>
    <div class="am-filter-section">
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

    <div class="am-search-bar">
      <div class="am-search-left">
        <input type="text" placeholder="输入资源名称或资源 ID" />
        <select>
          <option>全部价格状态</option>
          <option>可用</option>
          <option>不可用</option>
        </select>
        <button class="am-btn am-btn-primary" style="padding:8px 24px;">查询</button>
        <button class="am-btn am-btn-ghost" style="padding:8px 20px;">重置</button>
        <button class="am-btn am-btn-primary" style="padding:8px 20px;" onclick="openAmBatchEditPriceModal()">批量调价${amSelectedIds.size > 0 ? ` (${amSelectedIds.size})` : ''}</button>
      </div>
      <div class="am-search-right">
        <button class="am-btn-batch" onclick="openAmBatchPriceModal()">批量分配规则</button>
        <span class="am-balance-text">上游官媒平台余额：<strong>¥0.00</strong></span>
      </div>
    </div>

    <div class="am-table-wrap">
      <table class="am-table">
        <thead>
          <tr>
            <th style="width:40px;"><input type="checkbox" id="am-select-all" onchange="amToggleSelectAll(this.checked)" /></th>
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
            <th>截稿</th>
            <th>价格</th>
            <th style="white-space:nowrap;">状态</th>
            <th style="white-space:nowrap;">操作</th>
          </tr>
        </thead>
        <tbody>
          ${AM_MEDIA_LIST.map((item, idx) => `
            <tr>
              <td><input type="checkbox" class="am-row-cb" value="${item.id}" ${amSelectedIds.has(item.id) ? 'checked' : ''} onchange="amToggleRowSelect('${item.id}', this.checked)" /></td>
              <td>
                <div class="am-resource-name">
                  ${item.name}
                  ${idx === 0 ? '<span class="am-price-change-tag">价格变动</span>' : ''}
                </div>
                <div class="am-resource-id">ID: ${item.id}</div>
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
              <td class="am-price-cell">
                <span class="price-line">成本：¥${item.costPrice.toFixed(0)}元${idx === 0 ? ` <span class="price-prev">变动前：¥${item.prevCostPrice.toFixed(0)}元</span>` : ''}</span>
                <span class="price-line">参考：¥${item.referencePrice.toFixed(0)}元</span>
                <span class="price-line price-current">实际：¥${item.actualPrice.toFixed(0)}元</span>
              </td>
              <td style="white-space:nowrap;"><span class="am-badge ${item.status === '可用' ? 'am-badge-success' : 'am-badge-danger'}">${item.status}</span></td>
              <td style="white-space:nowrap;">
                <button class="am-btn am-btn-ghost" onclick="openAmEditPriceModal('${item.name}', ${item.actualPrice})">编辑售价</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ========================================
   Tab 2: 财务流水
   ======================================== */
function renderAmFinancialRecords() {
  return `
    <div class="am-filter-desc" style="margin-bottom:12px;">超管查看所有 SaaS 用户的官媒投稿资金明细。</div>
    <div class="am-search-bar">
      <select>
        <option>全部官媒渠道</option>
        <option>官媒1</option>
      </select>
      <input type="text" placeholder="SaaS用户/企业名称" style="flex:0.8;" />
      <input type="text" placeholder="投稿文章" style="flex:0.8;" />
      <input type="text" placeholder="媒体资源" style="flex:0.8;" />
      <input type="date" style="flex:0.6;" />
      <input type="date" style="flex:0.6;" />
      <select>
        <option>全部类型</option>
        <option>扣款</option>
        <option>退款</option>
        <option>冲正</option>
      </select>
      <button class="am-btn am-btn-primary" style="padding:8px 24px;">查询</button>
    </div>

    <div class="am-table-wrap">
      <table class="am-table">
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
          ${AM_FINANCIAL_RECORDS.map(item => `
            <tr>
              <td>${item.channel}</td>
              <td><span class="am-badge ${item.flowType === '退款' ? 'am-badge-success' : 'am-badge-danger'}">${item.flowType}</span></td>
              <td class="${item.amount > 0 ? 'am-amount-positive' : 'am-amount-negative'}">${item.amount.toFixed(2)}</td>
              <td>${item.balance.toFixed(2)}</td>
              <td class="am-note-cell" title="${item.article}">${item.article}</td>
              <td>${item.mediaResource}</td>
              <td>${item.user}</td>
              <td>${item.enterprise}</td>
              <td class="am-note-cell" title="${item.note}">${item.note}</td>
              <td>${item.genTime}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="am-pagination">
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
   批量分配规则弹窗
   ======================================== */
let amBatchCurrentMediaTab = '网络媒体';

// 存储每个媒体类型的规则
const amBatchRulesByMedia = {
  '网络媒体': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '自媒体': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '微信': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '微博': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '贴吧': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '论坛': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '问答': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '友链': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '文案代写': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '小红书': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '百度百科': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '品牌宝': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ],
  '短视频': [
    { min: 1, max: 100, type: 'mult', default: 3 },
    { min: 101, max: 500, type: 'mult', default: 1.5 },
    { min: 501, max: 1000, type: 'add', default: 2 },
    { min: '', max: '', type: 'add', default: '' }
  ]
};

function openAmBatchPriceModal() {
  closeAmBatchPriceModal();

  const mediaTypes = ['网络媒体', '自媒体', '微信', '微博', '贴吧', '论坛', '问答', '友链', '文案代写', '小红书', '百度百科', '品牌宝', '短视频'];

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'am-batch-price-modal';
  overlay.innerHTML = `
    <div class="am-batch-modal-content">
      <div class="am-batch-modal-header">
        <div class="am-batch-modal-title">批量分配规则</div>
        <button class="am-modal-close" onclick="closeAmBatchPriceModal()">✕</button>
      </div>
      <div class="am-batch-modal-body">
        <div class="am-batch-media-tabs" id="am-batch-media-tabs">
          ${mediaTypes.map(t => `<button class="am-batch-media-tab ${t === amBatchCurrentMediaTab ? 'active' : ''}" onclick="switchAmBatchMediaTab('${t}')">${t}</button>`).join('')}
        </div>
        <div id="am-batch-rules">
          ${renderAmBatchRules()}
        </div>
        <div class="am-batch-actions">
          <button class="btn-add-rule" onclick="amAddBatchRule()">新增区间</button>
          <button class="btn-save-rule" onclick="confirmAmBatchPrice()">保存规则</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function renderAmBatchRules() {
  const rules = amBatchRulesByMedia[amBatchCurrentMediaTab] || [];
  return rules.map((rule, idx) => `
    <div class="am-batch-rule-row">
      <label>成本价：</label>
      <input type="number" value="${rule.min}" min="0" data-field="min" data-idx="${idx}" />
      <span class="rule-sep">—</span>
      <input type="number" value="${rule.max}" min="0" data-field="max" data-idx="${idx}" />
      <div class="radio-group">
        <input type="radio" name="rule-${idx}-type" id="rule-${idx}-add" value="add" ${rule.type === 'add' ? 'checked' : ''} onchange="updateAmBatchRule(${idx}, 'type', 'add')" />
        <label for="rule-${idx}-add">加价</label>
        <input type="radio" name="rule-${idx}-type" id="rule-${idx}-mult" value="mult" ${rule.type === 'mult' ? 'checked' : ''} onchange="updateAmBatchRule(${idx}, 'type', 'mult')" />
        <label for="rule-${idx}-mult">倍值</label>
      </div>
      <div class="price-inputs">
        <label>默认：</label>
        <input type="number" value="${rule.default}" step="0.1" data-field="default" data-idx="${idx}" onchange="updateAmBatchRule(${idx}, 'default', this.value)" />
      </div>
      ${idx > 0 ? `<button class="btn-delete-rule" onclick="amDeleteBatchRule(${idx})">删除</button>` : ''}
    </div>
  `).join('');
}

function switchAmBatchMediaTab(tab) {
  // 先保存当前规则
  saveCurrentBatchRules();
  
  amBatchCurrentMediaTab = tab;
  document.querySelectorAll('.am-batch-media-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.am-batch-media-tab');
  tabs.forEach(t => { if (t.textContent === tab) t.classList.add('active'); });
  
  // 重新渲染规则
  const rulesContainer = document.getElementById('am-batch-rules');
  if (rulesContainer) {
    rulesContainer.innerHTML = renderAmBatchRules();
  }
}

function saveCurrentBatchRules() {
  const rows = document.querySelectorAll('.am-batch-rule-row');
  const rules = [];
  rows.forEach((row, idx) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    const radio = row.querySelector('input[type="radio"]:checked');
    rules.push({
      min: inputs[0] ? inputs[0].value : '',
      max: inputs[1] ? inputs[1].value : '',
      type: radio ? radio.value : 'add',
      default: inputs[2] ? inputs[2].value : ''
    });
  });
  amBatchRulesByMedia[amBatchCurrentMediaTab] = rules;
}

function updateAmBatchRule(idx, field, value) {
  const rules = amBatchRulesByMedia[amBatchCurrentMediaTab];
  if (rules[idx]) {
    rules[idx][field] = value;
  }
}

function amAddBatchRule() {
  const rules = amBatchRulesByMedia[amBatchCurrentMediaTab];
  rules.push({ min: '', max: '', type: 'add', default: '' });
  const rulesContainer = document.getElementById('am-batch-rules');
  if (rulesContainer) {
    rulesContainer.innerHTML = renderAmBatchRules();
  }
}

function amDeleteBatchRule(idx) {
  const rules = amBatchRulesByMedia[amBatchCurrentMediaTab];
  rules.splice(idx, 1);
  const rulesContainer = document.getElementById('am-batch-rules');
  if (rulesContainer) {
    rulesContainer.innerHTML = renderAmBatchRules();
  }
}

function closeAmBatchPriceModal() {
  const modal = document.getElementById('am-batch-price-modal');
  if (modal) modal.remove();
}

function confirmAmBatchPrice() {
  saveCurrentBatchRules();
  
  // 根据当前选中的媒体类型，更新对应资源的价格
  const rules = amBatchRulesByMedia[amBatchCurrentMediaTab];
  let updatedCount = 0;
  
  AM_MEDIA_LIST.forEach(item => {
    // 只更新与当前媒体类型匹配的资源
    if (item.mediaType === amBatchCurrentMediaTab) {
      // 根据成本价找到对应的规则
      const rule = rules.find(r => {
        const min = parseFloat(r.min) || 0;
        const max = parseFloat(r.max) || Infinity;
        return item.costPrice >= min && item.costPrice <= max;
      });
      
      if (rule) {
        const ruleValue = parseFloat(rule.default) || 0;
        let newPrice;
        
        if (rule.type === 'add') {
          newPrice = item.costPrice + ruleValue;
        } else {
          newPrice = item.costPrice * ruleValue;
        }
        
        // 只更新实际售价
        item.actualPrice = newPrice;
        updatedCount++;
      }
    }
  });
  
  closeAmBatchPriceModal();
  showToast(`已更新 ${updatedCount} 个资源的价格`, 'success');
  
  // 重新渲染以更新界面
  const content = document.getElementById('am-tab-content');
  if (content) content.innerHTML = renderAmTabContent(amCurrentTab);
}

// 点击遮罩关闭批量调价弹窗
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'am-batch-price-modal') {
    closeAmBatchPriceModal();
  }
});

/* ========================================
   编辑售价弹窗
   ======================================== */
function openAmEditPriceModal(resourceName, currentPrice) {
  // 关闭已有弹窗
  closeAmEditPriceModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'am-edit-price-modal';
  overlay.innerHTML = `
    <div class="am-modal-content">
      <div class="am-modal-header">
        <div class="am-modal-title">编辑实际售价</div>
        <button class="am-modal-close" onclick="closeAmEditPriceModal()"></button>
      </div>
      <div class="am-modal-body">
        <div class="am-modal-resource-name">${resourceName}</div>
        <div class="am-modal-form-row">
          <div class="am-modal-form-group">
            <label>主售价</label>
            <input type="number" value="${currentPrice.toFixed(2)}" step="0.01" />
          </div>
          <div class="am-modal-form-group">
            <label>本地状态</label>
            <select>
              <option>启用</option>
              <option>禁用</option>
            </select>
          </div>
        </div>
      </div>
      <div class="am-modal-footer">
        <button class="btn-cancel" onclick="closeAmEditPriceModal()">取消</button>
        <button class="btn-confirm" onclick="confirmAmEditPrice()">保存并确认价格变动</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeAmEditPriceModal() {
  const modal = document.getElementById('am-edit-price-modal');
  if (modal) modal.remove();
}

function confirmAmEditPrice() {
  closeAmEditPriceModal();
  showToast('售价已更新', 'success');
}

// 点击遮罩关闭
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'am-edit-price-modal') {
    closeAmEditPriceModal();
  }
});

/* ========================================
   多选功能
   ======================================== */
function amToggleSelectAll(checked) {
  if (checked) {
    AM_MEDIA_LIST.forEach(item => amSelectedIds.add(item.id));
  } else {
    amSelectedIds.clear();
  }
  // 更新所有行 checkbox
  document.querySelectorAll('.am-row-cb').forEach(cb => cb.checked = checked);
  // 重新渲染以更新批量调价按钮
  const content = document.getElementById('am-tab-content');
  if (content) content.innerHTML = renderAmTabContent(amCurrentTab);
}

function amToggleRowSelect(id, checked) {
  if (checked) {
    amSelectedIds.add(id);
  } else {
    amSelectedIds.delete(id);
  }
  // 更新全选 checkbox
  const selectAll = document.getElementById('am-select-all');
  if (selectAll) selectAll.checked = amSelectedIds.size === AM_MEDIA_LIST.length;
  // 重新渲染以更新批量调价按钮
  const content = document.getElementById('am-tab-content');
  if (content) content.innerHTML = renderAmTabContent(amCurrentTab);
}

/* ========================================
   批量调价弹窗（与编辑售价弹窗一致）
   ======================================== */
function openAmBatchEditPriceModal() {
  if (amSelectedIds.size === 0) {
    showToast('请先选择需要批量操作的资源', 'warning');
    return;
  }
  closeAmBatchEditPriceModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'am-batch-edit-price-modal';
  overlay.innerHTML = `
    <div class="am-modal-content">
      <div class="am-modal-header">
        <div class="am-modal-title">编辑实际售价</div>
        <button class="am-modal-close" onclick="closeAmBatchEditPriceModal()"></button>
      </div>
      <div class="am-modal-body">
        <div class="am-modal-resource-name">已选 ${amSelectedIds.size} 个资源</div>
        <div class="am-modal-form-row">
          <div class="am-modal-form-group">
            <label>主售价</label>
            <input type="number" value="" step="0.01" placeholder="请输入价格" id="am-batch-price-input" />
          </div>
          <div class="am-modal-form-group">
            <label>本地状态</label>
            <select id="am-batch-status-select">
              <option>启用</option>
              <option>禁用</option>
            </select>
          </div>
        </div>
      </div>
      <div class="am-modal-footer">
        <button class="btn-cancel" onclick="closeAmBatchEditPriceModal()">取消</button>
        <button class="btn-confirm" onclick="confirmAmBatchEditPrice()">保存并确认价格变动</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeAmBatchEditPriceModal() {
  const modal = document.getElementById('am-batch-edit-price-modal');
  if (modal) modal.remove();
}

function confirmAmBatchEditPrice() {
  const priceInput = document.getElementById('am-batch-price-input');
  const newPrice = parseFloat(priceInput.value);
  
  if (isNaN(newPrice) || newPrice < 0) {
    showToast('请输入有效的价格', 'warning');
    return;
  }
  
  const count = amSelectedIds.size;
  
  // 更新 AM_MEDIA_LIST 中的实际售价
  AM_MEDIA_LIST.forEach(item => {
    if (amSelectedIds.has(item.id)) {
      item.actualPrice = newPrice;
    }
  });
  
  closeAmBatchEditPriceModal();
  amSelectedIds.clear();
  showToast(`已更新 ${count} 个资源的售价`, 'success');
  
  // 重新渲染以更新界面
  const content = document.getElementById('am-tab-content');
  if (content) content.innerHTML = renderAmTabContent(amCurrentTab);
}

// 点击遮罩关闭批量调价弹窗
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'am-batch-edit-price-modal') {
    closeAmBatchEditPriceModal();
  }
});

// 暴露全局渲染函数
window.renderAdminMedia = renderAdminMedia;
