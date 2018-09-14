// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     userName: null,
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function () {
//     //页面跳转
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function (e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },
//   bindUserNameInput: function (e) {
//     this.setData({
//       userName: e.detail.value
//     })
//     console.log("输入的用户名为：" + this.data.userName)
//   },
//   bindFormSubmit: function (e) {
//     if (e.detail.value.userName == null || e.detail.value.userId == null || e.detail.value.userName.length == 0 || e.detail.value.userId.length == 0) {
//       wx.showToast({
//         title: "姓名或员工号不得为空!",
//         icon: 'loading',
//         duration: 1500
//       })
//       setTimeout(function () {
//         wx.hideToast()
//       }, 2000)
//     } else if (e.detail.value.userId.length != 4) {
//       wx.showToast({
//         title: '请输入4位员工号!',
//         icon: 'loading',
//         duration: 1500
//       })
//       setTimeout(function () {
//         wx.hideToast()
//       }, 2000)
//     } else {
//       // var that = this;
//       // wx.request({
//       //   url: 'https://a.lllzx.cn/worker/login?name=' + e.detail.value.userName + '&workerId=' + e.detail.value.userId + '&code=' + getApp().data.code,
//       //   data:{
//       //   },
//       //   header: { "Content-Type": "application/x-www-form-urlencoded"},
//       //   method = "GET",
//       //   dataType = "json",
//       //   responseType: "text",
//       //   success: function (res) {
//       //     //判断登陆是否成功
//       //     if (res.data.status == "成功"){//登陆成功
//       //       wx.showToast({
//       //         title: res.data.info,
//       //         icon: 'success',
//       //         duration: 1500
//       //       })
//       //       //设置用户名、工号全局变量
//       //       getApp().globalData.userData.userName = e.detail.value.userName
//       //       getApp().globalData.userData.userId = e.detail.value.userId
//       //       //页面跳转
//       //       wx.switchTab({
//       //         url: '../list/list'
//       //       })
//       //       wx.request({
//       //         url: 'https://a.lllzx.cn/worker/getBalance?workerId=' + getApp().globalData.userData.userId,
//       //         header: { "Content-Type": "application/x-www-form-urlencoded" },
//       //         method = "GET",
//       //         dataType = "json",
//       //         responseType: "text",
//       //         success: function (res) {
//       //           if (res.data.status == "成功"){
//       //             getApp().globalData.userData.balance = res.data.content
//       //           }
//       //           else{
                  
//       //           }
//       //         },
//       //         fail: function (res) {
                
//       //         }
//       //       })
//       //     }
//       //     else {//登陆失败
//       //       wx.showToast({
//       //         title: res.data.info,
//       //         icon: 'loading',
//       //         duration: 1500
//       //       })
//       //     }
//       //   },
//       //   //请求失败
//       //   fail:function(res){
//       //     wx.showToast({
//       //       title:"服务器网络错误!",
//       //       icon: 'loading',
//       //       duration: 1500
//       //     })
//       //   }
//       // })
//       wx.switchTab({
//         url: '../list/list'
//       })
//       console.log("切换界面")
//       //设置全局变量userData：userName,userId,worksListData
//       getApp().globalData.userData.userName = e.detail.value.userName
//       getApp().globalData.userData.userName = e.detail.value.userId
//       getApp().globalData.userData.balance = 800
//       getApp().globalData.worksList = [
//         { worksId: 0, worksImage: "../../images/worksImage00.jpg", worksName: "羊肉串", teamName: "AA队", teamMember: ["张靖", "李延泽", "李子庚"], pptImage: ["../../images/ppt/pptImage00.jpg", "../../images/ppt/pptImage01.jpg", "../../images/ppt/pptImage02.jpg", "../../images/ppt/pptImage03.jpg", "../../images/ppt/pptImage04.jpg", "../../images/ppt/pptImage05.jpg", "../../images/ppt/pptImage06.jpg", "../../images/ppt/pptImage07.jpg", "../../images/ppt/pptImage08.jpg"], background: "羊肉不够吃", abstract: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介" },
//         { worksId: 1, worksImage: "../../images/worksImage01.jpg", worksName: "羊肉串", teamName: "BB队", teamMember: ["张靖", "李延泽", "李子庚"], pptImage: ["../../images/ppt/pptImage00.jpg", "../../images/ppt/pptImage01.jpg", "../../images/ppt/pptImage02.jpg", "../../images/ppt/pptImage03.jpg", "../../images/ppt/pptImage04.jpg", "../../images/ppt/pptImage05.jpg", "../../images/ppt/pptImage06.jpg", "../../images/ppt/pptImage07.jpg", "../../images/ppt/pptImage08.jpg"], background: "羊肉不够吃", abstract: "简介……" },
//         { worksId: 2, worksImage: "../../images/worksImage02.jpg", worksName: "羊肉串", teamName: "CC队", teamMember: ["张靖", "李延泽", "李子庚"], pptImage: ["../../images/ppt/pptImage00.jpg", "../../images/ppt/pptImage01.jpg", "../../images/ppt/pptImage02.jpg", "../../images/ppt/pptImage03.jpg", "../../images/ppt/pptImage04.jpg", "../../images/ppt/pptImage05.jpg", "../../images/ppt/pptImage06.jpg", "../../images/ppt/pptImage07.jpg", "../../images/ppt/pptImage08.jpg"], background: "羊肉不够吃", abstract: "简介……" }
//       ]    
//     }
//   }
// })

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // is_modal_Hidden: false,
    // is_modal_Msg: '我是一个自定义组件'
  },
  //事件处理函数
  bindViewTap: function () {
    //页面跳转
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindUserNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    console.log("输入的用户名为：" + this.data.userName)
  },
  bindFormSubmit: function (e) {
    if (e.detail.value.userName == null || e.detail.value.userId == null || e.detail.value.userName.length == 0 || e.detail.value.userId.length == 0) {
      wx.showToast({
        title: "姓名或员工号不得为空!",
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.userId.length != 4) {
      wx.showToast({
        title: '请输入4位员工号!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      // 登录
      wx.login({
        success: res => {
          if (res.code) {
            console.log("微信登陆成功" + res.code)
            if (!res.code) {
              console.log("code为null")
              return
            }
            wx.request({
              url: 'https://a.lllzx.cn/worker/login',
              data: { name: e.detail.value.userName, workerId: e.detail.value.userId, code: res.code },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "GET",
              dataType: "json",
              responseType: "text",
              success: function (res) {
                //判断登录信息
                console.log(res.data)
                if (res.data.status >= 100 && res.data.status < 200) {
                  wx.showToast({
                    title: res.data.info,//这里打印出登录失败
                    icon: 'loading',
                    duration: 1500
                  })
                  console.log("登录失败")
                } else if (res.data.status < 100) {
                  // wx.showToast({
                  //   title: res.data.info,//这里打印出登录成功
                  //   icon: 'success',
                  //   duration: 1000
                  // })
                  // 设置全局变量：userName,userId
                  getApp().globalData.userData.userName = e.detail.value.userName
                  getApp().globalData.userData.userId = e.detail.value.userId
                    wx.showModal({
                      title: '初赛投票规则',
                      content: "1、	基本说明：投票模拟融资形式开展，投票人员模拟天使投资人以“海贝”形式向各创意进行投资，投票人员范围仅限软件中心正式员工。\r\n  2、	投资原则：普通员工每人10万海贝，高经及以上领导每人20万海贝，各天使投资人应对所有候选创意客观评价，将海贝投资给优秀创意。\r\n 3、	投资方式：最小投资单位1万海贝，单项目普通员工投资上限4万海贝，高级及以上领导投资上限8万海贝。\r\n 4、	选拔规则：天使轮融资阶段完成后，将选拔6个创意晋级；其中海贝数目排名前4的创意可晋级，此外创新协会将组织专家推选2个创意直接晋级。\r\n 5、	其他说明：请各位投资人认真对待，慎重投资，投资创意覆盖晋级创意最多的投资人将获得“最具慧眼奖”。",
                      success: function (res) {
                        if (res.confirm) {
                          wx.switchTab({
                            url: '../list/list'
                          })
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }       
                    })
                  console.log("登录成功")
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
          } else {
            console.log('微信登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
})



