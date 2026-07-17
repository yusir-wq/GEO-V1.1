/**
 * 超管端 - TDK 变量管理
 */
function renderAdminTdkVariables() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">TDK 变量管理</h1>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openAdminTdkVariableModal()">+ 新增变量</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">变量列表</span>
          <span class="table-toolbar-count">共 4 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索变量名称..." />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>变量名称</th>
            <th>变量内容</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>省份 + C区词数</td>
            <td><span class="code-tag">[pro][c-x]</span></td>
            <td>2026-07-06 10:23:15</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminTdkVariableModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>城市 + 客户简称</td>
            <td><span class="code-tag">[city][short]</span></td>
            <td>2026-07-06 10:24:32</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminTdkVariableModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>训练词 + 后缀词</td>
            <td><span class="code-tag">[word][suffix]</span></td>
            <td>2026-07-06 10:25:48</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminTdkVariableModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>当前时间</td>
            <td><span class="code-tag">[now]</span></td>
            <td>2026-07-06 10:26:11</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminTdkVariableModal()">编辑</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <div class="pagination-info">显示 1-4 条，共 4 条</div>
        <div class="pagination-pages">
          <button class="pagination-btn disabled">‹</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn disabled">›</button>
        </div>
      </div>
    </div>

    <!-- 新增/编辑变量弹窗 -->
    <div class="modal-overlay" id="adminTdkVariableModal" onclick="closeAdminTdkVariableModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">新增 TDK 变量</h2>
          <button class="modal-close" onclick="closeAdminTdkVariableModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">变量名称 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：省份 + C区词数" />
          </div>
          <div class="form-group">
            <label class="form-label">变量内容 <span class="required">*</span></label>
            <textarea class="form-textarea" placeholder="例如：[pro][c-x]"></textarea>
            <div class="form-hint">使用方括号定义变量，多个变量可拼接组合。</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeAdminTdkVariableModal()">取消</button>
          <button class="btn btn-primary" onclick="closeAdminTdkVariableModal()">确定</button>
        </div>
      </div>
    </div>
  `;
}

function openAdminTdkVariableModal() {
  const modal = document.getElementById('adminTdkVariableModal');
  if (modal) modal.classList.add('active');
}

function closeAdminTdkVariableModal() {
  const modal = document.getElementById('adminTdkVariableModal');
  if (modal) modal.classList.remove('active');
}

function closeAdminTdkVariableModalOnOverlay(e) {
  if (e.target.id === 'adminTdkVariableModal') closeAdminTdkVariableModal();
}
