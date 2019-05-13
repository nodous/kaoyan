// 使用了 async await 语法
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('userPublishing').where({
      '_openid': 'ocjA-5ffjSfczq6q5MlMUjnlOU30'
    }).remove()
  } catch (e) {
    console.error(e)
  }
}