/**
 * 租户端 - 项目管理 (V2 重构版)
 * 对齐 F:\workbuddy\docs\manual\租户端\项目管理\ 下的截图
 * 包含：项目列表、新建/修改提单、续费、分享报表
 */

/* ========================================
   局部样式（仅本文件作用域）
   ======================================== */
(function injectProjectMgmtStyles() {
  if (document.getElementById('project-mgmt-styles')) return;
  const style = document.createElement('style');
  style.id = 'project-mgmt-styles';
  style.textContent = `
    .pm-filter-bar {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-md);
      margin-bottom: 12px; flex-wrap: wrap;
    }
    .pm-filter-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--color-text-secondary); }
    .pm-filter-item input,
    .pm-filter-item select {
      padding: 6px 10px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px;
      background: var(--color-bg-card); outline: none;
    }
    .pm-filter-item input:focus, .pm-filter-item select:focus { border-color: var(--color-primary); }
    .pm-filter-item input { min-width: 160px; }
    .pm-filter-item select { min-width: 100px; cursor: pointer; }
    .pm-filter-date {
      display: flex; align-items: center; gap: 6px;
    }
    .pm-filter-date input { min-width: 130px; }
    .pm-filter-actions { margin-left: auto; display: flex; gap: 8px; }
    .pm-id-ellipsis {
      max-width: 110px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; display: inline-block; vertical-align: middle;
    }
    .pm-name-ellipsis {
      max-width: 220px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; display: inline-block; vertical-align: middle;
    }
    .pm-product-cell {
      max-width: 240px; line-height: 1.4; font-size: 12px; color: var(--color-text-secondary);
    }
    .pm-platforms-cell {
      max-width: 130px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; display: inline-block; color: var(--color-text-secondary); font-size: 12px;
    }
    .pm-action-dropdown { position: relative; display: inline-block; }
    .pm-action-dropdown .pm-dropdown-menu {
      display: none; position: absolute; right: 0; top: 100%;
      margin-top: 4px; min-width: 120px; background: var(--color-bg-card);
      border: 1px solid var(--color-border); border-radius: var(--radius-sm);
      box-shadow: var(--shadow-md); padding: 4px 0; z-index: 100;
    }
    .pm-action-dropdown.open .pm-dropdown-menu { display: block; }
    .pm-action-dropdown .pm-dropdown-menu a {
      display: block; padding: 6px 12px; font-size: 13px;
      color: var(--color-text-primary); cursor: pointer; text-decoration: none;
    }
    .pm-action-dropdown .pm-dropdown-menu a:hover { background: var(--color-primary-bg); color: var(--color-primary); }

    .pm-customer-table { width: 100%; border-collapse: collapse; }
    .pm-customer-table th {
      background: var(--color-bg-card); padding: 10px 14px; text-align: left;
      font-size: 13px; font-weight: 500; color: var(--color-text-secondary);
      border-bottom: 1px solid var(--color-border);
    }
    .pm-customer-table td {
      padding: 10px 14px; font-size: 13px;
      border-bottom: 1px solid var(--color-border-light);
    }
    .pm-customer-table tr { cursor: pointer; }
    .pm-customer-table tr:hover td { background: var(--color-primary-bg); }

    .pm-radio-options { display: flex; flex-wrap: wrap; gap: 16px; }
    .pm-radio-options label {
      display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;
    }
    .pm-radio-options input[type="radio"] { accent-color: var(--color-primary); }

    .pm-summary-row { display: flex; gap: 32px; margin-bottom: 16px; font-size: 13px; }
    .pm-summary-row .pm-sum-item .pm-sum-label { color: var(--color-text-tertiary); margin-right: 6px; }
    .pm-summary-row .pm-sum-item .pm-sum-value { color: var(--color-text-primary); font-weight: 500; }
    .pm-balance-text { color: var(--color-success); font-weight: 600; }

    .pm-renewal-prices { display: flex; gap: 24px; margin: 8px 0 12px; flex-wrap: wrap; }
    .pm-renewal-prices label {
      display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;
    }
    .pm-renewal-prices input[type="radio"] { accent-color: var(--color-primary); }
    .pm-renewal-prices .pm-price-amount { color: var(--color-text-tertiary); font-size: 12px; }

    .pm-share-row { display: flex; gap: 8px; align-items: center; }
    .pm-share-row input {
      flex: 1; padding: 8px 10px; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); font-size: 13px; background: var(--color-bg-body);
      color: var(--color-text-secondary);
    }

    .pm-toast {
      position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
      background: rgba(16, 26, 58, 0.92); color: #fff; padding: 10px 18px;
      border-radius: var(--radius-sm); font-size: 13px; z-index: 9999;
      box-shadow: var(--shadow-lg); animation: pm-fade 1.6s ease forwards;
    }
    @keyframes pm-fade {
      0% { opacity: 0; transform: translate(-50%, 10px); }
      10%, 80% { opacity: 1; transform: translate(-50%, 0); }
      100% { opacity: 0; transform: translate(-50%, -10px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ========================================
   模拟数据
   ======================================== */
const PROJECT_CUSTOMER_LIST = [
  { loginAccount: 'edu_growth2026',  company: '广州启航多元教育咨询有限公司' },
  { loginAccount: 'geo_shop99',      company: '广州极速网络电商有限公司' },
  { loginAccount: 'cy_chuan88',      company: '成都市锦江区大川柴火锅店' },
  { loginAccount: 'beauty_lead',     company: '成都市锦江区瑞丽雅医疗美容诊所' },
  { loginAccount: 'finance_lead',    company: '深圳前海易普金服财务有限公司' },
  { loginAccount: 'geo_iot_smart',   company: '深圳智控物联网科技有限公司' },
  { loginAccount: 'lukj',            company: '显王科技有限公司' }
];

const PROJECT_LIST = [
  { id: 'APZ4P49F', name: '成都显胜电子GEO优化项目', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '年付', industry: '制造业', keywordCount: 5, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '成都显胜电子有限公司' },
  { id: 'JBE94997', name: '大川柴火锅店品...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '餐饮', keywordCount: 1, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '成都显胜电子有限公司' },
  { id: 'EA770924', name: '萌萌鸭鸭鸭鸭鸭...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '制造业', keywordCount: 1, brandHit: 1, platforms: '百度文心, DeepSeek', customer: '显王科技有限公司' },
  { id: 'ADE800FD', name: '202602李来（梦3）...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '游戏', keywordCount: 5, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '多啊' },
  { id: 'EAC60868', name: '天津新达数科-2026...', product: 'GEO全网AI暴露跟推套餐(50词-年付版)', productId: 'de736936...', chargeMode: '固定收费', chargeCycle: '年付', industry: '互联网', keywordCount: 5, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '天津新达数数字科技有限公司' },
  { id: 'E0A30949', name: '和平区速快快销店-...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '餐饮', keywordCount: 5, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '和平区速快快销店' },
  { id: '4F84E2F0', name: '武汉吉香槟房...', product: 'GEO全网AI暴露跟推套餐(50词-年付版)', productId: 'de736936...', chargeMode: '固定收费', chargeCycle: '年付', industry: '制造业', keywordCount: 11, brandHit: 4, platforms: '百度文心, DeepSeek', customer: '武汉吉香槟食品有限公司' },
  { id: 'MAC14F7',  name: '成都显胜电子GEO...', product: 'GEO全网AI暴露跟推套餐(50词-年付版)', productId: 'de736936...', chargeMode: '固定收费', chargeCycle: '年付', industry: '互联网', keywordCount: 11, brandHit: 3, platforms: '百度文心, DeepSeek', customer: '成都显胜电子有限公司' },
  { id: '12F827C9', name: '智控物联全球独立...', product: 'GEO标准词排名按天计费套餐', productId: '9b21dbc9...', chargeMode: '按天收费', chargeCycle: '-', industry: '零售', keywordCount: 0, brandHit: 1, platforms: '百度文心, DeepSeek', customer: '广州启航多元教育咨询有限公司' },
  { id: '6D1E8F60', name: '显王科技项目2026...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '互联网', keywordCount: 4, brandHit: 1, platforms: '百度文心, DeepSeek', customer: '显王科技有限公司' },
  { id: '36N2C3C',  name: '瑞丽雅医疗美容...', product: 'GEO企业基础曝光套餐(5关键词+2品牌词)', productId: '4f3a4971...', chargeMode: '固定收费', chargeCycle: '月付', industry: '医疗', keywordCount: 5, brandHit: 2, platforms: '百度文心, DeepSeek', customer: '成都市锦江区瑞丽雅医疗美...' }
];

/* ========================================
   主页面渲染
   ======================================== */
function renderTenantProjects() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">项目管理</h1>
        <p class="page-header-desc">管理客户GEO项目进度</p>
      </div>
    </div>

    <div class="pm-filter-bar">
      <div class="pm-filter-item">
        <span>项目名称：</span>
        <input type="text" placeholder="模糊搜索..." />
      </div>
      <div class="pm-filter-item">
        <span>状态：</span>
        <select>
          <option>全部</option>
          <option>进行中</option>
          <option>已完成</option>
          <option>已暂停</option>
        </select>
      </div>
      <div class="pm-filter-item">
        <span>计费：</span>
        <select>
          <option>全部</option>
          <option>固定收费</option>
          <option>按天收费</option>
        </select>
      </div>
      <div class="pm-filter-item">
        <span>创建时间：</span>
        <div class="pm-filter-date">
          <input type="date" value="2026-07-01" />
          <span style="color:var(--color-text-tertiary)">至</span>
          <input type="date" value="2026-07-17" />
        </div>
      </div>
      <div class="pm-filter-actions">
        <button class="btn btn-primary">搜索</button>
        <button class="btn btn-secondary">清除</button>
      </div>
    </div>

    <div style="margin-bottom:12px">
      <button class="btn btn-primary" onclick="openProjectCustomerSelectModal()">+ 新建项目</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:48px">序号</th>
            <th style="width:110px">项目ID</th>
            <th style="width:200px">项目名称</th>
            <th style="width:260px">购买产品名称/产品ID</th>
            <th style="width:130px">收费模式</th>
            <th style="width:90px">项目行业分类</th>
            <th style="width:80px">关键词数</th>
            <th style="width:90px">品牌词(命中)</th>
            <th style="width:140px">支持平台</th>
            <th style="width:180px">所属客户</th>
            <th style="width:220px">操作</th>
          </tr>
        </thead>
        <tbody>
          ${PROJECT_LIST.map((p, i) => projectRowHtml(p, i + 1)).join('')}
        </tbody>
      </table>
      <div class="pagination">
        <div class="pagination-info">显示 1-${PROJECT_LIST.length} 条，共 ${PROJECT_LIST.length} 条</div>
        <div class="pagination-pages">
          <button class="pagination-btn disabled">‹</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <button class="pagination-btn">›</button>
        </div>
      </div>
    </div>
  `;
}

function projectRowHtml(p, idx) {
  return `
    <tr>
      <td>${idx}</td>
      <td><span class="pm-id-ellipsis" title="${p.id}">${p.id}...</span></td>
      <td><span class="pm-name-ellipsis" title="${p.name}">${p.name}</span></td>
      <td>
        <div class="pm-product-cell">${p.product}</div>
        <div class="pm-product-cell" style="color:var(--color-text-tertiary);font-size:11px">${p.productId}</div>
      </td>
      <td>${p.chargeMode}<br><span style="font-size:11px;color:var(--color-text-tertiary)">${p.chargeCycle}</span></td>
      <td>${p.industry}</td>
      <td>${p.keywordCount}</td>
      <td>${p.brandHit}</td>
      <td><span class="pm-platforms-cell" title="${p.platforms}">${p.platforms}</span></td>
      <td><span class="pm-name-ellipsis" title="${p.customer}" style="max-width:160px">${p.customer}</span></td>
      <td>
        <div class="table-actions" onclick="event.stopPropagation()">
          <button class="btn btn-ghost btn-sm" onclick="pmShowToast('查看项目：${p.name}')">查看</button>
          <button class="btn btn-ghost btn-sm" onclick="openProjectEditModal('${p.id}')">修改</button>
          <div class="pm-action-dropdown" id="pmdd_${p.id}">
            <button class="btn btn-ghost btn-sm" onclick="pmToggleDropdown('pmdd_${p.id}')">管线 ▾</button>
            <div class="pm-dropdown-menu">
              <a onclick="openProjectRenewalModal('${p.id}'); pmCloseAllDropdowns();">续费</a>
              <a onclick="pmShowToast('设置采集：已跳转到采集设置模块')">设置采集</a>
              <a onclick="navigateTo('tenant-report-settings'); pmCloseAllDropdowns();">报表设置</a>
              <a onclick="openProjectShareModal('${p.id}'); pmCloseAllDropdowns();">分享报表</a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  `;
}

/* ========================================
   下拉菜单辅助
   ======================================== */
function pmToggleDropdown(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const wasOpen = el.classList.contains('open');
  pmCloseAllDropdowns();
  if (!wasOpen) el.classList.add('open');
}
function pmCloseAllDropdowns() {
  document.querySelectorAll('.pm-action-dropdown.open').forEach(el => el.classList.remove('open'));
}
document.addEventListener('click', () => pmCloseAllDropdowns());

function pmShowToast(msg) {
  const t = document.createElement('div');
  t.className = 'pm-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1700);
}

/* ========================================
   弹窗 1：选择客户（新建项目第一步）
   ======================================== */
function openProjectCustomerSelectModal() {
  const rowsHtml = PROJECT_CUSTOMER_LIST.map(c => `
    <tr onclick='selectProjectCustomer(${JSON.stringify(JSON.stringify(c))})'>
      <td>${c.loginAccount}</td>
      <td>${c.company}</td>
    </tr>
  `).join('');

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal" style="max-width:560px">
        <div class="modal-header">
          <h2 class="modal-title">新建项目 — 选择客户</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body" style="padding:16px 20px">
          <div class="search-input" style="margin-bottom:12px">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="按客户账号或主体名称..." oninput="pmFilterCustomerTable(this.value)" />
          </div>
          <table class="pm-customer-table" id="pmCustomerTable">
            <thead>
              <tr>
                <th>登录账号</th>
                <th>主体名称</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function pmFilterCustomerTable(keyword) {
  const k = (keyword || '').trim().toLowerCase();
  const tbody = document.querySelector('#pmCustomerTable tbody');
  if (!tbody) return;
  tbody.querySelectorAll('tr').forEach(tr => {
    const text = tr.textContent.toLowerCase();
    tr.style.display = !k || text.indexOf(k) >= 0 ? '' : 'none';
  });
}

function selectProjectCustomer(encodedJson) {
  let customer;
  try { customer = JSON.parse(encodedJson); } catch (e) { return; }
  closeModal();
  setTimeout(() => showProjectOrderModal(JSON.stringify(customer), false), 100);
}

/* ========================================
   弹窗 2：新建 / 修改提单
   ======================================== */
function showProjectOrderModal(cdata, isEdit) {
  let customer = {};
  try {
    customer = typeof cdata === 'string' ? JSON.parse(cdata) : (cdata || {});
  } catch (e) {
    customer = { loginAccount: 'edu_growth2026', company: '广州启航多元教育咨询有限公司', balance: '¥1000.00' };
  }

  // 模拟修改场景下的预填值
  const preset = isEdit ? {
    chargeMode: 'fixed',
    product: 'seo',
    duration: '12',
    price: '3980.00',
    projectName: '成都显胜电子GEO优化',
    employee: 'emp1',
    mainKeywords: '收录源\n通用词算法收录源\n工程类词智能收录源',
    brandKeywords: '成都显胜电子有限公司\nDVKEI',
    remark: '',
    industry: 'manufacture',
    startDate: '2026-07-06',
    endDate: '2027-07-06'
  } : {
    chargeMode: 'fixed',
    product: '',
    duration: '',
    price: '',
    projectName: '',
    employee: customer.assignedEmployee ? '' : '',
    mainKeywords: '',
    brandKeywords: '',
    remark: '',
    industry: '',
    startDate: '2026-07-01',
    endDate: '2027-07-01'
  };

  const title = isEdit
    ? '修改提单'
    : `项目提单 — ${preset.chargeMode === 'fixed' ? '固定收费' : '按次收费'}`;

  const headerInfo = isEdit
    ? `<div class="order-header-info" style="background:var(--color-bg-body);padding:10px 14px;border-radius:var(--radius-sm)">
         <div class="info-item"><span class="label">产品：</span><span class="value">GEO企业基础曝光套餐(5关键词+2品牌词)</span></div>
         <div class="info-item"><span class="label">收费模式：</span><span class="value">固定收费</span></div>
         <div class="info-item"><span class="label">价格：</span><span class="value" style="color:var(--color-danger);font-weight:600">¥3980.00</span></div>
       </div>`
    : `<div class="order-header-info">
         <div class="info-item"><span class="label">客户账号：</span><span class="value">${customer.loginAccount || 'edu_growth2026'}</span></div>
         <div class="info-item"><span class="label">可用余额：</span><span class="value balance">${customer.balance || '¥1000.00 元'}</span></div>
         <div class="info-item" style="flex:1"><span class="label">主体名称：</span><span class="value">${customer.company || '广州启航多元教育咨询有限公司'}</span></div>
       </div>`;

  const bodyHtml = `
    <div class="order-form-scroll">
      ${headerInfo}
      <div style="height:${isEdit ? '14px' : '0'}"></div>

      <div class="order-form-group">
        <div class="order-form-label">收费模式：</div>
        <div class="radio-inline-group">
          <label class="radio-inline">
            <input type="radio" name="pmChargeMode" value="fixed" ${preset.chargeMode === 'fixed' ? 'checked' : ''} ${isEdit ? 'disabled' : ''} onchange="pmSwitchChargeMode()">
            <span>固定收费</span>
          </label>
          <label class="radio-inline">
            <input type="radio" name="pmChargeMode" value="daily" ${preset.chargeMode === 'daily' ? 'checked' : ''} ${isEdit ? 'disabled' : ''} onchange="pmSwitchChargeMode()">
            <span>按次收费</span>
            <span class="tag">洗条件</span>
          </label>
        </div>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">产品选择：<span class="required-mark">*</span></div>
        <select class="order-select" id="pmOrderProduct" ${isEdit ? 'disabled' : ''}>
          <option value="">-- 请选择产品 --</option>
          <option value="seo"     ${preset.product === 'seo' ? 'selected' : ''}>GEO收录优化</option>
          <option value="article" ${preset.product === 'article' ? 'selected' : ''}>AI文章生成</option>
          <option value="keyword" ${preset.product === 'keyword' ? 'selected' : ''}>关键词排名</option>
          <option value="brand"   ${preset.product === 'brand' ? 'selected' : ''}>品牌保护</option>
        </select>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">时长选择：<span class="required-mark">*</span></div>
        <select class="order-select" id="pmOrderDuration" ${isEdit ? 'disabled' : ''}>
          <option value="">-- 请选择时长 --</option>
          <option value="1"  ${preset.duration === '1'  ? 'selected' : ''}>1个月</option>
          <option value="3"  ${preset.duration === '3'  ? 'selected' : ''}>3个月</option>
          <option value="6"  ${preset.duration === '6'  ? 'selected' : ''}>6个月</option>
          <option value="12" ${preset.duration === '12' ? 'selected' : ''}>12个月</option>
        </select>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">价　格：<span class="required-mark">*</span></div>
        <input type="text" class="order-input" id="pmOrderPrice" value="${preset.price}" placeholder="请输入价格">
      </div>

      <div class="order-form-group">
        <div class="order-form-label">项目名称${isEdit ? '' : '*'}：</div>
        <input type="text" class="order-input" id="pmOrderProjectName" value="${preset.projectName}" placeholder="请输入项目名称（最多100字）" maxlength="100">
      </div>

      <div class="order-form-group">
        <div class="order-form-label">所属员工：</div>
        <select class="order-select" id="pmOrderEmployee">
          <option value="厦门钱多多..." ${!preset.employee ? 'selected' : ''}>厦门钱多多...</option>
          <option value="emp1" ${preset.employee === 'emp1' ? 'selected' : ''}>陈小明</option>
          <option value="emp2" ${preset.employee === 'emp2' ? 'selected' : ''}>林小红</option>
          <option value="emp3" ${preset.employee === 'emp3' ? 'selected' : ''}>周大伟</option>
          <option value="emp4" ${preset.employee === 'emp4' ? 'selected' : ''}>赵玉兰</option>
        </select>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">主关键词${isEdit ? '' : '*'}：</div>
        <textarea class="order-textarea" id="pmOrderMainKeywords" placeholder="请输入关键词，每行一个或逗号一个">${preset.mainKeywords}</textarea>
        <div class="order-hint">
          最多添加 <span class="warn">5</span> 个，还可输入 <span class="warn" id="pmMainRemaining">5</span> 个，多余部分自动删除并去重<br>
          ${isEdit ? '' : '<span class="danger">购买关键词请认真填写，下单后则不予修改。</span>'}
        </div>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">品牌关键词${isEdit ? '' : '*'}：</div>
        <textarea class="order-textarea" id="pmOrderBrandKeywords" placeholder="请输入关键词，每行一个或逗号一个">${preset.brandKeywords}</textarea>
        <div class="order-hint">
          最多添加 <span class="warn">5</span> 个，还可输入 <span class="warn" id="pmBrandRemaining">5</span> 个，多余部分自动删除并去重
        </div>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">备　注：</div>
        <textarea class="order-textarea" id="pmOrderRemark" placeholder="选填备注信息">${preset.remark}</textarea>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">行业分类：</div>
        <select class="order-select" id="pmOrderIndustry">
          <option value="">-- 请选择 --</option>
          <option value="tech"        ${preset.industry === 'tech' ? 'selected' : ''}>科技/互联网</option>
          <option value="finance"     ${preset.industry === 'finance' ? 'selected' : ''}>金融/投资</option>
          <option value="education"   ${preset.industry === 'education' ? 'selected' : ''}>教育/培训</option>
          <option value="medical"     ${preset.industry === 'medical' ? 'selected' : ''}>医疗/健康</option>
          <option value="retail"      ${preset.industry === 'retail' ? 'selected' : ''}>零售/电商</option>
          <option value="manufacture" ${preset.industry === 'manufacture' ? 'selected' : ''}>制造/工业</option>
          <option value="media"       ${preset.industry === 'media' ? 'selected' : ''}>传媒/广告</option>
          <option value="catering"    ${preset.industry === 'catering' ? 'selected' : ''}>餐饮/食品</option>
          <option value="other"       ${preset.industry === 'other' ? 'selected' : ''}>其他</option>
        </select>
      </div>

      <div class="order-form-group">
        <div class="order-form-label">服务时长${isEdit ? '' : '*'}：</div>
        <div class="order-date-range">
          <input type="date" class="order-input" id="pmOrderStartDate" value="${preset.startDate}">
          <span class="range-sep">至</span>
          <input type="date" class="order-input" id="pmOrderEndDate"   value="${preset.endDate}">
        </div>
      </div>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal modal--order">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" onclick="submitProjectOrder(${isEdit})">${isEdit ? '保存' : '提交'}</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);

  // 关键词计数监听
  const mainEl = document.getElementById('pmOrderMainKeywords');
  const brandEl = document.getElementById('pmOrderBrandKeywords');
  const updateCount = (el, remId) => {
    if (!el) return;
    const lines = el.value.split(/[\n,，]/).map(s => s.trim()).filter(Boolean);
    const uniq = [...new Set(lines)];
    const remaining = Math.max(0, 5 - uniq.length);
    const remEl = document.getElementById(remId);
    if (remEl) remEl.textContent = remaining;
  };
  mainEl?.addEventListener('input', () => updateCount(mainEl, 'pmMainRemaining'));
  brandEl?.addEventListener('input', () => updateCount(brandEl, 'pmBrandRemaining'));
  updateCount(mainEl, 'pmMainRemaining');
  updateCount(brandEl, 'pmBrandRemaining');
}

function pmSwitchChargeMode() {
  // 占位：保留扩展空间，固定/按次切换时的UI联动
}

function openProjectEditModal(projectId) {
  const project = PROJECT_LIST.find(p => p.id === projectId) || {};
  // 用项目所属客户作为提单的客户信息
  const fakeCustomer = {
    loginAccount: 'edu_growth2026',
    company: project.customer || '广州启航多元教育咨询有限公司',
    balance: '¥1000.00',
    assignedEmployee: '厦门钱多多...'
  };
  showProjectOrderModal(JSON.stringify(fakeCustomer), true);
}

function submitProjectOrder(isEdit) {
  const product = document.getElementById('pmOrderProduct')?.value;
  const duration = document.getElementById('pmOrderDuration')?.value;
  const price = document.getElementById('pmOrderPrice')?.value;
  const projectName = document.getElementById('pmOrderProjectName')?.value;
  const mainKeywords = document.getElementById('pmOrderMainKeywords')?.value;
  const brandKeywords = document.getElementById('pmOrderBrandKeywords')?.value;
  const startDate = document.getElementById('pmOrderStartDate')?.value;
  const endDate = document.getElementById('pmOrderEndDate')?.value;

  if (!product)    { pmShowToast('请选择产品'); return; }
  if (!duration)   { pmShowToast('请选择时长'); return; }
  if (!price)      { pmShowToast('请输入价格'); return; }
  if (!projectName) { pmShowToast('请输入项目名称'); return; }
  if (!isEdit && !mainKeywords)  { pmShowToast('请输入主关键词'); return; }
  if (!isEdit && !brandKeywords) { pmShowToast('请输入品牌关键词'); return; }
  if (!startDate || !endDate)    { pmShowToast('请选择服务时长'); return; }

  pmShowToast(isEdit ? '保存成功！' : '项目提单提交成功！');
  closeModal();
  if (!isEdit) {
    setTimeout(() => {
      const content = document.getElementById('content');
      if (content) content.innerHTML = renderContent('tenant', 'tenant-projects');
    }, 200);
  }
}

/* ========================================
   弹窗 3：续费
   ======================================== */
function openProjectRenewalModal(projectId) {
  const project = PROJECT_LIST.find(p => p.id === projectId) || PROJECT_LIST[0];

  const bodyHtml = `
    <div class="order-form-scroll">
      <div class="pm-summary-row">
        <div class="pm-sum-item"><span class="pm-sum-label">客户所属：</span><span class="pm-sum-value">一级代理</span></div>
        <div class="pm-sum-item"><span class="pm-sum-label">代理商：</span><span class="pm-sum-value">北京华北动力科技有限公司</span></div>
      </div>
      <div class="pm-summary-row">
        <div class="pm-sum-item"><span class="pm-sum-label">续费项目名称：</span><span class="pm-sum-value">${project.name}</span></div>
      </div>
      <div class="pm-summary-row">
        <div class="pm-sum-item"><span class="pm-sum-label">产品名称：</span><span class="pm-sum-value">${project.product}</span></div>
      </div>

      <div class="order-form-group" style="margin-top:8px">
        <div class="order-form-label">续费时长选择：</div>
        <div class="pm-renewal-prices">
          <label><input type="radio" name="pmRenewal" value="year" checked> 年付 <span class="pm-price-amount">3980元</span></label>
          <label><input type="radio" name="pmRenewal" value="quarter"> 季付 <span class="pm-price-amount">2880元</span></label>
          <label><input type="radio" name="pmRenewal" value="month"> 月付 <span class="pm-price-amount">2680元</span></label>
          <label><input type="radio" name="pmRenewal" value="lite"> 月付 <span class="pm-price-amount">880元</span></label>
        </div>
        <div class="pm-summary-row" style="margin-top:8px;margin-bottom:0">
          <div class="pm-sum-item"><span class="pm-sum-label">余　额：</span><span class="pm-sum-value pm-balance-text">¥1020.00 元</span></div>
        </div>
      </div>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal" style="max-width:560px">
        <div class="modal-header">
          <h2 class="modal-title">续费操作</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">取消</button>
          <button class="btn btn-primary" onclick="submitProjectRenewal()">提交</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function submitProjectRenewal() {
  const selected = document.querySelector('input[name="pmRenewal"]:checked');
  const label = selected ? selected.parentElement.textContent.trim() : '';
  pmShowToast(`续费已提交：${label}`);
  closeModal();
}

/* ========================================
   弹窗 4：分享报表
   ======================================== */
function openProjectShareModal(projectId) {
  const project = PROJECT_LIST.find(p => p.id === projectId) || PROJECT_LIST[0];
  const link = `http://aigeo.chinaz.com/saas-report/view/${project.id}19d2cabf2bdb785da5b846353092...`;

  const bodyHtml = `
    <div class="order-form-scroll">
      <div class="order-form-group">
        <div class="order-form-label">分享链接：</div>
        <div class="pm-share-row">
          <input type="text" id="pmShareLink" value="${link}" readonly />
          <button class="btn btn-secondary" onclick="copyShareLink()">复制</button>
          <button class="btn btn-primary" onclick="pmShowToast('已在新窗口打开报表')">打开报表</button>
        </div>
      </div>
    </div>`;

  const overlayHtml = `
    <div class="modal-overlay active" id="modalOverlay" onclick="closeModalOnOverlay(event)">
      <div class="modal" style="max-width:620px">
        <div class="modal-header">
          <h2 class="modal-title">分享报表</h2>
          <button class="modal-close" onclick="closeModal()">${window.getLucideIcon ? window.getLucideIcon('x') : ''}</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', overlayHtml);
}

function copyShareLink() {
  const input = document.getElementById('pmShareLink');
  if (!input) return;
  input.select();
  try {
    document.execCommand('copy');
    pmShowToast('链接已复制到剪贴板');
  } catch (e) {
    pmShowToast('复制失败，请手动复制');
  }
  if (window.getSelection) window.getSelection().removeAllRanges();
}
