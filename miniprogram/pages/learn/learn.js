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
    seleceNum: ['A','B','C','D'],
    questionList: [],
    answerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = options.select.split(',')
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
        var parse = JSON.parse(res.data[params[0]].data)
        var name = parse.data[params[0]].data[params[1]].data[params[2]].select
        // console.log('11111' + name)
        // var reg = RegExp(/\[/);
        // console.log('11111'+name.match(reg))
   
        // if(typeof(name)== 'string'){
        //   console.log('11111')
        //   var aa = name.split('B')[0].split('A')[1]
        //   var bb = name.split('B')[1].split('C')[0]
        //   var cc = name.split('C')[1].split('D')[0]
        //   var dd = name.split('D')[1]
        //   var arr = [aa,bb,cc,dd]
        //   console.log(arr)
        //   parse.data[params[0]].data[params[1]].data[params[2]].select = arr
        // }
        _this.setData({
          title: parse.data[params[1]].data[params[2]].title, 
          questionList: parse.data[params[1]].data[params[2]].data
        })
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
      }    
    })
  },
  touchStart(e) {
    var dataset = e.currentTarget.dataset;
    this.animation.rotate(0).scale(1).translate(0, 0).step();
    this.setData({ 
      answerList: dataset,
      animationData: this.animation.export() 
      });
  },
  touchEnd(){
    this.animation.rotate(0).scale(1).translate(-1000, 0).step();
    this.setData({ animationData: this.animation.export() });
  },
  return () {
    wx.navigateBack({
      delta: 1
    })
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