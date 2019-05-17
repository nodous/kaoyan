// miniprogram/pages/catalogue/catalogue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    const db = wx.cloud.database()
    db.collection('menuPolitics').get({
      success(res) {
        var parse = JSON.parse(res.data[0].data)
        console.log(parse)
        _this.setData({
          title: parse.label,
          dataList: parse.children
        })
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
      }
    })
  },
  getToLower(ev) {
    console.log("到底啦")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})