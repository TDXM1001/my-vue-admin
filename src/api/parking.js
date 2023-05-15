import request from '@/utils/qt-parking'

/**返回初始的请求data，包含module、service、method
 * @param {Object} data
 */
function getMethodObj(method, service = 'WeChatApplet', module = 'wechatapplet') {
  return {
    module: module,
    service: service,
    method: method
  }
}


export function getArrearsRecordList(data) {
  console.log("传入的data", data);
  data = Object.assign(getMethodObj('getArrearsRecordList', 'StdWechat', 'wechat'), data)
  console.log("改造后的data", data);
  return request({
    method: "post",
    data
  })
}
