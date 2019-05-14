// miniprogram/pages/learn.js
var app = getApp();
const animation = wx.createAnimation({
  transformOrigin: "0% 0%",
  duration: 1000,
  timingFunction: "ease",
  delay: 100
});
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    answer: false,
    seleceNum: ['A','B','C','D']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.animation = animation
    this.animation.rotate(0).scale(1).translate(-1000, 0).step();
    this.setData({ 
      answer:true,
      animationData: this.animation.export() 
      });
   // 1. 获取数据库引用
    const db = wx.cloud.database()
    db.collection('politics').get({
      success(res) {
        var parse = JSON.parse(res.data[0].data)
        console.log(parse)
        _this.setData({
          title: parse.category
        })
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
        console.log((res))
      }
    })
  },
  touchStart() {
    this.animation.rotate(0).scale(1).translate(0, 0).step();
    this.setData({ animationData: this.animation.export() });
  },
  touchEnd(){
    this.animation.rotate(0).scale(1).translate(-1000, 0).step();
    this.setData({ animationData: this.animation.export() });
  },
  getToLower(ev) {
    // var nowNum = this.data.pageNum + 10;
    // var _this = this
    // this.setData({
    //   loading: true
    // })
    // wx.cloud.callFunction({
    //   name: 'getMessage',
    //   data: {
    //     context: nowNum
    //   }
    // })
    //   .then(res => {
    //     // console.log('2122' + JSON.stringify(res.result))
    //     _this.setData({
    //       tucaoList: this.data.tucaoList.concat(res.result.data),
    //       pageNum: nowNum,
    //       loading: false
    //     })
    //   })
    //   .catch(err => {
    //     $Toast({
    //       content: err,
    //       type: 'error'
    //     });
    //   })
    console.log('到底拉')
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