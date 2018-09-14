// // pages/list/list.js
// const util = require('../../utils/util.js')
// Page({

//   data: {
//     globalData:null
//   },
//   onLoad: function (options) {
//     // var that = this;
//     // wx.request({
//     //   url: 'https://a.lllzx.cn/orig/getOrigList',
//     //   data: {
//     //   },
//     //   header: { "Content-Type": "application/x-www-form-urlencoded" },
//     //   method = "GET",
//     //   dataType = "json",
//     //   responseType: "text",
//     //   success: function (res) {
//     //     //判断登陆是否成功
//     //     if (res.data.status == "成功") {
//     //       //设置项目列表全局变量
//     //       getApp().globalData.userData.worksListData = res.data.content
//     //     }
//     //     else {//请求失败
//     //     }
//     //   },
//     //   //连接失败
//     //   fail: function (res) {
//     //   }
//     // })

//     this.setData({
//       globalData: getApp().globalData
//     })
//     console.log(this.data.globalData.worksList)
//   },

//   bindDetail: function (event){
//     var worksid = event.currentTarget.dataset.worksid;
//     //获得detail
//     wx.navigateTo({
//       url: '../detail/detail?worksid=' + worksid
//     })
//   }
// })

// pages/list/list.js
const util = require('../../utils/util.js')
Page({

  data: {
    globalData: null,
    briefOrigList: null,
    complete:false,
    viewBg:'green'
  },
  onLoad: function (options) {
    wx.showToast({
      title: "加载中",//这里打印出失败
      icon: 'loading',
      duration: 2000
    })
    var that = this;
    wx.request({
      url: 'https://a.lllzx.cn/orig/list',
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
          //设置全局变量：briefOrigList,balance
          console.log(res.data.content.briefOrigList)

          //列表洗牌乱序
          var list = res.data.content.briefOrigList;
          // list = list.sort(function () {return Math.random() - 0.5});
          var currentIndex = list.length
            , temporaryValue
            , randomIndex;
          while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue;
          }
          console.log(list)

          that.setData({
            briefOrigList: list
          })
          getApp().globalData.userData.balance = res.data.content.balance
          console.log("余额:" + getApp().globalData.userData.balance)
          that.setData({
            globalData: getApp().globalData
          })
          if (getApp().globalData.userData.balance == 0){
            that.setData({
              complete: true,
              viewBg: '#ccc'
            })
          }
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

  bindDetail: function (event) {
    var worksid = event.currentTarget.dataset.worksid;
    //获得detail
    wx.navigateTo({
      url: '../detail/detail?worksid=' + worksid
    })
  },

  bindCompleteButton: function(e) {
    var that = this;
      wx.showModal({
        title: '注意',
        content: '您还剩余' + getApp().globalData.userData.balance+'万海贝，结束后将没有可用海贝，确定要结束投票么？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'https://a.lllzx.cn/worker/abandon',
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
                  getApp().globalData.userData.balance = 0
                  that.setData({
                    complete: true,
                    viewBg:'#ccc'
                  })
                  console.log(e.currentTarget.id)
                  //e.currentTarget.style.backgroundColor = "#f3f3f3";
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
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },

    bindCompleteButton: function(e) {
    var that = this;
      wx.showModal({
        title: '注意',
        content: '您还剩余' + getApp().globalData.userData.balance+'万海贝，结束后将没有可用海贝，确定要结束投票么？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'https://a.lllzx.cn/worker/abandon',
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
                  getApp().globalData.userData.balance = 0
                  that.setData({
                    complete: true,
                    viewBg:'#ccc'
                  })
                  console.log(e.currentTarget.id)
                  //e.currentTarget.style.backgroundColor = "#f3f3f3";
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
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },

    bindRuleButton: function (e) {
        wx.showModal({
          title: '初赛投票规则',
          content: "1、基本说明：投票模拟融资形式开展，投票人员模拟天使投资人以“海贝”形式向各创意进行投资，投票人员范围仅限软件中心正式员工。\r\n  2、投资原则：普通员工每人10万海贝，高经及以上领导每人20万海贝，各天使投资人应对所有候选创意客观评价，将海贝投资给优秀创意。\r\n 3、投资方式：最小投资单位1万海贝，单项目普通员工投资上限4万海贝，高级及以上领导投资上限8万海贝。\r\n 4、选拔规则：天使轮融资阶段完成后，将选拔6个创意晋级；其中海贝数目排名前4的创意可晋级，此外创新协会将组织专家推选2个创意直接晋级。\r\n 5、其他说明：请各位投资人认真对待，慎重投资，投资创意覆盖晋级创意最多的投资人将获得“最具慧眼奖”。",
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
  }
})