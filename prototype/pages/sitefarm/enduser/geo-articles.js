/**
 * 用户端 - GEO 文章管理
 */
function renderEndUserGeoArticles() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">GEO 文章管理</h1>
        <p class="page-header-desc">查看已发布的 GEO 文章</p>
      </div>
    </div>

    <div class="publish-stats">
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">总计条数</span>
          <div class="stat-card-icon blue">${window.getLucideIcon ? window.getLucideIcon('file-text') : ''}</div>
        </div>
        <div class="stat-card-value">1,000,000</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">已发条数</span>
          <div class="stat-card-icon green">${window.getLucideIcon ? window.getLucideIcon('check') : ''}</div>
        </div>
        <div class="stat-card-value">856,320</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">剩余条数</span>
          <div class="stat-card-icon orange">${window.getLucideIcon ? window.getLucideIcon('package') : ''}</div>
        </div>
        <div class="stat-card-value">143,680</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">今日发布</span>
          <div class="stat-card-icon purple">${window.getLucideIcon ? window.getLucideIcon('clock') : ''}</div>
        </div>
        <div class="stat-card-value">2,458</div>
      </div>
    </div>

    <div class="site-selector">
      <span class="site-selector-label">选择发布站点</span>
      <select class="form-select" style="min-width:240px;">
        <option>全部站点</option>
        <option>sz-bzzp-001</option>
        <option>gz-wljzx-002</option>
        <option>dg-chdz-003</option>
      </select>
      <button class="btn btn-primary">刷新</button>
    </div>

    <div class="table-container">
      <div class="table-toolbar">
        <div class="table-toolbar-left">
          <span class="table-toolbar-title">文章列表</span>
          <span class="table-toolbar-count">共 4 条</span>
        </div>
        <div class="table-toolbar-right">
          <div class="search-input">
            ${window.getLucideIcon ? window.getLucideIcon('search') : ''}
            <input type="text" placeholder="搜索文章标题..." />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>文章标题</th>
            <th>发布时间</th>
            <th>内容文件</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>深圳包装制品厂家如何选择优质瓦楞纸箱</td>
            <td>2026-07-08 10:23:15</td>
            <td>article-001.html</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问文章地址</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>广州彩盒定制厂家推荐_智达恒业包装</td>
            <td>2026-07-08 09:15:22</td>
            <td>article-002.html</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问文章地址</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>东莞礼品包装定制价格_包装厂家直销</td>
            <td>2026-07-07 16:30:08</td>
            <td>article-003.html</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问文章地址</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>佛山瓦楞纸箱批发_包装制品生产厂家</td>
            <td>2026-07-07 14:12:44</td>
            <td>article-004.html</td>
            <td>
              <div class="table-actions">
                <button class="btn btn-ghost btn-sm" onclick="window.open('#','_blank')">访问文章地址</button>
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
  `;
}
