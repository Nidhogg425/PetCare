// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    services: [
      { type: 'cat', emoji: '🐱', title: '上门喂猫', price: '68起' },
      { type: 'dog', emoji: '🐶', title: '上门遛狗', price: '88起' }
    ],
    features: [
      { icon: '✨', title: '关注公众号' },
      { icon: '💰', title: '储值优惠' },
      { icon: '🐾', title: '宠物领养' }
    ],
    stats: {
      petCount: '25,683',
      updateTime: '2025.01'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 预订服务
  handleBookService(e) {
    const serviceType = e.currentTarget.dataset.type
    wx.showLoading({
      title: '加载中',
    })
    
    // 检查是否登录
    if (!this.data.hasUserInfo) {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请先登录后预订服务',
        success: (res) => {
          if (res.confirm) {
            this.getUserProfile()
          }
        }
      })
      return
    }

    // TODO: 跳转到相应的服务预订页面
    wx.navigateTo({
      url: `/pages/booking/booking?type=${serviceType}`,
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        app.globalData.hasUserInfo = true
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  // 功能入口点击
  handleFeatureClick(e) {
    const index = e.currentTarget.dataset.index
    const feature = this.data.features[index]
    
    switch(feature.title) {
      case '关注公众号':
        // 显示公众号二维码
        wx.previewImage({
          urls: ['cloud://xxx.jpg'] // 替换为实际的公众号二维码图片
        })
        break
      case '储值优惠':
        wx.navigateTo({
          url: '/pages/wallet/wallet'
        })
        break
      case '宠物领养':
        wx.navigateTo({
          url: '/pages/adoption/adoption'
        })
        break
    }
  }
})