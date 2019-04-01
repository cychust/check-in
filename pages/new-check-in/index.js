// pages/list/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        title: "",
        loading_show: false
    },
    popupClose: function() {
        this.setData({
            show: false
        })
    },
    popupOpen: function() {
        this.setData({
            show: true
        })
    },
    onChange: function(event) {
        this.title = event.detail
    },
    bindPopupShow: function(e) {
        this.popupOpen()
    },
    bindCreateGroup: function(e) {
        var that = this
        console.log(that.title)
        if (!this.title) {
            return
        }
        var jwt = wx.getStorageSync('jwt_token')
        console.log(jwt)
        wx.showLoading({
            title: '',
        })
        wx.request({
            url: 'http://127.0.0.1:3000/api/v1/group',
            data: {
                "title": that.title
            },
            header: {
                'content-type': 'application/json',
                'authorization': jwt,
            },
            method: "POST",
            // dataType: 'json',
            // responseType: 'text',
            success: function(res) {
                console.log(res)
                wx.showToast({
                    title: 'aaaa',
                })
                that.popupClose()
            },
            fail: function(res) {
                console.debug(res)
                wx.showToast({
                    title: 'aaaa',
                })

                that.popupClose()
            },
            complete: function(res) {
                wx.hideLoading()
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})