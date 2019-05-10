//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    cur: 1,
    curIndex: 1, //当前的索引
    projectList: ['我的', '学习呀', '吐槽圈'],
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
    subject: [
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
    ],
    tucaoList: [
      {
        img: '../../img/tx.jpg',
        message: '一点要好好学习历史，搞不定那天就穿越了',
        time: '2019-2-17',
        name: '金鱼哥'
      },
      {
        img: '../../img/p7.png',
        message: '我们学习中虽然苦，有许许多多的挫折，困难，等待着我们，所以我们要勇敢的面对困难，挑战困难，永不言败，那么成功离我们就不愿了，成功是要付出努力的，付出汗水，没有能随随便便成功的，所以我们应该付出不懈努力去学习。',
        time: '2019-2-18',
        name: '缘分天空'
      },
      {
        img: '../../img/p10.png',
        message: '我从小就怕黑，小时候学习不好就是因为不敢看黑板。',
        time: '2019-2-18',
        name: '大哥别杀我'
      },
      {
        img: '../../img/p12.png',
        message: '好好学习，天天处对象。',
        time: '2019-2-18',
        name: '小苗苗'
      },
    ]
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "来自泡面的考研学习推荐",
      path: "pages/index/index",
      imageUrl: '../../img/url.png'
    }
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
  bindViewTap: function () {
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
        } else {
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
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  }
})
