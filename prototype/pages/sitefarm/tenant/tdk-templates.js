/**
 * 租户端 - TDK 模板管理
 */
function renderTenantTdkTemplates() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">TDK 模板管理</h1>
        <p class="page-header-desc">管理网站标题、关键词、描述模板</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openTenantTdkTemplateModal()">+ 新增 TDK 模板</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">TDK 模板列表</span>
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
            <th>网站标题</th>
            <th>网站关键词</th>
            <th>网站描述</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><span class="code-tag">[city][word][suffix]</span></td>
            <td><span class="code-tag">[city][word],[suffix]</span></td>
            <td><span class="code-tag">[desc]</span></td>
            <td>2026-07-01 09:30:00</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTdkTemplateModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td><span class="code-tag">[pro][word][suffix]</span></td>
            <td><span class="code-tag">[pro][word],[suffix]</span></td>
            <td><span class="code-tag">[desc]</span></td>
            <td>2026-07-02 10:15:22</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTdkTemplateModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td><span class="code-tag">[city][short][suffix]</span></td>
            <td><span class="code-tag">[city][short],[suffix]</span></td>
            <td><span class="code-tag">[desc]</span></td>
            <td>2026-07-03 14:20:11</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTdkTemplateModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
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

    <!-- 新增/编辑 TDK 模板 -->
    <div class="modal-overlay" id="tenantTdkTemplateModal" onclick="closeTenantTdkTemplateModalOnOverlay(event)">
      <div class="modal" style="width:720px;">
        <div class="modal-header">
          <h2 class="modal-title">新增 TDK 模板</h2>
          <button class="modal-close" onclick="closeTenantTdkTemplateModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <div class="modal-section-title">可插入变量</div>
            <div class="tag-list">
              <span class="tag">省份</span>
              <span class="tag">城市</span>
              <span class="tag">x个区</span>
              <span class="tag">B区关键词</span>
              <span class="tag">C区关键词</span>
              <span class="tag">x个C词</span>
              <span class="tag">D区关键词</span>
              <span class="tag">训练词</span>
              <span class="tag">客户简称</span>
              <span class="tag">后缀词</span>
              <span class="tag">联系方式</span>
              <span class="tag">官方网址</span>
              <span class="tag">联系人</span>
              <span class="tag">自定义文案</span>
              <span class="tag">当前时间</span>
              <span class="tag">站点描述</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">训练词</label>
            <select class="form-select">
              <option>包装制品</option>
              <option>瓦楞纸箱</option>
              <option>彩盒定制</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">网站标题 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：[city][word][suffix]" />
          </div>
          <div class="form-group">
            <label class="form-label">网站关键词 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：[city][word],[suffix]" />
          </div>
          <div class="form-group">
            <label class="form-label">网站描述 <span class="required">*</span></label>
            <textarea class="form-textarea" rows="3" placeholder="例如：[desc]"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">实时效果预览</label>
            <div style="padding:12px;background:var(--color-border-light);border-radius:var(--radius-md);font-size:13px;color:var(--color-text-secondary);">
              深圳包装制品厂家_瓦楞纸箱彩盒定制_智达恒业包装
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantTdkTemplateModal()">换一组</button>
          <button class="btn btn-primary" onclick="closeTenantTdkTemplateModal()">保存</button>
        </div>
      </div>
    </div>
  `;
}

function openTenantTdkTemplateModal() {
  const modal = document.getElementById('tenantTdkTemplateModal');
  if (modal) modal.classList.add('active');
}

function closeTenantTdkTemplateModal() {
  const modal = document.getElementById('tenantTdkTemplateModal');
  if (modal) modal.classList.remove('active');
}

function closeTenantTdkTemplateModalOnOverlay(e) {
  if (e.target.id === 'tenantTdkTemplateModal') closeTenantTdkTemplateModal();
}
