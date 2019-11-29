// pages/logs/logs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        background: 'rgba(113, 126, 156, 0.3)'
      }
    ],
    address: '',
    weather: '',
    temperature: '',
    winddirection: '',
    windpower: '',
    moodList: []
  },

  // 获取列表
  getList () {
    const that = this
    const db = wx.cloud.database()
    const mood = db.collection('mood')
    db.collection('mood').get().then(res => {
      console.log(res)
      that.setData({
        moodList: res.data
      })
    })
  },

  // 编辑
  handleEdit (event) {
    const id = event.currentTarget.dataset.id
  },
  // 删除
  handleDelete (event) {
    const id = event.currentTarget.dataset.id
    const that = this
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success (res) {
        if (res.confirm) {
          db.collection('mood').doc(id).remove({
            success() {
              that.getList()
            }
          })
        }
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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