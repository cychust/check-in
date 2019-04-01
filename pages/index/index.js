//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show: false,
    motto: 'Hello World',
    userInfo: {},
    groupsInfo: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    joined: [{
      name: "嗯",
      image: "/images/userinfo_bg.png",
      number: 0,
      title: "每日英语"
    }],
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  //事件处理函数
  onChange(event) {
    wx.showToast({
      title: 'cccc',
      icon: 'none'
    });
  },
  moreBtnClicked: function(e) {
    console.log(e)
    wx.showToast({
      title: e.currentTarget.dataset.item.title
    })
    this.popupOpen();
  },
  popupOpen() {
    this.setData({
      show: true
    })
  },
  popupClose() {
    this.setData({
      show: false
    })
  },
  getGroupsInfo: function() {
    var that = this;
    var jwt = wx.getStorageSync('jwt_token')
    console.log("11111")
    wx.request({
      url: 'http://127.0.0.1:3000/api/v1/group/list',
      data: '',
      header: {
        'content-type': 'application/json',
        'authorization': jwt,
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          groupsInfo: res.data.data.own_groups
        })
        console.log(res.data.data.own_groups)
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
      },
    })
  },
  doLogin: function(data) {
    console.log(data)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        wx.request({
          url: 'http://127.0.0.1:3000/api/v1/login',
          method: "POST",
          data: {
            "code": res.code,
            "userInfo": data.userInfo,
            "rawData": data.rawData,
            "signature": data.signature,
            "encryptedData": data.encryptedData,
            "iv": data.iv
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            //从数据库获取用户信息
            console.log(res)
            console.log(res.data.data["jwt_token"])
            wx.setStorageSync("jwt_token", "Bearer " + res.data.data["jwt_token"])
            console.log("插入小程序登录用户信息成功！");
          }
        })
      }
    })
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: 'aaaaa',
            mask: true,
          })
          wx.getUserInfo({
            success: function(data) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              let loginFlag = wx.getStorageSync('jwt_token');

              if (loginFlag) {
                wx.checkSession({
                  success: function(res) {
                    // that.doLogin(data)
                    that.getGroupsInfo()
                  },
                  fail: function() {
                    // this.doLogin()
                    that.doLogin(data)
                    that.getGroupsInfo()
                  }
                });
              } else {
                // 登录
                // this.doLogin()
                this.doLogin(data)
                that.getGroupsInfo()

              }
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  onShow: function() {
    // var that=this;
    // that.getGroupsInfo()
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      this.doLogin(e.detail)
      console.log(e)
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
})