/**
 * 超管端 - SAAS 用户管理（站群配置弹窗）
 */
function renderAdminSitefarmSaasUsers() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">SAAS 用户管理</h1>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary">+ 新增用户</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">用户列表</span>
          <span class="table-toolbar-count">共 5 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索用户名称..." />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>用户名称</th>
            <th>已授权模板</th>
            <th>账户状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>深圳智达恒业包装制品有限公司</td>
            <td>3 个</td>
            <td><span class="status-badge success"><span class="dot"></span>正常</span></td>
            <td>2026-06-15 09:23:15</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmConfigModal()">站群配置</button>
                <button class="btn btn-ghost btn-sm">查看</button>
                <button class="btn btn-ghost btn-sm text-danger">冻结</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>广州华创科技有限公司</td>
            <td>2 个</td>
            <td><span class="status-badge success"><span class="dot"></span>正常</span></td>
            <td>2026-06-18 14:30:22</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmConfigModal()">站群配置</button>
                <button class="btn btn-ghost btn-sm">查看</button>
                <button class="btn btn-ghost btn-sm text-danger">冻结</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>北京云帆网络科技有限公司</td>
            <td>0 个</td>
            <td><span class="status-badge warning"><span class="dot"></span>欠费</span></td>
            <td>2026-06-20 11:12:08</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmConfigModal()">站群配置</button>
                <button class="btn btn-ghost btn-sm">查看</button>
                <button class="btn btn-ghost btn-sm text-danger">冻结</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>上海迈思信息技术有限公司</td>
            <td>5 个</td>
            <td><span class="status-badge success"><span class="dot"></span>正常</span></td>
            <td>2026-06-22 16:45:33</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmConfigModal()">站群配置</button>
                <button class="btn btn-ghost btn-sm">查看</button>
                <button class="btn btn-ghost btn-sm text-danger">冻结</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>杭州睿博电子商务有限公司</td>
            <td>1 个</td>
            <td><span class="status-badge danger"><span class="dot"></span>冻结</span></td>
            <td>2026-06-25 10:05:19</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openAdminSitefarmConfigModal()">站群配置</button>
                <button class="btn btn-ghost btn-sm">查看</button>
                <button class="btn btn-ghost btn-sm">解冻</button>
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

    <!-- 站群配置弹窗 -->
    <div class="modal-overlay" id="adminSitefarmConfigModal" onclick="closeAdminSitefarmConfigModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">站群权限配置 — 深圳智达恒业包装制品有限公司</h2>
          <button class="modal-close" onclick="closeAdminSitefarmConfigModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <div class="modal-section-title">站群模块权限</div>
            <div class="switch-row">
              <div class="switch-info">
                <div class="switch-name">训练词管理</div>
                <div class="switch-desc">允许租户维护训练词、图片库、知识库</div>
              </div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info">
                <div class="switch-name">快通管理</div>
                <div class="switch-desc">允许租户创建和管理快通站点</div>
              </div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info">
                <div class="switch-name">模板管理</div>
                <div class="switch-desc">允许租户查看和分配网站模板</div>
              </div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info">
                <div class="switch-name">TDK 模板</div>
                <div class="switch-desc">允许租户维护 TDK 模板</div>
              </div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info">
                <div class="switch-name">文章管理</div>
                <div class="switch-desc">允许租户查看和发布 GEO 文章</div>
              </div>
              <label class="switch"><input type="checkbox"><span class="slider"></span></label>
            </div>
          </div>

          <div class="modal-section">
            <div class="modal-section-title">已授权网站模板</div>
            <div class="tag-list">
              <span class="tag">szzdhybxgzpyxgs-11735-2794.html <span class="tag-close">×</span></span>
              <span class="tag">szzdhybxgzpyxgs-11735-2791.html <span class="tag-close">×</span></span>
              <span class="tag">szzdhybxgzpyxgs-11735-2790.html <span class="tag-close">×</span></span>
            </div>
            <button class="tag-add" style="margin-top:10px;">+ 添加模板</button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeAdminSitefarmConfigModal()">取消</button>
          <button class="btn btn-primary" onclick="closeAdminSitefarmConfigModal()">保存配置</button>
        </div>
      </div>
    </div>
  `;
}

function openAdminSitefarmConfigModal() {
  const modal = document.getElementById('adminSitefarmConfigModal');
  if (modal) modal.classList.add('active');
}

function closeAdminSitefarmConfigModal() {
  const modal = document.getElementById('adminSitefarmConfigModal');
  if (modal) modal.classList.remove('active');
}

function closeAdminSitefarmConfigModalOnOverlay(e) {
  if (e.target.id === 'adminSitefarmConfigModal') closeAdminSitefarmConfigModal();
}
