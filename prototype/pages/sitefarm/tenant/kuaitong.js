/**
 * 租户端 - 快通管理
 */
function renderTenantKuaitong() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">快通管理</h1>
        <p class="page-header-desc">管理快通站点，发布线上分站</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openTenantKuaitongModal()">+ 创建快通</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">快通列表</span>
          <span class="table-toolbar-count">共 4 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索站点名称..." />
          </div>
          <select class="form-select" style="min-width:120px;">
            <option>全部状态</option>
            <option>已推送</option>
            <option>未推送</option>
          </select>
          <button class="btn btn-secondary">导出 CSV</button>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>所属城市</th>
            <th>训练词</th>
            <th>店铺标题</th>
            <th>前缀</th>
            <th>站点名称</th>
            <th>模板名称</th>
            <th>推送状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>深圳市</td>
            <td>包装制品</td>
            <td>深圳包装制品厂家</td>
            <td>sz</td>
            <td>sz-bzzp-001</td>
            <td>szzdhybxgzpyxgs-11735-2794.html</td>
            <td><span class="badge badge-success">已推送</span></td>
            <td>2026-07-01 10:00:00</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantKuaitongModal()">编辑</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问站点</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>广州市</td>
            <td>瓦楞纸箱</td>
            <td>广州瓦楞纸箱定制</td>
            <td>gz</td>
            <td>gz-wljzx-002</td>
            <td>szzdhybxgzpyxgs-11735-2791.html</td>
            <td><span class="badge badge-success">已推送</span></td>
            <td>2026-07-02 11:00:00</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantKuaitongModal()">编辑</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问站点</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>东莞市</td>
            <td>彩盒定制</td>
            <td>东莞彩盒定制厂家</td>
            <td>dg</td>
            <td>dg-chdz-003</td>
            <td>szzdhybxgzpyxgs-11735-2790.html</td>
            <td><span class="badge badge-neutral">未推送</span></td>
            <td>2026-07-03 12:00:00</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantKuaitongModal()">编辑</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问站点</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>佛山市</td>
            <td>礼品包装</td>
            <td>佛山礼品包装定制</td>
            <td>fs</td>
            <td>fs-lpbz-004</td>
            <td>szzdhybxgzpyxgs-11735-2785.html</td>
            <td><span class="badge badge-success">已推送</span></td>
            <td>2026-07-04 13:00:00</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantKuaitongModal()">编辑</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问站点</button>
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

    <!-- 创建/编辑快通 -->
    <div class="modal-overlay" id="tenantKuaitongModal" onclick="closeTenantKuaitongModalOnOverlay(event)">
      <div class="modal" style="width:760px;">
        <div class="modal-header">
          <h2 class="modal-title">创建快通站点</h2>
          <button class="modal-close" onclick="closeTenantKuaitongModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <div class="modal-section-title">基础配置</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">所属省份</label>
                <select class="form-select"><option>广东省</option><option>江苏省</option></select>
              </div>
              <div class="form-group">
                <label class="form-label">所属城市</label>
                <select class="form-select"><option>深圳市</option><option>广州市</option></select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">训练词设置</label>
              <select class="form-select">
                <option>包装制品</option>
                <option>瓦楞纸箱</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">TDK 模板设置</label>
              <select class="form-select">
                <option>[city][word][suffix]</option>
                <option>[pro][word][suffix]</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">服务模板设置</label>
              <select class="form-select">
                <option>szzdhybxgzpyxgs-11735-2794.html</option>
                <option>szzdhybxgzpyxgs-11735-2791.html</option>
              </select>
            </div>
          </div>

          <div class="modal-section">
            <div class="modal-section-title">站点信息</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">店铺标题</label>
                <input type="text" class="form-input" placeholder="例如：深圳包装制品厂家" />
              </div>
              <div class="form-group">
                <label class="form-label">关键词</label>
                <input type="text" class="form-input" placeholder="例如：深圳包装制品" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">描述</label>
              <textarea class="form-textarea" rows="2" placeholder="请输入站点描述"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">前缀</label>
                <input type="text" class="form-input" placeholder="例如：sz" />
              </div>
              <div class="form-group">
                <label class="form-label">关联站点</label>
                <input type="text" class="form-input" placeholder="请输入关联站点" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">关联模板</label>
              <select class="form-select">
                <option>szzdhybxgzpyxgs-11735-2794.html</option>
              </select>
            </div>
          </div>

          <div class="modal-section">
            <div class="modal-section-title">发布设置</div>
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">是否启用</div><div class="switch-desc">启用后站点可正常访问</div></div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">是否屏蔽</div><div class="switch-desc">屏蔽后站点不对外展示</div></div>
              <label class="switch"><input type="checkbox"><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">需要推送</div><div class="switch-desc">推送后发布为线上分站</div></div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantKuaitongModal()">取消</button>
          <button class="btn btn-primary" onclick="closeTenantKuaitongModal()">确定</button>
        </div>
      </div>
    </div>
  `;
}

function openTenantKuaitongModal() {
  const modal = document.getElementById('tenantKuaitongModal');
  if (modal) modal.classList.add('active');
}

function closeTenantKuaitongModal() {
  const modal = document.getElementById('tenantKuaitongModal');
  if (modal) modal.classList.remove('active');
}

function closeTenantKuaitongModalOnOverlay(e) {
  if (e.target.id === 'tenantKuaitongModal') closeTenantKuaitongModal();
}
