//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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