/**
 * 租户端 - 采集设置页面
 * 从 report-settings-v2.html 提取的采集设置功能
 */

/* ========================================
   采集设置页面样式
   ======================================== */
(function injectCollectionSettingsStyles() {
  if (document.getElementById('collection-settings-styles')) return;
  const style = document.createElement('style');
  style.id = 'collection-settings-styles';
  style.textContent = `
    .cs-page-header { margin-bottom: 16px; }
    .cs-page-title { font-size: 20px; font-weight: 600; margin-bottom: 4px; color: var(--color-text-primary); }
    .cs-page-subtitle { font-size: 13px; color: var(--color-text-tertiary); }
    
    .cs-card { background: var(--color-bg-card); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 12px; border: 1px solid var(--color-border); }
    .cs-card-title { font-size: 15px; font-weight: 600; margin-bottom: 16px; color: var(--color-text-primary); }
    
    .cs-order-info-row { display: flex; align-items: center; gap: 24px; line-height: 1; flex-wrap: wrap; }
    .cs-order-info-row + .cs-order-info-row { margin-top: 8px; }
    .cs-order-info-field { display: flex; align-items: baseline; gap: 6px; }
    .cs-order-info-field .label { font-size: 12px; color: var(--color-text-tertiary); white-space: nowrap; }
    .cs-order-info-field .value { font-size: 12px; color: var(--color-text-primary); }
    .cs-order-info-field .value.bold { font-size: 14px; font-weight: 600; }
    .cs-order-info-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .cs-order-info-tag { display: inline-flex; align-items: center; gap: 4px; background: var(--color-primary-bg); border-radius: var(--radius-sm); padding: 2px 8px; font-size: 11px; color: var(--color-text-secondary); }
    .cs-order-info-tag.type-keyword { background: #eef6ff; color: #3498db; }
    .cs-order-info-tag.type-brand { background: #fef2f2; color: #e74c3c; }
    
    .cs-add-section { display: flex; gap: 16px; }
    .cs-add-section-left { flex: 1; }
    .cs-add-section-right { width: 220px; flex-shrink: 0; }
    
    .cs-textarea-box { width: 100%; min-height: 140px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 10px 12px; font-size: 13px; line-height: 1.6; resize: vertical; outline: none; font-family: inherit; background: #F4F9FF; color: var(--color-text-primary); transition: border-color 0.2s; }
    .cs-textarea-box:focus { border-color: var(--color-primary); }
    
    .cs-section-label { font-size: 13px; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 8px; }
    .cs-check-grid { display: flex; flex-wrap: wrap; gap: 12px; }
    .cs-check-item { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; color: var(--color-text-secondary); }
    .cs-check-item input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--color-primary); cursor: pointer; }
    
    .cs-toggle-switch { position: relative; width: 36px; height: 20px; display: inline-block; }
    .cs-toggle-switch input { opacity: 0; width: 0; height: 0; }
    .cs-toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: var(--color-border); transition: 0.2s; border-radius: 20px; }
    .cs-toggle-slider:before { position: absolute; content: ''; height: 16px; width: 16px; left: 2px; bottom: 2px; background: white; transition: 0.2s; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
    .cs-toggle-switch input:checked + .cs-toggle-slider { background: var(--color-primary); }
    .cs-toggle-switch input:checked + .cs-toggle-slider:before { transform: translateX(16px); }
    
    .cs-platform-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .cs-platform-table th { text-align: left; padding: 10px 12px; color: var(--color-text-tertiary); font-weight: 400; border-bottom: 1px solid var(--color-border); font-size: 12px; }
    .cs-platform-table td { padding: 10px 12px; border-bottom: 1px solid var(--color-border-light); color: var(--color-text-primary); }
    .cs-platform-table tr:hover { background: var(--color-bg-hover); }
    
    .cs-num-input { width: 60px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 5px 8px; font-size: 13px; text-align: center; outline: none; background: #F4F9FF; }
    .cs-num-input:focus { border-color: var(--color-primary); }
    
    .cs-filter-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .cs-filter-select { position: relative; display: inline-block; }
    .cs-filter-select-btn { display: flex; align-items: center; gap: 6px; padding: 0 12px; height: 36px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 13px; background: #F4F9FF; cursor: pointer; color: var(--color-text-secondary); min-width: 120px; transition: all 0.15s; }
    .cs-filter-select-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .cs-filter-select-btn .arrow { margin-left: auto; font-size: 10px; color: var(--color-text-tertiary); }
    .cs-filter-dropdown { position: absolute; top: calc(100% + 4px); left: 0; z-index: 200; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); padding: 6px; min-width: 160px; animation: fadeIn 0.15s ease; display: none; }
    .cs-filter-dropdown.show { display: block; }
    .cs-filter-dropdown-item { display: flex; align-items: center; padding: 8px 12px; border-radius: var(--radius-md); cursor: pointer; transition: all 0.15s ease; font-size: 13px; color: var(--color-text-primary); }
    .cs-filter-dropdown-item:hover { background: var(--color-border-light); }
    .cs-filter-dropdown-item.active { background: var(--color-primary-bg); color: var(--color-primary); }
    .cs-filter-input { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0 10px; height: 36px; font-size: 13px; outline: none; width: 200px; background: #F4F9FF; color: var(--color-text-primary); }
    .cs-filter-input:focus { border-color: var(--color-primary); }
    
    /* 拓词工具弹窗按钮 - 右上角定位 */
    .cs-tuoci-btn-fixed { position: absolute; top: 0; right: 0; z-index: 10; }
    
    /* 统一按钮高度为 36px */
    .cs-card .btn-sm { height: 36px; padding: 0 16px; display: inline-flex; align-items: center; gap: 6px; }
    .cs-card .btn { height: 36px; padding: 0 20px; display: inline-flex; align-items: center; gap: 6px; }
    
    /* 底部操作条按钮高度一致 */
    .cs-sticky-save-bar .btn { height: 36px; min-width: 100px; }
    
    /* 删除确认气泡框 */
    .cs-delete-popover { position: absolute; z-index: 300; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); padding: 16px; min-width: 200px; animation: fadeIn 0.15s ease; }
    .cs-delete-popover::before { content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background: var(--color-bg-card); border-left: 1px solid var(--color-border); border-top: 1px solid var(--color-border); }
    .cs-delete-popover-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 8px; }
    .cs-delete-popover-content { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px; }
    .cs-delete-popover-actions { display: flex; justify-content: flex-end; gap: 8px; }
    
    .cs-sticky-save-bar { position: fixed; bottom: 0; left: 260px; right: 0; background: var(--color-bg-card); border-top: 1px solid var(--color-border); padding: 12px 32px; display: flex; align-items: center; justify-content: flex-end; gap: 12px; z-index: 100; box-shadow: 0 -2px 8px rgba(0,0,0,0.05); }
    
    /* 拓词工具弹窗 */
    .cs-tuoci-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.2s ease; }
    .cs-tuoci-overlay.show { opacity: 1; pointer-events: auto; }
    .cs-tuoci-modal { background: var(--color-bg-card); border-radius: var(--radius-lg); width: 900px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: scale(0.95); opacity: 0; transition: transform 0.2s ease-out, opacity 0.2s ease-out; display: flex; flex-direction: column; }
    .cs-tuoci-overlay.show .cs-tuoci-modal { transform: scale(1); opacity: 1; }
    .cs-tuoci-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--color-border); }
    .cs-tuoci-title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); }
    .cs-tuoci-close { background: none; border: none; font-size: 18px; color: var(--color-text-tertiary); cursor: pointer; padding: 4px; }
    .cs-tuoci-close:hover { color: var(--color-text-primary); }
    .cs-tuoci-body { padding: 20px; overflow-y: auto; }
    .cs-tuoci-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-top: 1px solid var(--color-border); background: var(--color-bg-hover); }
    
    .cs-template-label { font-size: 12px; color: var(--color-text-tertiary); margin-bottom: 10px; }
    .cs-template-label .brand { color: var(--color-primary); font-weight: 500; }
    .cs-template-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
    .cs-template-tag { padding: 4px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-text-secondary); cursor: pointer; background: var(--color-bg-card); transition: all 0.15s; }
    .cs-template-tag:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-bg); }
    .cs-template-tag.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
    
    .cs-tuoci-zones { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 16px; }
    .cs-tuoci-zone { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
    .cs-tuoci-zone-hd { display: flex; align-items: center; gap: 6px; padding: 8px 10px; background: var(--color-bg-hover); border-bottom: 1px solid var(--color-border); font-size: 12px; font-weight: 500; color: var(--color-text-primary); }
    .cs-zone-badge { width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #fff; }
    .cs-zone-a { background: #9b59b6; }
    .cs-zone-b { background: #3498db; }
    .cs-zone-c { background: var(--color-primary); }
    .cs-zone-d { background: #e67e22; }
    .cs-zone-e { background: #27ae60; }
    .cs-zone-f { background: #e74c3c; }
    .cs-tuoci-zone textarea { width: 100%; min-height: 120px; border: none; padding: 8px 10px; font-size: 12px; line-height: 1.6; resize: vertical; outline: none; font-family: inherit; color: var(--color-text-primary); background: var(--color-bg-card); }
    .cs-tuoci-zone textarea::placeholder { color: var(--color-text-disabled); }
    
    .cs-combo-section { margin-bottom: 16px; }
    .cs-combo-label { font-size: 13px; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 8px; }
    .cs-combo-label .hint { font-size: 11px; color: var(--color-text-tertiary); font-weight: 400; margin-left: 6px; }
    .cs-combo-grid { display: flex; flex-wrap: wrap; gap: 8px 20px; }
    .cs-combo-item { display: flex; align-items: center; gap: 5px; font-size: 12px; cursor: pointer; user-select: none; color: var(--color-text-secondary); }
    .cs-combo-item input { width: 14px; height: 14px; accent-color: var(--color-primary); cursor: pointer; }
    
    .cs-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .cs-result-count { font-size: 13px; color: var(--color-text-secondary); }
    .cs-result-tools { display: flex; gap: 8px; }
    .cs-result-table { width: 100%; border-collapse: collapse; font-size: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
    .cs-result-table th { background: var(--color-bg-hover); padding: 8px 10px; text-align: left; font-weight: 500; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); }
    .cs-result-table td { padding: 8px 10px; border-bottom: 1px solid var(--color-border-light); color: var(--color-text-secondary); }
    .cs-result-table tr:hover { background: var(--color-bg-hover); }
    .cs-result-empty { text-align: center; padding: 32px 0; color: var(--color-text-disabled); font-size: 13px; }
    
    .cs-tuoci-filter-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
    .cs-tuoci-filter-bar .filter-select { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 5px 10px; font-size: 12px; outline: none; background: var(--color-bg-card); cursor: pointer; color: var(--color-text-secondary); min-width: 100px; }
    .cs-tuoci-filter-bar .filter-input { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 5px 10px; font-size: 12px; outline: none; width: 160px; transition: border-color 0.2s; background: var(--color-bg-card); color: var(--color-text-primary); }
    .cs-tuoci-filter-bar .filter-input:focus { border-color: var(--color-primary); }
    
    /* 管理分类弹窗 */
    .cs-cat-manage-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.2s ease; }
    .cs-cat-manage-overlay.show { opacity: 1; pointer-events: auto; }
    .cs-cat-manage-modal { background: var(--color-bg-card); border-radius: var(--radius-lg); width: 420px; max-height: 80vh; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: scale(0.95); opacity: 0; transition: transform 0.2s ease-out, opacity 0.2s ease-out; display: flex; flex-direction: column; overflow: hidden; }
    .cs-cat-manage-overlay.show .cs-cat-manage-modal { transform: scale(1); opacity: 1; }
    .cs-cat-manage-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--color-border); }
    .cs-cat-manage-title { font-size: 15px; font-weight: 600; color: var(--color-text-primary); }
    .cs-cat-manage-close { background: none; border: none; font-size: 18px; color: var(--color-text-tertiary); cursor: pointer; padding: 4px; }
    .cs-cat-manage-close:hover { color: var(--color-text-primary); }
    .cs-cat-manage-body { padding: 20px; overflow-y: auto; flex: 1; }
    .cs-cat-manage-add-row { display: flex; gap: 8px; margin-bottom: 16px; }
    .cs-cat-manage-input { flex: 1; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 8px 12px; font-size: 13px; outline: none; transition: border-color 0.2s; background: var(--color-bg-card); color: var(--color-text-primary); }
    .cs-cat-manage-input:focus { border-color: var(--color-primary); }
    .cs-cat-manage-list { display: flex; flex-direction: column; gap: 6px; }
    .cs-cat-manage-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: var(--radius-md); background: var(--color-bg-hover); font-size: 13px; color: var(--color-text-primary); }
    .cs-cat-manage-item .name { flex: 1; }
    .cs-cat-manage-item .del-btn { background: none; border: none; color: var(--color-text-tertiary); cursor: pointer; font-size: 14px; padding: 2px 6px; border-radius: var(--radius-sm); transition: all 0.15s; }
    .cs-cat-manage-item .del-btn:hover { color: var(--color-danger); background: var(--color-danger-bg); }
    .cs-cat-manage-footer { display: flex; align-items: center; justify-content: flex-end; padding: 12px 20px; border-top: 1px solid var(--color-border); background: var(--color-bg-hover); }
    .cs-cat-manage-empty { text-align: center; padding: 20px 0; color: var(--color-text-disabled); font-size: 13px; }
    
    /* 分页组件 */
    .cs-pagination { display: flex; align-items: center; gap: 4px; font-size: 12px; }
    .cs-pagination button { min-width: 28px; height: 28px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg-card); color: var(--color-text-secondary); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
    .cs-pagination button:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
    .cs-pagination button.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
    .cs-pagination button:disabled { opacity: 0.5; cursor: not-allowed; }
    .cs-pagination span { padding: 0 8px; color: var(--color-text-tertiary); }
    
    /* lucide 图标在 cs 组件内的尺寸 */
    .cs-card .lucide-icon, .cs-sticky-save-bar .lucide-icon { width: 16px; height: 16px; }
    .btn-sm .lucide-icon { width: 14px; height: 14px; }
    .cs-tuoci-footer .lucide-icon, .cs-cat-manage-footer .lucide-icon { width: 14px; height: 14px; }
    a .lucide-icon { width: 14px; height: 14px; }

    /* ===== 拓词工具步骤条 ===== */
    .cs-step-bar { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 16px; padding: 12px 16px; background: var(--color-bg-hover); border-radius: var(--radius-md); }
    .cs-step-item { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 6px 12px; border-radius: var(--radius-sm); transition: background 0.15s; }
    .cs-step-item:hover { background: rgba(37,99,235,0.06); }
    .cs-step-num { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; border: 2px solid var(--color-border); color: var(--color-text-tertiary); background: var(--color-bg-card); transition: all 0.2s; flex-shrink: 0; }
    .cs-step-label { font-size: 13px; color: var(--color-text-tertiary); font-weight: 500; transition: color 0.2s; white-space: nowrap; }
    .cs-step-connector { width: 40px; height: 2px; background: var(--color-border); margin: 0 4px; flex-shrink: 0; border-radius: 1px; transition: background 0.2s; }
    /* 当前步骤 */
    .cs-step-item.active .cs-step-num { background: var(--color-primary); border-color: var(--color-primary); color: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
    .cs-step-item.active .cs-step-label { color: var(--color-primary); font-weight: 600; }
    /* 已完成步骤 */
    .cs-step-item.done .cs-step-num { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
    .cs-step-item.done .cs-step-label { color: var(--color-text-secondary); }
    .cs-step-connector.done { background: var(--color-primary); }
    /* 步骤提示条 */
    .cs-step-tip { display: flex; align-items: flex-start; gap: 6px; padding: 8px 12px; margin-bottom: 14px; background: var(--color-primary-bg); border-radius: var(--radius-sm); font-size: 12px; color: var(--color-text-secondary); line-height: 1.6; }
    .cs-step-tip-icon { flex-shrink: 0; width: 14px; height: 14px; margin-top: 2px; color: var(--color-primary); opacity: 0.7; }
    .cs-step-tip strong { font-weight: 600; color: var(--color-primary); }
    /* 区域高亮 */
    .cs-tuoci-zone.zone-highlight { border-color: var(--color-primary); box-shadow: 0 0 0 2px rgba(37,99,235,0.12); }
    .cs-tuoci-zone.zone.highlight .cs-tuoci-zone-hd { background: var(--color-primary-bg); }
    .cs-tuoci-zone.zone.dimmed { opacity: 0.45; }
  `;
  document.head.appendChild(style);
})();

/* ========================================
   采集设置页面渲染
   ======================================== */
function renderTenantCollectionSettings() {
  return `
    <div class="cs-page-header">
      <div class="cs-page-title">采集设置 - 蓝王科技项目2026年GEO曝光</div>
      <div class="cs-page-subtitle">配置采集参数并开始采集</div>
    </div>

    <!-- 客户订单信息 -->
    <div class="cs-card" style="margin-bottom: 12px;">
      <div class="cs-card-title">客户订单信息</div>
      <div class="cs-order-info-row">
        <div class="cs-order-info-field"><span class="label">项目名称</span><span class="value bold">蓝王科技项目2026年GEO曝光</span></div>
        <div class="cs-order-info-field"><span class="label">项目ID</span><span class="value">6d1be45a-8a26-4a7c-8b4d-...</span></div>
        <div class="cs-order-info-field"><span class="label">产品名称</span><span class="value">GEO企业基础曝光套餐5关键词+2品牌词</span></div>
        <div class="cs-order-info-field"><span class="label">服务时间</span><span class="value">2026-06-24 ~ 2026-07-24</span></div>
      </div>
      <div class="cs-order-info-row">
        <div class="cs-order-info-field"><span class="label">主关键词</span>
          <div class="cs-order-info-tags">
            <span class="cs-order-info-tag type-keyword">香薰机</span>
            <span class="cs-order-info-tag type-keyword">露营灯</span>
            <span class="cs-order-info-tag type-keyword">户外风扇</span>
            <span class="cs-order-info-tag type-keyword">加湿器</span>
          </div>
        </div>
        <div class="cs-order-info-field"><span class="label">品牌关键词</span>
          <div class="cs-order-info-tags">
            <span class="cs-order-info-tag type-brand">蓝王科技</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 需要采集的问题批量添加 + 需要命中的关键词 左右布局 -->
    <div style="margin-bottom: 12px;">
      <div class="cs-add-section" style="display: grid; grid-template-columns: 1fr 220px; gap: 16px; position: relative;">
        <!-- 左侧：需要采集的问题批量添加 -->
        <div class="cs-card" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; position: relative;">
            <div class="cs-card-title" style="margin-bottom: 0;">需要采集的问题批量添加</div>
            <!-- 拓词工具按钮 - 右上角 -->
            <button class="btn btn-secondary btn-sm cs-tuoci-btn-fixed" onclick="csOpenTuociModal()">
              ${ICON_MAP['search']}
              拓词工具
            </button>
          </div>
          <div class="cs-add-section-left">
            <textarea class="cs-textarea-box" placeholder="请输入问题，每行1个，所属分类可用；隔开，如：&#10;香薰机生产厂家口碑推荐；香薰机生产厂家&#10;露营灯厂家有哪些；露营灯供应商"></textarea>
            <div style="margin-top: 12px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span class="cs-section-label">所属分类</span>
                <a style="display: inline-flex; align-items: center; gap: 4px; color: var(--color-primary); font-size: 12px; cursor: pointer;" onclick="csOpenCatManageModal()">
                  ${ICON_MAP['settings']}
                  管理分类
                </a>
              </div>
              <div class="cs-check-grid" id="csBatchCategoryChecks">
                <!-- 动态渲染分类 -->
              </div>
            </div>
            <div style="margin-top: 16px;">
              <button class="btn btn-primary" onclick="csBatchAddProblems()">
                ${ICON_MAP['plus']}
                批量添加
              </button>
            </div>
          </div>
        </div>
        <!-- 右侧：需要命中的关键词 -->
        <div class="cs-card" style="margin-bottom: 0; display: flex; flex-direction: column;">
          <div class="cs-card-title">需要命中的关键词</div>
          <textarea class="cs-textarea-box" style="min-height: auto; flex: 1; background: #F4F9FF;" placeholder="输入关键词，用逗号分隔">蓝王科技</textarea>
        </div>
      </div>
    </div>

    <!-- 问题列表 -->
    <div class="cs-card" style="margin-bottom: 12px;">
      <div class="cs-card-title">问题列表</div>
      <div class="cs-filter-bar">
        <div class="cs-filter-select" id="csProblemFilterCategoryWrapper">
          <button class="cs-filter-select-btn" onclick="csToggleDropdown('csProblemFilterCategoryDropdown')">
            <span id="csProblemFilterCategoryText">全部分类</span>
            <span class="arrow">▼</span>
          </button>
          <div class="cs-filter-dropdown" id="csProblemFilterCategoryDropdown">
            <div class="cs-filter-dropdown-item active" onclick="csSelectCategory('')">全部分类</div>
          </div>
        </div>
        <input class="cs-filter-input" type="text" placeholder="搜索问题" id="csProblemSearchInput" />
        <button class="btn btn-primary btn-sm" onclick="csFilterProblems()">
          ${ICON_MAP['search']}
          搜索
        </button>
        <button class="btn btn-secondary btn-sm" onclick="csClearProblemFilter()">清空</button>
        <div style="margin-left:auto;display:flex;gap:8px;align-items:center;">
          <div id="csProblemBatchCatArea" style="display:none;align-items:center;gap:8px;">
            <div class="cs-filter-select" id="csProblemBatchCatSelectWrapper">
              <button class="cs-filter-select-btn" onclick="csToggleDropdown('csProblemBatchCatSelectDropdown')">
                <span id="csProblemBatchCatSelectText">选择分类</span>
                <span class="arrow">▼</span>
              </button>
              <div class="cs-filter-dropdown" id="csProblemBatchCatSelectDropdown">
                <div class="cs-filter-dropdown-item active" onclick="csSelectBatchCategory('')">选择分类</div>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="csConfirmProblemBatchCategorize()">确认</button>
            <button class="btn btn-ghost btn-sm" onclick="csCancelProblemBatchCategorize()">取消</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="csProblemBatchCatToggleBtn" onclick="csToggleProblemBatchCatArea()">批量修改分类</button>
        </div>
      </div>
      <div style="overflow-x: auto;">
        <table class="data-table" id="csProblemTable">
          <thead>
            <tr>
              <th style="width: 40px;"><input type="checkbox" id="csProblemSelectAllCb" onchange="csToggleSelectAllProblems(this)" /></th>
              <th style="width: 50px;">序号</th>
              <th>问题</th>
              <th style="width: 140px;">所属分类</th>
              <th style="width: 110px;">添加时间</th>
              <th style="width: 60px;">操作</th>
            </tr>
          </thead>
          <tbody id="csProblemTableBody">
            <tr>
              <td colspan="6" style="text-align: center; padding: 32px; color: var(--color-text-tertiary);">暂无数据，请在上方添加问题</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border-light);">
        <div style="font-size: 13px; color: var(--color-text-secondary);">
          已添加 <strong id="csProblemTotalCount">0</strong> 个问题
          <a style="color: var(--color-danger); margin-left: 12px; cursor: pointer;" onclick="csDeleteAllProblems()">全部删除</a>
        </div>
        <div class="cs-pagination" id="csProblemPagination"></div>
      </div>
    </div>

    <!-- 采集方式与执行周期 -->
    <div class="cs-card" style="margin-bottom: 12px;">
      <div class="cs-card-title">采集方式与执行周期</div>
      <div style="display: flex; align-items: center; gap: 40px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--color-text-tertiary); min-width: 80px;">采集方式</span>
          <div class="cs-filter-select" id="csCollectionMethodWrapper">
            <button class="cs-filter-select-btn" onclick="csToggleDropdown('csCollectionMethodDropdown')">
              <span id="csCollectionMethodText">官方大模型API</span>
              <span class="arrow">▼</span>
            </button>
            <div class="cs-filter-dropdown" id="csCollectionMethodDropdown">
              <div class="cs-filter-dropdown-item active" data-value="official" onclick="csSelectCollectionMethod('official', '官方大模型API')">官方大模型API</div>
              <div class="cs-filter-dropdown-item" data-value="chainz" onclick="csSelectCollectionMethod('chainz', 'CHIANZ开放平台')">CHIANZ开放平台</div>
              <div class="cs-filter-dropdown-item" data-value="geo" onclick="csSelectCollectionMethod('geo', 'GEO采集资源')">GEO采集资源</div>
            </div>
          </div>
          <span style="display: inline-flex; align-items: center; gap: 4px; background: #ebf5fb; color: #3498db; border-radius: var(--radius-sm); padding: 2px 8px; font-size: 12px;">固定计费模式</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 13px; color: var(--color-text-tertiary); min-width: 80px;">执行周期</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="date" style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 6px 10px; font-size: 13px; outline: none; background: #F4F9FF; color: var(--color-text-primary);" value="2026-06-24" />
            <span style="color: var(--color-text-tertiary);">至</span>
            <input type="date" style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 6px 10px; font-size: 13px; outline: none; background: #F4F9FF; color: var(--color-text-primary);" value="2026-07-24" />
          </div>
        </div>
      </div>
      <div style="font-size: 12px; color: var(--color-text-tertiary); margin-top: 8px;">固定计费：在周期内执行到完成为止，确保任务完成</div>
    </div>

    <!-- 平台 & 设备端 & 轮询周期 -->
    <div class="cs-card" style="margin-bottom: 40px;">
      <div class="cs-card-title">平台 & 设备端 & 轮询周期</div>
      <div style="overflow-x: auto;">
        <table class="cs-platform-table">
          <thead>
            <tr>
              <th style="width: 120px;">平台</th>
              <th style="width: 100px;">PC端</th>
              <th style="width: 100px;">移动端</th>
              <th style="width: 120px;">轮询周期(天)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>百度文心</td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><input type="number" class="cs-num-input" value="1" min="0" /></td>
            </tr>
            <tr>
              <td>DeepSeek</td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><input type="number" class="cs-num-input" value="1" min="0" /></td>
            </tr>
            <tr>
              <td>豆包</td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><input type="number" class="cs-num-input" value="1" min="0" /></td>
            </tr>
            <tr>
              <td>Kimi</td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><label class="cs-toggle-switch"><input type="checkbox" checked /><span class="cs-toggle-slider"></span></label></td>
              <td><input type="number" class="cs-num-input" value="1" min="0" /></td>
            </tr>
            <tr>
              <td>Minimax</td>
              <td><label class="cs-toggle-switch"><input type="checkbox" /><span class="cs-toggle-slider"></span></label></td>
              <td><label class="cs-toggle-switch"><input type="checkbox" /><span class="cs-toggle-slider"></span></label></td>
              <td><input type="number" class="cs-num-input" value="0" min="0" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 12px; color: var(--color-text-tertiary); margin-top: 12px; line-height: 1.5;">轮询周期为0表示不需要轮询，按天模式每天执行1次(自动0-3点间执行)，固定模式周期内执行到完成为止(0-3点间执行)</div>
    </div>

    <!-- 保存按钮 -->
    <div class="cs-sticky-save-bar">
      <button class="btn btn-secondary" onclick="navigateTo('tenant-projects')">取消</button>
      <button class="btn btn-primary" onclick="csShowToast('配置已保存')">
        ${ICON_MAP['save']}
        保存配置
      </button>
    </div>
  `;
}

/* 辅助函数：显示提示 */
function csShowToast(msg) {
  const t = document.createElement('div');
  t.className = 'pm-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1700);
}

/* 批量添加问题到问题列表 */
function csBatchAddProblems() {
  const textarea = document.querySelector('.cs-textarea-box');
  if (!textarea) {
    csShowToast('未找到输入框');
    return;
  }
  
  const text = textarea.value.trim();
  if (!text) {
    csShowToast('请输入问题内容');
    return;
  }
  
  // 解析输入的问题（每行一个，格式：问题；分类）
  const lines = text.split('\n').filter(line => line.trim());
  const newProblems = [];
  const newCategories = new Set(); // 使用 Set 确保唯一性
  
  lines.forEach(line => {
    const parts = line.split('；');
    const question = parts[0].trim();
    const category = parts[1] ? parts[1].trim() : '';
    
    if (question) {
      newProblems.push({
        id: Date.now() + Math.random(),
        question: question,
        category: category,
        addTime: new Date().toISOString(),
        _selected: false,
        _editingCat: false
      });
      
      // 如果有分类且不存在，则添加到 Set
      if (category && !csCategories.some(c => c.name === category)) {
        newCategories.add(category);
      }
    }
  });
  
  if (newProblems.length === 0) {
    csShowToast('未找到有效的问题');
    return;
  }
  
  // 添加新分类到分类列表
  if (newCategories.size > 0) {
    newCategories.forEach(catName => {
      csCategories.push({ name: catName });
    });
    csSyncBatchCategoryChecks();
    csUpdateProblemCategoryFilter();
    csShowToast(`已添加 ${newCategories.size} 个新分类`);
  }
  
  // 添加到全局问题列表
  csProblems = csProblems.concat(newProblems);
  
  // 清空输入框
  textarea.value = '';
  
  // 渲染问题列表
  csRenderProblemList();
  
  csShowToast(`已添加 ${newProblems.length} 个问题`);
}

/* 渲染问题列表 */
function csRenderProblemList() {
  const tbody = document.getElementById('csProblemTableBody');
  if (!tbody) return;
  
  // 按添加时间倒序排序
  const sortedProblems = csProblems.slice().sort((a, b) => {
    return new Date(b.addTime) - new Date(a.addTime);
  });
  
  // 过滤
  let filteredProblems = sortedProblems;
  if (csProblemFilter.category) {
    filteredProblems = filteredProblems.filter(p => p.category === csProblemFilter.category);
  }
  if (csProblemFilter.search) {
    const searchLower = csProblemFilter.search.toLowerCase();
    filteredProblems = filteredProblems.filter(p => p.question.toLowerCase().includes(searchLower));
  }
  
  // 更新总数
  const totalEl = document.getElementById('csProblemTotalCount');
  if (totalEl) {
    totalEl.textContent = csProblems.length;
  }
  
  if (filteredProblems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 32px; color: var(--color-text-tertiary);">暂无数据，请在上方添加问题</td></tr>';
    document.getElementById('csProblemPagination').innerHTML = '';
    return;
  }
  
  // 分页
  const totalPages = Math.ceil(filteredProblems.length / csProblemPageSize);
  if (csProblemPage > totalPages) csProblemPage = totalPages;
  if (csProblemPage < 1) csProblemPage = 1;
  
  const startIndex = (csProblemPage - 1) * csProblemPageSize;
  const pageProblems = filteredProblems.slice(startIndex, startIndex + csProblemPageSize);
  
  // 生成分类选项
  const catOptions = csCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  
  // 渲染表格
  const rows = pageProblems.map((p, idx) => {
    const globalIdx = csProblems.indexOf(p);
    const displayIdx = startIndex + idx + 1;
    const timeStr = new Date(p.addTime).toLocaleDateString('zh-CN', { 
      year: 'numeric', month: '2-digit', day: '2-digit' 
    }).replace(/\//g, '/');
    
    let catHtml = '';
    if (p._editingCat) {
      catHtml = `<select class="cs-filter-select" style="min-width:100px;padding:3px 6px;font-size:11px;" onchange="csSetProblemCategory(${globalIdx}, this.value)" onblur="csProblems[${globalIdx}]._editingCat=false;csRenderProblemList()">
        <option value="">未分类</option>${catOptions}</select>`;
    } else {
      if (p.category) {
        catHtml = `<span style="display:inline-block;padding:2px 8px;border-radius:var(--radius-sm);font-size:11px;font-weight:500;background:var(--color-primary-bg);color:var(--color-primary);cursor:pointer;" onclick="csProblems[${globalIdx}]._editingCat=true;csRenderProblemList()" title="点击修改分类">${p.category}</span>`;
      } else {
        catHtml = `<span style="display:inline-block;padding:2px 8px;border-radius:var(--radius-sm);font-size:11px;background:#f0f0f0;color:#999;cursor:pointer;" onclick="csProblems[${globalIdx}]._editingCat=true;csRenderProblemList()" title="点击设置分类">未分类</span>`;
      }
    }
    
    return `<tr>
      <td><input type="checkbox" ${p._selected ? 'checked' : ''} onchange="csProblems[${globalIdx}]._selected=this.checked;csUpdateProblemSelectedCount()" /></td>
      <td>${displayIdx}</td>
      <td>${p.question}</td>
      <td>${catHtml}</td>
      <td>${timeStr}</td>
      <td style="position:relative;">
        <button class="btn btn-ghost btn-sm" style="color:var(--color-danger);" onclick="csShowDeletePopover(event, ${globalIdx})">删除</button>
      </td>
    </tr>`;
  }).join('');
  
  tbody.innerHTML = rows;
  
  // 渲染分页
  csRenderPagination(filteredProblems.length, totalPages);
  
  // 更新分类过滤器
  csUpdateProblemCategoryFilter();
}

/* 渲染分页组件 */
function csRenderPagination(total, totalPages) {
  const pagination = document.getElementById('csProblemPagination');
  if (!pagination) return;
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // 上一页
  html += `<button ${csProblemPage === 1 ? 'disabled' : ''} onclick="csGoToProblemPage(${csProblemPage - 1})">‹</button>`;
  
  // 页码
  const maxVisible = 5;
  let startPage = Math.max(1, csProblemPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  if (startPage > 1) {
    html += `<button onclick="csGoToProblemPage(1)">1</button>`;
    if (startPage > 2) html += `<span>...</span>`;
  }
  
  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="${i === csProblemPage ? 'active' : ''}" onclick="csGoToProblemPage(${i})">${i}</button>`;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span>...</span>`;
    html += `<button onclick="csGoToProblemPage(${totalPages})">${totalPages}</button>`;
  }
  
  // 下一页
  html += `<button ${csProblemPage === totalPages ? 'disabled' : ''} onclick="csGoToProblemPage(${csProblemPage + 1})">›</button>`;
  
  // 页码信息
  html += `<span>第 ${csProblemPage}/${totalPages} 页，共 ${total} 条</span>`;
  
  pagination.innerHTML = html;
}

/* 跳转到指定页 */
function csGoToProblemPage(page) {
  csProblemPage = page;
  csRenderProblemList();
}

/* 切换下拉菜单 */
function csToggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  
  // 关闭其他所有下拉
  var allDropdowns = document.querySelectorAll('.cs-filter-dropdown');
  allDropdowns.forEach(function(dd) {
    if (dd.id !== dropdownId) {
      dd.classList.remove('show');
    }
  });
  
  // 切换当前下拉
  dropdown.classList.toggle('show');
  
  // 点击外部关闭
  if (dropdown.classList.contains('show')) {
    setTimeout(function() {
      document.addEventListener('click', function closeDropdown(e) {
        var wrapper = dropdown.parentElement;
        if (!wrapper.contains(e.target)) {
          dropdown.classList.remove('show');
          document.removeEventListener('click', closeDropdown);
        }
      });
    }, 0);
  }
}

/* 选择分类过滤 */
function csSelectCategory(catName) {
  csProblemFilter.category = catName;
  csProblemPage = 1;
  
  // 更新显示文本
  var textEl = document.getElementById('csProblemFilterCategoryText');
  if (textEl) {
    textEl.textContent = catName || '全部分类';
  }
  
  // 更新下拉选项高亮
  var dropdown = document.getElementById('csProblemFilterCategoryDropdown');
  if (dropdown) {
    var items = dropdown.querySelectorAll('.cs-filter-dropdown-item');
    items.forEach(function(item) {
      var itemCat = item.getAttribute('data-category') || '';
      item.classList.toggle('active', itemCat === catName);
    });
  }
  
  // 关闭下拉
  dropdown.classList.remove('show');
  
  // 重新渲染列表
  csRenderProblemList();
}

/* 选择批量分类 */
function csSelectBatchCategory(catName) {
  var selectedCat = catName;
  
  // 更新显示文本
  var textEl = document.getElementById('csProblemBatchCatSelectText');
  if (textEl) {
    textEl.textContent = catName || '选择分类';
  }
  
  // 更新下拉选项高亮
  var dropdown = document.getElementById('csProblemBatchCatSelectDropdown');
  if (dropdown) {
    var items = dropdown.querySelectorAll('.cs-filter-dropdown-item');
    items.forEach(function(item) {
      var itemCat = item.getAttribute('data-category') || '';
      item.classList.toggle('active', itemCat === catName);
    });
  }
  
  // 关闭下拉
  dropdown.classList.remove('show');
  
  // 存储选中的分类
  window._csBatchSelectedCategory = catName;
}

/* 显示删除确认气泡 */
function csShowDeletePopover(event, problemIdx) {
  event.stopPropagation();
  
  // 关闭其他所有气泡
  var allPopovers = document.querySelectorAll('.cs-delete-popover');
  allPopovers.forEach(function(pop) {
    pop.remove();
  });
  
  var btn = event.currentTarget;
  var rect = btn.getBoundingClientRect();
  
  var popover = document.createElement('div');
  popover.className = 'cs-delete-popover';
  popover.innerHTML = `
    <div class="cs-delete-popover-title">删除确认</div>
    <div class="cs-delete-popover-content">确定要删除该问题吗？</div>
    <div class="cs-delete-popover-actions">
      <button class="btn btn-secondary btn-sm" onclick="this.closest('.cs-delete-popover').remove()">取消</button>
      <button class="btn btn-danger btn-sm" onclick="csConfirmDeleteProblem(${problemIdx})">删除</button>
    </div>
  `;
  
  document.body.appendChild(popover);
  
  // 定位气泡
  var popoverRect = popover.getBoundingClientRect();
  popover.style.position = 'fixed';
  popover.style.top = (rect.bottom + 8) + 'px';
  popover.style.left = (rect.left + rect.width / 2 - popoverRect.width / 2) + 'px';
  popover.style.zIndex = '300';
  
  // 点击外部关闭
  setTimeout(function() {
    document.addEventListener('click', function closePopover(e) {
      if (!popover.contains(e.target) && e.target !== btn) {
        popover.remove();
        document.removeEventListener('click', closePopover);
      }
    });
  }, 0);
}

/* 确认删除问题 */
function csConfirmDeleteProblem(idx) {
  if (idx >= 0 && idx < csProblems.length) {
    csProblems.splice(idx, 1);
    
    // 关闭气泡
    var allPopovers = document.querySelectorAll('.cs-delete-popover');
    allPopovers.forEach(function(pop) {
      pop.remove();
    });
    
    csRenderProblemList();
    csShowToast('问题已删除');
  }
}

/* 全选/取消全选问题 */
function csToggleSelectAllProblems(cb) {
  const filteredProblems = csGetFilteredProblems();
  filteredProblems.forEach(p => p._selected = cb.checked);
  csRenderProblemList();
}

/* 获取过滤后的问题 */
function csGetFilteredProblems() {
  let filtered = csProblems.slice();
  if (csProblemFilter.category) {
    filtered = filtered.filter(p => p.category === csProblemFilter.category);
  }
  if (csProblemFilter.search) {
    const searchLower = csProblemFilter.search.toLowerCase();
    filtered = filtered.filter(p => p.question.toLowerCase().includes(searchLower));
  }
  return filtered;
}

/* 更新问题选中数量 */
function csUpdateProblemSelectedCount() {
  // 可以在这里更新UI显示选中数量
}

/* 切换批量修改分类区域 */
function csToggleProblemBatchCatArea() {
  const batchArea = document.getElementById('csProblemBatchCatArea');
  const selected = csProblems.filter(p => p._selected);
  
  if (!selected.length) {
    csShowToast('请先选择要修改分类的问题');
    return;
  }
  
  if (batchArea.style.display === 'none') {
    batchArea.style.display = 'flex';
    // 更新分类下拉框
    const select = document.getElementById('csProblemBatchCatSelect');
    const catOptions = csCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    select.innerHTML = '<option value="">选择分类</option>' + catOptions;
  } else {
    batchArea.style.display = 'none';
  }
}

/* 确认批量修改问题分类 */
function csConfirmProblemBatchCategorize() {
  const select = document.getElementById('csProblemBatchCatSelect');
  const catName = select.value;
  
  if (!catName) {
    csShowToast('请选择要设置的分类');
    return;
  }
  
  const selected = csProblems.filter(p => p._selected);
  if (!selected.length) {
    csShowToast('请先选择要修改分类的问题');
    return;
  }
  
  selected.forEach(p => p.category = catName);
  
  document.getElementById('csProblemBatchCatArea').style.display = 'none';
  csRenderProblemList();
  csShowToast(`已将 ${selected.length} 个问题的分类修改为「${catName}」`);
}

/* 取消批量修改问题分类 */
function csCancelProblemBatchCategorize() {
  document.getElementById('csProblemBatchCatArea').style.display = 'none';
}

/* 设置单个问题分类 */
function csSetProblemCategory(idx, catName) {
  if (idx >= 0 && idx < csProblems.length) {
    csProblems[idx].category = catName;
    csProblems[idx]._editingCat = false;
    csRenderProblemList();
  }
}

/* 删除单个问题 */
function csDeleteProblem(idx) {
  if (idx >= 0 && idx < csProblems.length) {
    if (confirm('确定要删除这个问题吗？')) {
      csProblems.splice(idx, 1);
      csRenderProblemList();
      csShowToast('问题已删除');
    }
  }
}

/* 删除所有问题 */
function csDeleteAllProblems() {
  if (!csProblems.length) {
    csShowToast('暂无数据');
    return;
  }
  if (confirm('确定要删除所有问题吗？此操作不可撤销。')) {
    csProblems = [];
    csRenderProblemList();
    csShowToast('已删除所有问题');
  }
}

/* 更新问题分类过滤器 */
function csUpdateProblemCategoryFilter() {
  // 计算每个分类下的问题数量
  var categoryCounts = {};
  csProblems.forEach(function(p) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    }
  });
  
  // 更新过滤下拉框
  var filterDropdown = document.getElementById('csProblemFilterCategoryDropdown');
  if (filterDropdown) {
    var currentCat = csProblemFilter.category || '';
    var catOptions = csCategories.map(function(c) {
      var count = categoryCounts[c.name] || 0;
      var isActive = c.name === currentCat;
      return '<div class="cs-filter-dropdown-item' + (isActive ? ' active' : '') + '" data-category="' + c.name + '" onclick="csSelectCategory(\'' + c.name + '\')">' + c.name + ' (' + count + ')</div>';
    }).join('');
    filterDropdown.innerHTML = '<div class="cs-filter-dropdown-item' + (!currentCat ? ' active' : '') + '" data-category="" onclick="csSelectCategory(\'\')">全部分类 (' + csProblems.length + ')</div>' + catOptions;
  }
  
  // 更新批量分类下拉框
  var batchDropdown = document.getElementById('csProblemBatchCatSelectDropdown');
  if (batchDropdown) {
    var batchCat = window._csBatchSelectedCategory || '';
    var batchCatOptions = csCategories.map(function(c) {
      var count = categoryCounts[c.name] || 0;
      var isActive = c.name === batchCat;
      return '<div class="cs-filter-dropdown-item' + (isActive ? ' active' : '') + '" data-category="' + c.name + '" onclick="csSelectBatchCategory(\'' + c.name + '\')">' + c.name + ' (' + count + ')</div>';
    }).join('');
    batchDropdown.innerHTML = '<div class="cs-filter-dropdown-item' + (!batchCat ? ' active' : '') + '" data-category="" onclick="csSelectBatchCategory(\'\')">选择分类</div>' + batchCatOptions;
  }
}

/* 同步"需要采集的问题批量添加"区域的分类复选框 */
function csSyncBatchCategoryChecks() {
  const container = document.getElementById('csBatchCategoryChecks');
  if (!container) return;
  container.innerHTML = csCategories.map(c =>
    `<label class="cs-check-item"><input type="checkbox" value="${c.name}" /> ${c.name}</label>`
  ).join('');
}

/* 页面加载完成后初始化 */
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行，确保 DOM 已渲染
  setTimeout(function() {
    csSyncBatchCategoryChecks();
    csUpdateProblemCategoryFilter(); // 初始化分类下拉选项
    csRenderProblemList();
  }, 200);
});

/* 暴露初始化函数，供外部调用以确保DOM渲染完成后同步分类 */
window.csInitBatchCategoryChecks = function() {
  csSyncBatchCategoryChecks();
};

/* ========================================
   弹窗 HTML 注入（页面加载时创建）
   ======================================== */
(function injectModals() {
  if (document.getElementById('csTuociModal')) return;

  /* 拓词工具弹窗 */
  const tuociHtml = `
  <div class="cs-tuoci-overlay" id="csTuociModal" onclick="if(event.target===this)csCloseTuociModal()">
    <div class="cs-tuoci-modal">
      <div class="cs-tuoci-header">
        <div class="cs-tuoci-title">拓词工具</div>
        <button class="cs-tuoci-close" onclick="csCloseTuociModal()">✕</button>
      </div>
      <div class="cs-tuoci-body">
        <!-- 步骤条 -->
        <div class="cs-step-bar" id="csStepBar">
          <div class="cs-step-item active" data-step="1" onclick="csGoToStep(1)">
            <div class="cs-step-num">1</div>
            <div class="cs-step-label">生成分类</div>
          </div>
          <div class="cs-step-connector" id="csStepConn1"></div>
          <div class="cs-step-item" data-step="2" onclick="csGoToStep(2)">
            <div class="cs-step-num">2</div>
            <div class="cs-step-label">生成采集问题</div>
          </div>
          <div class="cs-step-connector" id="csStepConn2"></div>
          <div class="cs-step-item" data-step="3" onclick="csGoToStep(3)">
            <div class="cs-step-num">3</div>
            <div class="cs-step-label">补充报表问题</div>
          </div>
        </div>
        <!-- 步骤提示 -->
        <div class="cs-step-tip" id="csStepTip">
          <svg class="cs-step-tip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span id="csStepTipText"></span>
        </div>

        <!-- 行业模板 -->
        <div class="cs-template-label"><span class="brand">+ 行业组合模板</span>（点击自动填充示例数据）</div>
        <div class="cs-template-tags" id="csTemplateTags">
          <span class="cs-template-tag" onclick="csApplyTemplate('金融')">金融</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('教育')">教育</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('医疗健康')">医疗健康</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('企业服务')">企业服务</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('互联网')">互联网</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('电信通信')">电信通信</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('汽车')">汽车</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('电商零售')">电商零售</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('娱乐')">娱乐</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('游戏')">游戏</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('旅行出行')">旅行出行</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('房地产')">房地产</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('制造业与工业')">制造业与工业</span>
          <span class="cs-template-tag" onclick="csApplyTemplate('公共事业')">公共事业</span>
        </div>

        <!-- A-F 区域 -->
        <div class="cs-tuoci-zones">
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-a">A</span> 前缀1</div>
            <textarea id="csZoneA" placeholder="每行一个词"></textarea>
          </div>
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-b">B</span> 前缀2</div>
            <textarea id="csZoneB" placeholder="每行一个词"></textarea>
          </div>
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-c">C</span> 核心关键词</div>
            <textarea id="csZoneC" placeholder="每行一个词"></textarea>
          </div>
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-d">D</span> 通义词</div>
            <textarea id="csZoneD" placeholder="每行一个词"></textarea>
          </div>
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-e">E</span> 推荐词</div>
            <textarea id="csZoneE" placeholder="每行一个词"></textarea>
          </div>
          <div class="cs-tuoci-zone">
            <div class="cs-tuoci-zone-hd"><span class="cs-zone-badge cs-zone-f">F</span> 疑问词</div>
            <textarea id="csZoneF" placeholder="每行一个词"></textarea>
          </div>
        </div>

        <!-- 组合方式 -->
        <div class="cs-combo-section">
          <div class="cs-combo-label">组合方式 <span class="hint">（可多选）</span></div>
          <div class="cs-combo-grid" id="csComboGrid">
            <label class="cs-combo-item"><input type="checkbox" id="csComboAll" onchange="csToggleComboAll(this)" /> 全选</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="C+D" /> C+D 核心词+通义词</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="A+C+D" /> A+C+D 前缀1+核心词+通义词</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="B+C+D" /> B+C+D 前缀2+核心词+通义词</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="C+D*E" /> C+(D*E) 核心词+(通义词*推荐词)</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="C+D*F" /> C+(D*F) 核心词+(通义词*疑问词)</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="A*B" /> (A*B) 前缀1*前缀2</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="A*B+C+D" /> (A*B)+C+D 前缀1*前缀2+核心词+通义词</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="A+C+D*E" /> A+C+(D*E) 前缀1+核心词+(通义词*推荐词)</label>
            <label class="cs-combo-item"><input type="checkbox" name="csCombo" value="B+C+D*E" /> B+C+(D*E) 前缀2+核心词+(通义词*推荐词)</label>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;">
            <label class="cs-toggle-switch" title="开启后，生成的问题将根据已有分类名称自动匹配分类">
              <input type="checkbox" id="csAutoMatchCat" checked />
              <span class="cs-toggle-slider"></span>
            </label>
            <span style="font-size:12px;color:var(--color-text-tertiary);">自动匹配分类</span>
            <div style="flex:1;"></div>
            <button class="btn btn-primary btn-sm" onclick="csGenerateTuoci()">
              ${ICON_MAP['zap']}
              生成
            </button>
          </div>
        </div>

        <!-- 生成结果 -->
        <div class="cs-tuoci-filter-bar">
          <span class="cs-result-count">已生成 <strong id="csTuociResultCount">0</strong> 个</span>
          <select class="filter-select" id="csTuociFilterCategory">
            <option value="">全部分类</option>
          </select>
          <input class="filter-input" type="text" placeholder="搜索问题" id="csTuociSearchInput" />
          <button class="btn btn-secondary btn-sm" onclick="csFilterTuociResults()">搜索</button>
          <div style="margin-left:auto;display:flex;gap:8px;">
            <button class="btn btn-secondary btn-sm" onclick="csCopyAllTuoci()" title="复制全部问题">
              ${ICON_MAP['copy']}
              复制全部
            </button>
            <button class="btn btn-secondary btn-sm" onclick="csSelectAllTuoci(true)">全选</button>
            <button class="btn btn-secondary btn-sm" onclick="csSelectAllTuoci(false)">反选</button>
          </div>
        </div>
        <div style="overflow-x:auto;max-height:240px;overflow-y:auto;border:1px solid var(--color-border);border-radius:var(--radius-md);">
          <table class="cs-result-table" id="csTuociResultTable">
            <thead>
              <tr><th style="width:40px;"><input type="checkbox" id="csTuociSelectAllCb" onchange="csToggleSelectAllTuoci(this)" /></th><th style="width:50px;">序号</th><th>问题</th><th style="width:120px;">所属分类</th></tr>
            </thead>
            <tbody id="csTuociResultBody">
              <tr><td colspan="4" class="cs-result-empty">请先选择模板并生成问题</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="cs-tuoci-footer">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:13px;color:var(--color-text-secondary);">已选 <strong id="csTuociSelectedCount">0</strong> 个</span>
          <div id="csBatchCatArea" style="display:none;align-items:center;gap:8px;">
            <select class="filter-select" id="csTuociBatchCatSelect" style="min-width:120px;">
              <option value="">选择分类</option>
            </select>
            <button class="btn btn-primary btn-sm" onclick="csConfirmBatchCategorize()">
              ${ICON_MAP['check']}
              确认
            </button>
            <button class="btn btn-ghost btn-sm" onclick="csCancelBatchCategorize()">取消</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="csBatchCatToggleBtn" onclick="csToggleBatchCatArea()">
            ${ICON_MAP['edit']}
            批量修改分类
          </button>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary" id="csTuociImportCatBtn" onclick="csImportTuociAsCategories()">
            ${ICON_MAP['tag']}
            导入分类
          </button>
          <button class="btn btn-primary" id="csTuociImportBtn" onclick="csImportTuociResults()">
            ${ICON_MAP['download']}
            导入到批量添加
          </button>
        </div>
      </div>
    </div>
  </div>`;

  /* 管理分类弹窗 */
  const catHtml = `
  <div class="cs-cat-manage-overlay" id="csCatManageModal" onclick="if(event.target===this)csCloseCatManageModal()">
    <div class="cs-cat-manage-modal">
      <div class="cs-cat-manage-header">
        <div class="cs-cat-manage-title">管理分类</div>
        <button class="cs-cat-manage-close" onclick="csCloseCatManageModal()">✕</button>
      </div>
      <div class="cs-cat-manage-body">
        <div class="cs-cat-manage-add-row">
          <input type="text" class="cs-cat-manage-input" id="csCatManageInput" placeholder="输入分类名称" onkeydown="if(event.key==='Enter')csAddCategory()" />
          <button class="btn btn-primary btn-sm" onclick="csAddCategory()">
            ${ICON_MAP['plus']}
            添加
          </button>
        </div>
        <div class="cs-cat-manage-list" id="csCatManageList"></div>
      </div>
      <div class="cs-cat-manage-footer">
        <button class="btn btn-ghost btn-sm" onclick="csDeleteAllCategories()" style="color:var(--color-danger);font-size:12px;">
          ${ICON_MAP['trash']}
          全部删除
        </button>
        <div style="flex:1;"></div>
        <button class="btn btn-secondary btn-sm" onclick="csCloseCatManageModal()">关闭</button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', tuociHtml + catHtml);
})();

/* ========================================
   分类数据
   ======================================== */
var csCategories = [
  { name: '香薰机厂家' },
  { name: '露营灯供应商' },
  { name: '户外风扇厂家' },
  { name: '加湿器原厂供应商' }
];

/* ========================================
   问题列表数据
   ======================================== */
var csProblems = [];
var csProblemPage = 1;
var csProblemPageSize = 20;
var csProblemFilter = { category: '', search: '' };

/* ========================================
   管理分类弹窗逻辑
   ======================================== */
function csOpenCatManageModal() {
  document.getElementById('csCatManageModal').classList.add('show');
  csRenderCatManageList();
  setTimeout(() => document.getElementById('csCatManageInput').focus(), 100);
}

function csCloseCatManageModal() {
  document.getElementById('csCatManageModal').classList.remove('show');
  document.getElementById('csCatManageInput').value = '';
}

function csRenderCatManageList() {
  var list = document.getElementById('csCatManageList');
  if (csCategories.length === 0) {
    list.innerHTML = '<div class="cs-cat-manage-empty">暂无分类，请在上方添加</div>';
    return;
  }
  list.innerHTML = csCategories.map(function(c) {
    return '<div class="cs-cat-manage-item">' +
      '<span class="name">' + c.name + '</span>' +
      '<button class="del-btn" onclick="csRemoveCategory(\'' + c.name.replace(/'/g, "\\'") + '\')" title="删除">✕</button>' +
      '</div>';
  }).join('');
}

function csAddCategory() {
  var input = document.getElementById('csCatManageInput');
  var name = input.value.trim();
  if (!name) { csShowToast('请输入分类名称'); return; }
  if (csCategories.some(function(c) { return c.name === name; })) { csShowToast('分类已存在'); return; }
  csCategories.push({ name: name });
  input.value = '';
  input.focus();
  csRenderCatManageList();
  csShowToast('分类「' + name + '」已添加');
}

function csRemoveCategory(name) {
  if (!confirm('确定要删除分类「' + name + '」吗？')) return;
  csCategories = csCategories.filter(function(c) { return c.name !== name; });
  csRenderCatManageList();
  csShowToast('分类「' + name + '」已删除');
}

function csDeleteAllCategories() {
  if (!csCategories.length) { csShowToast('暂无分类可删除'); return; }
  if (!confirm('确定要删除全部 ' + csCategories.length + ' 个分类吗？')) return;
  csCategories = [];
  csRenderCatManageList();
  csShowToast('已删除全部分类');
}

/* ========================================
   拓词工具弹窗逻辑
   ======================================== */
var csTuociResults = [];
var csCurrentStep = 1;

/* 步骤配置 */
var csStepConfig = {
  1: {
    tip: '<strong>步骤1</strong> C区填主关键词，D区填后缀，选 C+D 生成后全选，导入分类',
    highlight: ['C', 'D'],
    autoCheck: ['C+D']
  },
  2: {
    tip: '<strong>步骤2</strong> E区填后缀，选 C+(D*E) 生成后全选，导入到批量添加',
    highlight: ['C', 'D', 'E'],
    autoCheck: ['C+D*E']
  },
  3: {
    tip: '<strong>步骤3</strong> 到报表设置页的拓词弹窗，C/D不变，其他区随意添加，选组合方式生成后导入',
    highlight: ['A', 'C', 'D', 'E'],
    autoCheck: ['A+C+D*E']
  }
};

/* 切换步骤 */
function csGoToStep(step) {
  if (step < 1 || step > 3) return;
  csCurrentStep = step;
  
  /* 更新步骤条状态 */
  var items = document.querySelectorAll('#csStepBar .cs-step-item');
  var connectors = document.querySelectorAll('#csStepBar .cs-step-connector');
  
  items.forEach(function(item, idx) {
    var s = idx + 1;
    item.classList.remove('active', 'done');
    if (s < step) item.classList.add('done');
    else if (s === step) item.classList.add('active');
  });
  
  connectors.forEach(function(conn, idx) {
    conn.classList.remove('done');
    if (idx + 1 < step) conn.classList.add('done');
  });
  
  /* 更新提示文案 */
  var tipText = document.getElementById('csStepTipText');
  if (tipText && csStepConfig[step]) {
    tipText.innerHTML = csStepConfig[step].tip;
  }
  
  /* 高亮对应区域 */
  var zones = ['A', 'B', 'C', 'D', 'E', 'F'];
  var highlightZones = csStepConfig[step] ? csStepConfig[step].highlight : [];
  
  zones.forEach(function(z) {
    var zoneEl = document.querySelector('.cs-tuoci-zone:nth-child(' + (zones.indexOf(z) + 1) + ')');
    if (zoneEl) {
      zoneEl.classList.remove('zone-highlight', 'zone-dimmed');
      if (highlightZones.indexOf(z) !== -1) {
        zoneEl.classList.add('zone-highlight');
      } else {
        zoneEl.classList.add('zone-dimmed');
      }
    }
  });
  
  /* 自动勾选推荐的组合方式 */
  if (csStepConfig[step] && csStepConfig[step].autoCheck) {
    var combos = csStepConfig[step].autoCheck;
    document.querySelectorAll('input[name="csCombo"]').forEach(function(cb) {
      cb.checked = combos.indexOf(cb.value) !== -1;
    });
    var allCb = document.getElementById('csComboAll');
    if (allCb) {
      var all = document.querySelectorAll('input[name="csCombo"]');
      var checked = document.querySelectorAll('input[name="csCombo"]:checked');
      allCb.checked = all.length === checked.length;
    }
  }
}

/* 打开弹窗时初始化步骤条 */
function csOpenTuociModal() {
  document.getElementById('csTuociModal').classList.add('show');
  csGoToStep(1);
}

function csCloseTuociModal() {
  document.getElementById('csTuociModal').classList.remove('show');
}

/* 行业模板数据 */
var csTemplateData = {
  'default': {
    A: ['市面上', '行业内', '什么', '目前', '国内', '全球', '本地', '线上', '推荐几家', '帮我推荐几家'],
    B: ['口碑好的', '比较好的', '靠谱的', '有实力的', '可靠的', '值得', '正规的', '专业的', '热门的', '好卖的'],
    C: ['香薰机', '露营灯', '户外风扇', '加湿器'],
    D: ['平台', '公司', '厂家', '机构', '排行'],
    E: ['推荐', '排行', '推荐榜', '排行榜', '推荐榜单', '推荐排行', '推荐排行榜单', '口碑推荐', '口碑榜单', '口碑排行'],
    F: ['哪家好', '哪家强', '哪家靠谱', '哪家权威', '哪个好', '哪个专业', '哪家可靠', '有哪些', '找哪家', '找谁家', '找哪']
  }
};

function csApplyTemplate(name) {
  var data = csTemplateData['default'];
  document.getElementById('csZoneA').value = data.A.join('\n');
  document.getElementById('csZoneB').value = data.B.join('\n');
  document.getElementById('csZoneC').value = data.C.join('\n');
  document.getElementById('csZoneD').value = data.D.join('\n');
  document.getElementById('csZoneE').value = data.E.join('\n');
  document.getElementById('csZoneF').value = data.F.join('\n');

  document.querySelectorAll('#csTemplateTags .cs-template-tag').forEach(function(tag) {
    tag.classList.toggle('active', tag.textContent === name);
  });
  csShowToast('已填充「' + name + '」行业模板');
}

function csToggleComboAll(cb) {
  document.querySelectorAll('input[name="csCombo"]').forEach(function(c) { c.checked = cb.checked; });
}

document.addEventListener('change', function(e) {
  if (e.target.name === 'csCombo') {
    var all = document.querySelectorAll('input[name="csCombo"]');
    var checked = document.querySelectorAll('input[name="csCombo"]:checked');
    document.getElementById('csComboAll').checked = all.length === checked.length;
  }
});

function csParseZone(id) {
  var val = document.getElementById(id).value.trim();
  if (!val) return [];
  return val.split(/\n/).map(function(s) { return s.trim(); }).filter(Boolean);
}

function csGenerateTuoci() {
  var A = csParseZone('csZoneA');
  var B = csParseZone('csZoneB');
  var C = csParseZone('csZoneC');
  var D = csParseZone('csZoneD');
  var E = csParseZone('csZoneE');
  var F = csParseZone('csZoneF');

  var combos = Array.from(document.querySelectorAll('input[name="csCombo"]:checked')).map(function(c) { return c.value; });
  if (combos.length === 0) { csShowToast('请至少选择一种组合方式'); return; }
  if (C.length === 0) { csShowToast('核心关键词(C区域)不能为空'); return; }

  csTuociResults = [];
  var seen = {};

  function addResult(text) {
    if (!text || seen[text]) return;
    seen[text] = true;
    csTuociResults.push({ id: Date.now() + Math.random(), text: text, _selected: false, _category: '' });
  }

  function cartesian(arrays) {
    if (arrays.length === 0) return [[]];
    var result = [];
    function helper(idx, current) {
      if (idx === arrays.length) { result.push(current.slice()); return; }
      for (var i = 0; i < arrays[idx].length; i++) {
        current.push(arrays[idx][i]);
        helper(idx + 1, current);
        current.pop();
      }
    }
    helper(0, []);
    return result;
  }

  combos.forEach(function(combo) {
    switch(combo) {
      case 'C+D':
        cartesian([C, D]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'A+C+D':
        if (A.length) cartesian([A, C, D]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'B+C+D':
        if (B.length) cartesian([B, C, D]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'C+D*E':
        if (D.length && E.length) cartesian([C, D, E]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'C+D*F':
        if (D.length && F.length) cartesian([C, D, F]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'A*B':
        if (A.length && B.length) cartesian([A, B]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'A*B+C+D':
        if (A.length && B.length && D.length) cartesian([A, B, C, D]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'A+C+D*E':
        if (A.length && D.length && E.length) cartesian([A, C, D, E]).forEach(function(parts) { addResult(parts.join('')); });
        break;
      case 'B+C+D*E':
        if (B.length && D.length && E.length) cartesian([B, C, D, E]).forEach(function(parts) { addResult(parts.join('')); });
        break;
    }
  });

  /* 自动匹配分类 */
  if (document.getElementById('csAutoMatchCat').checked && csCategories.length) {
    csTuociResults.forEach(function(p) {
      var sorted = csCategories.slice().sort(function(a, b) { return b.name.length - a.name.length; });
      for (var i = 0; i < sorted.length; i++) {
        if (p.text.indexOf(sorted[i].name) !== -1) {
          p._category = sorted[i].name;
          break;
        }
      }
    });
  }

  csRenderTuociResults();
  csShowToast('已生成 ' + csTuociResults.length + ' 个问题');
}

function csGetFilteredTuociResults() {
  var cat = document.getElementById('csTuociFilterCategory').value;
  var search = (document.getElementById('csTuociSearchInput').value || '').trim().toLowerCase();
  return csTuociResults.filter(function(p) {
    if (cat && p._category !== cat) return false;
    if (search && p.text.toLowerCase().indexOf(search) === -1) return false;
    return true;
  });
}

function csRenderTuociResults() {
  var filtered = csGetFilteredTuociResults();
  var tbody = document.getElementById('csTuociResultBody');
  document.getElementById('csTuociResultCount').textContent = csTuociResults.length;

  if (!csTuociResults.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="cs-result-empty">请先选择模板并生成问题</td></tr>';
    csUpdateTuociSelectedCount();
    return;
  }
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="cs-result-empty">无匹配结果</td></tr>';
    csUpdateTuociSelectedCount();
    return;
  }

  var catOptions = csCategories.map(function(c) { return '<option value="' + c.name + '">' + c.name + '</option>'; }).join('');

  tbody.innerHTML = filtered.map(function(p, i) {
    var idx = csTuociResults.indexOf(p);
    var catHtml = '';
    if (p._editingCat) {
      // 编辑模式：显示下拉选择器
      catHtml = '<select class="filter-select" style="min-width:100px;padding:3px 6px;font-size:11px;" onchange="csSetTuociRowCategory(' + idx + ', this.value)" onblur="csTuociResults[' + idx + ']._editingCat=false;csRenderTuociResults()">' +
        '<option value="">未分类</option>' + catOptions + '</select>';
    } else {
      // 显示模式：点击可编辑
      if (p._category) {
        catHtml = '<span style="display:inline-block;padding:2px 8px;border-radius:var(--radius-sm);font-size:11px;font-weight:500;background:var(--color-primary-bg);color:var(--color-primary);cursor:pointer;" onclick="csTuociResults[' + idx + ']._editingCat=true;csRenderTuociResults()" title="点击修改分类">' + p._category + '</span>';
      } else {
        catHtml = '<span style="display:inline-block;padding:2px 8px;border-radius:var(--radius-sm);font-size:11px;background:#f0f0f0;color:#999;cursor:pointer;" onclick="csTuociResults[' + idx + ']._editingCat=true;csRenderTuociResults()" title="点击设置分类">未分类</span>';
      }
    }
    return '<tr>' +
      '<td><input type="checkbox" ' + (p._selected ? 'checked' : '') + ' onchange="csTuociResults[' + idx + ']._selected=this.checked;csUpdateTuociSelectedCount()" /></td>' +
      '<td>' + (i + 1) + '</td>' +
      '<td>' + p.text + '</td>' +
      '<td>' + catHtml + '</td>' +
      '</tr>';
  }).join('');

  csUpdateTuociSelectedCount();
}

function csFilterTuociResults() {
  csRenderTuociResults();
}

function csUpdateTuociSelectedCount() {
  var count = csTuociResults.filter(function(p) { return p._selected; }).length;
  document.getElementById('csTuociSelectedCount').textContent = count;
}

function csSelectAllTuoci(selectAll) {
  csTuociResults.forEach(function(p) { p._selected = selectAll; });
  csRenderTuociResults();
}

function csToggleSelectAllTuoci(cb) {
  csSelectAllTuoci(cb.checked);
}

function csCopyAllTuoci() {
  var text = csTuociResults.map(function(p) { return p.text; }).join('\n');
  navigator.clipboard.writeText(text).then(function() {
    csShowToast('已复制 ' + csTuociResults.length + ' 个问题');
  }).catch(function() {
    csShowToast('复制失败，请手动选择');
  });
}

function csImportTuociResults() {
  var selected = csTuociResults.filter(function(p) { return p._selected; });
  if (!selected.length) { csShowToast('请先选择要导入的问题'); return; }

  /* 根据当前页面决定导入目标 */
  if (typeof currentPage !== 'undefined' && currentPage === 'tenant-report-settings') {
    /* 导入到报表设置页面的批量添加框，带上分类 */
    var rsTextarea = document.getElementById('rsQuestionInput');
    if (rsTextarea) {
      var rsExisting = rsTextarea.value.trim();
      var rsNewText = selected.map(function(p) {
        var cat = p._category ? '；' + p._category : '';
        return p.text + cat;
      }).join('\n');
      rsTextarea.value = rsExisting ? rsExisting + '\n' + rsNewText : rsNewText;
    }
    csCloseTuociModal();
    if (typeof rsShowToast === 'function') {
      rsShowToast('已导入 ' + selected.length + ' 个问题到批量添加框');
    }
    return;
  }

  /* 默认：导入到采集设置页面的批量添加框 */
  var textarea = document.querySelector('.cs-textarea-box');
  if (textarea) {
    var existing = textarea.value.trim();
    var newText = selected.map(function(p) {
      var cat = p._category ? '；' + p._category : '';
      return p.text + cat;
    }).join('\n');
    textarea.value = existing ? existing + '\n' + newText : newText;
  }
  csCloseTuociModal();
  csShowToast('已导入 ' + selected.length + ' 个问题到批量添加');
}

/* 设置单行分类 */
function csSetTuociRowCategory(idx, catName) {
  if (idx >= 0 && idx < csTuociResults.length) {
    csTuociResults[idx]._category = catName;
    csTuociResults[idx]._editingCat = false;
    csRenderTuociResults();
  }
}

/* 切换批量修改分类区域 */
function csToggleBatchCatArea() {
  var batchArea = document.getElementById('csBatchCatArea');
  var selected = csTuociResults.filter(function(p) { return p._selected; });
  if (!selected.length) {
    csShowToast('请先选择要修改分类的问题');
    return;
  }
  if (batchArea.style.display === 'none') {
    // 显示批量修改区域
    batchArea.style.display = 'flex';
    // 更新分类下拉框
    var select = document.getElementById('csTuociBatchCatSelect');
    var catOptions = csCategories.map(function(c) { return '<option value="' + c.name + '">' + c.name + '</option>'; }).join('');
    select.innerHTML = '<option value="">选择分类</option>' + catOptions;
  } else {
    // 隐藏批量修改区域
    batchArea.style.display = 'none';
  }
}

/* 确认批量修改分类 */
function csConfirmBatchCategorize() {
  var select = document.getElementById('csTuociBatchCatSelect');
  var catName = select.value;
  if (!catName) {
    csShowToast('请选择要设置的分类');
    return;
  }
  var selected = csTuociResults.filter(function(p) { return p._selected; });
  if (!selected.length) {
    csShowToast('请先选择要修改分类的问题');
    return;
  }
  // 批量设置分类
  selected.forEach(function(p) {
    p._category = catName;
  });
  // 隐藏批量修改区域
  document.getElementById('csBatchCatArea').style.display = 'none';
  csRenderTuociResults();
  csShowToast('已将 ' + selected.length + ' 个问题的分类修改为「' + catName + '」');
}

/* 取消批量修改分类 */
function csCancelBatchCategorize() {
  document.getElementById('csBatchCatArea').style.display = 'none';
}

/* 导入分类：将选中的问题文本作为新分类添加到分类列表 */
function csImportTuociAsCategories() {
  var selected = csTuociResults.filter(function(p) { return p._selected; });
  if (!selected.length) {
    csShowToast('请先选择要导入为分类的问题');
    return;
  }
  var addedCount = 0;
  selected.forEach(function(p) {
    var text = p.text.trim();
    if (text && !csCategories.some(function(c) { return c.name === text; })) {
      csCategories.push({ name: text });
      addedCount++;
    }
  });
  if (addedCount > 0) {
    csShowToast('已导入 ' + addedCount + ' 个新分类');
    // 同步更新所有分类相关视图
    csSyncBatchCategoryChecks();
    csUpdateProblemCategoryFilter();
    // 更新拓词工具的分类过滤下拉框
    var filterSelect = document.getElementById('csTuociFilterCategory');
    if (filterSelect) {
      var catOptions = csCategories.map(function(c) { return '<option value="' + c.name + '">' + c.name + '</option>'; }).join('');
      filterSelect.innerHTML = '<option value="">全部分类</option>' + catOptions;
    }
  } else {
    csShowToast('没有新的分类可导入（分类已存在）');
  }
}
