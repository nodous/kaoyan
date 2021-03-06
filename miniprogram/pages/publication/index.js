const app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    value: '吐槽？我们上...'
  },
  onLoad() {
    let userInfo = app.globalData.userInfo
    console.log(userInfo)
  },
  getFocus() {
    console.log(this.data.value)
    var _this = this
    if (_this.data.value == '吐槽？我们上...') {
      _this.setData({
        value: ''
      })
    } else if (_this.data.value == '') {
      _this.setData({
        value: '吐槽？我们上...'
      })
    }
  },
  bindinput(e) {
    this.setData({
      value: e.detail.value
    })
  },
  onShareAppMessage: function (res) {
    // console.log(app.globalData.userInfo)
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "来自cxk的吐槽推荐",
      path: "pages/index/index",
      imageUrl: ''
    }
  },
  sendMyMessage() {
    // wx.checkSession({
    //   success: function (res) {
    //     console.log(res, '登录未过期')
    //     wx.showToast({
    //       title: '登录未过期啊',
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res, '登录过期了')
    //     wx.showModal({
    //       title: '提示',
    //       content: '你的登录信息过期了，请重新登录',
    //     })
    //   }
    // })
    var _this = this
    var TIME = util.formatTime(new Date());
    if (this.data.value != 0 && this.data.value != '吐槽？我们上...') {
      const db = wx.cloud.database()
      // const todos = db.collection('userPublishing')
      db.collection('userPublishing').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          message: _this.data.value,
          nickName: app.globalData.userInfo.nickName,
          city: app.globalData.userInfo.province + '-' + app.globalData.userInfo.city,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          gender: app.globalData.userInfo.gender,
          time: TIME
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
             wx.navigateTo({
                 url: '/pages/index/index?page=2',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
             })
          console.log(res)
        }
      })
    }
  }
})