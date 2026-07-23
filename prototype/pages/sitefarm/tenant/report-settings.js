/**
 * 租户端 - 报表设置 (优化版 V2)
 *
 * 优化点：
 * 1. 报表显示设置、背景设置
 * 2. 问题批量添加 + 问题列表表格
 * 3. CSV 导入（下载模板→上传→预览→导入）
 * 4. 分类绑定（分类级别绑定报表规则与采集规则，自动匹配同名分类）
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
      margin-bottom: 16px;
    }
    .rs-page-header h1 { font-size: 20px; font-weight: 600; }

    .rs-card {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); margin-bottom: 12px; padding: 16px 20px;
    }
    .rs-card-title {
      font-size: 15px; font-weight: 600; color: var(--color-text-primary);
      margin-bottom: 16px;
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
      background: #F4F9FF;
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
      font-size: 13px; background: #F4F9FF; outline: none;
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

    /* ===== 表格分类 ===== */
    .rs-cat-badge {
      display: inline-block; padding: 2px 8px; border-radius: var(--radius-sm);
      font-size: 11px; background: var(--color-primary-bg); color: var(--color-primary);
      border: 1px solid var(--color-primary); white-space: nowrap;
    }
    .rs-cat-badge.uncategorized { background: var(--color-bg-body); color: var(--color-text-tertiary); border-color: var(--color-border); }

    /* ===== 选择采集分类弹窗 ===== */
    .rs-footer {
      position: fixed; bottom: 0; left: 260px; right: 0;
      display: flex; justify-content: flex-end; gap: 12px; padding: 12px 32px;
      background: var(--color-bg-card); border-top: 1px solid var(--color-border);
      z-index: 100; box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
    }
    .rs-footer .btn { height: 36px; min-width: 100px; }

    /* ===== 客户订单信息 ===== */
    .rs-order-info-row { display: flex; align-items: center; gap: 24px; line-height: 1; flex-wrap: wrap; }
    .rs-order-info-row + .rs-order-info-row { margin-top: 8px; }
    .rs-order-info-field { display: flex; align-items: baseline; gap: 6px; }
    .rs-order-info-field .label { font-size: 12px; color: var(--color-text-tertiary); white-space: nowrap; }
    .rs-order-info-field .value { font-size: 12px; color: var(--color-text-primary); }
    .rs-order-info-field .value.bold { font-size: 14px; font-weight: 600; }
    .rs-order-info-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .rs-order-info-tag { display: inline-flex; align-items: center; gap: 4px; border-radius: var(--radius-sm); padding: 2px 8px; font-size: 11px; color: var(--color-text-secondary); }
    .rs-order-info-tag.type-keyword { background: #eef6ff; color: #3498db; }
    .rs-order-info-tag.type-brand { background: #fef2f2; color: #e74c3c; }

    /* ===== Toast ===== */
    .rs-toast {
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-60px);
      background: #1E293B; color: #fff; padding: 10px 20px; border-radius: var(--radius-sm);
      font-size: 13px; z-index: 99999; opacity: 0; transition: transform 0.3s, opacity 0.3s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .rs-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

    /* ===== CSV 导入弹窗 ===== */
    .rs-modal-footer { display: flex; justify-content: flex-end; padding-top: 12px; }
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

    /* ===== 选择采集分类弹窗 ===== */
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
  mainKeywords: '香薰机、露营灯、户外风扇、加湿器',
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
  { id: 'c1', name: '香薰机厂家' },
  { id: 'c2', name: '露营灯供应商' },
  { id: 'c3', name: '户外风扇厂家' },
  { id: 'c4', name: '加湿器原厂供应商' }
];

let RS_QUESTIONS = [
  { id: 1, content: '东莞香薰加湿器厂家哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryId: 'c1' },
  { id: 2, content: '东莞香薰加湿器厂家哪家专业', platform: '百度文心', device: '电脑端', source: '采集', categoryId: 'c1' },
  { id: 3, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '电脑端', source: '采集', categoryId: 'c4' },
  { id: 4, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryId: 'c4' },
  { id: 5, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '移动端', source: '采集', categoryId: null },
  { id: 6, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '电脑端', source: '采集', categoryId: null },
  { id: 7, content: '东莞迷你加湿器公司哪家专业', platform: '百度文心', device: '移动端', source: '采集', categoryId: 'c4' },
  { id: 8, content: '东莞香薰加湿器厂家排名', platform: '百度文心', device: '电脑端', source: '采集', categoryId: 'c1' },
  { id: 9, content: '露营灯品牌排行榜前十名', platform: 'DeepSeek', device: '电脑端', source: '后台', categoryId: 'c2' },
  { id: 10, content: '户外露营灯哪个牌子好', platform: 'Kimi', device: '移动端', source: '后台', categoryId: 'c2' },
  { id: 11, content: '户外风扇品牌推荐', platform: '通义千问', device: '电脑端', source: '后台', categoryId: 'c3' },
  { id: 12, content: '户外风扇厂家批发价格', platform: '智谱清言', device: '移动端', source: '后台', categoryId: 'c3' },
  { id: 13, content: '智能加湿器哪家好', platform: '豆包', device: '电脑端', source: '后台', categoryId: 'c4' },
  { id: 14, content: '香薰机厂家直销价格表', platform: '百度文心', device: '电脑端', source: '采集', categoryId: 'c1' }
];

/* 采集规则分类（用于分类绑定 Tab） */
let RS_COLLECTION_CATEGORIES = [
  { id: 'cc1', name: '香薰机厂家' },
  { id: 'cc2', name: '露营灯供应商' },
  { id: 'cc3', name: '户外风扇厂家' },
  { id: 'cc4', name: '加湿器原厂供应商' }
];

/* 绑定关系: [{ reportCatId, collectionCatId }] */
let RS_BINDINGS = [];

/* ========================================
   状态变量
   ======================================== */
let RS_SELECTED_QUESTION_IDS = [];
let RS_PAGE = 1;
let RS_PAGE_SIZE = 10;
let RS_SELECTED_CATEGORIES = [];
let RS_SELECTED_PLATFORMS = [];
let RS_SELECTED_DEVICES = [];
let RS_IMPORT_PREVIEW = [];

/* ========================================
   主渲染函数
   ======================================== */
function renderReportSettings() {
  return `
    <div class="rs-page-header">
      <h1>报表设置 - ${REPORT_PROJECT.name}</h1>
    </div>

    <div class="rs-card" style="margin-bottom: 12px;">
      <div class="rs-card-title">客户订单信息</div>
      <div class="rs-order-info-row">
        <div class="rs-order-info-field"><span class="label">项目名称</span><span class="value bold">蓝王科技项目2026年GEO曝光</span></div>
        <div class="rs-order-info-field"><span class="label">项目ID</span><span class="value">6d1be45a-8a26-4a7c-8b4d-...</span></div>
        <div class="rs-order-info-field"><span class="label">产品名称</span><span class="value">GEO企业基础曝光套餐5关键词+2品牌词</span></div>
        <div class="rs-order-info-field"><span class="label">服务时间</span><span class="value">2026-06-24 ~ 2026-07-24</span></div>
      </div>
      <div class="rs-order-info-row">
        <div class="rs-order-info-field"><span class="label">主关键词</span>
          <div class="rs-order-info-tags">
            <span class="rs-order-info-tag type-keyword">香薰机</span>
            <span class="rs-order-info-tag type-keyword">露营灯</span>
            <span class="rs-order-info-tag type-keyword">户外风扇</span>
            <span class="rs-order-info-tag type-keyword">加湿器</span>
          </div>
        </div>
        <div class="rs-order-info-field"><span class="label">品牌关键词</span>
          <div class="rs-order-info-tags">
            <span class="rs-order-info-tag type-brand">蓝王科技</span>
          </div>
        </div>
      </div>
    </div>

    <div class="rs-card">
      <div class="rs-card-title">报表显示设置</div>
      <div class="rs-form-row">
        <div class="rs-form-group">
          <div class="rs-form-label">显示内容设置：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="checkbox" checked><span>营销报表</span></label>
          </div>
        </div>
        <div class="rs-form-group"></div>
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
          <div class="rs-form-label">公司介绍图片：<span class="rs-hint">建议尺寸：264×198px | 宽高比：4:3 | 大小：≤500KB | 格式：JPG、PNG、GIF</span></div>
          <div class="rs-upload-row">
            <button class="rs-upload-btn">上传</button>
          </div>
        </div>
      </div>
      <div class="rs-form-row">
        <div class="rs-form-group" style="flex:1;min-width:100%;">
          <div class="rs-form-label">报表背景设置：</div>
          <div style="display:flex;align-items:flex-start;gap:24px;">
            <div style="flex-shrink:0;">
              <div class="rs-checkbox-group" style="gap:20px;">
                <label class="rs-checkbox-item"><input type="radio" name="rsBgMode" value="default" checked onchange="rsOnBgModeChange(this)"><span>默认（纯色 #dae0f0）</span></label>
                <label class="rs-checkbox-item"><input type="radio" name="rsBgMode" value="custom" onchange="rsOnBgModeChange(this)"><span>自定义渐变</span></label>
              </div>
              <div id="rsCustomColorPickers" style="display:none;align-items:center;gap:16px;margin-top:12px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:12px;color:var(--color-text-secondary);">起始色</span>
                  <input type="color" id="rsGradientStart" value="#6366F1" onchange="rsUpdateGradientPreview()" style="width:36px;height:32px;border:1px solid var(--color-border);border-radius:4px;cursor:pointer;padding:2px;" />
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:12px;color:var(--color-text-secondary);">结束色</span>
                  <input type="color" id="rsGradientEnd" value="#dae0f0" onchange="rsUpdateGradientPreview()" style="width:36px;height:32px;border:1px solid var(--color-border);border-radius:4px;cursor:pointer;padding:2px;" />
                </div>
              </div>
            </div>
            <div id="rsBgPreview" style="flex:1;min-width:200px;height:60px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:#dae0f0;"></div>
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

    ${rsBuildAddSectionCard()}
    ${rsBuildListCard()}

    <div class="rs-footer">
      <button class="btn btn-ghost" onclick="navigateTo('tenant-projects')">取消</button>
      <button class="btn btn-primary" onclick="rsSaveConfig()">保存配置</button>
    </div>
  `;
}

window.renderReportSettings = renderReportSettings;

/* ========================================
   增加问题卡片
   ======================================== */
function rsBuildAddSectionCard() {
  return '<div class="rs-card">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
      '<div class="rs-card-title" style="margin-bottom:0;">增加在报表中的问题</div>' +
      '<button class="btn btn-secondary btn-sm" onclick="csOpenTuociModal()">拓词工具</button>' +
    '</div>' +
    rsBuildAddSectionInner() +
    '</div>';
}

/* ----- 增加问题区（内部内容，不含卡片壳） ----- */
function rsBuildAddSectionInner() {
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
      <div class="rs-add-grid">
        <div class="rs-add-left">
          <textarea class="rs-textarea" id="rsQuestionInput" placeholder="请输入问题，每行1个，所属分类可用；隔开，如：&#10;香薰机生产厂家口碑推荐；香薰机生产厂家&#10;露营灯厂家有哪些；露营灯供应商"></textarea>
          <div class="rs-placeholder">每行一个，所属分类用中文分号"；"隔开</div>
          <div class="rs-category-row">
            <div class="rs-category-header">
              <span class="rs-form-label" style="margin-bottom:0">所属分类：</span>
              <span class="rs-link" onclick="csOpenCatManageModal()">+ 管理分类</span>
            </div>
            <div class="rs-checkbox-group" id="rsCategoryList" style="gap:8px">
              ${categoryHtml}
            </div>
          </div>
          <div class="rs-add-btn-row">
            <button class="btn btn-primary" onclick="rsBulkAdd()">批量添加</button>
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

/* ----- 问题列表卡片 ----- */
function rsBuildListCard() {
  return '<div class="rs-card" id="rsQuestionListCard">' +
    '<div class="rs-card-title">已添加问题列表</div>' +
    rsBuildListSectionInner() +
    '</div>';
}

/* ----- 问题列表（内部内容） ----- */
function rsBuildListSectionInner() {
  var filtered = rsGetFilteredQuestions();
  var totalItems = filtered.length;
  var totalPages = Math.max(1, Math.ceil(totalItems / RS_PAGE_SIZE));
  if (RS_PAGE > totalPages) RS_PAGE = totalPages;
  var startIdx = (RS_PAGE - 1) * RS_PAGE_SIZE;
  var displayRows = filtered.slice(startIdx, startIdx + RS_PAGE_SIZE);

  var questionRows = displayRows.map(function(q, i) {
    var globalIdx = startIdx + i + 1;
    var catName = q.categoryId ? (function(cid) {
      var cat = RS_CATEGORIES.find(function(c) { return c.id === cid; });
      return cat ? cat.name : null;
    })(q.categoryId) : null;

    var catHtml = '';
    if (q._editingCat) {
      /* 编辑状态：显示 select 下拉 */
      var catOptionsHtml = RS_CATEGORIES.map(function(c) {
        return '<option value="' + c.id + '"' + (q.categoryId === c.id ? ' selected' : '') + '>' + c.name + '</option>';
      }).join('');
      catHtml = '<select style="min-width:100px;padding:3px 6px;font-size:11px;border:1px solid var(--color-border);border-radius:3px;outline:none;background:#F4F9FF;" onchange="rsSetQuestionCategory(' + q.id + ', this.value)" onblur="rsRenderTableOnly()">' +
        '<option value="">未分类</option>' + catOptionsHtml + '</select>';
    } else {
      if (catName) {
        catHtml = '<span class="rs-cat-badge" onclick="event.stopPropagation(); rsStartEditCategory(' + q.id + ')" title="点击修改分类">' + catName + '</span>';
      } else {
        catHtml = '<span class="rs-cat-badge uncategorized" onclick="event.stopPropagation(); rsStartEditCategory(' + q.id + ')" title="点击设置分类">未分类</span>';
      }
    }

    var isChecked = RS_SELECTED_QUESTION_IDS.indexOf(q.id) !== -1;

    return (
      '<tr>' +
        '<td style="width:40px"><input type="checkbox" ' + (isChecked ? 'checked' : '') + ' onchange="rsToggleQuestionSelect(' + q.id + ')"></td>' +
        '<td style="width:50px">' + globalIdx + '</td>' +
        '<td>' + q.content + '</td>' +
        '<td style="width:100px;white-space:nowrap">' + q.platform + '</td>' +
        '<td style="width:80px;white-space:nowrap">' + q.device + '</td>' +
        '<td style="width:80px;white-space:nowrap">' + q.source + '</td>' +
        '<td style="width:180px">' + catHtml + '</td>' +
        '<td style="width:60px">' +
          '<button class="btn btn-ghost btn-sm text-danger" onclick="rsDeleteQuestion(' + q.id + ')">删除</button>' +
        '</td>' +
      '</tr>'
    );
  }).join('');

  /* 批量操作栏 */
  var batchBar = RS_SELECTED_QUESTION_IDS.length > 0 ? (
    '<div class="rs-batch-bar">' +
      '<span>已选 <span class="rs-batch-count">' + RS_SELECTED_QUESTION_IDS.length + '</span> 项</span>' +
      '<button class="btn btn-ghost btn-sm" id="rsBatchCatToggleBtn" onclick="rsToggleBatchCatArea()">批量修改分类</button>' +
      '<button class="btn btn-ghost btn-sm text-danger" onclick="rsBatchDelete()">批量删除</button>' +
      '<button class="btn btn-ghost btn-sm" onclick="rsClearSelection()">取消选择</button>' +
    '</div>' +
    '<div id="rsBatchCatArea" style="display:none;align-items:center;gap:8px;padding:8px 12px;margin-bottom:8px;background:var(--color-primary-bg);border:1px solid var(--color-primary);border-radius:var(--radius-sm);font-size:13px;">' +
      '<span style="font-size:12px;color:var(--color-text-secondary)">设置分类：</span>' +
      '<select id="rsBatchCatSelect" style="padding:4px 8px;border:1px solid var(--color-border);border-radius:var(--radius-sm);font-size:13px;background:#F4F9FF;outline:none;">' +
        '<option value="">选择分类</option>' +
        RS_CATEGORIES.map(function(c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('') +
      '</select>' +
      '<button class="btn btn-primary btn-sm" onclick="rsConfirmBatchCat()">确认</button>' +
      '<button class="btn btn-ghost btn-sm" onclick="rsCancelBatchCat()">取消</button>' +
    '</div>'
  ) : '';

  /* 分页 */
  var paginationHtml = '';
  if (totalItems > RS_PAGE_SIZE) {
    var pageButtons = '';
    if (totalPages <= 7) {
      for (var p = 1; p <= totalPages; p++) {
        pageButtons += '<button class="pagination-btn' + (p === RS_PAGE ? ' active' : '') + '" onclick="rsGoToPage(' + p + ')">' + p + '</button>';
      }
    } else {
      pageButtons += '<button class="pagination-btn' + (1 === RS_PAGE ? ' active' : '') + '" onclick="rsGoToPage(1)">1</button>';
      if (RS_PAGE > 3) pageButtons += '<span style="padding:0 6px;color:var(--color-text-tertiary)">...</span>';
      var startP = Math.max(2, RS_PAGE - 1);
      var endP = Math.min(totalPages - 1, RS_PAGE + 1);
      for (var p2 = startP; p2 <= endP; p2++) {
        pageButtons += '<button class="pagination-btn' + (p2 === RS_PAGE ? ' active' : '') + '" onclick="rsGoToPage(' + p2 + ')">' + p2 + '</button>';
      }
      if (RS_PAGE < totalPages - 2) pageButtons += '<span style="padding:0 6px;color:var(--color-text-tertiary)">...</span>';
      pageButtons += '<button class="pagination-btn' + (totalPages === RS_PAGE ? ' active' : '') + '" onclick="rsGoToPage(' + totalPages + ')">' + totalPages + '</button>';
    }
    paginationHtml =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">' +
        '<div class="rs-list-summary">共 <strong>' + totalItems + '</strong> 个问题' +
          '<span class="danger" style="margin-left:12px" onclick="rsDeleteAllQuestions()">全部删除</span></div>' +
        '<div class="pagination" style="margin-top:0">' +
          '<div class="pagination-info">第 ' + RS_PAGE + ' 页，共 ' + totalItems + ' 条</div>' +
          '<div class="pagination-pages">' +
            '<button class="pagination-btn' + (RS_PAGE === 1 ? ' disabled' : '') + '" onclick="rsGoToPage(' + (RS_PAGE - 1) + ')" ' + (RS_PAGE === 1 ? 'disabled' : '') + '>‹</button>' +
            pageButtons +
            '<button class="pagination-btn' + (RS_PAGE === totalPages ? ' disabled' : '') + '" onclick="rsGoToPage(' + (RS_PAGE + 1) + ')" ' + (RS_PAGE === totalPages ? 'disabled' : '') + '>›</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  } else {
    paginationHtml =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">' +
        '<div class="rs-list-summary">共 <strong>' + totalItems + '</strong> 个问题' +
          '<span class="danger" style="margin-left:12px" onclick="rsDeleteAllQuestions()">全部删除</span></div>' +
      '</div>';
  }

  return (
    '<div class="rs-list-section">' +
      '<div class="rs-list-toolbar">' +
        '<div class="rs-list-toolbar-left">' +
          '<input type="text" placeholder="搜索问题..." id="rsSearchInput" onkeyup="if(event.key===\'Enter\') rsSearchQuestions()" value="' + rsGetSearchValue() + '">' +
          '<select id="rsFilterPlatform" onchange="rsFilterChanged()">' +
            '<option value="">全部平台</option>' +
            RS_PLATFORMS.map(function(p) { return '<option ' + (rsGetFilterValue('platform') === p.name ? 'selected' : '') + '>' + p.name + '</option>'; }).join('') +
          '</select>' +
          '<select id="rsFilterDevice" onchange="rsFilterChanged()">' +
            '<option value="">全部设备</option>' +
            '<option ' + (rsGetFilterValue('device') === '电脑端' ? 'selected' : '') + '>电脑端</option>' +
            '<option ' + (rsGetFilterValue('device') === '移动端' ? 'selected' : '') + '>移动端</option>' +
          '</select>' +
          '<select id="rsFilterSource" onchange="rsFilterChanged()">' +
            '<option value="">全部来源</option>' +
            '<option ' + (rsGetFilterValue('source') === '采集' ? 'selected' : '') + '>采集</option>' +
            '<option ' + (rsGetFilterValue('source') === '后台' ? 'selected' : '') + '>后台</option>' +
          '</select>' +
          '<button class="btn btn-primary btn-sm" onclick="rsSearchQuestions()">搜索</button>' +
          '<button class="btn btn-ghost btn-sm" onclick="rsClearFilters()">清空</button>' +
        '</div>' +
      '</div>' +
      batchBar +
      '<div class="table-container">' +
        '<table class="data-table">' +
          '<thead>' +
            '<tr>' +
              '<th style="width:40px"><input type="checkbox" onchange="rsToggleAllQuestions(this)"></th>' +
              '<th style="width:50px">序号</th>' +
              '<th>问题</th>' +
              '<th style="width:100px">平台</th>' +
              '<th style="width:80px">设备</th>' +
              '<th style="width:80px">来源</th>' +
              '<th style="width:200px">分类</th>' +
              '<th style="width:60px">操作</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody id="rsQuestionTableBody">' +
            (questionRows || '<tr><td colspan="8" style="text-align:center;color:var(--color-text-tertiary);padding:24px">暂无数据</td></tr>') +
          '</tbody>' +
        '</table>' +
      '</div>' +
      paginationHtml +
    '</div>'
  );
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

/* 批量添加：解析"问题；分类"格式 */
function rsBulkAdd() {
  const input = document.getElementById('rsQuestionInput');
  const text = (input.value || '').trim();
  if (!text) { rsShowToast('请输入问题内容'); return; }

  const lines = text.split('\n').filter(line => line.trim());
  const newProblems = [];
  const newCategories = new Set();

  lines.forEach(line => {
    const parts = line.split('；');
    const question = parts[0].trim();
    const category = parts[1] ? parts[1].trim() : '';

    if (question) {
      newProblems.push({
        content: question,
        categoryName: category,
        platform: RS_SELECTED_PLATFORMS.length
          ? RS_PLATFORMS.find(p => p.id === RS_SELECTED_PLATFORMS[0]).name
          : '百度文心',
        device: RS_SELECTED_DEVICES.length
          ? RS_DEVICES.find(d => d.id === RS_SELECTED_DEVICES[0]).name
          : '移动端',
        source: '后台'
      });

      if (category && !RS_CATEGORIES.some(c => c.name === category)) {
        newCategories.add(category);
      }
    }
  });

  if (!newProblems.length) { rsShowToast('未找到有效的问题'); return; }

  /* 添加新分类 */
  if (newCategories.size > 0) {
    let maxId = RS_CATEGORIES.length ? Math.max(...RS_CATEGORIES.map(c => parseInt(c.id.replace('c', '')) || 0)) : 0;
    newCategories.forEach(catName => {
      RS_CATEGORIES.push({ id: 'c' + (++maxId), name: catName });
    });
    const container = document.getElementById('rsCategoryList');
    if (container) container.innerHTML = rsBuildCategoryCheckboxes();
  }

  /* 添加到问题列表，匹配分类ID */
  let qMaxId = RS_QUESTIONS.length ? Math.max(...RS_QUESTIONS.map(q => q.id)) : 0;
  newProblems.forEach(p => {
    var catId = p.categoryName
      ? (RS_CATEGORIES.find(c => c.name === p.categoryName) || {}).id || null
      : null;
    RS_QUESTIONS.unshift({
      id: ++qMaxId,
      content: p.content,
      platform: p.platform,
      device: p.device,
      source: p.source,
      categoryId: catId || null
    });
  });

  input.value = '';
  RS_SELECTED_CATEGORIES = [];
  RS_SELECTED_PLATFORMS = [];
  RS_SELECTED_DEVICES = [];
  navigateTo('tenant-report-settings');
  setTimeout(() => rsShowToast('已添加 ' + newProblems.length + ' 个问题'), 50);
}

/* ========================================
   交互：问题列表
   ======================================== */
function rsGetFilteredQuestions() {
  let result = RS_QUESTIONS;

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
  RS_PAGE = 1;
  rsRenderTableOnly();
}

function rsClearFilters() {
  var searchEl = document.getElementById('rsSearchInput');
  if (searchEl) searchEl.value = '';
  var pEl = document.getElementById('rsFilterPlatform');
  if (pEl) pEl.value = '';
  var dEl = document.getElementById('rsFilterDevice');
  if (dEl) dEl.value = '';
  var sEl = document.getElementById('rsFilterSource');
  if (sEl) sEl.value = '';
  RS_PAGE = 1;
  rsRenderTableOnly();
}

function rsFilterChanged() {
  RS_PAGE = 1;
  rsRenderTableOnly();
}

function rsGoToPage(page) {
  RS_PAGE = page;
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

/* ----- 单分类编辑：点击badge → 内联select ----- */
function rsStartEditCategory(questionId) {
  var q = RS_QUESTIONS.find(function(x) { return x.id === questionId; });
  if (!q) return;
  /* 先关闭其他可能正在编辑的 */
  RS_QUESTIONS.forEach(function(x) { x._editingCat = false; });
  q._editingCat = true;
  rsRenderTableOnly();
}

function rsSetQuestionCategory(questionId, catId) {
  var q = RS_QUESTIONS.find(function(x) { return x.id === questionId; });
  if (!q) return;
  q._editingCat = false;
  q.categoryId = catId || null;
  rsRenderTableOnly();
  var catName = catId
    ? (RS_CATEGORIES.find(function(c) { return c.id === catId; }) || {}).name || ''
    : '';
  rsShowToast(catName ? '分类已更新为「' + catName + '」' : '已清除分类');
}

/* ----- 局部刷新（不整页跳转） ----- */
function rsRenderTableOnly() {
  var card = document.getElementById('rsQuestionListCard');
  if (!card) { navigateTo('tenant-report-settings'); return; }

  card.outerHTML = rsBuildListCard();
}

/* ========================================
   内联：批量修改分类（与采集设置一致）
   ======================================== */
function rsToggleBatchCatArea() {
  var batchArea = document.getElementById('rsBatchCatArea');
  if (batchArea.style.display === 'none' || batchArea.style.display === '') {
    batchArea.style.display = 'flex';
    // 刷新分类下拉
    var select = document.getElementById('rsBatchCatSelect');
    if (select) {
      select.innerHTML = '<option value="">选择分类</option>' +
        RS_CATEGORIES.map(function(c) { return '<option value="' + c.id + '">' + c.name + '</option>'; }).join('');
    }
  } else {
    batchArea.style.display = 'none';
  }
}

function rsConfirmBatchCat() {
  var select = document.getElementById('rsBatchCatSelect');
  var catId = select ? select.value : '';
  if (!catId) {
    rsShowToast('请选择要设置的分类');
    return;
  }
  var catName = '';
  var cat = RS_CATEGORIES.find(function(c) { return c.id === catId; });
  if (cat) catName = cat.name;
  var count = RS_SELECTED_QUESTION_IDS.length;
  RS_SELECTED_QUESTION_IDS.forEach(function(qid) {
    var q = RS_QUESTIONS.find(function(x) { return x.id === qid; });
    if (q) q.categoryId = catId || null;
  });
  document.getElementById('rsBatchCatArea').style.display = 'none';
  RS_SELECTED_QUESTION_IDS = [];
  navigateTo('tenant-report-settings');
  setTimeout(function() { rsShowToast('已将 ' + count + ' 个问题的分类修改为「' + catName + '」'); }, 50);
}

function rsCancelBatchCat() {
  document.getElementById('rsBatchCatArea').style.display = 'none';
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
    + '东莞香薰加湿器厂家哪家专业,香薰机厂家,百度文心,移动端\n'
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
    /* 匹配分类名 -> categoryId（单分类，取第一个匹配） */
    var matchedCat = r.category
      ? r.category.split(/[,，]/).map(function(s) { return s.trim(); }).filter(Boolean).reduce(function(found, name) {
          if (found) return found;
          var cat = RS_CATEGORIES.find(function(c) { return c.name === name; });
          return cat ? cat.id : null;
        }, null)
      : null;

    RS_QUESTIONS.unshift({
      id: ++maxId,
      content: r.content,
      platform: r.platform || '百度文心',
      device: r.device || '移动端',
      source: '导入',
      categoryId: matchedCat
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
   报表背景设置交互
   ======================================== */
function rsOnBgModeChange(el) {
  var pickers = document.getElementById('rsCustomColorPickers');
  var preview = document.getElementById('rsBgPreview');
  if (el.value === 'custom') {
    if (pickers) { pickers.style.display = 'flex'; }
    rsUpdateGradientPreview();
  } else {
    if (pickers) { pickers.style.display = 'none'; }
    if (preview) { preview.style.background = '#dae0f0'; }
  }
}

function rsUpdateGradientPreview() {
  var start = document.getElementById('rsGradientStart');
  var end = document.getElementById('rsGradientEnd');
  var preview = document.getElementById('rsBgPreview');
  if (start && end && preview) {
    preview.style.background = 'linear-gradient(to right, ' + start.value + ', ' + end.value + ')';
  }
}
