// pages/logs/logs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
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
    moodList: [],
    page: 1,
    pageSize: 10
  },

  onLoad: function (options) {
    this.getList()
  },

  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    this.setData({
      page: 1,
      pageSize: 10
    })
    this.getList()
  },

  onReachBottom: function () {
    if (this.data.hasMore) {
      this.setData({
        page: this.data.page + 1
      }, () => {
        console.log(this.data)
        this.getList()
      })
    }
  },
  
  // 获取列表
  getList() {
    wx.cloud.callFunction({
      name: 'pagination',
      data: {
        dbName: 'mood',
        page: this.data.page,
        pageSize: this.data.pageSize
      }
    }).then(res => {
      console.log(res)
      if (res.result.errMsg === 'collection.get:ok') {
        console.log(this.data.page)
        this.setData({
          moodList: this.data.page === 1 ? [...res.result.data] : [...this.data.moodList, ...res.result.data],
          hasMore: res.result.hasMore
        })
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },

  // 详情
  handleDetail(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/logDetail/logDetail?id=${id}`,
    })
  },

  // 编辑
  handleEdit(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/addLogs/addLogs?id=${id}`,
    })
  },

  // 删除
  handleDelete(event) {
    const id = event.currentTarget.dataset.id
    const that = this
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          db.collection('mood').doc(id).remove({
            success() {
              wx.showToast({
                icon: 'none',
                title: '删除成功'
              })
              that.setData({
                page: 1,
                pageSize: 10
              }, () => {
                that.getList()
              })
            }
          })
        }
      }
    })
  }
})