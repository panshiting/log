//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  globalData: {
    avatarUrl: '',
    userInfo: {},
    address: '',
    weather: ''
  },
  // 授权登录
  authLogin: function () {
    wx.showLoading({ title: '加载中' })
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
              that.globalData.avatarUrl = res.userInfo.avatarUrl,
              that.globalData.userInfo = res.userInfo
              // that.setData({
              //   avatarUrl: app.globalData.avatarUrl,
              //   userInfo: app.globalData.userInfo
              // })
              wx.hideLoading()
            }
          })
        }
      }
    })
  }
})
