// pages/addLogs/addLogs.js
const app = getApp()
const commonJs = require('../../utils/common.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '../../images/logo.jpg',
    message: '',
    address: '',
    weather: '',
    nickName: ''
  },

  handleTextarea (event) {
    const value = event.detail.value
    this.setData({
      message: value
    })
  },
  
  // 图片上传
  changeImage () {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function(res) {
        wx.showLoading({
          title: '上传中...',
        })
        const filePath = res.tempFilePaths[0]
        const name = Math.random() * 1000000
        const cloudPath = 'picture/' + name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath
        }).then(res => {
          wx.hideLoading()
          that.setData({
            imageUrl: res.fileID
          })
          console.log(that.data.imageUrl)
        }).catch(err => {
          console.log('图片上传失败：', err)
        })
      },
    })
  },

  // 保存
  save () {
    const that = this
    const db = wx.cloud.database()
    const mood = db.collection('mood')
    mood.add({
      data: {
        time: commonJs.getTime(new Date()),
        imageUrl: that.data.imageUrl,
        userName: that.data.nickName,
        weather: that.data.weather,
        address: that.data.address,
        message: that.data.message
      }
    }).then(res => {
      wx.showToast({
        title: '新增成功',
      })
      wx.reLaunch({
        url: '/pages/logs/logs'
      })
    }).catch(e => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      address: app.globalData.address,
      weather: app.globalData.weather,
      nickName: app.globalData.userInfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})