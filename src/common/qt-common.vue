/** * 存放全局配置文件 */
<script>
import Constans from '@/common/qt-constant.vue'
//是否为空
function isNull(str) {
  //数字各3个加逗号
  return (
    str == undefined ||
    str == 'undefined' ||
    str == null ||
    str == '' ||
    str.length == 0
  )
}
/**
 * 身份证校验开始
 * @param {Object} card
 */
//15位转18位身份证号
function changeFivteenToEighteen(card) {
  if (card.length == '15') {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    var cardTemp = 0,
      i
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    card += arrCh[cardTemp % 11]
    return card
  }
  return card
}
//校验位的检测
function checkParity(card) {
  //15位转18位
  card = changeFivteenToEighteen(card)
  var len = card.length
  if (len == '18') {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    var cardTemp = 0,
      i,
      valnum
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    valnum = arrCh[cardTemp % 11]
    if (valnum == card.substr(17, 1)) {
      return true
    }
    return false
  }
  return false
}
//身份证校验
function checkIdCard(idcard) {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!regIdCard.test(idcard) || !checkParity(idcard)) {
    uni.showToast({
      icon: 'none',
      title: '身份证输入错误',
      mask: true,
    })
    return false
  } else {
    return true
  }
}
/**
 * 身份证校验结束
 */
/**
 * 姓名汉字验证
 * @param {Object} name
 */
function checkName(name) {
  if (isNull(name)) {
    return false // 检测不合格
  }
  var name1 = name.replace(/[^\u4E00-\u9FA5]/g, '')
  if (name === name1 && name1.length >= 2) {
    return true // 检测合格
  } else {
    return false // 检测不合格
  }
}
/**
 * 手机号验证
 * @param {Object} phone
 */
function checkPhone(phone) {
  var re = /^1\d{10}$/
  if (re.test(phone)) {
    return true // 检测合格
  } else {
    return false // 检测不合格
  }
}
/**
 * 默认吐司方法
 */
function showToastdefault(title) {
  uni.showToast({
    title: title,
    icon: 'none',
    duration: 2000,
  })
}
/**
 * @param {Object} allstr 检测的字符串
 * @param {Object} str 被包含的字符串
 */
function isContain(allstr, str) {
  return allstr.indexOf(str) != -1
}

function onError(message) {
  // 上传到小程序云数据库
  try {
    let systemInfo = wx.getSystemInfoSync(),
      page = getCurrentPages()
    let phone = uni.getStorageSync('phone')
    // 只有不在开发工具上触发的才上报
    if (systemInfo.platform !== 'devtools') {
      wx.getNetworkType({
        success: (res) => {
          wx.cloud.callFunction({
            name: 'errorHandler',
            data: {
              phone: phone,
              clientType: systemInfo.model,
              systemInfo: JSON.stringify(systemInfo),
              pageRoute: page[page.length - 1].route,
              message: message,
              version: constans.version,
              networkType: res.networkType,
              errorTime: new Date().toLocaleString(),
              error: message,
            },
          })
        },
      })
    }
  } catch (err) {}
  console.error(
    '程序发生错误:\n',
    '时间:\n',
    new Date(),
    '\n错误信息:\n',
    message
  )
}
/**
 * 默认成功吐司方法
 */
function showSuccessfault(title) {
  uni.showToast({
    title: title,
    icon: 'success',
    duration: 2000,
  })
}
//时间戳转换方法    date:时间戳数字
function formatDate(date, str) {
  var date = new Date(date)
  var YY = date.getFullYear() + '-'
  var MM =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  if (str === 'YYYY-MM-DD') {
    return YY + MM + DD
  } else if (str === 'YY年MM月DD日') {
    return YY + '年' + MM + '月' + DD + '日'
  } else {
    var hh =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var mm =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':'
    var ss =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return YY + MM + DD + ' ' + hh + mm + ss
  }
}

function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

/**日期格式化
 * @param {Object} time
 * @param {Object} pattern
 */
function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 *  改变按钮的可点击状态
 * @param {Object} data ={
 *      isClickAble: true, //按钮是否可点击，防止重复点击
 *      ClickAbleTimer: null //按钮是否可点击状态切换线程
 *    }
 */
function changeButtonClickAble(data) {
  if (data.isClickAble) {
    data.isClickAble = false
    data.ClickAbleTimer = setTimeout(() => {
      data.isClickAble = true
    }, 1000)
  }
}

/**腾讯经纬度转百度地图经纬度
 * @param {Object} lng
 * @param {Object} lat
 */
function qqMapTransBMap(lng, lat) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0
  let x = lng
  let y = lat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  let lngs = z * Math.cos(theta) + 0.0065
  let lats = z * Math.sin(theta) + 0.006
  return {
    lng: lngs,
    lat: lats,
  }
}

/**百度地图经纬度转腾讯地图经纬度
 * @param {Object} lng
 * @param {Object} lat
 */
function BMapTransqqMap(lng, lat) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0
  let x = lng - 0.0065
  let y = lat - 0.006
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  let lngs = z * Math.cos(theta)
  let lats = z * Math.sin(theta)
  return {
    lng: lngs,
    lat: lats,
  }
}

/**
 *  设置按钮可点击
 * @param {Object} data ={
 *      isClickAble: true, //按钮是否可点击，防止重复点击
 *      ClickAbleTimer: null //按钮是否可点击状态切换线程
 *    }
 */
function setButtonClickAble(data) {
  clearTimeout(data.ClickAbleTimer)
  data.isClickAble = true
}
/**
 *  设置按钮不可重复点击
 * @param {Object} data ={
 *      isClickAble: true, //按钮是否可点击，防止重复点击
 *      ClickAbleTimer: null //按钮是否可点击状态切换线程
 *    }
 */
function isButtonClickAble(data) {
  //防止重复点击操作
  if (!data.isClickAble) {
    console.log('执行了按钮操作事件，不可操作')
    return false
  } else {
    console.log('执行了按钮操作事件，可操作')
    changeButtonClickAble(data) //修改按钮为指定时间内不可点击
    return true
  }
}

/**url地址的参数转成对象
 * @param {Object} url 链接地址
 */
function urlQueryToJson(url) {
  let obj = {}
  if (url.indexOf('?') != -1 && url.length > url.indexOf('?') + 2) {
    let shareParams = url.split('?')[1].split('&')
    shareParams.map((v) => (obj[v.split('=')[0]] = v.split('=')[1]))
  }
  console.log('urlQueryToJson', obj)
  return obj
}

/**
 * @param {Object} path 地址
 * @param {Object} type 1为网络地址，2为本地，可以直接预览
 */
function previewPdfFile(pdfUrl, type) {
  if (type === 1) {
    uni.downloadFile({
      url: pdfUrl, //仅为示例，并非真实的资源
      fileType: 'pdf',
      success: (res) => {
        if (res.statusCode === 200) {
          let file = res.tempFilePath
          console.log('下载网络图片', res)
          // 文档预览
          uni.openDocument({
            filePath: file,
            showMenu: true,
            fileType: 'pdf',
            success: function (res) {
              console.log('打开文档成功', res)
            },
          })
        }
      },
      fail: (err) => {
        console.log('下载失败：', res)
      },
    })
  } else {
    // 文档预览
    uni.openDocument({
      filePath: file,
      showMenu: true,
      fileType: 'pdf',
      success: function (res) {
        console.log('打开文档成功', res)
      },
    })
  }
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = []
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue === '' + value) {
      actions.push(datas[key].dictName)
      return false
    } else if (datas[key].code === '' + value) {
      actions.push(datas[key].name)
      return false
    }
  })
  return actions.join('')
}

/**刷新加载列表-请求失败错误处理
 * @param {Object} currentpage :当前请求的椰树
 * @param {Object} List:列表数据
 * @param {Object} mescroll ：列表组件（可刷新加载更多）
 */
export function mescrollListRequestError(currentpage, List, mescroll) {
  if (currentpage === 1) {
    List = []
  }
  if (List.length > 0) {
    mescroll.endErr()
  } else {
    mescroll.endBySize(0, 0) //必传参数(当前页的数据个数, 总数据量)
  }
}

/**返回数组下标
 * @param {Object} array 数组
 * @param {Object} key 数组键名称
 * @param {Object} value  要返回下标的子项的值
 */
export function getArrayIndex(array, key, value) {
  var index = -1
  for (const i in array) {
    if (array[i][key] === value) {
      index = i
      break
    }
  }
  return parseInt(index)
}

/** 传入fileDownUrl，返回 fileList列表，适合upload组件初始化使用
 * @param {Object} fileDownUrl url地址字符串集合，中间通过','分隔
 */
export function getFileListByFileDownUrl(fileDownUrl) {
  var demoFileList = []
  if (fileDownUrl) {
    try {
      demoFileList = JSON.parse(fileDownUrl)
    } catch (e) {
      console.log(JSON.stringify(e))
      demoFileList = []
    }
  }
  return demoFileList
}

/** 传入demoFileList，返回url拼接地址
 * @param {Object} demoFileList upload组件已上传的文件信息
 */
export function getFileDownUrlByFileList(demoFileList) {
  var fileDownUrl = []
  for (const i in demoFileList) {
    fileDownUrl.push({ name: demoFileList[i].name, url: demoFileList[i].url })
  }
  return JSON.stringify(fileDownUrl)
}
/** 获取文件后缀名,
 * @param {Object} mFileName
 */
export function getFileSuffix(mFileName) {
  const index = mFileName.lastIndexOf('.')
  if (index >= 0) {
    return mFileName.substring(index)
  } else {
    return ''
  }
}

/**下载或预览文件
 * @param {Object} url
 * @param {Object} fileName
 */
export function toCheckOrDownFile(url, fileName) {
  const suffix = getFileSuffix(url)
  var accepts = ['.png', '.jpg', '.jpeg', '.gif']
  if (accepts.indexOf(suffix) !== -1) {
    uni.previewImage({
      current: 0,
      urls: [url],
    })
  } else {
    if (uni.getSystemInfoSync().platform === 'android') {
      webUni.postMessage({ data: { action: 'previewExcel', url: url } })
    } else {
      window.open(url, '_blank')
    }
  }
}

// 数值金额格式化
export function priceFormat(num, n) {
  n = n || 2
  let symbol = ','
  if (num === null) return ''
  num = Number(num)
  if (isNaN(num)) {
    return ''
  }
  if (!num && num !== 0) {
    return ''
  }
  if (typeof num !== 'number')
    throw new TypeError('num参数应该是一个number类型' + num)
  if (n < 0) throw new Error('参数n不应该小于0')
  const hasDot = parseInt(num) != num // 这里检测num是否为小数，true表示小数
  const m = n != undefined && n != null ? n : 1
  num =
    m == 0
      ? num.toFixed(m) + '.'
      : hasDot
      ? n
        ? num.toFixed(n)
        : num
      : num.toFixed(m)
  symbol = symbol || ','
  num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function (match, p1, p2) {
    return p1 + symbol
  })
  if (n == 0 || (!hasDot && !n)) {
    // 如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
    num = num.substring(0, num.indexOf('.'))
  }
  return num
}

/**
 * 判断工程模块是否可以编辑
 * linkEntityList：项目列表联系人
 * userInfo: 用户信息，通过get_user_detail_by_user_id进行获取
 * contactTypes：可以编辑项目数据的项目联系人类型
 */
export function isEngineeringEditAble(
  linkEntityList,
  userInfo,
  contactTypes = ['XXWH', 'XCDB']
) {
  if (linkEntityList && linkEntityList.length > 0) {
    const obj = linkEntityList.find(
      (item) =>
        (item.contactNumber === userInfo.phone ||
          item.contactNumber === userInfo.username) &&
        contactTypes.indexOf(item.contactType) !== -1
    )
    if (!obj) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 如果未注册，需要去授权注册
 */
export function toGetuserinfo() {
  if (!Constans.mebid) {
    uni.switchTab({
      url: '/pages/home/home',
    })
    uni.showModal({
      title: '温馨提醒',
      content: '您尚未登录，是否登录？',
      complete: (res) => {
        if (res.confirm) {
          // 去授权绑定手机号
          uni.navigateTo({
            url: '/pages/getuserinfo/getuserinfo',
          })
        }
      },
    })
  }
}
/**
 * http请求封装结束
 */
export default {
  isNull,
  checkIdCard,
  showToastdefault,
  isContain,
  checkName,
  checkPhone,
  onError,
  showSuccessfault,
  formatDate,
  isJSON,
  parseTime,
  changeButtonClickAble,
  setButtonClickAble,
  isButtonClickAble,
  qqMapTransBMap,
  BMapTransqqMap,
  urlQueryToJson,
  previewPdfFile,
  selectDictLabel,
  mescrollListRequestError,
  getArrayIndex,
  getFileListByFileDownUrl,
  getFileDownUrlByFileList,
  getFileSuffix,
  toCheckOrDownFile,
  priceFormat,
  isEngineeringEditAble,
  toGetuserinfo,
}
</script>
