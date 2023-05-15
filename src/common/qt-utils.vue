<script>
import Common from '@/common/qt-common.vue'
import Constans from '@/common/qt-constant.vue'
// 引入md5
import md5 from 'js-md5'
export function initCmdObj(cmdObj) {
  cmdObj.ve = 2
  cmdObj.appId = Constans.appid
  cmdObj.comid = Constans.stdcomid
  if (Constans.openid) {
    cmdObj.openid = Constans.openid
    cmdObj.openId = Constans.openid
    cmdObj.Weixinid = Constans.openid // 实际为openId
  }
  if (Constans.mebid) {
    cmdObj.mebId = Constans.mebid //
    cmdObj.mebid = Constans.mebid //
  }
  cmdObj['ms'] = new Date().getTime()
  cmdObj['clientType'] = 'html'
  if (typeof cmdObj['u'] == 'undefined') cmdObj['u'] = ''
  if (typeof cmdObj['t'] == 'undefined') cmdObj['t'] = ''
  return cmdObj
}

// 方法一
function getArray() {
  var spiltStr = new Array()
  // console.log("arrkey的值",this.arrKey);
  spiltStr.push.apply(spiltStr, Constans.arr_key)

  return spiltStr
}
// 方法二
export function sortUrl(cmdObj) {
  var arr1 = []
  for (var pro in cmdObj) {
    arr1.push(pro)
  }
  arr1.sort(function (a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1
  })
  var arr2 = []
  for (var i = 0; i < arr1.length; i++) {
    var key = arr1[i]
    var value = cmdObj[key]
    if (typeof value != 'function') arr2.push(key + '=' + value)
  }
  return arr2.join('&')
}

// 生成签名
export function sign(cmdObj) {
  // console.log("传入的cmdObj",cmdObj);
  var content = sortUrl(cmdObj)
  // console.log("content的值",content);
  var newArr = []
  var intArr = getArray()
  // console.log('=========', intArr)
  for (var i = 0; i < intArr.length; i++) {
    newArr.push(String.fromCharCode(intArr[i]))
  }
  // console.log("newArr",newArr);
  content += newArr.join('')
  // console.log("content",content);
  var sign = md5(content)
  // console.log("sign转换后",sign);
  return sign
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
export default {
  initCmdObj,
  sign,
}
</script>
