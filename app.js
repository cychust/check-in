//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log("aaa")
    let loginFlag=wx.getStorageSync('jwt');
    if (loginFlag){
      wx.checkSession({
        success:function(){

        },
        fail:function(){
          // this.doLogin()
        }
      });
    }else{
      // 登录
      // this.doLogin()

    }
    // wx.getUserInfo({
    //   success: res => {
    //     // 可以将 res 发送给后台解码出 unionId
    //     this.globalData.userInfo = res.userInfo
    //     console.log(res)
    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     if (this.userInfoReadyCallback) {
    //       this.userInfoReadyCallback(res)
    //     }
    //   }
    // })
  },
  doLogin:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        wx.request({
          url: 'http://127.0.0.1:3000/api/v1/login',
          method: "POST",
          data: {
            "code": res.code,
            "userInfo": this.globalData.userInfo,
            "rawData": "",
            "signature": "",
            "encryptedData": "1234567812345678",
            "iv": "MTIzNDU2NzgxMjM0NTY3OA=="
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //从数据库获取用户信息
            console.log(res.data.data["jwt_token"])
            wx.setStorageSync("jwt", res.data.data["jwt_token"])
            console.log("插入小程序登录用户信息成功！");
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    code: null,
  }
})