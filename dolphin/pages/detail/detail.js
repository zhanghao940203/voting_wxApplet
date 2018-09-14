
// pages/detail/detail.js
const util = require('../../utils/util.js')
Page({
  data: {
    worksid: "",
    globalData: null,
    details: null,
    hiddenmodalput: true,
    shrimp:0,
    query:""
  },

  onShow: function(query) {

  },

  onLoad: function (query) {
    this.setData({
      worksid: query.worksid,
      query: query
    })
    var that = this;
    wx.request({
      url: 'https://a.lllzx.cn/orig/detail',
      data: { origId: that.data.worksid },
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
          //设置:briefOrigList
          console.log("内容：" + res.data.content)
          console.log(res.data.content.images.split(";"))
          res.data.content.images = res.data.content.images.split(";")
          that.setData({
            details: res.data.content
          })
          
          console.log("图片：" + that.data.details.images)
          //设置balance
          that.setData({
            globalData: getApp().globalData
          })
          console.log("余额:" + that.data.globalData.userData.balance)
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
  //弹出投票框
  bindVoteButton: function () {
    this.setData({
      hiddenmodalput: false,
      shrimp: ""
    })
  },
  //取消按钮
  cancle: function () {
    this.setData({
      hiddenmodalput: true,
    });
  },
  //提交按钮
  submit: function () {
    var that = this;
    console.log("虾米：" + that.data.shrimp)
    console.log("余额：" + getApp().globalData.userData.balance)
    if (isNaN(that.data.shrimp)) {
      wx.showToast({
        title: '请输入投票数',
        icon: 'loading',
        duration: 2000
      })
    } 
    else if (that.data.shrimp == 0) {
      wx.showToast({
        title: '票数输入有误',
        icon: 'loading',
        duration: 2000
      })
    } 
    else if (that.data.shrimp > getApp().globalData.userData.balance) {
      wx.showToast({
        title: '余额不足',
        icon: 'loading',
        duration: 2000
      })
    } else {
      this.setData({
        hiddenmodalput: true
      })
      ////////////////////////发送投票数据到后台
      wx.request({
        url: 'https://a.lllzx.cn/vote/dovote',
        data: { workerId: that.data.globalData.userData.userId, origId: that.data.details.origId, increase: that.data.shrimp },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: function (res) {
          //判断投票信息
          console.log(res.data)
          if (res.data.status >= 100 && res.data.status < 200) {
            wx.showToast({
              title: res.data.info,//这里打印出投票失败
              icon: 'loading',
              duration: 1500
            })
            console.log("失败：" + res.data.info)
          } else if (res.data.status < 100) {
            //修改全局变量中的balanc
            getApp().globalData.userData.balance = res.data.content
            console.log("余额：" + getApp().globalData.userData.balance)
            wx.showToast({
              title: res.data.info,//这里打印出登录成功
              icon: 'success',
              duration: 1000
            })
            var id = that.data.query;
            that.setData({
              worksid: "",
              globalData: null,
              details: null,
              hiddenmodalput: true,
              shrimp:0,
              query: ""
            })
            that.onLoad(id)
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

  previewImg: function (e) {
    // console.log(e.currentTarget.dataset.index);
    var src = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.details.images;
    // console.log(imgArr);
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      // current: src,
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
    })
  },

  bindShrimpInput: function (event) {
    this.setData({
      shrimp: parseInt(event.detail.value)
    })
    console.log(this.data.shrimp)
  }
})