//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        show: false,
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        joined: [{
            name: "嗯",
            image: "/images/userinfo_bg.png",
            number: 0,
            title: "每日英语"
        }, {
            name: "嗯",
            image: "/images/userinfo_bg.png",
            number: 0
        }]
    },
    //事件处理函数
    onChange(event) {
        wx.showToast({
            title: 'cccc',
            icon: 'none'
        });
    },
    moreBtnClicked: function(e) {
        wx.showToast({
            title: e.currentTarget.dataset.item.name
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
    }
})