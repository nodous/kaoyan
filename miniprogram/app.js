//app.js
App({
  onShow(options ){
    let that = this
    if (options && options.scene == 1044) {
      //获取shareTicket
      that.globalData.shareTicket = options.shareTicket
    }
    console.log('onShow---options=--->' + JSON.stringify(options))
  },
  getShareTiket: function (cb) {
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
                  appId: 'wx7c1126bc182ab756',
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
