/**
 * GEO计费系统 V1.1 - 数据配置
 * 定义端口配置、导航菜单、页面标题映射
 */

/* ========================================
   端口配置 PORT_CONFIG
   ======================================== */
const PORT_CONFIG = {
  admin: {
    name: '超级管理员',
    badge: '',
    icon: 'shield',
    nav: [
      {
        section: '核心功能',
        items: [
          { id: 'admin-dashboard', label: '工作台', icon: 'grid' },
          { id: 'admin-saas-users', label: 'SAAS用户管理', icon: 'users' },
          { id: 'admin-employees', label: '员工管理', icon: 'id-card' },
          { id: 'admin-finance', label: '财务流水', icon: 'banknote' },
          { id: 'admin-announcements', label: '消息公告', icon: 'megaphone' },
          { id: 'admin-analytics', label: '运营分析', icon: 'chart' },
          { id: 'admin-settings', label: '系统设置', icon: 'settings' }
        ]
      },
      {
        section: '站群管理',
        items: [
          { id: 'admin-sitefarm-templates', label: '网站模板管理', icon: 'book' },
          { id: 'admin-tdk-variables', label: 'TDK变量管理', icon: 'file-text' },
          { id: 'admin-sitefarm-saas-users', label: 'SAAS用户站群配置', icon: 'users' }
        ]
      }
    ],
    user: {
      name: '超级管理员',
      role: '系统管理',
      avatar: '超'
    }
  },

  tenant: {
    name: '租户管理',
    badge: '',
    icon: 'building',
    nav: [
      {
        section: '业务管理',
        items: [
          { id: 'tenant-dashboard', label: '工作台', icon: 'grid' },
          { id: 'tenant-agents', label: '代理商管理', icon: 'network' },
          { id: 'tenant-products', label: '产品套餐', icon: 'package' },
          { id: 'tenant-orders', label: '订单管理', icon: 'receipt', badge: '3' },
          { id: 'tenant-customers', label: '客户管理', icon: 'users' },
          { id: 'tenant-projects', label: '项目管理', icon: 'folder' }
        ]
      },
      {
        section: '内容运营',
        items: [
          { id: 'tenant-knowledge', label: '企业知识库', icon: 'book' },
          { id: 'tenant-ai-article', label: 'AI文章生成', icon: 'sparkles' },
          { id: 'tenant-media', label: '媒体投稿', icon: 'send' },
          { id: 'tenant-crawl', label: '采集任务', icon: 'download' }
        ]
      },
      {
        section: '运营管理',
        items: [
          { id: 'tenant-finance', label: '财务管理', icon: 'banknote' },
          { id: 'tenant-employees', label: '员工管理', icon: 'id-card' },
          { id: 'tenant-announcements', label: '消息公告', icon: 'megaphone' },
          { id: 'tenant-logs', label: '操作日志', icon: 'file-text' },
          { id: 'tenant-reports', label: '数据报表', icon: 'chart' },
          { id: 'tenant-settings', label: '系统设置', icon: 'settings' }
        ]
      },
      {
        section: '站群管理',
        items: [
          { id: 'tenant-sitefarm-profiles', label: '基础资料管理', icon: 'id-card' },
          { id: 'tenant-sitefarm-templates', label: '网站模板管理', icon: 'book' },
          { id: 'tenant-training-words', label: '训练词管理', icon: 'sparkles' },
          { id: 'tenant-tdk-templates', label: 'TDK模板管理', icon: 'file-text' },
          { id: 'tenant-kuaitong', label: '快通管理', icon: 'send' },
          { id: 'tenant-geo-articles', label: 'GEO文章管理', icon: 'file-text' }
        ]
      }
    ],
    user: {
      name: '张经理',
      role: '租户管理员',
      avatar: '张'
    }
  },

  agent: {
    name: '代理商',
    badge: '',
    icon: 'store',
    nav: [
      {
        section: '业务管理',
        items: [
          { id: 'agent-dashboard', label: '工作台', icon: 'grid' },
          { id: 'agent-products', label: '产品管理', icon: 'package' },
          { id: 'agent-customers', label: '客户管理', icon: 'users' },
          { id: 'agent-sub-agents', label: '代理商管理', icon: 'network' },
          { id: 'agent-contracts', label: '合同管理', icon: 'file-signature' },
          { id: 'agent-orders', label: '项目订单', icon: 'receipt', badge: '2' }
        ]
      },
      {
        section: '运营管理',
        items: [
          { id: 'agent-revenue', label: '收益中心', icon: 'trending-up' },
          { id: 'agent-employees', label: '员工管理', icon: 'id-card' },
          { id: 'agent-logs', label: '操作日志', icon: 'file-text' },
          { id: 'agent-settings', label: '系统设置', icon: 'settings' }
        ]
      }
    ],
    user: {
      name: '李总',
      role: '代理商负责人',
      avatar: '李'
    }
  },

  enduser: {
    name: '终端用户',
    badge: '',
    icon: 'user',
    nav: [
      {
        section: '我的服务',
        items: [
          { id: 'enduser-dashboard', label: '工作台', icon: 'grid' },
          { id: 'enduser-packages', label: '我的套餐', icon: 'package' },
          { id: 'enduser-geo-report', label: 'GEO效果报表', icon: 'chart' },
          { id: 'enduser-deliverables', label: '交付成果', icon: 'folder-check' }
        ]
      },
      {
        section: '资源中心',
        items: [
          { id: 'enduser-knowledge', label: '企业知识库', icon: 'book' }
        ]
      },
      {
        section: '账户管理',
        items: [
          { id: 'enduser-finance', label: '财务记录', icon: 'banknote' },
          { id: 'enduser-settings', label: '账户设置', icon: 'settings' }
        ]
      },
      {
        section: '站群管理',
        items: [
          { id: 'enduser-sitefarm-profile', label: '基本信息', icon: 'id-card' },
          { id: 'enduser-kuaitong', label: '快通管理', icon: 'send' },
          { id: 'enduser-geo-articles', label: 'GEO文章管理', icon: 'file-text' }
        ]
      }
    ],
    user: {
      name: '王女士',
      role: '企业客户',
      avatar: '王'
    }
  }
};

/* ========================================
   页面标题映射 PAGE_TITLES
   ======================================== */
const PAGE_TITLES = {
  // 超级管理员
  'admin-dashboard': '工作台',
  'admin-saas-users': 'SAAS用户管理',
  'admin-employees': '员工管理',
  'admin-finance': '财务流水',
  'admin-announcements': '消息公告',
  'admin-analytics': '运营分析',
  'admin-settings': '系统设置',
  'admin-sitefarm-templates': '网站模板管理',
  'admin-tdk-variables': 'TDK变量管理',
  'admin-sitefarm-saas-users': 'SAAS用户站群配置',

  // 租户管理
  'tenant-dashboard': '工作台',
  'tenant-agents': '代理商管理',
  'tenant-products': '产品套餐',
  'tenant-orders': '订单管理',
  'tenant-customers': '客户管理',
  'tenant-projects': '项目管理',
  'tenant-report-settings': '报表设置',
  'tenant-knowledge': '企业知识库',
  'tenant-ai-article': 'AI文章生成',
  'tenant-media': '媒体投稿',
  'tenant-crawl': '采集任务',
  'tenant-finance': '财务管理',
  'tenant-employees': '员工管理',
  'tenant-announcements': '消息公告',
  'tenant-logs': '操作日志',
  'tenant-reports': '数据报表',
  'tenant-settings': '系统设置',
  'tenant-sitefarm-profiles': '基础资料管理',
  'tenant-sitefarm-templates': '网站模板管理',
  'tenant-training-words': '训练词管理',
  'tenant-tdk-templates': 'TDK模板管理',
  'tenant-kuaitong': '快通管理',
  'tenant-geo-articles': 'GEO文章管理',

  // 代理商
  'agent-dashboard': '工作台',
  'agent-products': '产品管理',
  'agent-customers': '客户管理',
  'agent-sub-agents': '代理商管理',
  'agent-contracts': '合同管理',
  'agent-orders': '项目订单',
  'agent-revenue': '收益中心',
  'agent-employees': '员工管理',
  'agent-logs': '操作日志',
  'agent-settings': '系统设置',

  // 终端用户
  'enduser-dashboard': '工作台',
  'enduser-packages': '我的套餐',
  'enduser-geo-report': 'GEO效果报表',
  'enduser-deliverables': '交付成果',
  'enduser-knowledge': '企业知识库',
  'enduser-finance': '财务记录',
  'enduser-settings': '账户设置',
  'enduser-sitefarm-profile': '基本信息',
  'enduser-kuaitong': '快通管理',
  'enduser-geo-articles': 'GEO文章管理'
};

/* ========================================
   大模型配置 AI_MODEL_CONFIGS
   ======================================== */
const AI_MODEL_CONFIGS = {
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: 'D',
    alias: 'deepseek',
    usage: 'search_write',
    webSearch: 'on',
    endpoint: 'https://ai.chinaz.net/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'deepseek-v4-pro'
  },
  doubao: {
    id: 'doubao',
    name: '豆包',
    icon: '豆',
    alias: 'doubao',
    usage: 'index_only',
    webSearch: 'off',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'doubao-pro-128k'
  },
  yuanbao: {
    id: 'yuanbao',
    name: '元宝',
    icon: '元',
    alias: 'yuanbao',
    usage: 'search_write',
    webSearch: 'auto',
    endpoint: 'https://api.yuanbao.tencent.com/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'yuanbao-pro'
  },
  tongyi: {
    id: 'tongyi',
    name: '通义',
    icon: '通',
    alias: 'tongyi',
    usage: 'search_write',
    webSearch: 'on',
    endpoint: 'https://dashscope.aliyuncs.com/api/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'qwen-max'
  },
  wenxin: {
    id: 'wenxin',
    name: '文心',
    icon: '文',
    alias: 'wenxin',
    usage: 'index_only',
    webSearch: 'off',
    endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'ernie-bot-4'
  },
  minimax: {
    id: 'minimax',
    name: 'Minimax',
    icon: 'M',
    alias: 'minimax',
    usage: 'search_write',
    webSearch: 'on',
    endpoint: 'https://api.minimax.chat/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'abab6.5-chat'
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi',
    icon: 'K',
    alias: 'kimi',
    usage: 'search_write',
    webSearch: 'auto',
    endpoint: 'https://api.moonshot.cn/v1',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'moonshot-v1-128k'
  },
  zhipu: {
    id: 'zhipu',
    name: '智谱',
    icon: '智',
    alias: 'zhipu',
    usage: 'index_only',
    webSearch: 'off',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'glm-4'
  }
};

/* ========================================
   GEO采集资源套餐 GEO_RESOURCE_PACKAGES
   ======================================== */
const GEO_RESOURCE_PACKAGES = {
  lite: {
    id: 'lite',
    name: '轻量版',
    resources: 2,
    desc: '适合少量任务，低频使用',
    pricePerUnit: 300,
    totalPrice: 600
  },
  standard: {
    id: 'standard',
    name: '标准版',
    resources: 5,
    desc: '适合日常任务，稳定交付',
    pricePerUnit: 200,
    totalPrice: 1000
  },
  pro: {
    id: 'pro',
    name: '极速版',
    resources: 10,
    desc: '适合批量任务，高速交付',
    pricePerUnit: 150,
    totalPrice: 1500
  }
};

/* ========================================
   实时采集账号 REALTIME_ACCOUNTS
   ======================================== */
const REALTIME_ACCOUNTS = [];

/* ========================================
   AI平台列表 AI_PLATFORMS
   ======================================== */
const AI_PLATFORMS = [
  { id: 'deepseek', name: 'DeepSeek', icon: 'D' },
  { id: 'doubao', name: '豆包', icon: '豆' },
  { id: 'yuanbao', name: '元宝', icon: '元' },
  { id: 'tongyi', name: '通义', icon: '通' },
  { id: 'wenxin', name: '文心', icon: '文' },
  { id: 'minimax', name: 'Minimax', icon: 'M' },
  { id: 'kimi', name: 'Kimi', icon: 'K' },
  { id: 'zhipu', name: '智谱', icon: '智' }
];
