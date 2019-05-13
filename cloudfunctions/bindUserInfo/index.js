// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('userInfo').where({
      "_openid": wxContext.OPENID
    }).get()
  } catch (e) {
    console.error(e)
  }
}