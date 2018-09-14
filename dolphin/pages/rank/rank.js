// pages/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    briefOrigList: [],
    qulify:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入")
  },
  onShow: function () {
    var that = this;
    console.log("balance",getApp().globalData.userData.balance)
    if (getApp().globalData.userData.balance == 0) {
      that.setData({
        qulify: true
      })
    }
    if (that.data.qulify == true) {
      wx.request({
        url: 'https://a.lllzx.cn/orig/rankinglist',
        data: { workerId: getApp().globalData.userData.userId },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: function (res) {
          console.log(res.data)
          if (res.data.status >= 100 && res.data.status < 200) {
            wx.showToast({
              title: res.data.info,//这里打印出失败
              icon: 'loading',
              duration: 1500
            })
            console.log("列表获取失败")
          } else if (res.data.status < 100) {
            console.log(res.data.info)
            console.log(res.data.content)

            that.setData({
              briefOrigList: res.data.content
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: "服务器网络错误!",
            icon: 'loading',
            duration: 1500
          })
        }
      })
    }

  },
  //下拉刷新
    reload: function(event) {
         //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      var that = this;
      wx.showNavigationBarLoading()
      console.log("下拉");
      that.setData({
        briefOrigList: [],
        qulify: false
      })
      that.onShow()

      setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  bindDetail: function (event) {
    var worksid = event.currentTarget.dataset.worksid;
    //获得detail
    wx.navigateTo({
      url: '../detail/detail?worksid=' + worksid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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