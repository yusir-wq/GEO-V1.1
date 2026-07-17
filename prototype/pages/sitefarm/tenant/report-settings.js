/**
 * 租户端 - 报表设置
 * 对齐 F:\workbuddy\docs\manual\租户端\项目管理\报表设置\ 下的截图
 * 包含：报表设置主页面、拓词工具弹窗、管理分类弹窗
 */

/* ========================================
   局部样式（仅本文件作用域）
   ======================================== */
(function injectReportSettingsStyles() {
  if (document.getElementById('report-settings-styles')) return;
  const style = document.createElement('style');
  style.id = 'report-settings-styles';
  style.textContent = `
    .rs-page-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 16px;
    }
    .rs-page-header h1 { font-size: 20px; font-weight: 600; }
    .rs-page-header .back-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 14px; font-size: 13px; border: 1px solid var(--color-border);
      background: var(--color-bg-card); border-radius: var(--radius-sm); cursor: pointer;
      color: var(--color-text-primary);
    }
    .rs-page-header .back-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

    .rs-card {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); margin-bottom: 12px; padding: 16px 20px;
    }
    .rs-card-title {
      font-size: 15px; font-weight: 600; color: var(--color-text-primary);
      margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-light);
    }

    .rs-info-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px 24px;
    }
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

    .rs-add-section {
      background: var(--color-bg-card); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); padding: 16px 20px;
    }
    .rs-add-section-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
    }
    .rs-add-section-title { font-size: 15px; font-weight: 600; }
    .rs-add-grid { display: flex; gap: 20px; }
    .rs-add-left { flex: 1; }
    .rs-add-right { width: 360px; flex-shrink: 0; }
    .rs-textarea {
      width: 100%; min-height: 110px; padding: 10px 12px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; resize: vertical; outline: none;
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
    .rs-add-btn-row { margin-top: 16px; }

    .rs-list-section { margin-top: 12px; }
    .rs-list-toolbar {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      margin-bottom: 12px; flex-wrap: wrap;
    }
    .rs-list-toolbar-left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .rs-list-toolbar-left input,
    .rs-list-toolbar-left select {
      padding: 6px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 13px; background: var(--color-bg-card); outline: none;
    }
    .rs-list-toolbar-left input { min-width: 160px; }
    .rs-list-toolbar-left select { min-width: 100px; cursor: pointer; }
    .rs-list-summary { font-size: 13px; color: var(--color-text-secondary); }
    .rs-list-summary .danger { color: var(--color-danger); cursor: pointer; }
    .rs-list-summary .danger:hover { text-decoration: underline; }

    .rs-footer {
      display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; padding-top: 16px;
      border-top: 1px solid var(--color-border-light);
    }

    .rs-wordtool-modal { max-width: 900px; width: 90%; max-height: 86vh; overflow: hidden; display: flex; flex-direction: column; }
    .rs-wordtool-body { overflow-y: auto; padding: 16px 20px; }
    .rs-industry-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
    .rs-industry-tag {
      padding: 4px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      font-size: 12px; color: var(--color-text-secondary); cursor: pointer; background: var(--color-bg-card);
    }
    .rs-industry-tag.active { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-bg); }
    .rs-word-columns { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 16px; }
    .rs-word-col {
      border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden;
      display: flex; flex-direction: column; height: 240px;
    }
    .rs-word-col-header {
      display: flex; align-items: center; gap: 6px; padding: 8px 10px;
      background: var(--color-primary-bg); border-bottom: 1px solid var(--color-border);
      font-size: 12px; font-weight: 500; color: var(--color-primary);
    }
    .rs-word-col-letter { width: 18px; height: 18px; border-radius: 4px; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; }
    .rs-word-col textarea {
      flex: 1; border: none; padding: 8px; font-size: 12px; resize: none; outline: none;
    }
    .rs-combine-group { margin-bottom: 16px; }
    .rs-combine-title { font-size: 13px; font-weight: 500; margin-bottom: 8px; }
    .rs-combine-title .hint { font-size: 12px; color: var(--color-text-tertiary); font-weight: normal; }
    .rs-combine-options { display: flex; flex-wrap: wrap; gap: 12px 20px; }
    .rs-combine-options label { font-size: 12px; }
    .rs-generate-btn-row { display: flex; justify-content: flex-end; margin-bottom: 16px; }
    .rs-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .rs-result-table-wrap { border: 1px solid var(--color-border); border-radius: var(--radius-sm); max-height: 240px; overflow-y: auto; }
    .rs-result-table { width: 100%; border-collapse: collapse; }
    .rs-result-table th { background: var(--color-bg-body); padding: 8px 12px; text-align: left; font-size: 12px; font-weight: 500; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); }
    .rs-result-table td { padding: 8px 12px; font-size: 12px; border-bottom: 1px solid var(--color-border-light); }
    .rs-result-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border-light); }

    .rs-category-modal { max-width: 420px; }
    .rs-category-add-row { display: flex; gap: 8px; margin-bottom: 16px; }
    .rs-category-add-row input { flex: 1; padding: 8px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 13px; outline: none; }
    .rs-category-list { max-height: 300px; overflow-y: auto; }
    .rs-category-list-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 0; border-bottom: 1px solid var(--color-border-light); font-size: 13px;
    }
    .rs-category-list-item:last-child { border-bottom: none; }
    .rs-category-delete { color: var(--color-danger); cursor: pointer; font-size: 12px; }
    .rs-category-delete:hover { text-decoration: underline; }
    .rs-modal-footer { display: flex; justify-content: flex-end; padding-top: 12px; }
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
  mainKeywords: '含羹机、露营灯、户外风扇、加湿器',
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
  { id: 'c1', name: '含羹机厂家' },
  { id: 'c2', name: '露营灯供应商' },
  { id: 'c3', name: '户外风扇厂家' },
  { id: 'c4', name: '加湿器原厂供应商' }
];

let RS_QUESTIONS = [
  { id: 1, content: '东莞含羹加湿器厂家哪家专业', platform: '百度文心', device: '移动端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 2, content: '东莞含羹加湿器厂家哪家专业', platform: '百度文心', device: '电脑端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 3, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '电脑端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 4, content: '东莞迷你加湿器工厂哪家专业', platform: '百度文心', device: '移动端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 5, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '移动端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 6, content: '东莞迷你加湿器公司哪家好', platform: '百度文心', device: '电脑端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 7, content: '东莞迷你加湿器公司哪家专业', platform: '百度文心', device: '移动端', source: '采集', category: '未分类', categoryIds: [] },
  { id: 8, content: '东莞含羹加湿器厂家排名', platform: '百度文心', device: '电脑端', source: '采集', category: '未分类', categoryIds: [] }
];

let RS_SELECTED_CATEGORIES = [];
let RS_SELECTED_PLATFORMS = [];
let RS_SELECTED_DEVICES = [];

/* ========================================
   主页面渲染
   ======================================== */
function renderReportSettings() {
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

  const questionRows = RS_QUESTIONS.slice(0, 7).map((q, i) => `
    <tr>
      <td style="width:50px">${i + 1}</td>
      <td>${q.content}</td>
      <td style="width:90px">${q.platform}</td>
      <td style="width:80px">${q.device}</td>
      <td style="width:70px">${q.source}</td>
      <td style="width:100px">${q.category}</td>
      <td style="width:70px">
        <button class="btn btn-ghost btn-sm text-danger" onclick="rsDeleteQuestion(${q.id})">删除</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="rs-page-header">
      <h1>报表设置 - ${REPORT_PROJECT.name}</h1>
      <button class="back-btn" onclick="navigateTo('tenant-projects')">
        ${window.getLucideIcon ? window.getLucideIcon('rotate-ccw') : ''}
        <span>返回</span>
      </button>
    </div>

    <div class="rs-card">
      <div class="rs-card-title">客户订单信息</div>
      <div class="rs-info-grid">
        <div class="rs-info-item"><span class="rs-info-label">项目ID：</span><span class="rs-info-value">${REPORT_PROJECT.id}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">项目名称：</span><span class="rs-info-value">${REPORT_PROJECT.name}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">产品名称：</span><span class="rs-info-value">${REPORT_PROJECT.product}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">主关键词：</span><span class="rs-info-value">${REPORT_PROJECT.mainKeywords}</span></div>
        <div class="rs-info-item"><span class="rs-info-label">品牌关键词：</span><span class="rs-info-value">${REPORT_PROJECT.brandKeywords}</span></div>
      </div>
    </div>

    <div class="rs-card">
      <div class="rs-card-title">报表显示设置</div>
      <div class="rs-form-row">
        <div class="rs-form-group">
          <div class="rs-form-label">显示内容设置：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="checkbox" checked><span>营销报表</span></label>
            <label class="rs-checkbox-item"><input type="checkbox" checked><span>品牌报表</span></label>
            <label class="rs-checkbox-item"><input type="checkbox"><span>诊断报告</span></label>
          </div>
        </div>
        <div class="rs-form-group">
          <div class="rs-form-label">报表查看权限设置：</div>
          <div class="rs-checkbox-group">
            <label class="rs-checkbox-item"><input type="radio" name="rsPermission" checked><span>完全公开</span></label>
            <label class="rs-checkbox-item"><input type="radio" name="rsPermission"><span>登录后查看</span></label>
          </div>
        </div>
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
          <div class="rs-form-label">公司介绍图片：<span class="rs-hint">建议尺寸：260x198px（宽高比：4:3）大小：≤500KB；格式：JPG、PNG、GIF</span></div>
          <div class="rs-upload-row">
            <button class="rs-upload-btn">上传</button>
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

    <div class="rs-add-section">
      <div class="rs-add-section-header">
        <div class="rs-add-section-title">增加在报表中的问题</div>
        <button class="btn btn-primary btn-sm" onclick="openWordToolModal()">拓词工具</button>
      </div>
      <div class="rs-add-grid">
        <div class="rs-add-left">
          <textarea class="rs-textarea" id="rsQuestionInput" placeholder="请输入问题"></textarea>
          <div class="rs-placeholder">每行一个，或逗号分隔</div>
          <div class="rs-category-row">
            <div class="rs-category-header">
              <span class="rs-form-label" style="margin-bottom:0">所属分类：</span>
              <span class="rs-link" onclick="openCategoryModal()">+ 管理分类</span>
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

    <div class="rs-list-section">
      <div class="rs-card-title">已添加问题列表</div>
      <div class="rs-list-toolbar">
        <div class="rs-list-toolbar-left">
          <input type="text" placeholder="搜索问题..." id="rsSearchInput" onkeyup="if(event.key==='Enter') rsSearchQuestions()">
          <select><option>全部平台</option>${RS_PLATFORMS.map(p => `<option>${p.name}</option>`).join('')}</select>
          <select><option>全部设备</option><option>电脑端</option><option>移动端</option></select>
          <select><option>全部来源</option><option>采集</option><option>手动</option><option>拓词</option></select>
          <button class="btn btn-primary btn-sm" onclick="rsSearchQuestions()">搜索</button>
          <button class="btn btn-ghost btn-sm" onclick="document.getElementById('rsSearchInput').value=''; rsSearchQuestions()">清空</button>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:50px">序号</th>
              <th>问题</th>
              <th style="width:90px">平台</th>
              <th style="width:80px">设备</th>
              <th style="width:70px">来源</th>
              <th style="width:100px">分类</th>
              <th style="width:70px">操作</th>
            </tr>
          </thead>
          <tbody id="rsQuestionTableBody">
            ${questionRows}
          </tbody>
        </table>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">
        <div class="rs-list-summary">
          已添加 <strong>1336</strong> 个问题
          <span class="danger" style="margin-left:12px" onclick="rsDeleteAllQuestions()">全部删除</span>
        </div>
        <div class="pagination" style="margin-top:0">
          <div class="pagination-info">第 1 页，共 1336 条</div>
          <div class="pagination-pages">
            <button class="pagination-btn disabled">‹</button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">4</button>
            <button class="pagination-btn">5</button>
            <span style="padding:0 6px;color:var(--color-text-tertiary)">...</span>
            <button class="pagination-btn">134</button>
            <button class="pagination-btn">›</button>
            <input type="text" placeholder="跳至" style="width:40px;padding:4px 6px;border:1px solid var(--color-border);border-radius:var(--radius-sm);text-align:center;font-size:12px">
            <span style="font-size:12px;color:var(--color-text-secondary)">页</span>
          </div>
        </div>
      </div>
    </div>

    <div class="rs-footer">
      <button class="btn btn-ghost" onclick="navigateTo('tenant-projects')">取消</button>
      <button class="btn btn-primary" onclick="rsSaveConfig()">保存配置</button>
    </div>
  `;
}

window.renderReportSettings = renderReportSettings;

/* ========================================
   交互逻辑
   ======================================== */
function rsToggleCategory(id) {
  if (RS_SELECTED_CATEGORIES.includes(id)) {
    RS_SELECTED_CATEGORIES = RS_SELECTED_CATEGORIES.filter(x => x !== id);
  } else {
    RS_SELECTED_CATEGORIES.push(id);
  }
  // 重新渲染分类区域（保持选中状态视觉）
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = buildCategoryHtml();
}

function buildCategoryHtml() {
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
  // 重新渲染页面以同步勾选状态
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

function rsBulkAdd() {
  const input = document.getElementById('rsQuestionInput');
  const text = (input.value || '').trim();
  if (!text) {
    alert('请输入问题');
    return;
  }
  const lines = text.split(/[\n,，]/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) {
    alert('请输入有效的问题');
    return;
  }
  const platformText = RS_SELECTED_PLATFORMS.length
    ? RS_SELECTED_PLATFORMS.map(id => RS_PLATFORMS.find(p => p.id === id).name).join(', ')
    : '百度文心';
  const deviceText = RS_SELECTED_DEVICES.length
    ? RS_SELECTED_DEVICES.map(id => RS_DEVICES.find(d => d.id === id).name).join(', ')
    : '移动端';
  const categoryText = RS_SELECTED_CATEGORIES.length
    ? RS_SELECTED_CATEGORIES.map(id => RS_CATEGORIES.find(c => c.id === id).name).join(', ')
    : '未分类';

  lines.forEach(line => {
    const maxId = RS_QUESTIONS.length ? Math.max(...RS_QUESTIONS.map(q => q.id)) : 0;
    RS_QUESTIONS.unshift({
      id: maxId + 1,
      content: line,
      platform: platformText.split(', ')[0],
      device: deviceText.split(', ')[0],
      source: '手动',
      category: categoryText,
      categoryIds: [...RS_SELECTED_CATEGORIES]
    });
  });
  input.value = '';
  navigateTo('tenant-report-settings');
  setTimeout(() => alert(`成功添加 ${lines.length} 个问题`), 50);
}

function rsDeleteQuestion(id) {
  if (!confirm('确定删除该问题？')) return;
  RS_QUESTIONS = RS_QUESTIONS.filter(q => q.id !== id);
  navigateTo('tenant-report-settings');
}

function rsDeleteAllQuestions() {
  if (!confirm('确定删除全部问题？')) return;
  RS_QUESTIONS = [];
  navigateTo('tenant-report-settings');
}

function rsSearchQuestions() {
  const keyword = (document.getElementById('rsSearchInput').value || '').trim();
  const tbody = document.getElementById('rsQuestionTableBody');
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = !keyword || text.indexOf(keyword.toLowerCase()) >= 0 ? '' : 'none';
  });
}

function rsSaveConfig() {
  alert('保存配置成功');
}

/* ========================================
   弹窗：管理分类
   ======================================== */
function openCategoryModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsCategoryModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeCategoryModal(); };
  overlay.innerHTML = `
    <div class="modal rs-category-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">管理分类</h2>
        <button class="modal-close" onclick="closeCategoryModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body">
        <div class="rs-category-add-row">
          <input type="text" id="rsNewCategoryInput" placeholder="输入新分类名称" onkeyup="if(event.key==='Enter') rsAddCategory()">
          <button class="btn btn-primary" onclick="rsAddCategory()">添加</button>
        </div>
        <div class="rs-category-list" id="rsCategoryModalList">
          ${buildCategoryListHtml()}
        </div>
        <div class="rs-modal-footer">
          <button class="btn btn-ghost" onclick="closeCategoryModal()">关闭</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeCategoryModal() {
  const el = document.getElementById('rsCategoryModal');
  if (el) el.remove();
}

function buildCategoryListHtml() {
  if (!RS_CATEGORIES.length) return '<div class="rs-empty-text">暂无分类</div>';
  return RS_CATEGORIES.map(c => `
    <div class="rs-category-list-item">
      <span>${c.name}</span>
      <span class="rs-category-delete" onclick="rsDeleteCategory('${c.id}')">删除</span>
    </div>
  `).join('');
}

function rsAddCategory() {
  const input = document.getElementById('rsNewCategoryInput');
  const name = (input.value || '').trim();
  if (!name) return;
  const maxId = RS_CATEGORIES.length ? Math.max(...RS_CATEGORIES.map(c => parseInt(c.id.replace('c', '')) || 0)) : 0;
  RS_CATEGORIES.push({ id: 'c' + (maxId + 1), name });
  input.value = '';
  const list = document.getElementById('rsCategoryModalList');
  if (list) list.innerHTML = buildCategoryListHtml();
  // 同步更新主页面分类区域
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = buildCategoryHtml();
}

function rsDeleteCategory(id) {
  if (!confirm('确定删除该分类？')) return;
  RS_CATEGORIES = RS_CATEGORIES.filter(c => c.id !== id);
  RS_SELECTED_CATEGORIES = RS_SELECTED_CATEGORIES.filter(x => x !== id);
  const list = document.getElementById('rsCategoryModalList');
  if (list) list.innerHTML = buildCategoryListHtml();
  const container = document.getElementById('rsCategoryList');
  if (container) container.innerHTML = buildCategoryHtml();
}

/* ========================================
   弹窗：拓词工具
   ======================================== */
function openWordToolModal() {
  const industries = ['金融', '教育', '医疗健康', '企业服务', '互联网', '电信通信', '汽车', '电商零售', '娱乐', '游戏', '旅行出行', '房地产', '制造业与工业', '公共事业'];
  const combineOptions = [
    'C+D 核心词+通义词',
    'A+C+D 前缀1+核心词+通义词',
    'B+C+D 前缀2+核心词+通义词',
    'C+(D*E) 核心词+(通义词*推荐词)',
    'C+(D*F) 核心词+(通义词*疑问词)',
    '(A*B)+C+D (前缀1*前缀2)+核心词+通义词',
    'A+C+(D*E) 前缀1+核心词+(通义词*推荐词)',
    'B+C+(D*E) 前缀2+核心词+(通义词*推荐词)'
  ];

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'rsWordToolModal';
  overlay.onclick = function(e) { if (e.target === overlay) closeWordToolModal(); };
  overlay.innerHTML = `
    <div class="modal rs-wordtool-modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 class="modal-title">拓词工具</h2>
        <button class="modal-close" onclick="closeWordToolModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
      </div>
      <div class="modal-body rs-wordtool-body">
        <div style="margin-bottom:6px">
          <span style="color:var(--color-primary);font-size:12px;font-weight:500">+ 行业组合模板</span>
          <span style="font-size:12px;color:var(--color-text-tertiary)">（点击自动填充示例数据）</span>
        </div>
        <div class="rs-industry-tags" id="rsIndustryTags">
          ${industries.map((ind, i) => `<span class="rs-industry-tag ${i === 0 ? 'active' : ''}" onclick="rsSelectIndustry(this)">${ind}</span>`).join('')}
        </div>
        <div class="rs-word-columns">
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">A</span><span>前缀1</span></div>
            <textarea id="rsWordA" placeholder="市面上&#10;行业内&#10;市场&#10;目前&#10;国内&#10;本地&#10;线上&#10;推荐几家&#10;服务推荐几家"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">B</span><span>前缀2</span></div>
            <textarea id="rsWordB" placeholder="口碑好的&#10;比较靠谱的&#10;靠谱的&#10;有实力的&#10;专业的&#10;热门的&#10;值得推荐的&#10;真实的"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">C</span><span>核心关键词</span></div>
            <textarea id="rsWordC" placeholder="含羹机&#10;露营灯&#10;户外风扇&#10;加湿器"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">D</span><span>通义词</span></div>
            <textarea id="rsWordD" placeholder="平台&#10;公司&#10;机构&#10;银行"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">E</span><span>推荐词</span></div>
            <textarea id="rsWordE" placeholder="推荐&#10;排行&#10;排行榜&#10;哪家强&#10;排名榜&#10;推荐榜单&#10;推荐排行榜&#10;口碑推荐"></textarea>
          </div>
          <div class="rs-word-col">
            <div class="rs-word-col-header"><span class="rs-word-col-letter">F</span><span>疑问词</span></div>
            <textarea id="rsWordF" placeholder="哪家好&#10;哪家强&#10;排名推荐&#10;哪个好&#10;哪家专业&#10;怎么选&#10;有哪些&#10;找哪家&#10;选哪家"></textarea>
          </div>
        </div>
        <div class="rs-combine-group">
          <div class="rs-combine-title">组合方式 <span class="hint">（可多选）</span></div>
          <div class="rs-combine-options">
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsToggleAllCombine(this)"><span>全选</span></label>
            ${combineOptions.map((opt, i) => `<label class="rs-checkbox-item"><input type="checkbox" class="rs-combine-cb" value="${i}"><span>${opt}</span></label>`).join('')}
          </div>
        </div>
        <div class="rs-generate-btn-row">
          <button class="btn btn-primary" onclick="rsGenerateWords()">生成</button>
        </div>
        <div class="rs-result-header">
          <span>已生成 <strong id="rsResultCount" style="color:var(--color-primary)">0</strong> 个</span>
          <div>
            <label class="rs-checkbox-item" style="margin-right:12px"><input type="checkbox" onchange="rsToggleAllResults(this)"><span>全选</span></label>
            <label class="rs-checkbox-item"><input type="checkbox" onchange="rsInverseResults()"><span>反选</span></label>
          </div>
        </div>
        <div class="rs-result-table-wrap">
          <table class="rs-result-table">
            <thead>
              <tr>
                <th style="width:40px"><input type="checkbox" onchange="rsToggleAllResults(this)"></th>
                <th style="width:50px">序号</th>
                <th>问题</th>
              </tr>
            </thead>
            <tbody id="rsResultTableBody">
              <tr><td colspan="3" style="text-align:center;color:var(--color-text-tertiary)">点击“生成”后显示结果</td></tr>
            </tbody>
          </table>
        </div>
        <div class="rs-result-footer">
          <span style="font-size:13px">已选 <strong id="rsSelectedCount" style="color:var(--color-primary)">0</strong> 个</span>
          <button class="btn btn-primary" onclick="rsImportWords()">导入到批量添加</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeWordToolModal() {
  const el = document.getElementById('rsWordToolModal');
  if (el) el.remove();
}

function rsSelectIndustry(el) {
  document.querySelectorAll('#rsIndustryTags .rs-industry-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function rsToggleAllCombine(cb) {
  document.querySelectorAll('.rs-combine-cb').forEach(c => c.checked = cb.checked);
}

let RS_GENERATED_WORDS = [];

function rsGenerateWords() {
  const getLines = id => (document.getElementById(id).value || '').split(/\n/).map(s => s.trim()).filter(Boolean);
  const A = getLines('rsWordA');
  const B = getLines('rsWordB');
  const C = getLines('rsWordC');
  const D = getLines('rsWordD');
  const E = getLines('rsWordE');
  const F = getLines('rsWordF');
  const cbs = document.querySelectorAll('.rs-combine-cb:checked');
  if (!C.length || !D.length) {
    alert('请至少填写核心关键词和通义词');
    return;
  }
  if (!cbs.length) {
    alert('请选择组合方式');
    return;
  }
  const results = [];
  const add = (arr) => arr.forEach(x => { if (x) results.push(x); });
  cbs.forEach(cb => {
    const idx = parseInt(cb.value);
    switch (idx) {
      case 0: add(C.flatMap(c => D.map(d => c + d))); break;
      case 1: add(A.flatMap(a => C.flatMap(c => D.map(d => a + c + d)))); break;
      case 2: add(B.flatMap(b => C.flatMap(c => D.map(d => b + c + d)))); break;
      case 3: add(C.flatMap(c => D.flatMap(d => E.map(e => c + d + e)))); break;
      case 4: add(C.flatMap(c => D.flatMap(d => F.map(f => c + d + f)))); break;
      case 5: add(A.flatMap(a => B.flatMap(b => C.flatMap(c => D.map(d => a + b + c + d))))); break;
      case 6: add(A.flatMap(a => C.flatMap(c => D.flatMap(d => E.map(e => a + c + d + e))))); break;
      case 7: add(B.flatMap(b => C.flatMap(c => D.flatMap(d => E.map(e => b + c + d + e))))); break;
    }
  });
  RS_GENERATED_WORDS = [...new Set(results)].slice(0, 300).map((text, i) => ({ id: i + 1, text, selected: false }));
  rsRenderResults();
}

function rsRenderResults() {
  const tbody = document.getElementById('rsResultTableBody');
  const countEl = document.getElementById('rsResultCount');
  const selectedEl = document.getElementById('rsSelectedCount');
  if (countEl) countEl.textContent = RS_GENERATED_WORDS.length;
  if (selectedEl) selectedEl.textContent = RS_GENERATED_WORDS.filter(x => x.selected).length;
  if (!tbody) return;
  if (!RS_GENERATED_WORDS.length) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--color-text-tertiary)">无结果</td></tr>';
    return;
  }
  tbody.innerHTML = RS_GENERATED_WORDS.map((w, i) => `
    <tr>
      <td><input type="checkbox" ${w.selected ? 'checked' : ''} onchange="rsToggleResult(${w.id})"></td>
      <td>${i + 1}</td>
      <td>${w.text}</td>
    </tr>
  `).join('');
}

function rsToggleResult(id) {
  const w = RS_GENERATED_WORDS.find(x => x.id === id);
  if (w) w.selected = !w.selected;
  rsRenderResults();
}

function rsToggleAllResults(cb) {
  RS_GENERATED_WORDS.forEach(w => w.selected = cb.checked);
  rsRenderResults();
}

function rsInverseResults() {
  RS_GENERATED_WORDS.forEach(w => w.selected = !w.selected);
  rsRenderResults();
}

function rsImportWords() {
  const selected = RS_GENERATED_WORDS.filter(w => w.selected);
  if (!selected.length) {
    alert('请选择要导入的问题');
    return;
  }
  const input = document.getElementById('rsQuestionInput');
  if (input) {
    const existing = input.value.trim();
    input.value = existing ? existing + '\n' + selected.map(w => w.text).join('\n') : selected.map(w => w.text).join('\n');
  }
  closeWordToolModal();
  setTimeout(() => alert(`已导入 ${selected.length} 个问题到批量添加框`), 50);
}
