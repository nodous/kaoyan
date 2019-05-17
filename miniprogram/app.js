//app.js
// const util = require('./utils/util.js');
App({
  onShow(options ){
    let that = this
    if (options && options.scene == 1044) {
      //获取shareTicket
      that.globalData.shareTicket = options.shareTicket
    }
    console.log('onShow---options=--->' + JSON.stringify(options))
  },
  getSessionId(e) {
    // console.log("都简单")
    // var _this = this
    // wx.login({
    //   success: function (res) {
    //     //获取code
    //     console.log('code-->' + res.code)

    //     wx.cloud.callFunction({
    //       name: 'getSessionKey',
    //       data: {
    //         js_code: res.code,
    //         appId: 'wxd401094a6b05b5fb'
    //       },
    //       success: function (res) {
    //         console.log('res' + JSON.stringify(res));
    //         wx.setStorageSync('session', res.result.sessionKey)
    //         // wx.setStorageSync('session', res.result.sessionKey)
    //         // that.globalData.openGid = res.result.openGId
    //         var TIME = util.formatTime(new Date());
    //         console.log(TIME)
    //         wx.cloud.callFunction({
    //           name: 'bindUserInfo',
    //         })
    //           .then(res => {
    //             // console.log('000' + JSON.stringify(res))
    //             if (res.result.data.length == 0) {
    //               const db = wx.cloud.database()
    //               // const todos = db.collection('userPublishing')
    //               db.collection('userInfo').add({
    //                 // data 字段表示需新增的 JSON 数据
    //                 data: {
    //                   // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //                   message: _this.data.value,
    //                   gender: app.globalData.userInfo.gender,
    //                   level: 1,
    //                   time: TIME
    //                 },
    //                 success(res) {
    //                   // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //                   console.log(res)
    //                 }
    //               })
    //             }
    //           })
    //           .catch(console.error)
    //       },
    //       fail: function (err) {
    //         console.log('getShareTiket---err' + JSON.stringify(err))
    //       }
    //     })
    //   }
    // })
  },
  getShareTiket: function (cb) {
    console.log("进来了")
    let that = this
    if (that.globalData.shareTicket) {
      wx.getShareInfo({
        shareTicket: that.globalData.shareTicket,
        success: function (res) {
          console.log('getShareTiket---shareTicket-->' + JSON.stringify(res))
          //获取encryptedData、iv
          let js_encryptedData = res.encryptedData
          let js_iv = res.iv
          wx.login({
            success: function (res) {
              //获取code
              console.log('code-->' + res.code)

              //调用云函数，破解opengid
              wx.cloud.callFunction({
                name: 'opengid',
                data: {
                  js_code: res.code,
                  appId: 'wxd401094a6b05b5fb',
                  encryptedData: js_encryptedData,
                  iv: js_iv
                },
                success: function (res) {
                  console.log('打印opengid' + res.result.openGId);
                  console.log('res' + JSON.stringify(res));
                  that.globalData.openGid = res.result.openGId
                  console.log('getShareTiket---openGid' + that.globalData.openGid)
                  typeof cb == "function" && cb(that.globalData)
                },
                fail: function (err) {
                  console.log('getShareTiket---err' + JSON.stringify(err))
                }
              })
            }
          })
        }
      })
    } else {
      console.log('不存在shareTicket')
    }
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: null
    }
  }
})
