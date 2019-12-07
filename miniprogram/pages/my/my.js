// pages/my/my.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : './user-unlogin.png',
      userInfo: app.globalData.userInfo
    })
  },

  // 授权登录
  login () {
    app.authLogin()
  },

  goToInstruction () {
    wx.navigateTo({
      url: '/pages/instruction/instruction'
    })
  }
})