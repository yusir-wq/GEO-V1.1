/**
 * 用户端 - 快通管理
 */
function renderEndUserKuaitong() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">快通管理</h1>
        <p class="page-header-desc">查看已创建的快通站点，无创建权限</p>
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
                <button class="btn btn-ghost btn-sm" onclick="openEndUserKuaitongModal()">编辑店铺</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问快通站点</button>
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
                <button class="btn btn-ghost btn-sm" onclick="openEndUserKuaitongModal()">编辑店铺</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问快通站点</button>
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
                <button class="btn btn-ghost btn-sm" onclick="openEndUserKuaitongModal()">编辑店铺</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问快通站点</button>
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
                <button class="btn btn-ghost btn-sm" onclick="openEndUserKuaitongModal()">编辑店铺</button>
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问快通站点</button>
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

    <!-- 编辑店铺弹窗 -->
    <div class="modal-overlay" id="endUserKuaitongModal" onclick="closeEndUserKuaitongModalOnOverlay(event)">
      <div class="modal" style="width:720px;">
        <div class="modal-header">
          <h2 class="modal-title">编辑店铺</h2>
          <button class="modal-close" onclick="closeEndUserKuaitongModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">店铺标题</label>
            <input type="text" class="form-input" value="深圳包装制品厂家" />
          </div>
          <div class="form-group">
            <label class="form-label">关键词</label>
            <input type="text" class="form-input" value="深圳包装制品" />
          </div>
          <div class="form-group">
            <label class="form-label">描述</label>
            <textarea class="form-textarea" rows="2">深圳包装制品厂家提供瓦楞纸箱、彩盒定制服务。</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">所属省份</label>
              <input type="text" class="form-input" value="广东省" readonly />
            </div>
            <div class="form-group">
              <label class="form-label">所属城市</label>
              <input type="text" class="form-input" value="深圳市" readonly />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">前缀</label>
            <input type="text" class="form-input" value="sz" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">关联站点</label>
            <input type="text" class="form-input" value="sz-bzzp-001" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">关联模板</label>
            <input type="text" class="form-input" value="szzdhybxgzpyxgs-11735-2794.html" readonly />
          </div>
          <div class="form-group">
            <label class="form-label">训练词</label>
            <input type="text" class="form-input" value="包装制品" readonly />
          </div>
          <div class="modal-section" style="margin-top:20px;">
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">是否启用</div></div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">是否屏蔽</div></div>
              <label class="switch"><input type="checkbox"><span class="slider"></span></label>
            </div>
            <div class="switch-row">
              <div class="switch-info"><div class="switch-name">需要推送</div></div>
              <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeEndUserKuaitongModal()">取消</button>
          <button class="btn btn-primary" onclick="closeEndUserKuaitongModal()">确定</button>
        </div>
      </div>
    </div>
  `;
}

function openEndUserKuaitongModal() {
  const modal = document.getElementById('endUserKuaitongModal');
  if (modal) modal.classList.add('active');
}

function closeEndUserKuaitongModal() {
  const modal = document.getElementById('endUserKuaitongModal');
  if (modal) modal.classList.remove('active');
}

function closeEndUserKuaitongModalOnOverlay(e) {
  if (e.target.id === 'endUserKuaitongModal') closeEndUserKuaitongModal();
}
