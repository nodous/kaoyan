//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    cur: 2,
    curIndex: 2, //当前的索引
    projectList: ['我的','学习呀','吐槽圈'],
    projuectIndex: 1,
    background: [
      'demo-text-1', 
      'demo-text-2', 
      'demo-text-3'
    ],
    navImage: [
      '../../img/1.jpg', 
      '../../img/2.jpg', 
      '../../img/3.jpg', 
      '../../img/4.jpg', 
      '../../img/5.jpg', 
      '../../img/6.jpg',
    ],
    subject:[
      {
        img: '../../img/ty.png',
        words: '体育'
      },
      {
        img: '../../img/zz.png',
        words: '政治'
      },
      {
        img: '../../img/yy.png',
        words: '英语'
      },
      {
        img: '../../img/sx.png',
        words: '数学'
      },
      {
        img: '../../img/yx.png',
        words: '医学'
      },
      {
        img: '../../img/ls.png',
        words: '历史'
      }
      
    ],
    learnList: [
      {
        img: '../../img/p2.png',
        words: '英语口语'
      },
      {
        img: '../../img/p3.png',
        words: '数学总结'
      },
      {
        img: '../../img/p4.png',
        words: '体育提升'
      },
      {
        img: '../../img/p5.png',
        words: '中医练习'
      },
      {
        img: '../../img/p6.png',
        words: '政治提升'
      },
    ]
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  swiperChange(e) {
    let current = e.detail.current;
    let source = e.detail.source
    //console.log(source);
    console.log(current, this.data.curIndex, this.data.cur)
    this.setData({
      curIndex: e.detail.current
    })
  },
  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'add',
    //   // 传给云函数的参数
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    // })
    //   .then(res => {
    //     console.log('2122'+JSON.stringify(res.result)) // 3
    //   })
    //   .catch(console.error)
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'login',
    //   // 传给云函数的参数
    // })
    //   .then(res => {
    //     console.log('2122' + JSON.stringify(res)) // 3
    //   })
    //   .catch(console.error)
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var str = JSON.stringify(res.userInfo);
              app.globalData.userInfo = res.userInfo
            }
          })
        }else {
          console.log('没有授权')
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    var str = JSON.stringify(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
  }
})
