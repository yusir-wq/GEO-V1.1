/**
 * 租户端 - 报表设置 (优化版 V2)
 *
 * 优化点：
 * 1. 顶部 Tab 切换：问题管理 / 分类绑定
 * 2. 左侧分类列表（扁平，带问题数，点击筛选）
 * 3. "添加并继续"按钮（只清空问题输入框，保留分类/平台/设备）
 * 4. 行内编辑分类 + 批量修改分类/删除
 * 5. CSV 导入（下载模板→上传→预览→导入）
 * 6. 分类绑定 Tab（分类级别绑定报表规则与采集规则，自动匹配同名分类）
 */

/* ========================================
   局部样式
   ======================================== */
(function injectReportSettingsStyles() {
  if (document.getElementById('report-settings-styles')) return;
  const style = document.createElement('style');
  style.id = 'report-settings-styles';
  style.textContent = `
    /* ===== 通用 ===== */
    .rs-page-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 16px;
    }
    .rs-page-header h1 { font-size: 20px; font-weight: 600; }
    .rs-page-header .back-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 14px; font-size: 13px; border: 1px solid var(--color-border);
      background: var(--color-bg-card); border-radius: var(--radius-sm); cursor: pointer;
      color: var(--color-text-primary);
    }
    .rs-page-header .back-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

    .rs-card {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); margin-bottom: 12px; padding: 16px 20px;
    }
    .rs-card-title {
      font-size: 15px; font-weight: 600; color: var(--color-text-primary);
      margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-light);
    }

    .rs-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px 24px; }
    .rs-info-item { display: flex; font-size: 13px; line-height: 1.6; }
    .rs-info-label { color: var(--color-text-secondary); min-width: 80px; }
    .rs-info-value { color: var(--color-text-primary); }

    .rs-form-row { display: flex; gap: 40px; margin-bottom: 16px; flex-wrap: wrap; }
    .rs-form-group { flex: 1; min-width: 280px; }
    .rs-form-label { font-size: 13px; font-weight: 500; color: var(--color-text-primary); margin-bottom: 10px; display: block; }
    .rs-checkbox-group { display: flex; flex-wrap: wrap; gap: 16px; }
    .rs-checkbox-item {
      display: inline-flex; align-items: center; gap: 6px; font-size: 13px;
      color: var(--color-text-primary); cursor: pointer;
    }
    .rs-checkbox-item input[type="checkbox"],
    .rs-checkbox-item input[type="radio"] { accent-color: var(--color-primary); cursor: pointer; }
    .rs-hint { font-size: 12px; color: var(--color-text-tertiary); margin-left: 8px; }

    .rs-upload-row { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
    .rs-upload-btn {
      padding: 4px 12px; font-size: 12px; border: 1px solid var(--color-primary);
      color: var(--color-primary); background: var(--color-bg-card); border-radius: var(--radius-sm);
      cursor: pointer;
    }
    .rs-upload-btn:hover { background: var(--color-primary-bg); }

    /* ===== Tab 切换 ===== */
    .rs-tab-bar {
      display: flex; gap: 0; border-bottom: 2px solid var(--color-border); margin-bottom: 16px;
    }
    .rs-tab {
      padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer;
      color: var(--color-text-secondary); border-bottom: 2px solid transparent; margin-bottom: -2px;
      transition: color 0.2s, border-color 0.2s;
    }
    .rs-tab:hover { color: var(--color-primary); }
    .rs-tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }

    /* ===== 问题管理 Tab 布局 ===== */
    .rs-tab-content { display: flex; gap: 16px; }

    .rs-sidebar {
      width: 200px; flex-shrink: 0; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px;
      align-self: flex-start; position: sticky; top: 12px;
    }
    .rs-sidebar-title {
      font-size: 13px; font-weight: 600; color: var(--color-text-secondary);
      margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border-light);
    }
    .rs-sidebar-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 10px; border-radius: var(--radius-sm); cursor: pointer;
      font-size: 13px; color: var(--color-text-primary); margin-bottom: 2px;
      transition: background 0.15s;
    }
    .rs-sidebar-item:hover { background: var(--color-bg-body); }
    .rs-sidebar-item.active { background: var(--color-primary-bg); color: var(--color-primary); font-weight: 500; }
    .rs-sidebar-item .rs-sidebar-count {
      font-size: 12px; color: var(--color-text-tertiary); background: var(--color-bg-body);
      padding: 1px 8px; border-radius: 10px;
    }
    .rs-sidebar-item.active .rs-sidebar-count { background: var(--color-primary); color: #fff; }
    .rs-sidebar-divider { height: 1px; background: var(--color-border-light); margin: 6px 0; }

    .rs-main { flex: 1; min-width: 0; }

    /* ===== 增加问题区 ===== */
    .rs-add-section {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 12px;
    }
    .rs-add-section-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
    }
    .rs-add-section-title { font-size: 15px; font-weight: 600; }
    .rs-add-section-header .rs-import-btn {
      padding: 4px 12px; font-size: 12px; border: 1px solid var(--color-border);
      color: var(--color-text-secondary); background: var(--color-bg-card);
      border-radius: var(--radius-sm); cursor: pointer; margin-left: 8px;
    }
    .rs-add-section-header .rs-import-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .rs-add-grid { display: flex; gap: 20px; }
    .rs-add-left { flex: 1; }
    .rs-add-right { width: 320px; flex-shrink: 0; }
    .rs-textarea {
      width: 100%; min-height: 110px; padding: 10px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; resize: vertical; outline: none;
    }
    .rs-textarea:focus { border-color: var(--color-primary); }
    .rs-placeholder { font-size: 12px; color: var(--color-text-tertiary); margin-top: 6px; }
    .rs-category-row { margin-top: 16px; }
    .rs-category-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .rs-category-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);
      font-size: 12px; background: var(--color-bg-body); color: var(--color-text-primary);
    }
    .rs-category-tag.active { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-bg); }
    .rs-link { color: var(--color-primary); font-size: 12px; cursor: pointer; }
    .rs-link:hover { text-decoration: underline; }
    .rs-empty-text { font-size: 12px; color: var(--color-text-tertiary); }
    .rs-add-btn-row { margin-top: 16px; display: flex; gap: 10px; }

    /* ===== 问题列表 ===== */
    .rs-list-section { margin-top: 0; }
    .rs-list-toolbar {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      margin-bottom: 12px; flex-wrap: wrap;
    }
    .rs-list-toolbar-left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .rs-list-toolbar-left input,
    .rs-list-toolbar-left select {
      padding: 6px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 13px; background: var(--color-bg-card); outline: none;
    }
    .rs-list-toolbar-left input { min-width: 160px; }
    .rs-list-toolbar-left select { min-width: 100px; cursor: pointer; }
    .rs-list-summary { font-size: 13px; color: var(--color-text-secondary); }
    .rs-list-summary .danger { color: var(--color-danger); cursor: pointer; }
    .rs-list-summary .danger:hover { text-decoration: underline; }

    /* ===== 批量操作栏 ===== */
    .rs-batch-bar {
      display: flex; align-items: center; gap: 12px; padding: 8px 12px; margin-bottom: 8px;
      background: var(--color-primary-bg); border: 1px solid var(--color-primary);
      border-radius: var(--radius-sm); font-size: 13px;
    }
    .rs-batch-bar .rs-batch-count { color: var(--color-primary); font-weight: 600; }
    .rs-batch-bar button { font-size: 12px; padding: 4px 12px; }

    /* ===== 表格行内分类编辑 ===== */
    .rs-cat-cell { position: relative; }
    .rs-cat-tags { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
    .rs-cat-badge {
      display: inline-block; padding: 2px 8px; border-radius: var(--radius-sm);
      font-size: 11px; background: var(--color-primary-bg); color: var(--color-primary);
      border: 1px solid var(--color-primary); white-space: nowrap;
    }
    .rs-cat-badge.uncategorized { background: var(--color-bg-body); color: var(--color-text-tertiary); border-color: var(--color-border); }
    .rs-cat-edit-btn {
      display: inline-flex; align-items: center; gap: 2px; cursor: pointer;
      font-size: 11px; color: var(--color-primary); padding: 2px 6px; border-radius: var(--radius-sm);
    }
    .rs-cat-edit-btn:hover { background: var(--color-primary-bg); }

    .rs-inline-cat-editor {
      position: fixed; z-index: 10000; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12); padding: 12px; min-width: 220px;
    }
    .rs-inline-cat-title { font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--color-text-secondary); }
    .rs-inline-cat-list { display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto; }
    .rs-inline-cat-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--color-border-light); }

    /* ===== Footer ===== */
    .rs-footer {
      display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; padding-top: 16px;
      border-top: 1px solid var(--color-border-light);
    }

    /* ===== Toast ===== */
    .rs-toast {
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-60px);
      background: #1E293B; color: #fff; padding: 10px 20px; border-radius: var(--radius-sm);
      font-size: 13px; z-index: 99999; opacity: 0; transition: transform 0.3s, opacity 0.3s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .rs-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

    /* ===== 拓词工具弹窗 ===== */
    .rs-wordtool-modal { max-width: 900px; width: 90%; max-height: 86vh; overflow: hidden; display: flex; flex-direction: column; }
    .rs-wordtool-body { overflow-y: auto; padding: 16px 20px; }
    .rs-industry-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
    .rs-industry-tag {
      padding: 4px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 12px; color: var(--color-text-secondary); cursor: pointer; background: var(--color-bg-card);
    }
    .rs-industry-tag.active { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-bg); }
    .rs-word-columns { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 16px; }
    .rs-word-col {
      border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden;
      display: flex; flex-direction: column; height: 240px;
    }
    .rs-word-col-header {
      display: flex; align-items: center; gap: 6px; padding: 8px 10px;
      background: var(--color-primary-bg); border-bottom: 1px solid var(--color-border);
      font-size: 12px; font-weight: 500; color: var(--color-primary);
    }
    .rs-word-col-letter { width: 18px; height: 18px; border-radius: 4px; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; }
    .rs-word-col textarea {
      flex: 1; border: none; padding: 8px; font-size: 12px; resize: none; outline: none;
    }
    .rs-combine-group { margin-bottom: 16px; }
    .rs-combine-title { font-size: 13px; font-weight: 500; margin-bottom: 8px; }
    .rs-combine-title .hint { font-size: 12px; color: var(--color-text-tertiary); font-weight: normal; }
    .rs-combine-options { display: flex; flex-wrap: wrap; gap: 12px 20px; }
    .rs-combine-options label { font-size: 12px; }
    .rs-generate-btn-row { display: flex; justify-content: flex-end; margin-bottom: 16px; }
    .rs-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .rs-result-table-wrap { border: 1px solid var(--color-border); border-radius: var(--radius-sm); max-height: 240px; overflow-y: auto; }
    .rs-result-table { width: 100%; border-collapse: collapse; }
    .rs-result-table th { background: var(--color-bg-body); padding: 8px 12px; text-align: left; font-size: 12px; font-weight: 500; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); }
    .rs-result-table td { padding: 8px 12px; font-size: 12px; border-bottom: 1px solid var(--color-border-light); }
    .rs-result-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border-light); }

    /* ===== 管理分类弹窗 ===== */
    .rs-category-modal { max-width: 420px; }
    .rs-category-add-row { display: flex; gap: 8px; margin-bottom: 16px; }
    .rs-category-add-row input { flex: 1; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 13px; outline: none; }
    .rs-category-list { max-height: 300px; overflow-y: auto; }
    .rs-category-list-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 0; border-bottom: 1px solid var(--color-border-light); font-size: 13px;
    }
    .rs-category-list-item:last-child { border-bottom: none; }
    .rs-category-delete { color: var(--color-danger); cursor: pointer; font-size: 12px; }
    .rs-category-delete:hover { text-decoration: underline; }
    .rs-modal-footer { display: flex; justify-content: flex-end; padding-top: 12px; }

    /* ===== CSV 导入弹窗 ===== */
    .rs-import-modal { max-width: 720px; }
    .rs-import-step { margin-bottom: 16px; }
    .rs-import-step-label { font-size: 13px; font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
    .rs-import-step-num {
      width: 20px; height: 20px; border-radius: 50%; background: var(--color-primary);
      color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;
    }
    .rs-import-preview-wrap { border: 1px solid var(--color-border); border-radius: var(--radius-sm); max-height: 280px; overflow-y: auto; }
    .rs-import-preview-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .rs-import-preview-table th { background: var(--color-bg-body); padding: 8px 10px; text-align: left; font-weight: 500; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); position: sticky; top: 0; }
    .rs-import-preview-table td { padding: 6px 10px; border-bottom: 1px solid var(--color-border-light); }
    .rs-import-preview-table .invalid { color: var(--color-danger); }

    /* ===== 批量修改弹窗 ===== */
    .rs-batch-modal { max-width: 420px; }
    .rs-batch-modal .rs-checkbox-group { flex-direction: column; gap: 10px; }

    /* ===== 分类绑定 Tab ===== */
    .rs-binding-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;
    }
    .rs-binding-desc {
      font-size: 13px; color: var(--color-text-secondary); line-height: 1.6;
    }
    .rs-binding-desc strong { color: var(--color-text-primary); }
    .rs-binding-table { width: 100%; border-collapse: collapse; }
    .rs-binding-table th { background: var(--color-bg-body); padding: 10px 12px; text-align: left; font-size: 13px; font-weight: 500; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); }
    .rs-binding-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid var(--color-border-light); }
    .rs-binding-status {
      display: inline-block; padding: 2px 10px; border-radius: var(--radius-sm); font-size: 12px;
    }
    .rs-binding-status.bound { background: #DCFCE7; color: #16A34A; }
    .rs-binding-status.unbound { background: #FEF3C7; color: #D97706; }
    .rs-binding-status.missing { background: #FEE2E2; color: #DC2626; }
    .rs-binding-missing { color: var(--color-text-tertiary); font-style: italic; }
    .rs-binding-arrow { color: var(--color-text-tertiary); font-size: 16px; }
  `;
  document.head.appendChild(style);
})();

/* ========================================
   模拟数据
   ======================================== */
const REPORT_PROJECT = {
  id: '6d1bef6d-8a26-4a7c-8dc4-a81dcf1d330c',
  name: '蓝王科技项目2026年GEO曝光',
  product: 'GEO企业基础曝光套餐(5关键词+2品牌词)',
  mainKeywords: '含羹机、露营灯、户外风扇、加湿器',
  brandKeywords: '蓝王科技'
};

const RS_PLATFORMS = [
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'kimi', name: 'Kimi' },
  { id: 'minimax', name: 'Minimax' },
  { id: 'zhipu', name: '智谱清言' },
  { id: 'wenxin', name: '百度文心' },
  { id: 'namiai', name: '纳米AI' },
  { id: 'yuanbao', name: '腾讯元宝' },
  { id: 'doubao', name: '豆包' },
  { id: 'tongyi', name: '通义千问' }
];

const RS_DEVICES = [
  { id: 'pc', name: '电脑端' },
  { id: 'mobile', name: '移动端' }
];

let RS_CATEGORIES = [
  { id: 'c1', name: '含羹机厂家' },
  { id: 'c2', name: '露营灯供应商' },
  { id: 'c3', name: '户外风扇厂家' },
  { id: 'c4', name: '加湿器原厂供应商' },
  { id: 'c5', name: '智能家电品牌' },
  { id: 'c6', name: '户外装备代理' }
];

let RS_QUESTIONS = [
  { id: 1, content: '东莞含羹加湿器厂家哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryIds: ['c1'] },
  { id: 2, content: '东莞含羹加湿器厂家哪家专业', platform: '百度文心', device: '电脑端', source: '采集', categoryIds: ['c1'] },
  { id: 3, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '电脑端', source: '采集', categoryIds: ['c4'] },
  { id: 4, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryIds: ['c4'] },
  { id: 5, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '移动端', source: '采集', categoryIds: [] },
  { id: 6, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '电脑端', source: '采集', categoryIds: [] },
  { id: 7, content: '东莞迷你加湿器公司哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryIds: ['c4'] },
  { id: 8, content: '东莞含羹加湿器厂家排名', platform: '百度文心', device: '电脑端', source: '采集', categoryIds: ['c1'] },
  { id: 9, content: '露营灯品牌排行榜前十名', platform: 'DeepSeek', device: '电脑端', source: '拓词', categoryIds: ['c2'] },
  { id: 10, content: '户外露营灯哪个牌子好', platform: 'Kimi', device: '移动端', source: '手动', categoryIds: ['c2'] },
  { id: 11, content: '户外风扇品牌推荐', platform: '通义千问', device: '电脑端', source: '拓词', categoryIds: ['c3'] },
  { id: 12, content: '户外风扇厂家批发价格', platform: '智谱清言', device: '移动端', source: '手动', categoryIds: ['c3'] },
  { id: 13, content: '智能加湿器哪家好', platform: '豆包', device: '电脑端', source: '手动', categoryIds: ['c4', 'c5'] },
  { id: 14, content: '户外装备代理加盟条件', platform: '腾讯元宝', device: '移动端', source: '手动', categoryIds: ['c6'] },
  { id: 15, content: '含羹机厂家直销价格表', platform: '百度文心', device: '电脑端', source: '采集', categoryIds: ['c1'] }
];

/* 采集规则分类（用于分类绑定 Tab） */
let RS_COLLECTION_CATEGORIES = [
  { id: 'cc1', name: '含羹机厂家' },
  { id: 'cc2', name: '露营灯供应商' },
  { id: 'cc3', name: '户外风扇厂家' },
  { id: 'cc4', name: '家电批发商' }
];

/* 绑定关系: [{ reportCatId, collectionCatId }] */
let RS_BINDINGS = [];

/* ========================================
   状态变量
   ======================================== */
let RS_CURRENT_TAB = 'questions';
let RS_FILTER_CATEGORY = null; /* null=全部, 'uncategorized'=未分类, category id=按分类筛选 */
let RS_SELECTED_QUESTION_IDS = [];
let RS_SELECTED_CATEGORIES = [];
let RS_SELECTED_PLATFORMS = [];
let RS_SELECTED_DEVICES = [];
let RS_GENERATED_WORDS = [];
let RS_IMPORT_PREVIEW = [];

/* ========================================
   主渲染函数
   ======================================== */
function renderReportSettings() {
  return `
    <div class="rs-page-header">
      <h1>报表设置 - ${REPORT_PROJECT.name}</h1>
      <button class="back-btn" onclick="navigateTo('tenant-projects')">
        ${window.getLucideIcon ? window.getLucideIcon('rotate-ccw') : ''}
        <span>返回</span>
      </button>
    </div>

    <div class="rs-card">
      <div class="rs-card-title">客户订单信息</div>
      <div class="rs-info-grid">
        <div class="rs-info-item"><span class="rs-info-label">项目ID：</span><span class="rs-info-value">${REPORT_PROJECT.id}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">项目名称：</span><span class="rs-info-value">${REPORT_PROJECT.name}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">产品名称：</span><span class="rs-info-value">${REPORT_PROJECT.product}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">主关键词：</span><span class="rs-info-value">${REPORT_PROJECT.mainKeywords}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">品牌关键词：</span><span class="rs-info-value">${REPORT_PROJECT.brandKeywords}</span></div>
      </div>
    </div>

    <div class="rs-card">
      <div class="rs-card-title">报表显示设置</div>
      <div class="rs-form-row">
        <div class="rs-form-group">
          <div class="rs-form-label">显示内容设置：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="checkbox" checked><span>营销报表</span></label>
            <label class="rs-checkbox-item"><input type="checkbox" checked><span>品牌报表</span></label>
            <label class="rs-checkbox-item"><input type="checkbox"><span>诊断报告</span></label>
          </div>
        </div>
        <div class="rs-form-group">
          <div class="rs-form-label">报表查看权限设置：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="radio" name="rsPermission" checked><span>完全公开</span></label>
            <label class="rs-checkbox-item"><input type="radio" name="rsPermission"><span>登录后查看</span></label>
          </div>
        </div>
      </div>
      <div class="rs-form-row">
        <div class="rs-form-group">
          <div class="rs-form-label">头部banner设置：<span class="rs-hint">图片大小1200x300</span></div>
          <div class="rs-upload-row">
            <button class="rs-upload-btn">上传</button>
            <label class="rs-checkbox-item"><input type="checkbox"><span>默认图片</span></label>
          </div>
        </div>
        <div class="rs-form-group">
          <div class="rs-form-label">公司介绍图片：<span class="rs-hint">建议尺寸：260x198px</span></div>
          <div class="rs-upload-row">
            <button class="rs-upload-btn">上传</button>
          </div>
        </div>
      </div>
      <div class="rs-form-row" style="margin-bottom:0">
        <div class="rs-form-group">
          <div class="rs-form-label">采集的关键词：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="radio" name="rsKeyword" checked><span>需要命中品牌关键词才显示在报表</span></label>
            <label class="rs-checkbox-item"><input type="radio" name="rsKeyword"><span>都显示在报表</span></label>
          </div>
        </div>
      </div>
    </div>

    <div class="rs-tab-bar">
      <div class="rs-tab ${RS_CURRENT_TAB === 'questions' ? 'active' : ''}" onclick="rsSwitchTab('questions')">问题管理</div>
      <div class="rs-tab ${RS_CURRENT_TAB === 'binding' ? 'active' : ''}" onclick="rsSwitchTab('binding')">分类绑定</div>
    </div>

    ${RS_CURRENT_TAB === 'questions' ? rsRenderQuestionsTab() : rsRenderBindingTab()}

    <div class="rs-footer">
      <button class="btn btn-ghost" onclick="navigateTo('tenant-projects')">取消</button>
      <button class="btn btn-primary" onclick="rsSaveConfig()">保存配置</button>
    </div>
  `;
}

window.renderReportSettings = renderReportSettings;

/* ========================================
   Tab 1: 问题管理
   ======================================== */
function rsRenderQuestionsTab() {
  return `
    <div class="rs-tab-content">
      <div class="rs-sidebar">
        ${rsBuildCategorySidebar()}
      </div>
      <div class="rs-main">
        ${rsBuildAddSection()}
        ${rsBuildListSection()}
      </div>
    </div>
  `;
}

/* ----- 左侧分类列表 ----- */
function rsBuildCategorySidebar() {
  const totalCount = RS_QUESTIONS.length;
  const uncategorizedCount = RS_QUESTIONS.filter(q => !q.categoryIds || q.categoryIds.length === 0).length;

  const categoryItems = RS_CATEGORIES.map(c => {
    const count = RS_QUESTIONS.filter(q => q.categoryIds && q.categoryIds.includes(c.id)).length;
    const isActive = RS_FILTER_CATEGORY === c.id;
    return `
      <div class="rs-sidebar-item ${isActive ? 'active' : ''}" onclick="rsFilterByCategory('${c.id}')">
        <span>${c.name}</span>
        <span class="rs-sidebar-count">${count}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="rs-sidebar-title">分类筛选</div>
    <div class="rs-sidebar-item ${RS_FILTER_CATEGORY === null ? 'active' : ''}" onclick="rsFilterByCategory(null)">
      <span>全部</span>
      <span class="rs-sidebar-count">${totalCount}</span>
    </div>
    <div class="rs-sidebar-item ${RS_FILTER_CATEGORY === 'uncategorized' ? 'active' : ''}" onclick="rsFilterByCategory('uncategorized')">
      <span>未分类</span>
      <span class="rs-sidebar-count">${uncategorizedCount}</span>
    </div>
    <div class="rs-sidebar-divider"></div>
    ${categoryItems}
  `;
}

/* ----- 增加问题区 ----- */
function rsBuildAddSection() {
  const platformHtml = RS_PLATFORMS.map(p => `
    <label class="rs-checkbox-item">
      <input type="checkbox" value="${p.id}" onchange="rsTogglePlatform('${p.id}')" ${RS_SELECTED_PLATFORMS.includes(p.id) ? 'checked' : ''}>
      <span>${p.name}</span>
    </label>
  `).join('');

  const deviceHtml = RS_DEVICES.map(d => `
    <label class="rs-checkbox-item">
      <input type="checkbox" value="${d.id}" onchange="rsToggleDevice('${d.id}')" ${RS_SELECTED_DEVICES.includes(d.id) ? 'checked' : ''}>
      <span>${d.name}</span>
    </label>
  `).join('');

  const categoryHtml = RS_CATEGORIES.length
    ? RS_CATEGORIES.map(c => `
        <label class="rs-checkbox-item rs-category-tag ${RS_SELECTED_CATEGORIES.includes(c.id) ? 'active' : ''}">
          <input type="checkbox" value="${c.id}" onchange="rsToggleCategory('${c.id}')" ${RS_SELECTED_CATEGORIES.includes(c.id) ? 'checked' : ''}>
          <span>${c.name}</span>
        </label>
      `).join('')
    : '<span class="rs-empty-text">暂无分类，请点击"管理分类"添加</span>';

  return `
    <div class="rs-add-section">
      <div class="rs-add-section-header">
        <div class="rs-add-section-title">增加在报表中的问题</div>
        <div>
          <button class="btn btn-primary btn-sm" onclick="openWordToolModal()">拓词工具</button>
          <button class="rs-import-btn" onclick="openImportModal()">导入CSV</button>
        </div>
      </div>
      <div class="rs-add-grid">
        <div class="rs-add-left">
          <textarea class="rs-textarea" id="rsQuestionInput" placeholder="请输入问题"></textarea>
          <div class="rs-placeholder">每行一个，或逗号分隔</div>
          <div class="rs-category-row">
            <div class="rs-category-header">
              <span class="rs-form-label" style="margin-bottom:0">所属分类：</span>
              <span class="rs-link" onclick="openCategoryModal()">+ 管理分类</span>
            </div>
            <div class="rs-checkbox-group" id="rsCategoryList" style="gap:8px">
              ${categoryHtml}
            </div>
          </div>
          <div class="rs-add-btn-row">
            <button class="btn btn-primary" onclick="rsBulkAdd()">批量添加</button>
            <button class="btn btn-ghost" onclick="rsAddAndContinue()">添加并继续</button>
          </div>
        </div>
        <div class="rs-add-right">
          <div class="rs-form-label">支持平台**：</div>
          <div class="rs-checkbox-group" style="margin-bottom:16px">
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsToggleAllPlatforms(this)"><span>全选/反选</span></label>
            ${platformHtml}
          </div>
          <div class="rs-form-label">支持设备**：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsToggleAllDevices(this)"><span>全选/反选</span></label>
            ${deviceHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ----- 问题列表 ----- */
function rsBuildListSection() {
  const filtered = rsGetFilteredQuestions();
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
  const displayRows = filtered.slice(0, 10);

  const questionRows = displayRows.map((q, i) => {
    const catNames = (q.categoryIds || []).map(cid => {
      const cat = RS_CATEGORIES.find(c => c.id === cid);
      return cat ? cat.name : null;
    }).filter(Boolean);

    const catBadges = catNames.length
      ? catNames.map(n => `<span class="rs-cat-badge">${n}</span>`).join('')
      : '<span class="rs-cat-badge uncategorized">未分类</span>';

    const isChecked = RS_SELECTED_QUESTION_IDS.includes(q.id);

    return `
      <tr>
        <td style="width:40px"><input type="checkbox" ${isChecked ? 'checked' : ''} onchange="rsToggleQuestionSelect(${q.id})"></td>
        <td style="width:50px">${i + 1}</td>
        <td>${q.content}</td>
        <td style="width:90px">${q.platform}</td>
        <td style="width:70px">${q.device}</td>
        <td style="width:60px">${q.source}</td>
        <td style="width:180px" class="rs-cat-cell" id="rsCatCell-${q.id}">
          <div class="rs-cat-tags">
            ${catBadges}
            <span class="rs-cat-edit-btn" onclick="event.stopPropagation(); rsOpenInlineCatEditor(${q.id})">
              ${window.getLucideIcon ? window.getLucideIcon('pencil', '') : '编辑'}
            </span>
          </div>
        </td>
        <td style="width:60px">
          <button class="btn btn-ghost btn-sm text-danger" onclick="rsDeleteQuestion(${q.id})">删除</button>
        </td>
      </tr>
    `;
  }).join('');

  const batchBar = RS_SELECTED_QUESTION_IDS.length > 0 ? `
    <div class="rs-batch-bar">
      <span>已选 <span class="rs-batch-count">${RS_SELECTED_QUESTION_IDS.length}</span> 项</span>
      <button class="btn btn-ghost btn-sm" onclick="openBatchModifyModal()">批量修改分类</button>
      <button class="btn btn-ghost btn-sm text-danger" onclick="rsBatchDelete()">批量删除</button>
      <button class="btn btn-ghost btn-sm" onclick="rsClearSelection()">取消选择</button>
    </div>
  ` : '';

  return `
    <div class="rs-list-section">
      <div class="rs-card-title">已添加问题列表</div>
      <div class="rs-list-toolbar">
        <div class="rs-list-toolbar-left">
          <input type="text" placeholder="搜索问题..." id="rsSearchInput" onkeyup="if(event.key==='Enter') rsSearchQuestions()" value="${rsGetSearchValue()}">
          <select id="rsFilterPlatform" onchange="rsRenderTableOnly()">
            <option value="">全部平台</option>
            ${RS_PLATFORMS.map(p => `<option ${rsGetFilterValue('platform') === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
          </select>
          <select id="rsFilterDevice" onchange="rsRenderTableOnly()">
            <option value="">全部设备</option>
            <option ${rsGetFilterValue('device') === '电脑端' ? 'selected' : ''}>电脑端</option>
            <option ${rsGetFilterValue('device') === '移动端' ? 'selected' : ''}>移动端</option>
          </select>
          <select id="rsFilterSource" onchange="rsRenderTableOnly()">
            <option value="">全部来源</option>
            <option ${rsGetFilterValue('source') === '采集' ? 'selected' : ''}>采集</option>
            <option ${rsGetFilterValue('source') === '手动' ? 'selected' : ''}>手动</option>
            <option ${rsGetFilterValue('source') === '拓词' ? 'selected' : ''}>拓词</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="rsSearchQuestions()">搜索</button>
          <button class="btn btn-ghost btn-sm" onclick="rsClearFilters()">清空</button>
        </div>
      </div>
      ${batchBar}
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px"><input type="checkbox" onchange="rsToggleAllQuestions(this)"></th>
              <th style="width:50px">序号</th>
              <th>问题</th>
              <th style="width:90px">平台</th>
              <th style="width:70px">设备</th>
              <th style="width:60px">来源</th>
              <th style="width:180px">分类</th>
              <th style="width:60px">操作</th>
            </tr>
          </thead>
          <tbody id="rsQuestionTableBody">
            ${questionRows || '<tr><td colspan="8" style="text-align:center;color:var(--color-text-tertiary);padding:24px">暂无数据</td></tr>'}
          </tbody>
        </table>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">
        <div class="rs-list-summary">
          共 <strong>${filtered.length}</strong> 个问题
          <span class="danger" style="margin-left:12px" onclick="rsDeleteAllQuestions()">全部删除</span>
        </div>
        <div class="pagination" style="margin-top:0">
          <div class="pagination-info">第 1 页，共 ${filtered.length} 条</div>
          <div class="pagination-pages">
            <button class="pagination-btn disabled">‹</button>
            <button class="pagination-btn active">1</button>
            ${totalPages > 1 ? `<button class="pagination-btn">2</button>` : ''}
            ${totalPages > 2 ? `<span style="padding:0 6px;color:var(--color-text-tertiary)">...</span>` : ''}
            ${totalPages > 1 ? `<button class="pagination-btn">${totalPages}</button>` : ''}
            ${totalPages > 1 ? `<button class="pagination-btn">›</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ========================================
   Tab 2: 分类绑定
   ======================================== */
function rsRenderBindingTab() {
  /* 构建绑定行：报表规则分类 + 采集规则分类 */
  const reportCats = RS_CATEGORIES;
  const collectionCats = RS_COLLECTION_CATEGORIES;

  /* 找出已绑定的 */
  const boundReportIds = RS_BINDINGS.map(b => b.reportCatId);
  const boundCollectionIds = RS_BINDINGS.map(b => b.collectionCatId);

  /* 找出未绑定的报表分类 */
  const unboundReportCats = reportCats.filter(c => !boundReportIds.includes(c.id));
  /* 找出未绑定的采集分类 */
  const unboundCollectionCats = collectionCats.filter(c => !boundCollectionIds.includes(c.id));

  let rows = '';
  let seq = 1;

  /* 已绑定的行 */
  RS_BINDINGS.forEach(b => {
    const reportCat = reportCats.find(c => c.id === b.reportCatId);
    const collectionCat = collectionCats.find(c => c.id === b.collectionCatId);
    rows += `
      <tr>
        <td style="width:50px">${seq++}</td>
        <td>${reportCat ? reportCat.name : '<span class="rs-binding-missing">— 已删除 —</span>'}</td>
        <td style="width:40px;text-align:center"><span class="rs-binding-arrow">↔</span></td>
        <td>${collectionCat ? collectionCat.name : '<span class="rs-binding-missing">— 已删除 —</span>'}</td>
        <td style="width:100px"><span class="rs-binding-status bound">已绑定</span></td>
        <td style="width:80px"><span class="rs-link" onclick="rsUnbindCategory('${b.reportCatId}')">解绑</span></td>
      </tr>
    `;
  });

  /* 未绑定的报表分类 */
  unboundReportCats.forEach(c => {
    /* 检查采集规则是否有同名分类 */
    const hasMatchInCollection = collectionCats.some(cc => cc.name === c.name && !boundCollectionIds.includes(cc.id));
    rows += `
      <tr>
        <td style="width:50px">${seq++}</td>
        <td>${c.name}</td>
        <td style="width:40px;text-align:center"><span class="rs-binding-arrow">↔</span></td>
        <td>${hasMatchInCollection ? `<span class="rs-link" onclick="rsBindByName('${c.id}','${c.name}')">点击绑定同名</span>` : '<span class="rs-binding-missing">采集规则中无此分类</span>'}</td>
        <td style="width:100px"><span class="rs-binding-status ${hasMatchInCollection ? 'unbound' : 'missing'}">${hasMatchInCollection ? '待绑定' : '缺失'}</span></td>
        <td style="width:80px">${hasMatchInCollection ? '' : `<span class="rs-link" onclick="openSelectCollectionModal('${c.id}')">选择</span>`}</td>
      </tr>
    `;
  });

  /* 采集规则中独有的分类（报表规则没有的） */
  unboundCollectionCats.filter(cc => !reportCats.some(rc => rc.name === cc.name)).forEach(cc => {
    rows += `
      <tr>
        <td style="width:50px">${seq++}</td>
        <td><span class="rs-binding-missing">报表规则中无此分类</span></td>
        <td style="width:40px;text-align:center"><span class="rs-binding-arrow">↔</span></td>
        <td>${cc.name}</td>
        <td style="width:100px"><span class="rs-binding-status missing">缺失</span></td>
        <td style="width:80px"></td>
      </tr>
    `;
  });

  if (!rows) {
    rows = '<tr><td colspan="6" style="text-align:center;color:var(--color-text-tertiary);padding:24px">暂无分类数据</td></tr>';
  }

  const boundCount = RS_BINDINGS.length;
  const totalCount = reportCats.length + unboundCollectionCats.filter(cc => !reportCats.some(rc => rc.name === cc.name)).length;

  return `
    <div class="rs-card">
      <div class="rs-binding-header">
        <div class="rs-binding-desc">
          通过分类绑定报表规则与采集规则，同分类的问题将自动关联。<br>
          绑定后，采集规则中同分类的问题命中品牌词后，报表规则中的相关问题会同步显示在报表上。
        </div>
        <button class="btn btn-primary btn-sm" onclick="rsAutoMatchBindings()">自动匹配同名分类</button>
      </div>
      <div style="margin-bottom:12px;font-size:13px;color:var(--color-text-secondary)">
        已绑定 <strong style="color:var(--color-primary)">${boundCount}</strong> / ${totalCount} 个分类
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:50px">序号</th>
              <th>报表规则分类</th>
              <th style="width:40px"></th>
              <th>采集规则分类</th>
              <th style="width:100px">绑定状态</th>
              <th style="width:80px">操作</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* ========================================
   交互：Tab 切换
   ======================================== */
function rsSwitchTab(tab) {
  RS_CURRENT_TAB = tab;
  navigateTo('tenant-report-settings');
}

/* ========================================
   交互：分类侧边栏
   ======================================== */
function rsFilterByCategory(catId) {
  RS_FILTER_CATEGORY = catId;
  RS_SELECTED_QUESTION_IDS = [];
  navigateTo('tenant-report-settings');
}

/* ========================================
   交互：添加问题区
   ======================================== */
function rsToggleCategory(id) {
  if (RS_SELECTED_CATEGORIES.includes(id)) {
    RS_SELECTED_CATEGORIES = RS_SELECTED_CATEGORIES.filter(x => x !== id);
  } else {
    RS_SELECTED_CATEGORIES.push(id);
  }
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = rsBuildCategoryCheckboxes();
}

function rsBuildCategoryCheckboxes() {
  if (!RS_CATEGORIES.length) return '<span class="rs-empty-text">暂无分类，请点击"管理分类"添加</span>';
  return RS_CATEGORIES.map(c => `
    <label class="rs-checkbox-item rs-category-tag ${RS_SELECTED_CATEGORIES.includes(c.id) ? 'active' : ''}">
      <input type="checkbox" value="${c.id}" onchange="rsToggleCategory('${c.id}')" ${RS_SELECTED_CATEGORIES.includes(c.id) ? 'checked' : ''}>
      <span>${c.name}</span>
    </label>
  `).join('');
}

function rsTogglePlatform(id) {
  if (RS_SELECTED_PLATFORMS.includes(id)) {
    RS_SELECTED_PLATFORMS = RS_SELECTED_PLATFORMS.filter(x => x !== id);
  } else {
    RS_SELECTED_PLATFORMS.push(id);
  }
}

function rsToggleAllPlatforms(cb) {
  if (cb.checked) {
    RS_SELECTED_PLATFORMS = RS_PLATFORMS.map(p => p.id);
  } else {
    RS_SELECTED_PLATFORMS = [];
  }
  navigateTo('tenant-report-settings');
}

function rsToggleDevice(id) {
  if (RS_SELECTED_DEVICES.includes(id)) {
    RS_SELECTED_DEVICES = RS_SELECTED_DEVICES.filter(x => x !== id);
  } else {
    RS_SELECTED_DEVICES.push(id);
  }
}

function rsToggleAllDevices(cb) {
  if (cb.checked) {
    RS_SELECTED_DEVICES = RS_DEVICES.map(d => d.id);
  } else {
    RS_SELECTED_DEVICES = [];
  }
  navigateTo('tenant-report-settings');
}

/* 批量添加：清空所有内容（问题+分类+平台+设备） */
function rsBulkAdd() {
  const input = document.getElementById('rsQuestionInput');
  const text = (input.value || '').trim();
  if (!text) { alert('请输入问题'); return; }
  const lines = text.split(/[\n,，]/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) { alert('请输入有效的问题'); return; }

  rsAddQuestions(lines, RS_SELECTED_CATEGORIES, RS_SELECTED_PLATFORMS, RS_SELECTED_DEVICES);

  /* 清空所有 */
  input.value = '';
  RS_SELECTED_CATEGORIES = [];
  RS_SELECTED_PLATFORMS = [];
  RS_SELECTED_DEVICES = [];
  navigateTo('tenant-report-settings');
  setTimeout(() => alert(`成功添加 ${lines.length} 个问题`), 50);
}

/* 添加并继续：只清空问题输入框，保留分类/平台/设备 */
function rsAddAndContinue() {
  const input = document.getElementById('rsQuestionInput');
  const text = (input.value || '').trim();
  if (!text) { alert('请输入问题'); return; }
  const lines = text.split(/[\n,，]/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) { alert('请输入有效的问题'); return; }

  rsAddQuestions(lines, RS_SELECTED_CATEGORIES, RS_SELECTED_PLATFORMS, RS_SELECTED_DEVICES);

  /* 只清空问题输入框 */
  input.value = '';

  /* 局部刷新表格和侧边栏（不整页刷新，保持焦点） */
  rsRenderTableOnly();
  rsRenderSidebarOnly();
  input.focus();

  rsShowToast(`成功添加 ${lines.length} 个问题，可继续输入`);
}

function rsAddQuestions(lines, categoryIds, platformIds, deviceIds) {
  const platformName = platformIds.length
    ? RS_PLATFORMS.find(p => p.id === platformIds[0]).name
    : '百度文心';
  const deviceName = deviceIds.length
    ? RS_DEVICES.find(d => d.id === deviceIds[0]).name
    : '移动端';

  let maxId = RS_QUESTIONS.length ? Math.max(...RS_QUESTIONS.map(q => q.id)) : 0;
  lines.forEach(line => {
    RS_QUESTIONS.unshift({
      id: ++maxId,
      content: line,
      platform: platformName,
      device: deviceName,
      source: '手动',
      categoryIds: [...categoryIds]
    });
  });
}

/* ========================================
   交互：问题列表
   ======================================== */
function rsGetFilteredQuestions() {
  let result = RS_QUESTIONS;

  /* 按分类筛选 */
  if (RS_FILTER_CATEGORY === 'uncategorized') {
    result = result.filter(q => !q.categoryIds || q.categoryIds.length === 0);
  } else if (RS_FILTER_CATEGORY) {
    result = result.filter(q => q.categoryIds && q.categoryIds.includes(RS_FILTER_CATEGORY));
  }

  /* 按搜索关键词筛选 */
  const keyword = rsGetSearchValue();
  if (keyword) {
    result = result.filter(q => q.content.toLowerCase().includes(keyword.toLowerCase()));
  }

  /* 按平台筛选 */
  const platform = rsGetFilterValue('platform');
  if (platform) {
    result = result.filter(q => q.platform === platform);
  }

  /* 按设备筛选 */
  const device = rsGetFilterValue('device');
  if (device) {
    result = result.filter(q => q.device === device);
  }

  /* 按来源筛选 */
  const source = rsGetFilterValue('source');
  if (source) {
    result = result.filter(q => q.source === source);
  }

  return result;
}

function rsGetSearchValue() {
  const el = document.getElementById('rsSearchInput');
  return el ? el.value.trim() : '';
}

function rsGetFilterValue(type) {
  const ids = { platform: 'rsFilterPlatform', device: 'rsFilterDevice', source: 'rsFilterSource' };
  const el = document.getElementById(ids[type]);
  if (!el) return '';
  return el.value;
}

function rsSearchQuestions() {
  rsRenderTableOnly();
}

function rsClearFilters() {
  const searchEl = document.getElementById('rsSearchInput');
  if (searchEl) searchEl.value = '';
  const pEl = document.getElementById('rsFilterPlatform');
  if (pEl) pEl.value = '';
  const dEl = document.getElementById('rsFilterDevice');
  if (dEl) dEl.value = '';
  const sEl = document.getElementById('rsFilterSource');
  if (sEl) sEl.value = '';
  rsRenderTableOnly();
}

/* 选择/取消选择问题 */
function rsToggleQuestionSelect(id) {
  if (RS_SELECTED_QUESTION_IDS.includes(id)) {
    RS_SELECTED_QUESTION_IDS = RS_SELECTED_QUESTION_IDS.filter(x => x !== id);
  } else {
    RS_SELECTED_QUESTION_IDS.push(id);
  }
  rsRenderTableOnly();
}

function rsToggleAllQuestions(cb) {
  const filtered = rsGetFilteredQuestions();
  if (cb.checked) {
    RS_SELECTED_QUESTION_IDS = filtered.map(q => q.id);
  } else {
    RS_SELECTED_QUESTION_IDS = [];
  }
  rsRenderTableOnly();
}

function rsClearSelection() {
  RS_SELECTED_QUESTION_IDS = [];
  rsRenderTableOnly();
}

function rsDeleteQuestion(id) {
  if (!confirm('确定删除该问题？')) return;
  RS_QUESTIONS = RS_QUESTIONS.filter(q => q.id !== id);
  RS_SELECTED_QUESTION_IDS = RS_SELECTED_QUESTION_IDS.filter(x => x !== id);
  navigateTo('tenant-report-settings');
}

function rsDeleteAllQuestions() {
  if (!confirm('确定删除全部问题？此操作不可恢复。')) return;
  RS_QUESTIONS = [];
  RS_SELECTED_QUESTION_IDS = [];
  navigateTo('tenant-report-settings');
}

function rsBatchDelete() {
  if (!RS_SELECTED_QUESTION_IDS.length) return;
  if (!confirm(`确定删除选中的 ${RS_SELECTED_QUESTION_IDS.length} 个问题？`)) return;
  RS_QUESTIONS = RS_QUESTIONS.filter(q => !RS_SELECTED_QUESTION_IDS.includes(q.id));
  RS_SELECTED_QUESTION_IDS = [];
  navigateTo('tenant-report-settings');
}

/* ----- 行内编辑分类 ----- */
function rsOpenInlineCatEditor(questionId) {
  rsCloseInlineCatEditor();

  const q = RS_QUESTIONS.find(x => x.id === questionId);
  if (!q) return;

  const cell = document.getElementById('rsCatCell-' + questionId);
  if (!cell) return;

  const rect = cell.getBoundingClientRect();
  const panel = document.createElement('div');
  panel.id = 'rsInlineCatEditor';
  panel.className = 'rs-inline-cat-editor';
  panel.style.left = Math.min(rect.left, window.innerWidth - 260) + 'px';
  panel.style.top = (rect.bottom + 4) + 'px';

  panel.innerHTML = `
    <div class="rs-inline-cat-title">修改分类</div>
    <div class="rs-inline-cat-list">
      ${RS_CATEGORIES.map(c => `
        <label class="rs-checkbox-item">
          <input type="checkbox" value="${c.id}" ${(q.categoryIds || []).includes(c.id) ? 'checked' : ''}>
          <span>${c.name}</span>
        </label>
      `).join('') || '<span class="rs-empty-text">暂无分类</span>'}
    </div>
    <div class="rs-inline-cat-footer">
      <button class="btn btn-ghost btn-sm" onclick="rsCloseInlineCatEditor()">取消</button>
      <button class="btn btn-primary btn-sm" onclick="rsApplyInlineCategory(${questionId})">确认</button>
    </div>
  `;

  document.body.appendChild(panel);
  setTimeout(() => { document.addEventListener('click', rsInlineCatOutsideClick); }, 0);
}

function rsInlineCatOutsideClick(e) {
  const panel = document.getElementById('rsInlineCatEditor');
  if (panel && !panel.contains(e.target) && !e.target.closest('.rs-cat-edit-btn')) {
    rsCloseInlineCatEditor();
  }
}

function rsCloseInlineCatEditor() {
  const panel = document.getElementById('rsInlineCatEditor');
  if (panel) panel.remove();
  document.removeEventListener('click', rsInlineCatOutsideClick);
}

function rsApplyInlineCategory(questionId) {
  const panel = document.getElementById('rsInlineCatEditor');
  if (!panel) return;
  const checkboxes = panel.querySelectorAll('input[type="checkbox"]:checked');
  const newCategoryIds = Array.from(checkboxes).map(cb => cb.value);

  const q = RS_QUESTIONS.find(x => x.id === questionId);
  if (q) q.categoryIds = newCategoryIds;

  rsCloseInlineCatEditor();
  rsRenderTableOnly();
  rsRenderSidebarOnly();
  rsShowToast('分类已更新');
}

/* ----- 局部刷新（不整页跳转） ----- */
function rsRenderTableOnly() {
  const listSection = document.querySelector('.rs-list-section');
  if (!listSection) { navigateTo('tenant-report-settings'); return; }

  /* 重建整个列表区域 */
  const newHtml = rsBuildListSection();
  /* 用外层容器替换 */
  const wrapper = document.createElement('div');
  wrapper.innerHTML = newHtml;
  const newList = wrapper.firstElementChild;
  if (newList && listSection.parentNode) {
    listSection.parentNode.replaceChild(newList, listSection);
  }
}

function rsRenderSidebarOnly() {
  const sidebar = document.querySelector('.rs-sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = rsBuildCategorySidebar();
}

/* ========================================
   弹窗：批量修改分类
   ======================================== */
function openBatchModifyModal() {
  if (!RS_SELECTED_QUESTION_IDS.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsBatchModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeBatchModal(); };
  overlay.innerHTML = `
    <div class="modal rs-batch-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">批量修改分类</h2>
        <button class="modal-close" onclick="closeBatchModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body">
        <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px">
          已选 <strong style="color:var(--color-primary)">${RS_SELECTED_QUESTION_IDS.length}</strong> 个问题，请选择要设置的分类：
        </p>
        <div class="rs-checkbox-group" id="rsBatchCatList">
          ${RS_CATEGORIES.map(c => `
            <label class="rs-checkbox-item">
              <input type="checkbox" value="${c.id}">
              <span>${c.name}</span>
            </label>
          `).join('') || '<span class="rs-empty-text">暂无分类</span>'}
        </div>
        <div class="rs-modal-footer">
          <button class="btn btn-ghost" onclick="closeBatchModal()">取消</button>
          <button class="btn btn-primary" onclick="rsConfirmBatchModify()">确认修改</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeBatchModal() {
  const el = document.getElementById('rsBatchModal');
  if (el) el.remove();
}

function rsConfirmBatchModify() {
  const checked = document.querySelectorAll('#rsBatchCatList input[type="checkbox"]:checked');
  const newCatIds = Array.from(checked).map(cb => cb.value);

  const count = RS_SELECTED_QUESTION_IDS.length;
  RS_SELECTED_QUESTION_IDS.forEach(qid => {
    const q = RS_QUESTIONS.find(x => x.id === qid);
    if (q) q.categoryIds = [...newCatIds];
  });

  closeBatchModal();
  RS_SELECTED_QUESTION_IDS = [];
  navigateTo('tenant-report-settings');
  setTimeout(() => rsShowToast(`已批量修改 ${count} 个问题的分类`), 50);
}

/* ========================================
   弹窗：CSV 导入
   ======================================== */
function openImportModal() {
  RS_IMPORT_PREVIEW = [];
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsImportModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeImportModal(); };
  overlay.innerHTML = `
    <div class="modal rs-import-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">批量导入问题</h2>
        <button class="modal-close" onclick="closeImportModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body">
        <div class="rs-import-step">
          <div class="rs-import-step-label"><span class="rs-import-step-num">1</span>下载模板</div>
          <button class="rs-upload-btn" onclick="rsDownloadTemplate()">下载CSV模板</button>
        </div>
        <div class="rs-import-step">
          <div class="rs-import-step-label"><span class="rs-import-step-num">2</span>上传文件</div>
          <input type="file" accept=".csv,.txt" onchange="rsHandleFileUpload(this)" style="font-size:13px">
        </div>
        <div class="rs-import-step">
          <div class="rs-import-step-label"><span class="rs-import-step-num">3</span>预览数据</div>
          <div class="rs-import-preview-wrap" id="rsImportPreview">
            <table class="rs-import-preview-table">
              <thead><tr><th>问题内容</th><th>分类</th><th>平台</th><th>设备端</th></tr></thead>
              <tbody><tr><td colspan="4" style="text-align:center;color:var(--color-text-tertiary);padding:16px">请先上传文件</td></tr></tbody>
            </table>
          </div>
        </div>
        <div class="rs-modal-footer">
          <span id="rsImportCount" style="font-size:13px;color:var(--color-text-secondary);margin-right:auto"></span>
          <button class="btn btn-ghost" onclick="closeImportModal()">取消</button>
          <button class="btn btn-primary" onclick="rsConfirmImport()">确认导入</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeImportModal() {
  const el = document.getElementById('rsImportModal');
  if (el) el.remove();
}

function rsDownloadTemplate() {
  const csv = '\ufeff问题内容,分类,平台,设备端\n'
    + '东莞含羹加湿器厂家哪家专业,含羹机厂家,百度文心,移动端\n'
    + '露营灯哪个品牌好,露营灯供应商,DeepSeek,电脑端\n'
    + '户外风扇厂家批发价格,户外风扇厂家,通义千问,移动端\n';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '报表问题导入模板.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function rsHandleFileUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
    /* 跳过表头 */
    const dataLines = lines[0] && lines[0].includes('问题内容') ? lines.slice(1) : lines;

    RS_IMPORT_PREVIEW = dataLines.map((line, i) => {
      const cols = line.split(',').map(s => s.trim());
      return {
        id: i + 1,
        content: cols[0] || '',
        category: cols[1] || '',
        platform: cols[2] || '',
        device: cols[3] || ''
      };
    }).filter(r => r.content);

    rsRenderImportPreview();
  };
  reader.readAsText(file, 'UTF-8');
}

function rsRenderImportPreview() {
  const wrap = document.getElementById('rsImportPreview');
  const countEl = document.getElementById('rsImportCount');
  if (!wrap) return;

  if (!RS_IMPORT_PREVIEW.length) {
    wrap.innerHTML = '<table class="rs-import-preview-table"><thead><tr><th>问题内容</th><th>分类</th><th>平台</th><th>设备端</th></tr></thead><tbody><tr><td colspan="4" style="text-align:center;color:var(--color-text-tertiary);padding:16px">无有效数据</td></tr></tbody></table>';
    if (countEl) countEl.textContent = '';
    return;
  }

  const rows = RS_IMPORT_PREVIEW.map(r => `
    <tr>
      <td>${r.content}</td>
      <td>${r.category || '<span style="color:var(--color-text-tertiary)">未设置</span>'}</td>
      <td>${r.platform || '<span style="color:var(--color-text-tertiary)">默认</span>'}</td>
      <td>${r.device || '<span style="color:var(--color-text-tertiary)">默认</span>'}</td>
    </tr>
  `).join('');

  wrap.innerHTML = `<table class="rs-import-preview-table"><thead><tr><th>问题内容</th><th>分类</th><th>平台</th><th>设备端</th></tr></thead><tbody>${rows}</tbody></table>`;
  if (countEl) countEl.textContent = `共 ${RS_IMPORT_PREVIEW.length} 条数据`;
}

function rsConfirmImport() {
  if (!RS_IMPORT_PREVIEW.length) {
    alert('请先上传有效的CSV文件');
    return;
  }

  let maxId = RS_QUESTIONS.length ? Math.max(...RS_QUESTIONS.map(q => q.id)) : 0;
  RS_IMPORT_PREVIEW.forEach(r => {
    /* 匹配分类名 -> categoryIds */
    const catIds = r.category
      ? r.category.split(/[,，]/).map(s => s.trim()).filter(Boolean).map(name => {
          const cat = RS_CATEGORIES.find(c => c.name === name);
          return cat ? cat.id : null;
        }).filter(Boolean)
      : [];

    RS_QUESTIONS.unshift({
      id: ++maxId,
      content: r.content,
      platform: r.platform || '百度文心',
      device: r.device || '移动端',
      source: '导入',
      categoryIds: catIds
    });
  });

  const count = RS_IMPORT_PREVIEW.length;
  closeImportModal();
  navigateTo('tenant-report-settings');
  setTimeout(() => rsShowToast(`成功导入 ${count} 个问题`), 50);
}

/* ========================================
   弹窗：选择采集分类（分类绑定 Tab）
   ======================================== */
function openSelectCollectionModal(reportCatId) {
  const reportCat = RS_CATEGORIES.find(c => c.id === reportCatId);
  if (!reportCat) return;

  const available = RS_COLLECTION_CATEGORIES.filter(cc =>
    !RS_BINDINGS.some(b => b.collectionCatId === cc.id)
  );

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsSelectCollectionModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeSelectCollectionModal(); };
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">选择采集规则分类</h2>
        <button class="modal-close" onclick="closeSelectCollectionModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body">
        <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px">
          为报表分类 <strong style="color:var(--color-primary)">${reportCat.name}</strong> 选择绑定的采集规则分类：
        </p>
        <div class="rs-checkbox-group" style="flex-direction:column;gap:10px">
          ${available.length ? available.map(cc => `
            <label class="rs-checkbox-item">
              <input type="radio" name="rsSelectCollection" value="${cc.id}">
              <span>${cc.name}</span>
            </label>
          `).join('') : '<span class="rs-empty-text">暂无可绑定的采集分类</span>'}
        </div>
        <div class="rs-modal-footer">
          <button class="btn btn-ghost" onclick="closeSelectCollectionModal()">取消</button>
          <button class="btn btn-primary" onclick="rsConfirmSelectCollection('${reportCatId}')">确认绑定</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeSelectCollectionModal() {
  const el = document.getElementById('rsSelectCollectionModal');
  if (el) el.remove();
}

function rsConfirmSelectCollection(reportCatId) {
  const checked = document.querySelector('input[name="rsSelectCollection"]:checked');
  if (!checked) { alert('请选择一个采集分类'); return; }
  RS_BINDINGS.push({ reportCatId, collectionCatId: checked.value });
  closeSelectCollectionModal();
  navigateTo('tenant-report-settings');
  setTimeout(() => rsShowToast('绑定成功'), 50);
}

/* ========================================
   交互：分类绑定
   ======================================== */
function rsAutoMatchBindings() {
  let matchCount = 0;
  RS_CATEGORIES.forEach(rc => {
    /* 检查是否已绑定 */
    if (RS_BINDINGS.some(b => b.reportCatId === rc.id)) return;
    /* 在采集分类中找同名 */
    const match = RS_COLLECTION_CATEGORIES.find(cc =>
      cc.name === rc.name && !RS_BINDINGS.some(b => b.collectionCatId === cc.id)
    );
    if (match) {
      RS_BINDINGS.push({ reportCatId: rc.id, collectionCatId: match.id });
      matchCount++;
    }
  });
  navigateTo('tenant-report-settings');
  setTimeout(() => {
    if (matchCount > 0) {
      rsShowToast(`自动匹配了 ${matchCount} 个同名分类`);
    } else {
      rsShowToast('没有找到可匹配的同名分类');
    }
  }, 50);
}

function rsBindByName(reportCatId, name) {
  const collectionCat = RS_COLLECTION_CATEGORIES.find(cc =>
    cc.name === name && !RS_BINDINGS.some(b => b.collectionCatId === cc.id)
  );
  if (collectionCat) {
    RS_BINDINGS.push({ reportCatId, collectionCatId: collectionCat.id });
    navigateTo('tenant-report-settings');
    setTimeout(() => rsShowToast('绑定成功'), 50);
  }
}

function rsUnbindCategory(reportCatId) {
  if (!confirm('确定解除绑定？')) return;
  RS_BINDINGS = RS_BINDINGS.filter(b => b.reportCatId !== reportCatId);
  navigateTo('tenant-report-settings');
  setTimeout(() => rsShowToast('已解除绑定'), 50);
}

/* ========================================
   保存配置
   ======================================== */
function rsSaveConfig() {
  alert('保存配置成功');
}

/* ========================================
   Toast
   ======================================== */
function rsShowToast(msg) {
  const existing = document.getElementById('rsToast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'rsToast';
  toast.className = 'rs-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/* ========================================
   弹窗：管理分类（保留原有）
   ======================================== */
function openCategoryModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsCategoryModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeCategoryModal(); };
  overlay.innerHTML = `
    <div class="modal rs-category-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">管理分类</h2>
        <button class="modal-close" onclick="closeCategoryModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body">
        <div class="rs-category-add-row">
          <input type="text" id="rsNewCategoryInput" placeholder="输入新分类名称" onkeyup="if(event.key==='Enter') rsAddCategory()">
          <button class="btn btn-primary" onclick="rsAddCategory()">添加</button>
        </div>
        <div class="rs-category-list" id="rsCategoryModalList">
          ${rsBuildCategoryListHtml()}
        </div>
        <div class="rs-modal-footer">
          <button class="btn btn-ghost" onclick="closeCategoryModal()">关闭</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeCategoryModal() {
  const el = document.getElementById('rsCategoryModal');
  if (el) el.remove();
}

function rsBuildCategoryListHtml() {
  if (!RS_CATEGORIES.length) return '<div class="rs-empty-text">暂无分类</div>';
  return RS_CATEGORIES.map(c => `
    <div class="rs-category-list-item">
      <span>${c.name}</span>
      <span class="rs-category-delete" onclick="rsDeleteCategory('${c.id}')">删除</span>
    </div>
  `).join('');
}

function rsAddCategory() {
  const input = document.getElementById('rsNewCategoryInput');
  const name = (input.value || '').trim();
  if (!name) return;
  const maxId = RS_CATEGORIES.length ? Math.max(...RS_CATEGORIES.map(c => parseInt(c.id.replace('c', '')) || 0)) : 0;
  RS_CATEGORIES.push({ id: 'c' + (maxId + 1), name });
  input.value = '';
  const list = document.getElementById('rsCategoryModalList');
  if (list) list.innerHTML = rsBuildCategoryListHtml();
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = rsBuildCategoryCheckboxes();
  rsRenderSidebarOnly();
}

function rsDeleteCategory(id) {
  if (!confirm('确定删除该分类？')) return;
  RS_CATEGORIES = RS_CATEGORIES.filter(c => c.id !== id);
  RS_SELECTED_CATEGORIES = RS_SELECTED_CATEGORIES.filter(x => x !== id);
  /* 从问题中移除该分类 */
  RS_QUESTIONS.forEach(q => {
    if (q.categoryIds) q.categoryIds = q.categoryIds.filter(x => x !== id);
  });
  const list = document.getElementById('rsCategoryModalList');
  if (list) list.innerHTML = rsBuildCategoryListHtml();
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = rsBuildCategoryCheckboxes();
  rsRenderSidebarOnly();
}

/* ========================================
   弹窗：拓词工具（保留原有）
   ======================================== */
function openWordToolModal() {
  const industries = ['金融', '教育', '医疗健康', '企业服务', '互联网', '电信通信', '汽车', '电商零售', '娱乐', '游戏', '旅行出行', '房地产', '制造业与工业', '公共事业'];
  const combineOptions = [
    'C+D 核心词+通义词',
    'A+C+D 前缀1+核心词+通义词',
    'B+C+D 前缀2+核心词+通义词',
    'C+(D*E) 核心词+(通义词*推荐词)',
    'C+(D*F) 核心词+(通义词*疑问词)',
    '(A*B)+C+D (前缀1*前缀2)+核心词+通义词',
    'A+C+(D*E) 前缀1+核心词+(通义词*推荐词)',
    'B+C+(D*E) 前缀2+核心词+(通义词*推荐词)'
  ];

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsWordToolModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeWordToolModal(); };
  overlay.innerHTML = `
    <div class="modal rs-wordtool-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">拓词工具</h2>
        <button class="modal-close" onclick="closeWordToolModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body rs-wordtool-body">
        <div style="margin-bottom:6px">
          <span style="color:var(--color-primary);font-size:12px;font-weight:500">+ 行业组合模板</span>
          <span style="font-size:12px;color:var(--color-text-tertiary)">（点击自动填充示例数据）</span>
        </div>
        <div class="rs-industry-tags" id="rsIndustryTags">
          ${industries.map((ind, i) => `<span class="rs-industry-tag ${i === 0 ? 'active' : ''}" onclick="rsSelectIndustry(this)">${ind}</span>`).join('')}
        </div>
        <div class="rs-word-columns">
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">A</span><span>前缀1</span></div>
            <textarea id="rsWordA" placeholder="市面上&#10;行业内&#10;市场&#10;目前&#10;国内&#10;本地&#10;线上&#10;推荐几家&#10;服务推荐几家"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">B</span><span>前缀2</span></div>
            <textarea id="rsWordB" placeholder="口碑好的&#10;比较靠谱的&#10;靠谱的&#10;有实力的&#10;专业的&#10;热门的&#10;值得推荐的&#10;真实的"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">C</span><span>核心关键词</span></div>
            <textarea id="rsWordC" placeholder="含羹机&#10;露营灯&#10;户外风扇&#10;加湿器"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">D</span><span>通义词</span></div>
            <textarea id="rsWordD" placeholder="平台&#10;公司&#10;机构&#10;银行"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">E</span><span>推荐词</span></div>
            <textarea id="rsWordE" placeholder="推荐&#10;排行&#10;排行榜&#10;哪家强&#10;排名榜&#10;推荐榜单&#10;推荐排行榜&#10;口碑推荐"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">F</span><span>疑问词</span></div>
            <textarea id="rsWordF" placeholder="哪家好&#10;哪家强&#10;排名推荐&#10;哪个好&#10;哪家专业&#10;怎么选&#10;有哪些&#10;找哪家&#10;选哪家"></textarea>
          </div>
        </div>
        <div class="rs-combine-group">
          <div class="rs-combine-title">组合方式 <span class="hint">（可多选）</span></div>
          <div class="rs-combine-options">
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsToggleAllCombine(this)"><span>全选</span></label>
            ${combineOptions.map((opt, i) => `<label class="rs-checkbox-item"><input type="checkbox" class="rs-combine-cb" value="${i}"><span>${opt}</span></label>`).join('')}
          </div>
        </div>
        <div class="rs-generate-btn-row">
          <button class="btn btn-primary" onclick="rsGenerateWords()">生成</button>
        </div>
        <div class="rs-result-header">
          <span>已生成 <strong id="rsResultCount" style="color:var(--color-primary)">0</strong> 个</span>
          <div>
            <label class="rs-checkbox-item" style="margin-right:12px"><input type="checkbox" onchange="rsToggleAllResults(this)"><span>全选</span></label>
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsInverseResults()"><span>反选</span></label>
          </div>
        </div>
        <div class="rs-result-table-wrap">
          <table class="rs-result-table">
            <thead>
              <tr>
                <th style="width:40px"><input type="checkbox" onchange="rsToggleAllResults(this)"></th>
                <th style="width:50px">序号</th>
                <th>问题</th>
              </tr>
            </thead>
            <tbody id="rsResultTableBody">
              <tr><td colspan="3" style="text-align:center;color:var(--color-text-tertiary)">点击"生成"后显示结果</td></tr>
            </tbody>
          </table>
        </div>
        <div class="rs-result-footer">
          <span style="font-size:13px">已选 <strong id="rsSelectedCount" style="color:var(--color-primary)">0</strong> 个</span>
          <button class="btn btn-primary" onclick="rsImportWords()">导入到批量添加</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeWordToolModal() {
  const el = document.getElementById('rsWordToolModal');
  if (el) el.remove();
}

function rsSelectIndustry(el) {
  document.querySelectorAll('#rsIndustryTags .rs-industry-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function rsToggleAllCombine(cb) {
  document.querySelectorAll('.rs-combine-cb').forEach(c => c.checked = cb.checked);
}

function rsGenerateWords() {
  const getLines = id => (document.getElementById(id).value || '').split(/\n/).map(s => s.trim()).filter(Boolean);
  const A = getLines('rsWordA');
  const B = getLines('rsWordB');
  const C = getLines('rsWordC');
  const D = getLines('rsWordD');
  const E = getLines('rsWordE');
  const F = getLines('rsWordF');
  const cbs = document.querySelectorAll('.rs-combine-cb:checked');
  if (!C.length || !D.length) { alert('请至少填写核心关键词和通义词'); return; }
  if (!cbs.length) { alert('请选择组合方式'); return; }
  const results = [];
  const add = (arr) => arr.forEach(x => { if (x) results.push(x); });
  cbs.forEach(cb => {
    const idx = parseInt(cb.value);
    switch (idx) {
      case 0: add(C.flatMap(c => D.map(d => c + d))); break;
      case 1: add(A.flatMap(a => C.flatMap(c => D.map(d => a + c + d)))); break;
      case 2: add(B.flatMap(b => C.flatMap(c => D.map(d => b + c + d)))); break;
      case 3: add(C.flatMap(c => D.flatMap(d => E.map(e => c + d + e)))); break;
      case 4: add(C.flatMap(c => D.flatMap(d => F.map(f => c + d + f)))); break;
      case 5: add(A.flatMap(a => B.flatMap(b => C.flatMap(c => D.map(d => a + b + c + d))))); break;
      case 6: add(A.flatMap(a => C.flatMap(c => D.flatMap(d => E.map(e => a + c + d + e))))); break;
      case 7: add(B.flatMap(b => C.flatMap(c => D.flatMap(d => E.map(e => b + c + d + e))))); break;
    }
  });
  RS_GENERATED_WORDS = [...new Set(results)].slice(0, 300).map((text, i) => ({ id: i + 1, text, selected: false }));
  rsRenderResults();
}

function rsRenderResults() {
  const tbody = document.getElementById('rsResultTableBody');
  const countEl = document.getElementById('rsResultCount');
  const selectedEl = document.getElementById('rsSelectedCount');
  if (countEl) countEl.textContent = RS_GENERATED_WORDS.length;
  if (selectedEl) selectedEl.textContent = RS_GENERATED_WORDS.filter(x => x.selected).length;
  if (!tbody) return;
  if (!RS_GENERATED_WORDS.length) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--color-text-tertiary)">无结果</td></tr>';
    return;
  }
  tbody.innerHTML = RS_GENERATED_WORDS.map((w, i) => `
    <tr>
      <td><input type="checkbox" ${w.selected ? 'checked' : ''} onchange="rsToggleResult(${w.id})"></td>
      <td>${i + 1}</td>
      <td>${w.text}</td>
    </tr>
  `).join('');
}

function rsToggleResult(id) {
  const w = RS_GENERATED_WORDS.find(x => x.id === id);
  if (w) w.selected = !w.selected;
  rsRenderResults();
}

function rsToggleAllResults(cb) {
  RS_GENERATED_WORDS.forEach(w => w.selected = cb.checked);
  rsRenderResults();
}

function rsInverseResults() {
  RS_GENERATED_WORDS.forEach(w => w.selected = !w.selected);
  rsRenderResults();
}

function rsImportWords() {
  const selected = RS_GENERATED_WORDS.filter(w => w.selected);
  if (!selected.length) { alert('请选择要导入的问题'); return; }
  const input = document.getElementById('rsQuestionInput');
  if (input) {
    const existing = input.value.trim();
    input.value = existing ? existing + '\n' + selected.map(w => w.text).join('\n') : selected.map(w => w.text).join('\n');
  }
  closeWordToolModal();
  setTimeout(() => rsShowToast(`已导入 ${selected.length} 个问题到批量添加框`), 50);
}
