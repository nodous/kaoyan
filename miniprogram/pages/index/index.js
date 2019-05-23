//index.js
const { $Toast } = require('../../dist/base/index');
import { $stopWuxRefresher, $stopWuxLoader } from '../../dist/index'
const util = require('../../utils/util.js');
const db = wx.cloud.database()

var animation = wx.createAnimation({

  duration: 4000,
  timingFunction: "ease",
  delay: 0,
  transformOrigin: "50% 50%",

})
// 在页面中定义激励视频广告
let videoAd = null
// 在页面中定义插屏广告
let interstitialAd = null



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
    musicNumAll: 0,
    pageNum: 0,
    loading: false,
    chaping: true,
    time1:"00:00",
    lineWidth: 0,
    innerAudioContext: null,
    time2:"00:00",
    touchSwitch: true,
    startStatus: true,
    musicIndex: 0,
    background: [
      'demo-text-1',
      'demo-text-2',
      'demo-text-3'
    ],
    navImage: [
      'adunit-18db11054d34070a',
      'adunit-4291833fbe632cef',
      'adunit-ea2e9a48d5a801f5',
      'adunit-ab151242cd2dcf57',
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
  //停止音乐
  stopMusic() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 500,
      transformOrigin: "50% 50%",
    })

    //设置动画
    // animation.rotate(90).step();     //旋转90度
    //animation.scale(1.5).step();        //放大1.5倍
    // animation.translate(0,100).step();        //偏移x,y,z
    //animation.skew(30,50).step();        //倾斜x,y

    animation.translate(0, 0).step();     //边旋转边放大


    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })
    this.data.innerAudioContext.pause()
    this.setData({
      startStatus: true,
      touchSwitch: true
    })
  },
  //jixuyinyue
  continueMusic() {
    this.data.innerAudioContext.play()
  },
  //播放音乐
  startMusic(){
    // 1. 获取数据库引用
    var animation = wx.createAnimation({

      duration: 1000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",

    })

    //设置动画
    // animation.rotate(90).step();     //旋转90度
    //animation.scale(1.5).step();        //放大1.5倍
    // animation.translate(0,100).step();        //偏移x,y,z
    //animation.skew(30,50).step();        //倾斜x,y

    animation.translate(0, -50).step();     //边旋转边放大

    db.collection('music').count({
      success(res) {
        console.log(res)
        _this.setData({
          musicNumAll: res.total
        })
      }
    })
    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })
    var _this =this
    // 2. 构造查询语句
    db.collection('music').skip(0).limit(1).get({
      success(res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
        console.log(res)
        if (!_this.data.touchSwitch)
        return;
        _this.setData({
          touchSwitch: false
        })
        _this.data.innerAudioContext= wx.createInnerAudioContext()
        _this.data.innerAudioContext.autoplay = true
        _this.data.innerAudioContext.src = res.data[0].url;
        _this.data.innerAudioContext.onPlay(() => {
          console.log('开始播放')
          _this.setData({
            startStatus: false,
            touchSwitch:false
          })
        })
        _this.data.innerAudioContext.onPause(() => {
          console.log('单停')
          _this.setData({
            startStatus: true
          })
        })
        _this.data.innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
        _this.data.innerAudioContext.onTimeUpdate(()=>{
          // console.log(_this.data.innerAudioContext.currentTime)
          _this.setData({
            time1: _this.changeMin(_this.data.innerAudioContext.currentTime),
            time2: _this.changeMin(_this.data.innerAudioContext.duration),
            lineWidth: _this.data.innerAudioContext.currentTime / _this.data.innerAudioContext.duration*360
          })
          // console.log(_this.data.innerAudioContext.duration)
        })
        _this.setData({
          innerAudioContext: _this.data.innerAudioContext
        })
      }
    })
  },
  //up music
  prevMusic() {
    var _this = this
    var num = this.data.musicIndex - 1
    if(num<0) {
      num = _this.data.musicNumAll -1
    }
    const db = wx.cloud.database()
    _this.data.innerAudioContext.stop()

    db.collection('music').skip(num).limit(2).get({
      success(res) {
        console.log(res)
        _this.data.innerAudioContext.src = res.data[0].url;
        _this.data.innerAudioContext.play()
        _this.setData({
          musicIndex: num
        })
      }
    })
  },
  //下一首音乐
  nextMusic(){
    var _this = this
    var num = this.data.musicIndex +1
    if (num >= this.data.musicNumAll) {
      num = 0
    }
    const db = wx.cloud.database()
    _this.data.innerAudioContext.stop()
    db.collection('music').skip(num).limit(1).get({
      success(res) {
        _this.data.innerAudioContext.src = res.data[0].url;
        _this.data.innerAudioContext.play()
        _this.setData({
          musicIndex: num
        })
      }
    })
    // _this.data.innerAudioContext.src = res.data[0].url;
  },
  changeMin (value) {
    var num1 = Math.floor(value)
    var num = Math.floor(num1 / 60) > 9 ? Math.floor(num1 / 60) : "0" + Math.floor(num1 / 60)
    var yu = num1 - num * 60 > 9 ? num1 - num * 60 : "0" + (num1 - num * 60)
    var zhi = num + ":" + yu
    return zhi;
  },
  changeDis(value,value2) {
    let zongchang = 360
    let nowWidth = value/value2*360
    this.setData({
      lineWidth: nowWidth
    })
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
    const db = wx.cloud.database()
    this.changeMin(116.111, 211.2222) 
      // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b0af095b04dba6b5'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { 
        _this.setData({
          chaping: true
        })
      })
    }
    // // 在页面onLoad回调事件中创建激励视频广告实例
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-d617c64def3eaec1'
    //   })
    //   videoAd.onLoad(() => { })
    //   videoAd.onError((err) => { })
    //   videoAd.onClose((res) => { })
    // }

    // // 用户触发广告后，显示激励视频广告
    // if (videoAd) {
    //   videoAd.show().catch(() => {
    //     // 失败重试
    //     videoAd.load()
    //       .then(() => videoAd.show())
    //       .catch(err => {
    //         console.log('激励视频 广告显示失败')
    //       })
    //   })
    // }
    console.log("回来了")

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
  showAdvertisement() {
    // 在适合的场景显示插屏广告
    this.setData({
      chaping: false
    })
    console.log(1)
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  onShow() {
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
