//index.js
const app = getApp()
let amapFile = require('../../libs/amap-wx.js')
Page({
  data: {
    avatarUrl: app.globalData.avatarUrl,
    userInfo: app.globalData.userInfo,
    // currentWeek: new Date().getDay(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    mood_days_color: [
      {
        month: 'current',
        day: new Date().getDate(),
        color: '#2a3948',
        background: '#8d9897'
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
    if (event.detail.month === this.data.currentMonth) {
      let changeDay = `mood_days_color[1].day`
      this.setData({
        currentYear: event.detail.year,
        currentMonth: event.detail.month,
        currentDay: event.detail.day,
        [changeDay]: event.detail.day
      })
    }
  },
  // 获取天气
  getWeather() {
    const that = this
    let amapObj = new amapFile.AMapWX({ key: '3f87806f7ff451c3714e48d1a606b0ea' })
    amapObj.getWeather({
      success(res) {
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
    wx.navigateTo({
      url: '/pages/addLogs/addLogs'
    })
  }
})
