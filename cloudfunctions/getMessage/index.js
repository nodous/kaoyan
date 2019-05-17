// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (context) => {
  console.log(context)
  try {
    return await db.collection('userPublishing').orderBy('time', 'desc').skip(context.context).limit(10).get(res=>{
      console.log(res.data)
    })
  } catch (e) {
    console.error(e)
  }
}