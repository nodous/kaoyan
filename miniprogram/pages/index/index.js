//index.js
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    cur: 1,
    curIndex: 1, //当前的索引
    projectList: ['我的', '学习呀', '吐槽圈'],
    projuectIndex: 1,
    scrollTop: 0,
    pageNum: 0,
    loading: false,
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
    userInfo: '',
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
  getToLower(ev){
    var nowNum = this.data.pageNum + 10;
    var _this = this
    this.setData({
      loading: true
    })
      wx.cloud.callFunction({
        name: 'getMessage',
        data: {
          context: nowNum
        }
      })
        .then(res => {
          // console.log('2122' + JSON.stringify(res.result))
          _this.setData({
            tucaoList: this.data.tucaoList.concat(res.result.data),
            pageNum: nowNum,
            loading: false
          })
        })
        .catch(err =>{
          $Toast({
            content: err,
            type: 'error'
          });
        })
     console.log('到底拉')
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
    var TIME = util.formatTime(new Date());
    console.log(TIME)
    var _this = this
    //删除数据
    // wx.cloud.callFunction({
    //   name: 'remove',
    // })
    //   .then(res => {
    //     console.log('2122'+JSON.stringify(res.result))
    //   })
    //   .catch(console.error)
    //获取特定吐槽圈数据
    wx.cloud.callFunction({
      name: 'getMessage',
      data: {
        context: 0
      }
    })
      .then(res => {
        // console.log('2122'+JSON.stringify(res.result))
        _this.setData({
          tucaoList: res.result.data
        })
      })
      .catch(console.error)
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              var str = JSON.stringify(res.userInfo);
              app.globalData.userInfo = res.userInfo
              _this.setData({
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log(app.globalData.userInfo)
          // $Toast({
          //   content: "请授权页面",
          //   type: 'error'
          // });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var _this = this
    var TIME = util.formatTime(new Date());
    console.log(TIME)
    app.globalData.userInfo = e.detail.userInfo
    wx.cloud.callFunction({
      name: 'bindUserInfo',
    })
      .then(res => {
        console.log('000' + JSON.stringify(res.result.data.length))
        if (res.result.data.length == 0) {
          const db = wx.cloud.database()
          // const todos = db.collection('userPublishing')
          db.collection('userInfo').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              message: _this.data.value,
              gender: app.globalData.userInfo.gender,
              level: 1,
              time: TIME
            },
            success(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
        }
      })
      .catch(console.error)
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  }
})
