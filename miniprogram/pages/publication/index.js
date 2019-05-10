const app = getApp()
Page({
  data: {
    value: '吐槽？我们上...'
  },
  onLoad (){
    let userInfo = app.globalData.userInfo
    console.log(userInfo)
  },
  getFocus () {
    console.log(this.data.value)
    var _this = this
    if (_this.data.value == '吐槽？我们上...') {
      _this.setData({
        value: ''
      })
    } else if (_this.data.value == ''){
      _this.setData({
        value: '吐槽？我们上...'
      })
    }
  },
  bindinput (e) {
    this.setData({
      value: e.detail.value
    })
  },
  sendMyMessage() {
    if (this.data.value != 0 || value != '吐槽？我们上...'){
      
      const db = wx.cloud.database()
      // const todos = db.collection('userPublishing')
      db.collection('userPublishing').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          message: 'learn cloud database',
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
    }
  }
})