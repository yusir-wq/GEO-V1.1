/**
 * 租户端 - 训练词管理
 */
function renderTenantTrainingWords() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">训练词管理</h1>
        <p class="page-header-desc">管理训练词、图片库、知识库与标题模板</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openTenantTrainingWordModal()">+ 新增训练词</button>
      </div>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">训练词列表</span>
          <span class="table-toolbar-count">共 5 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索训练词名称..." />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>训练词名称</th>
            <th>词数</th>
            <th>使用状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>包装制品</td>
            <td>12</td>
            <td><span class="badge badge-success">使用中</span></td>
            <td>2026-07-01 10:23:15</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTrainingWordModal()">编辑训练词</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantImageLibraryModal()">图片库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantKnowledgeModal()">知识库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantTitleTemplateModal()">标题模板</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>瓦楞纸箱</td>
            <td>8</td>
            <td><span class="badge badge-success">使用中</span></td>
            <td>2026-07-02 11:15:22</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTrainingWordModal()">编辑训练词</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantImageLibraryModal()">图片库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantKnowledgeModal()">知识库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantTitleTemplateModal()">标题模板</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>彩盒定制</td>
            <td>6</td>
            <td><span class="badge badge-neutral">未使用</span></td>
            <td>2026-07-03 14:30:08</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTrainingWordModal()">编辑训练词</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantImageLibraryModal()">图片库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantKnowledgeModal()">知识库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantTitleTemplateModal()">标题模板</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>礼品包装</td>
            <td>10</td>
            <td><span class="badge badge-success">使用中</span></td>
            <td>2026-07-04 09:12:44</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTrainingWordModal()">编辑训练词</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantImageLibraryModal()">图片库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantKnowledgeModal()">知识库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantTitleTemplateModal()">标题模板</button>
                <button class="btn btn-ghost btn-sm text-danger">删除</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>纸制品包装</td>
            <td>5</td>
            <td><span class="badge badge-neutral">未使用</span></td>
            <td>2026-07-05 16:45:33</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="openTenantTrainingWordModal()">编辑训练词</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantImageLibraryModal()">图片库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantKnowledgeModal()">知识库</button>
                <button class="btn btn-ghost btn-sm" onclick="openTenantTitleTemplateModal()">标题模板</button>
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

    <!-- 新增/编辑训练词 -->
    <div class="modal-overlay" id="tenantTrainingWordModal" onclick="closeTenantTrainingWordModalOnOverlay(event)">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">新增训练词</h2>
          <button class="modal-close" onclick="closeTenantTrainingWordModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">训练词名称 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：包装制品" />
            <div class="form-hint">必填，去重校验</div>
          </div>
          <div class="form-group">
            <label class="form-label">扩展词</label>
            <textarea class="form-textarea" rows="3" placeholder="输入相关扩展词，用换行分隔"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantTrainingWordModal()">取消</button>
          <button class="btn btn-primary" onclick="closeTenantTrainingWordModal()">保存</button>
        </div>
      </div>
    </div>

    <!-- 图片库 -->
    <div class="modal-overlay" id="tenantImageLibraryModal" onclick="closeTenantImageLibraryModalOnOverlay(event)">
      <div class="modal" style="width:720px;">
        <div class="modal-header">
          <h2 class="modal-title">图片库</h2>
          <button class="modal-close" onclick="closeTenantImageLibraryModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-upload" style="margin-bottom:20px;">
            ${window.getLucideIcon ? window.getLucideIcon('image', 'image') : ''}
            <div class="form-upload-title">批量上传图片</div>
            <div class="form-upload-hint">支持 jpg/jpeg/png/gif/webp 格式，大小不超过 2M</div>
          </div>
          <table class="data-table">
            <thead>
              <tr><th>图片名称</th><th>尺寸</th><th>上传时间</th><th>操作</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>factory-01.jpg</td>
                <td>1200 × 800</td>
                <td>2026-07-01 10:00:00</td>
                <td><div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div></td>
              </tr>
              <tr>
                <td>product-02.jpg</td>
                <td>800 × 600</td>
                <td>2026-07-02 11:00:00</td>
                <td><div class="table-actions"><button class="btn btn-ghost btn-sm">查看</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantImageLibraryModal()">关闭</button>
          <button class="btn btn-primary" onclick="closeTenantImageLibraryModal()">保存修改</button>
        </div>
      </div>
    </div>

    <!-- 知识库 -->
    <div class="modal-overlay" id="tenantKnowledgeModal" onclick="closeTenantKnowledgeModalOnOverlay(event)">
      <div class="modal" style="width:720px;">
        <div class="modal-header">
          <h2 class="modal-title">知识库</h2>
          <button class="modal-close" onclick="closeTenantKnowledgeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">类型</label>
            <select class="form-select">
              <option>首段</option>
              <option>内容</option>
              <option>结尾</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">内容 <span class="required">*</span></label>
            <textarea class="form-textarea" rows="6" placeholder="请输入知识库内容，不超过 800 字"></textarea>
          </div>
          <table class="data-table" style="margin-top:20px;">
            <thead>
              <tr><th>序号</th><th>类型</th><th>内容摘要</th><th>操作</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><span class="badge badge-primary">首段</span></td>
                <td>深圳智达恒业包装制品有限公司成立于2010年...</td>
                <td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div></td>
              </tr>
              <tr>
                <td>2</td>
                <td><span class="badge badge-info">内容</span></td>
                <td>公司拥有先进的生产设备，日产纸箱 10 万只...</td>
                <td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantKnowledgeModal()">关闭</button>
          <button class="btn btn-primary" onclick="closeTenantKnowledgeModal()">保存</button>
        </div>
      </div>
    </div>

    <!-- 标题模板 -->
    <div class="modal-overlay" id="tenantTitleTemplateModal" onclick="closeTenantTitleTemplateModalOnOverlay(event)">
      <div class="modal" style="width:720px;">
        <div class="modal-header">
          <h2 class="modal-title">标题模板</h2>
          <button class="modal-close" onclick="closeTenantTitleTemplateModal()">${window.getLucideIcon ? window.getLucideIcon('x') : '×'}</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">模板名称 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：地区+训练词+后缀" />
          </div>
          <div class="form-group">
            <label class="form-label">标签内容 <span class="required">*</span></label>
            <input type="text" class="form-input" placeholder="例如：[city][word][suffix]" />
          </div>
          <div class="form-group">
            <label class="form-label">类型</label>
            <select class="form-select">
              <option>通用</option>
              <option>产品</option>
              <option>资讯</option>
            </select>
          </div>
          <table class="data-table" style="margin-top:20px;">
            <thead>
              <tr><th>序号</th><th>模板名称</th><th>标签内容</th><th>类型</th><th>操作</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>地区+训练词+后缀</td>
                <td><span class="code-tag">[city][word][suffix]</span></td>
                <td>通用</td>
                <td><div class="table-actions"><button class="btn btn-ghost btn-sm">编辑</button><button class="btn btn-ghost btn-sm text-danger">删除</button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeTenantTitleTemplateModal()">关闭</button>
          <button class="btn btn-primary" onclick="closeTenantTitleTemplateModal()">保存</button>
        </div>
      </div>
    </div>
  `;
}

function openTenantTrainingWordModal() {
  const modal = document.getElementById('tenantTrainingWordModal');
  if (modal) modal.classList.add('active');
}
function closeTenantTrainingWordModal() {
  const modal = document.getElementById('tenantTrainingWordModal');
  if (modal) modal.classList.remove('active');
}
function closeTenantTrainingWordModalOnOverlay(e) {
  if (e.target.id === 'tenantTrainingWordModal') closeTenantTrainingWordModal();
}

function openTenantImageLibraryModal() {
  const modal = document.getElementById('tenantImageLibraryModal');
  if (modal) modal.classList.add('active');
}
function closeTenantImageLibraryModal() {
  const modal = document.getElementById('tenantImageLibraryModal');
  if (modal) modal.classList.remove('active');
}
function closeTenantImageLibraryModalOnOverlay(e) {
  if (e.target.id === 'tenantImageLibraryModal') closeTenantImageLibraryModal();
}

function openTenantKnowledgeModal() {
  const modal = document.getElementById('tenantKnowledgeModal');
  if (modal) modal.classList.add('active');
}
function closeTenantKnowledgeModal() {
  const modal = document.getElementById('tenantKnowledgeModal');
  if (modal) modal.classList.remove('active');
}
function closeTenantKnowledgeModalOnOverlay(e) {
  if (e.target.id === 'tenantKnowledgeModal') closeTenantKnowledgeModal();
}

function openTenantTitleTemplateModal() {
  const modal = document.getElementById('tenantTitleTemplateModal');
  if (modal) modal.classList.add('active');
}
function closeTenantTitleTemplateModal() {
  const modal = document.getElementById('tenantTitleTemplateModal');
  if (modal) modal.classList.remove('active');
}
function closeTenantTitleTemplateModalOnOverlay(e) {
  if (e.target.id === 'tenantTitleTemplateModal') closeTenantTitleTemplateModal();
}
