/**
 * 超管端 - 网站模板管理
 */
function renderAdminSitefarmTemplates() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">网站模板管理</h1>
      </div>
    </div>

    <div class="alert-tip">
      ${window.getLucideIcon ? window.getLucideIcon('triangle-alert') : ''}
      <span>请先完善基本信息、训练词、图片等基础内容，然后点击「新增模板」由 AI 自动生成模板。</span>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">模板列表</span>
          <span class="table-toolbar-count">共 5 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索模板名称..." />
          </div>
          <button class="btn btn-primary" onclick="openAdminSitefarmAddModal()">
            ${window.getLucideIcon ? window.getLucideIcon('plus') : '+'} 新增模板
          </button>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>模板名称</th>
            <th>备注</th>
            <th>启用状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>szzdhybxgzpyxgs-11735-2794.html</td>
            <td>商务稳重蓝风格</td>
            <td><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></td>
            <td>2026-07-06 16:30:27</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm">图文编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>szzdhybxgzpyxgs-11735-2791.html</td>
            <td>-</td>
            <td><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></td>
            <td>2026-07-06 16:26:04</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm">图文编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>szzdhybxgzpyxgs-11735-2790.html</td>
            <td>-</td>
            <td><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></td>
            <td>2026-07-06 16:25:49</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm">图文编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>szzdhybxgzpyxgs-11735-2785.html</td>
            <td>-</td>
            <td><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></td>
            <td>2026-07-06 16:18:30</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm">图文编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>szzdhybxgzpyxgs-11735-2783.html</td>
            <td>-</td>
            <td><label class="switch"><input type="checkbox" checked><span class="slider"></span></label></td>
            <td>2026-07-06 16:16:11</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmPreviewModal()">预览</button>
                <button class="btn btn-ghost btn-sm">图文编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <div class="pagination-info">显示 1-5 条，共 5 条</div>
        <div class="pagination-pages">
          <button class="pagination-btn disabled">‹</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn disabled">›</button>
        </div>
      </div>
    </div>

    <!-- 新增模板弹窗 -->
    <div class="modal-overlay" id="adminSitefarmAddModal" onclick="closeAdminSitefarmAddModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">AI 新增模板</h2>
          <button class="modal-close" onclick="closeAdminSitefarmAddModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="alert-tip" style="margin-bottom:16px;">
            ${window.getLucideIcon ? window.getLucideIcon('triangle-alert') : ''}
            <span>生成过程可能需要几分钟，请耐心等待。</span>
          </div>
          <div class="form-group">
            <label class="form-label">网站配色</label>
            <select class="form-select">
              <option>商务稳重蓝</option>
              <option>活力科技绿</option>
              <option>简约高级灰</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">交互动效</label>
            <select class="form-select">
              <option>中度动效</option>
              <option>轻微动效</option>
              <option>无动效</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">适配终端</label>
            <select class="form-select">
              <option>全端自适应</option>
              <option>PC 端</option>
              <option>移动端</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeAdminSitefarmAddModal()">取消</button>
          <button class="btn btn-primary" onclick="closeAdminSitefarmAddModal()">确定</button>
        </div>
      </div>
    </div>

    <!-- 模板预览弹窗 -->
    <div class="modal-overlay preview-modal" id="adminSitefarmPreviewModal" onclick="closeAdminSitefarmPreviewModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">模板预览效果</h2>
          <button class="modal-close" onclick="closeAdminSitefarmPreviewModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
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
          <button class="btn btn-secondary" onclick="closeAdminSitefarmPreviewModal()">关闭</button>
          <button class="btn btn-primary">图文编辑</button>
        </div>
      </div>
    </div>
  `;
}

function openAdminSitefarmAddModal() {
  const modal = document.getElementById('adminSitefarmAddModal');
  if (modal) modal.classList.add('active');
}

function closeAdminSitefarmAddModal() {
  const modal = document.getElementById('adminSitefarmAddModal');
  if (modal) modal.classList.remove('active');
}

function closeAdminSitefarmAddModalOnOverlay(e) {
  if (e.target.id === 'adminSitefarmAddModal') closeAdminSitefarmAddModal();
}

function openAdminSitefarmPreviewModal() {
  const modal = document.getElementById('adminSitefarmPreviewModal');
  if (modal) modal.classList.add('active');
}

function closeAdminSitefarmPreviewModal() {
  const modal = document.getElementById('adminSitefarmPreviewModal');
  if (modal) modal.classList.remove('active');
}

function closeAdminSitefarmPreviewModalOnOverlay(e) {
  if (e.target.id === 'adminSitefarmPreviewModal') closeAdminSitefarmPreviewModal();
}
