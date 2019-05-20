//index.js
const { $Toast } = require('../../dist/base/index');
import { $stopWuxRefresher, $stopWuxLoader } from '../../dist/index'
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
    login: false, //是否登陆过
    visible1: false,
    value1: [],
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
    tucaoList: [],
    qiandao: '签到',
    userStatus: {}
  },
  clickReload: function () {
    let _this = this
    console.log("sdsfffff")
    app.getShareTiket(function (globalData) {
      console.log('clickReload---globalData-->' + JSON.stringify(globalData))
      _this.setData({
        openGid: globalData.openGid
      })
    })
  },
  bindSignIn () {
    var _this = this
    if (this.data.qiandao == "已签到"){
      return;
    }
    console.log(this.data.userStatus.level)
    var num=this.data.userStatus.level+1
    if(this.data.userStatus=''){
      console.log("mei")
    }
    const db = wx.cloud.database()
    // var num1 = this.data.userStatus.level
    console.log(num)
    db.collection('userInfo').doc(_this.data.userStatus.id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        level: num,
        time: util.formatTime(new Date())
      },
      success(res) {
        console.log(res)
        _this.setData({
          qiandao: '已签到'
        })
      }
    })
  },
  onLoad: function () {
    let _this = this
    console.log("回来了")
    const db = wx.cloud.database()

     var timea =''+ util.formatTime(new Date());
    console.log(timea)
    // wx.cloud.callFunction({
    //   name: 'opengid'
    // })
    // .then(res =>{
    //       console.log("res-" + JSON.stringify(res))
    // }).catch(err => {

    // })
    wx.cloud.callFunction({
      name: 'login',
    }).then(res =>{
      console.log(JSON.stringify(res.result.event.userInfo.openId))
      db.collection('userInfo').where({
        "_openid": res.result.event.userInfo.openId
         }).get({
          success(res) {
            var lastTime =''+ res.data[0].time.slice(0, 10)
            var qiaodaoStaus;
            if (lastTime == timea.slice(0, 10)) {
              qiaodaoStaus = '已签到'
              console.log('jj')
            } else {
              qiaodaoStaus = "签到"
              console.log("签到")
            }
            _this.data.userStatus= {
              level: res.data[0].level,
              id: res.data[0]._id                   
            }
            
            _this.setData({
              qiandao: qiaodaoStaus,
              userStatus: _this.data.userStatus
            })
          }
        })
    })
    // this.setData({
    //   dataaa: app.globalData.userInfo.nickName
    // })
    wx.checkSession({
　　　　success: function (res) {
　　　　　console.log("处于登录态"+JSON.stringify(res));
　　　　},
　　　　fail: function (res) {
          app.getSessionId()
　　　　　 console.log("需要重新登录");
　　　　}
    })
    // wx.showShareMenu({
    //   //设为true，获取ShareTicket
    //   withShareTicket: true
    // })
    // app.getShareTiket(function (globalData) {
    //   console.log('clickReload---globalData-->' + JSON.stringify(globalData))
    //   _this.setData({
    //     openGid: globalData.openGid
    //   })
    // })
    // var TIME = util.formatTime(new Date());
    // console.log(TIME)
    db.collection('menuPolitics').get({
      success(res) {
        var parse = JSON.parse(res.data[0].data)
        console.log(parse.children)
        _this.setData({
          options1: parse.children
        })
      }
    })
    
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
                userInfo: res.userInfo,
                login: false
              })
            }
          })
        } else {
          console.log(app.globalData.userInfo)
          // $Toast({
          //   content: "请授权页面",
          //   type: 'error'
          // });
          _this.setData({
            login: true
          })
        }
      }
    })
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
  //签到
  signIn() {

  },
  //下拉刷新事件
  onRefresh() {
    var _this = this
    wx.cloud.callFunction({
      name: 'getMessage',
      data: {
        context: 0
      }
    })
      .then(res => {
        // console.log('2122'+JSON.stringify(res.result))

        _this.setData({
          tucaoList: res.result.data,
          pageNum: 0
        })
        $stopWuxRefresher()
      })
      .catch(console.error)
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  getToLower(ev){
    console.log("onLoadmore")
    var nowNum = this.data.pageNum + 10;
    console.log("nowNum-"+ nowNum)
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
  onOpen1() {
    console.log(111)
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ 
      visible1: false
    })
  },
  onChange1(e) {
    this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
    console.log('onChange1', e.detail)
    var nowtitle = this.data.title1.split("/")[2]
    console.log(nowtitle)
    if (nowtitle == '1.1商品的基本属性') {
      wx.navigateTo({
      url: '../learn/learn'
    })
    }
  },  
  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {//点击了“允许”按钮，
    // app.getSessionId()
    console.log("都简单")
    var _this = this
    wx.login({
      success: function (res) {
        //获取code
        console.log('code-->' + res.code)
        _this.setData({
          login: false
        })
        wx.cloud.callFunction({
          name: 'getSessionKey',
          data: {
            js_code: res.code,
            appId: 'wxd401094a6b05b5fb'
          },
          success: function (res) {
            console.log('res' + JSON.stringify(res));
            wx.setStorageSync('session', res.result.sessionKey)
            // wx.setStorageSync('session', res.result.sessionKey)
            // that.globalData.openGid = res.result.openGId
            var TIME = util.formatTime(new Date());
            console.log(TIME)
            wx.cloud.callFunction({
              name: 'bindUserInfo',
            })
              .then(res => {
                // console.log('000' + JSON.stringify(res))
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
                      console.log("成功-"+JSON.stringify(res))
                      _this.data.userStatus = {
                        level: 1,
                        id: res._id
                      }
                      _this.setData({
                        userStatus: _this.data.userStatus
                      })
                    }
                  })
                }
              })
              .catch(console.error)
          },
          fail: function (err) {
            console.log('getShareTiket---err' + JSON.stringify(err))
          }
        })
      }
    })
    }
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  }
})
