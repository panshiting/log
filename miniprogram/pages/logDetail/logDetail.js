// pages/logDetail/logDetail.js
Page({
  data: {
    currentId: '',
    logItem: {}
  },
  onLoad: function (options) {
    if (options && options.id) {
      this.setData({
        currentId: options.id
      }, () => {
        this.getDetail()
      })
    }
  },
  getDetail() {
    const db = wx.cloud.database()
    db.collection('mood').doc(this.data.currentId).get().then(res => {
      console.log(res)
      this.setData({
        logItem: res.data
      })
    })
  },
  handleViewImage(e) {
    wx.previewImage({
      urls: this.data.logItem.imageUrl,
      current: e.currentTarget.dataset.url
    })
  }
})