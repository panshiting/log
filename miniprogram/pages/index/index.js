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
  onShow: function () {
    this.getWeather()
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
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
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
