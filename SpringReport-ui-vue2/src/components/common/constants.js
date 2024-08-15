/*
 * @Description: 常量和数据字典
 * @Version: 1.0
 * @Autor: caiyang
 * @Date: 2020-06-04 08:36:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-09 14:12:40
 */
const commonConstants = {
}

/**
 * @description:
 * @param {type}
 * @return:
 * @author: caiyang
 */
commonConstants.sessionItem = {
  isAdmin: 'isAdmin',
  orgIds: 'orgIds',
  authorization: 'token',
  userName: 'userName',
  apiList: 'apiList',
  codeValues: 'codeValues',
  roleName: 'roleName',
  isSystemMerchant:'isSystemMerchant',
  merchantNo:'merchantNo',
  userId:'userId'
}
commonConstants.commonVariable = {
  borderPath:"/static/border/",//边框路径
  backgroundPath:"/static/background/",//背景路径
  sheetHTML:'<div style="${style}" id="luckysheet-sheets-item${index}" data-index="${index}" class="luckysheet-sheets-item ${active}"><span class="luckysheet-sheets-item-name" spellcheck ="false" contenteditable="false">${name}</span> <span class="luckysheet-sheets-item-menu luckysheet-mousedown-cancel"><i class="fa fa-sort-desc luckysheet-mousedown-cancel"></i></span>${colorset}</div>',
  
}
// 请求错误码以及对应的错误信息
commonConstants.errorCodeMsg = {
  400: '请求错误。',
  401: '访问权限不足！',
  403: '拒绝访问！',
  404: '无法访问，请确认访问地址是否正确！',
  408: '访问超时。',
  500: '系统异常，请联系管理员',
  501: '未找到该服务',
  502: '网络异常。',
  503: '服务器停止运行，请与管理员联系。',
  504: '服务器停止运行，请与管理员联系。'
}

// message消息级别
commonConstants.messageType = {
  success: 'success', // 成功
  warning: 'warning', // 警告
  info: 'info', // 通知
  error: 'error'// 错误
}

// modal页面的类型
commonConstants.modalType = {
  insert: '1', // 新增
  update: '2', // 编辑
  detail: '3' // 详情
}

// modal页面的标题
commonConstants.modalTitle = {
  insert: '新增', // 新增
  update: '编辑', // 编辑
  detail: '详情' // 详情
}

// 下拉框属性
commonConstants.props = { label: 'label', value: 'value' }

commonConstants.dictionary = {
  yesNo: {
    '1': '是',
    '2': '否'
  },
  menuRule: {
    '1': '登陆后访问',
    '2': '登陆后并授权访问'
  },
  apiRule: {
    '1': '公开访问',
    '2': '登录后访问',
    '3': '登录后并授权访问'
  },
  // 数据源类型
  dataSourceType: {
    '1': 'mysql',
    '2': 'oracle',
    '3': 'sqlServer',
    '4': 'api',
    '5': 'postgreSql',
    '6': 'influxdb',
    '7': '达梦数据库',
    '8': 'clickhouse',
    '9': 'elasticsearch',
    '10': 'TDengine',
    '11': 'kingbase(人大金仓)',
  },
  paramRequired: {
    '1': '是',
    '2': '否'
  },
  viewAuth: {
    '1': '所有人',
    '2': '指定角色'
  },
  isRelyOnParams: {
    '1': '是',
    '2': '否'
  },
  tplType: {
    '1': '展示报表',
    '2': '填报报表'
  },
  paramHidden: {
    '1': '是',
    '2': '否'
  },
  jobStatus:{
    'NONE':'无',
    'NORMAL':'正常',
    'PAUSED':'暂停',
    'COMPLETE':'完成',
    'ERROR':'错误',
    'BLOCKED':'堵塞',
  },
  status: {
    '1': '启用',
    '2': '禁用'
  },
  cellType:{
    1:"固定单元格",
    2:"同行/列扩展单元格"
  },
  subtotalType: {
    '1': '合计',
    '2': '平均值',
    '3': '最大值',
    '4': '最小值',
    '5': '计数'
  },
  chartType: {
    'pie': '饼图',
    'histogram': '柱状图',
    'horizontalHistogram': '条形图',
    'line': '折线图'
  },
}

/**
 * @description: 数据字典类型
 * @param {type}
 * @return:
 * @author: caiyang
 */
commonConstants.codeType = {
}

// 调色板默认颜色
commonConstants.predefineColors = [
  '#000000',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#FF0000'
]
commonConstants.cmOptions = {// codemirror参数配置
  tabSize: 4,
  mode: { name: 'text/x-mysql' },
  theme: 'eclipse',
  styleActiveLine: true,
  lineNumbers: true,
  line: true,
  foldgutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  lineWrapping: true, // 代码折叠
  foldGutter: true,
  matchBrackets: true,  // 括号匹配
  autoCloseBrackets: true
}
commonConstants.borderWidthHeight = {
  "border1.png":[450,300],
  "border2.png":[155,155],
  "border3.png":[155,155],
  "border4.png":[400,400],
  "border5.png":[400,400],
  "border6.png":[300,300],
  "border7.png":[300,300],
  "border8.png":[300,300],
  "border9.png":[150,150],
  "border10.png":[150,150],
  "border11.png":[300,300],
  "border12.png":[490,180],
  "border13.png":[480,200],
  "border14.png":[440,200],
  "border15.png":[300,300],
  "border16.png":[450,300],
  "border17.png":[450,300],
  "border18.png":[450,300],
  "border19.png":[600,300],
  "border20.png":[600,300],
  "border21.png":[455,400],
  "border22.png":[475,250],
  "border23.png":[455,537],
  "border24.png":[150,150],
  "border25.png":[150,150],
  "border26.png":[150,150],
  "border27.png":[150,150],
  "border28.png":[150,150],
  "border29.png":[601,344],
  "border30.png":[601,547],
  "border31.png":[150,150],
  "border32.png":[150,150],
  "border33.png":[100,100],
  "border34.png":[538,296],
  "border35.png":[500,400],
  "border36.png":[600,350],
}

commonConstants.pageCount = [5,10,15,20,30,50,100,150,200,300,500,800,1000,2000,3000,4000,5000]

//luckysheet预览工具栏
commonConstants.luckysheetPreviewToolBarConfig = {
    save:false,//保存
    preview:false,
    upload:false,
    download:false,
    downloadpdf:false,
    xxbt:false,
    editAuth:false,
    shareMode:false,
    datasource:false,
    pdfSetting:false,
    saveAs:false,
    picture:false,
    redo:false,
    undo:false,
    history:false,
    currencyFormat: false, //货币格式
    percentageFormat: false, //百分比格式
    numberDecrease: false, // '减少小数位数'
    numberIncrease: false, // '增加小数位数
    moreFormats: false, // '更多格式'
    border: true, // '边框'
    textWrapMode: true, // '换行方式'
    textRotateMode: false, // '文本旋转方式'
    image:false, // '插入图片'
    chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
    postil:  true, //'批注'
    pivotTable: true,  //'数据透视表'
    // function: false, // '公式'
    frozenMode: true, // '冻结方式'
    sortAndFilter: true, // '排序和筛选'
    conditionalFormat: false, // '条件格式'
    dataVerification: false, // '数据验证'
    splitColumn: false, // '分列'
    screenshot: false, // '截图'
    protection:false, // '工作表保护'
    print:false, // '打印'
}

//填报预览默认工具栏
commonConstants.luckysheetFormsPreviewToolBarConfig = {
  save:true,//保存
  preview:false,
  redo:false,
  undo:false,
  upload:false,
  xxbt:false,
  editAuth:false,
  shareMode:false,
  download:false,
  downloadpdf:false,
  pdfSetting:false,
  datasource:false,
  saveAs:false,
  currencyFormat: false, //货币格式
  percentageFormat: false, //百分比格式
  numberDecrease: false, // '减少小数位数'
  numberIncrease: false, // '增加小数位数
  moreFormats: false, // '更多格式'
  border: true, // '边框'
  textWrapMode: true, // '换行方式'
  textRotateMode: false, // '文本旋转方式'
  image:false, // '插入图片'
  chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
  postil:  true, //'批注'
  pivotTable: true,  //'数据透视表'
  // function: false, // '公式'
  frozenMode: true, // '冻结方式'
  sortAndFilter: true, // '排序和筛选'
  conditionalFormat: false, // '条件格式'
  dataVerification: false, // '数据验证'
  splitColumn: false, // '分列'
  screenshot: false, // '截图'
  protection:false, // '工作表保护'
  print:false, // '打印'
}
commonConstants.operator = {
  EQ:"=",//等于
  NE:"!=",//不等于
  GT:">",//大于
  GE:">=",//大于等于
  LT:"<",//小于
  LE:"<=",//小于等于
  IN:"in",//包含
  NOTIN:"not in",//不包含
}

commonConstants.editor = {
  RowFlex:{
    LEFT : 'left',
    CENTER : 'center',
    RIGHT : 'right',
    ALIGNMENT : 'alignment'
  },
  ElementType:{
    TEXT : 'text',
    IMAGE : 'image',
    TABLE : 'table',
    HYPERLINK : 'hyperlink',
    SUPERSCRIPT : 'superscript',
    SUBSCRIPT : 'subscript',
    SEPARATOR : 'separator',
    PAGE_BREAK : 'pageBreak',
    CONTROL : 'control',
    CHECKBOX : 'checkbox',
    LATEX : 'latex',
    TAB : 'tab',
    DATE : 'date',
    BLOCK : 'block',
    TITLE : 'title',
    LIST : 'list'
  }
}
commonConstants.systemParam = [
  {value:"userId",label:"用户id",type:"number",column:"user_id"},
  {value:"userName",label:"用户账号",type:"String",column:"user_name"},
  {value:"roleId",label:"角色id",type:"number",column:"role_id"},
  {value:"merchantNo",label:"商户号",type:"String",column:"merchant_id"},
  {value:"deptId",label:"部门id",type:"number",column:"dept_id"},

]
export default commonConstants
