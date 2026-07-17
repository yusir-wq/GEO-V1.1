/**
 * 用户端 - 基本信息
 */
function renderEndUserSitefarmProfile() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-header-title">基本信息</h1>
        <p class="page-header-desc">查看并编辑企业基础资料</p>
      </div>
    </div>

    <div class="card-grid">
      <div class="card-item" style="grid-column: 1 / -1; padding: 24px;">
        <div class="form-group">
          <label class="form-label">公司全称 <span class="required">*</span></label>
          <input type="text" class="form-input" value="深圳智达恒业包装制品有限公司" placeholder="请输入公司全称" />
        </div>

        <div class="form-group">
          <label class="form-label">公司介绍 <span class="required">*</span></label>
          <textarea class="form-textarea" rows="4" placeholder="请输入公司介绍">深圳智达恒业包装制品有限公司成立于2010年，专注于瓦楞纸箱、彩盒、礼品包装等纸制品的研发、生产与销售。</textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">客户简称 <span class="required">*</span></label>
            <input type="text" class="form-input" value="智达恒业" placeholder="请输入客户简称" />
          </div>
          <div class="form-group">
            <label class="form-label">所属行业</label>
            <select class="form-select">
              <option>包装印刷</option>
              <option>电子科技</option>
              <option>机械制造</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">后缀词</label>
          <div style="display:flex;gap:16px;flex-wrap:wrap;">
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="suffix" checked /> 厂家
            </label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="suffix" /> 公司
            </label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="suffix" /> 办事处
            </label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="suffix" /> 服务网点
            </label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="suffix" /> 销售网点
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">主图</label>
          <div class="form-upload">
            ${window.getLucideIcon ? window.getLucideIcon('image', 'image') : ''}
            <div class="form-upload-title">点击上传主图</div>
            <div class="form-upload-hint">最多 1 张，支持 jpg/jpeg/png/gif/webp 格式，建议尺寸 4:3，大小不超过 2M</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">联系人</label>
            <input type="text" class="form-input" value="张经理" placeholder="请输入联系人" />
          </div>
          <div class="form-group">
            <label class="form-label">联系方式 <span class="required">*</span></label>
            <input type="text" class="form-input" value="138****5678" placeholder="请输入手机号" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">官方网站</label>
          <input type="url" class="form-input" value="https://www.zhidaheng.com" placeholder="请输入官网 URL" />
        </div>

        <div class="form-group">
          <label class="form-label">站点描述</label>
          <textarea class="form-textarea" rows="3" placeholder="请输入站点描述">专业包装制品生产厂家，提供纸箱、彩盒、礼品包装定制服务。</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">投放地区</label>
          <div style="display:flex;gap:16px;margin-bottom:10px;flex-wrap:wrap;">
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="area" checked /> 全国
            </label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
              <input type="radio" name="area" /> 自定义
            </label>
          </div>
          <div class="city-select">
            <select class="form-select">
              <option>广东省</option>
              <option>江苏省</option>
            </select>
            <select class="form-select">
              <option>深圳市</option>
              <option>广州市</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">发布条数</label>
          <input type="text" class="form-input" value="2000 条/天" readonly />
        </div>

        <div class="form-actions">
          <button class="btn btn-secondary">重置</button>
          <button class="btn btn-primary">保存修改</button>
        </div>
      </div>
    </div>
  `;
}
