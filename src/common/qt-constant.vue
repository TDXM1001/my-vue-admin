/** * 存放全局常量、对象 */

<script>
const window = {} //窗口屏
const version = '1.0.3'
const isToLogin = false //是否去登录
const token = '' //登录后返回的token
const isBackAuto = false //是否自动返回
const phone = '' //当前用户手机号
const arr_key = [
  38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61, 56, 48, 50, 101, 99,
  52, 113, 119, 114, 116, 116, 119, 115, 100, 53, 53, 50, 115, 99, 103, 121,
  104, 107, 107, 102, 52, 99, 49, 99, 51, 52, 53,
] //小程序和微信公众号统一使用

// pc 端一体化平台
const arr_key2 = [
  38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61, 68, 51, 48, 50, 57,
  67, 55, 51, 52, 48, 54, 50, 50, 49, 66, 48, 50, 48, 50, 54, 66, 54, 56, 52,
  66, 66, 48, 48, 53, 55, 57, 67,
]

const stdcomid = '200000053'
const comid = '200000053'
const appid = '000678204' // 自定义的appid通过appid和stdcomid判断是属于哪个项目地
// const appid = '000678201' // 测试
const openid = '' // openid
// const openid="o1nFw51Duo8GQdbClFnMc2O2VGBw"
// const openid="o1nFw53yDVUydImCTd8UHqlQjMNA"
const mebid = '' // 会员id
const telephone = '' // 会员手机号

export default {
  window,
  version,
  isToLogin,
  token,
  isBackAuto,
  phone,
  arr_key,
  stdcomid,
  appid,
  openid,
  telephone,
  comid,
}
</script>
