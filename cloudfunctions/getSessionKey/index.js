const cloud = require('wx-server-sdk');
const requestSync = require('./requestSync')
cloud.init();
const db = cloud.database()

/*
传入参数
{
  data:{
    js_code,
    encryptedData,
    iv
  }
}
*/
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const code = event.js_code;
  const appid = event.appId;
  console.log("appid"+appid)
  const secret = '93bc2554d5a75ddea76a882f2615fb39'

  const url = {
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
  }
  const req = await requestSync(url);
  const personNum = await db.collection('userInfo').where({"_openid":  wxContext.OPENID }).get()
  const session = JSON.parse(req);
  const sessionKey = session.session_key;
  console.log('sessionKey' + sessionKey)
  return { "sessionKey": sessionKey, "personNum": personNum};
}
