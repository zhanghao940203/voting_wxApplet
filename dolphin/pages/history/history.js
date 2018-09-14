// // pages/history/history.js
// Page({
//   data: {
//     globalData: null,
//     hasUserInfo: false,
//     history: null
//   },
//   onShow: function (options) {
//     //获取历史投票记录
//     //下列数据从服务器获得
//     history = [{ worksId: 0, worksImage: "../../images/worksImage00.jpg", worksName: "羊肉串", shrimpPaied: 100 }, { worksId: 1, worksImage: "../../images/worksImage01.jpg", worksName: "羊肉串", shrimpPaied: 200 }, { worksId: 2, worksImage: "../../images/worksImage02.jpg", worksName: "羊肉串", shrimpPaied: 400 }]
//     console.log(history)
//     this.setData({
//       history: history
//     })
//     console.log(this.data.history)
//   },

//   onLoad: function (options) {
//     this.setData({
//       globalData: getApp().globalData
//     })
//     if (this.data.globalData.userInfo != null) {
//       this.setData({
//         hasUserInfo: true
//       })
//     }
//   },

// })

// pages/history/history.js
Page({
  data: {
    globalData: null,
    hasUserInfo: false,
    history: null
  },
  onShow: function (options) {
    this.setData({
      globalData: getApp().globalData
    })
    if (this.data.globalData.userInfo != null) {
      this.setData({
        hasUserInfo: true
      })
    }
    var that = this
    //获取历史投票记录
    //下列数据从服务器获得
    wx.request({
      url: 'https://a.lllzx.cn/vote/voteAction',
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
            title: res.data.info,//投票历史获取失败
            icon: 'loading',
            duration: 1500
          })
          console.log("失败：" + res.data.info)
        } else if (res.data.status < 100) {
          console.log("余额：" + getApp().globalData.userData.balance)
          console.log("榜单：" + res.data.content)
          that.setData({
            history: res.data.content
          })
          // wx.showToast({
          //   title: res.data.info,//投票历史获取成功
          //   icon: 'success',
          //   duration: 1000
          // })
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
  },

  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
})