/**
 * 租户端 - 网站模板管理
 */
function renderTenantSitefarmTemplates() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">网站模板管理</h1>
        <p class="page-header-desc">查看已授权模板，分配给用户使用</p>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">模板列表</span>
          <span class="table-toolbar-count">共 3 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索模板名称..." />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>模板名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>szzdhybxgzpyxgs-11735-2794.html</td>
            <td>2026-07-06 16:30:27</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmAssignModal()">分配用户</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>szzdhybxgzpyxgs-11735-2791.html</td>
            <td>2026-07-06 16:26:04</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmAssignModal()">分配用户</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>szzdhybxgzpyxgs-11735-2790.html</td>
            <td>2026-07-06 16:25:49</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantSitefarmAssignModal()">分配用户</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <div class="pagination-info">显示 1-3 条，共 3 条</div>
        <div class="pagination-pages">
          <button class="pagination-btn disabled">‹</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn disabled">›</button>
        </div>
      </div>
    </div>

    <!-- 模板预览弹窗 -->
    <div class="modal-overlay preview-modal" id="tenantSitefarmPreviewModal" onclick="closeTenantSitefarmPreviewModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">模板预览效果</h2>
          <button class="modal-close" onclick="closeTenantSitefarmPreviewModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">切换变量</label>
            <select class="form-select">
              <option>默认变量组合</option>
              <option>江苏省-苏州市</option>
              <option>广东省-深圳市</option>
            </select>
          </div>
          <div class="preview-frame">
            <div style="text-align:center;">
              <div style="font-size:16px;font-weight:600;color:var(--color-text-secondary);margin-bottom:8px;">PC 端预览效果</div>
              <div style="font-size:13px;color:var(--color-text-tertiary);">此处展示渲染后的网站页面</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantSitefarmPreviewModal()">关闭</button>
        </div>
      </div>
    </div>

    <!-- 分配用户弹窗 -->
    <div class="modal-overlay" id="tenantSitefarmAssignModal" onclick="closeTenantSitefarmAssignModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">分配模板给用户</h2>
          <button class="modal-close" onclick="closeTenantSitefarmAssignModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">选择用户</label>
            <select class="form-select" multiple size="5">
              <option>深圳智达恒业包装制品有限公司</option>
              <option>广州华创科技有限公司</option>
              <option>北京云帆网络科技有限公司</option>
              <option>上海迈思信息技术有限公司</option>
            </select>
            <div class="form-hint">按住 Ctrl 可多选</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantSitefarmAssignModal()">取消</button>
          <button class="btn btn-primary" onclick="closeTenantSitefarmAssignModal()">确认分配</button>
        </div>
      </div>
    </div>
  `;
}

function openTenantSitefarmPreviewModal() {
  const modal = document.getElementById('tenantSitefarmPreviewModal');
  if (modal) modal.classList.add('active');
}

function closeTenantSitefarmPreviewModal() {
  const modal = document.getElementById('tenantSitefarmPreviewModal');
  if (modal) modal.classList.remove('active');
}

function closeTenantSitefarmPreviewModalOnOverlay(e) {
  if (e.target.id === 'tenantSitefarmPreviewModal') closeTenantSitefarmPreviewModal();
}

function openTenantSitefarmAssignModal() {
  const modal = document.getElementById('tenantSitefarmAssignModal');
  if (modal) modal.classList.add('active');
}

function closeTenantSitefarmAssignModal() {
  const modal = document.getElementById('tenantSitefarmAssignModal');
  if (modal) modal.classList.remove('active');
}

function closeTenantSitefarmAssignModalOnOverlay(e) {
  if (e.target.id === 'tenantSitefarmAssignModal') closeTenantSitefarmAssignModal();
}
