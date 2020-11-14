
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const chavy = init()

const url = `https://mbff.yuegowu.com/goods/goodsDetailSimple/2c919458759546e501759c6419665ba2?reqId=4afecd5d-83c4-49d5-9b51-7ac2219d3cab`;
const method = `GET`;
const headers = {
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Content-Type' : `application/json`,
'distribute-channel' : `{"channelType":1,"inviteeId":null}`,
'Origin' : `https://m.yuegowu.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.18(0x17001229) NetType/WIFI Language/zh_CN miniProgram`,
'Authorization' : `Bearer`,
'Host' : `mbff.yuegowu.com`,
'Referer' : `https://m.yuegowu.com/goods-detail/2c919458759546e501759c6419665ba2?shareUserId=2c91945c7219ca14017219e83f99361c&v=16053691167125522&code=031NhK0w3MPsiV2xNg2w3gGK7Z2NhK0f&state=b2bOpenId`,
'Accept-Language' : `zh-cn`,
'Accept' : `*/*`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    // console.log(response.statusCode + "\n\n" + response.body);
    data = JSON.parse(response.body)
    num = data.context.goods.goodsEvaluateNum;
    console.log(data)
    if (num <= 0) {
        console.log("没有库存，不作任何处理")
        return;
    }
    costPrice = data.context.goods.costPrice
    console.log("\n-----------\n")
    console.log("当前查询到数量为:" + num)
    console.log("\n-----------\n")
    chavy.msg("阿玛尼监控", "有货了", "检测到有货，当前货物数量为:" + num + "\n" + "成本价格为:" + costPrice)
}, reason => {
    console.log(reason.error);
});

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
