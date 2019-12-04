//index.js
const app = getApp()
let amapFile = require('../../libs/amap-wx.js')
Page({
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    avatarUrl: app.globalData.avatarUrl,
    userInfo: app.globalData.userInfo,
    currentWeek: new Date().getDay(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    mood_days_color: [
      {
        month: 'current',
        day: new Date().getDate(),
        color: '#2a3948',
        background: 'rgba(113, 126, 156, 0.3)'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: '#2a3948',
        background: '#FFB23B'
      }
    ],
    address: '',
    weather: '',
    temperature: '',
    winddirection: '',
    windpower: ''
  },

  // 日历点击回调
  dayClick(event) {
    console.log(event)
    let changeDay = `mood_days_color[1].day`
    this.setData({
      currentYear: event.detail.year,
      currentMonth: event.detail.month,
      currentDay: event.detail.day,
      [changeDay]: event.detail.day
    })
  },

  // 获取天气
  getWeather() {
    const that = this
    let amapObj = new amapFile.AMapWX({ key: '3f87806f7ff451c3714e48d1a606b0ea' })
    amapObj.getWeather({
      success(res) {
        console.log(res)
        app.globalData.address = res.city.data
        app.globalData.weather = res.weather.data
        that.setData({
          address: res.city.data,
          weather: res.weather.data,
          temperature: res.temperature.data,
          winddirection: res.winddirection.data,
          windpower: res.windpower.data
        })
      }
    })
  },

  addDirly () {
    if (!app.globalData.avatarUrl) {
      app.authLogin()
      wx.navigateTo({
        url: '/pages/addLogs/addLogs'
      })
    } else {
      wx.navigateTo({
        url: '/pages/addLogs/addLogs'
      })
    }
  },
  onShow: function () {
    this.getWeather()
  },
  onReady: function () {},

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //     wx.navigateTo({
    //       url: '../userConsole/userConsole',
    //     })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     wx.navigateTo({
    //       url: '../deployFunctions/deployFunctions',
    //     })
    //   }
    // })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: function (res) {

    //     wx.showLoading({
    //       title: '上传中',
    //     })

    //     const filePath = res.tempFilePaths[0]
        
    //     // 上传图片
    //     const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
    //     wx.cloud.uploadFile({
    //       cloudPath,
    //       filePath,
    //       success: res => {
    //         console.log('[上传文件] 成功：', res)

    //         app.globalData.fileID = res.fileID
    //         app.globalData.cloudPath = cloudPath
    //         app.globalData.imagePath = filePath
            
    //         wx.navigateTo({
    //           url: '../storageConsole/storageConsole'
    //         })
    //       },
    //       fail: e => {
    //         console.error('[上传文件] 失败：', e)
    //         wx.showToast({
    //           icon: 'none',
    //           title: '上传失败',
    //         })
    //       },
    //       complete: () => {
    //         wx.hideLoading()
    //       }
    //     })

    //   },
    //   fail: e => {
    //     console.error(e)
    //   }
    // })
  },
  getUserInfo: function () {
    let that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              app.globalData.avatarUrl = res.userInfo.avatarUrl,
              app.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
  }
})
