//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'welcome to weather',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
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
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    //获取经纬度方法
    getLocation: function () {
        // var that = this
        // wx.getLocation({
        //     type: 'wgs84',
        //     success: function (res) {
        //         var latitude = res.latitude
        //         var longitude = res.longitude
        //         // that.getCity(latitude, longitude);
        //         // wx.setStorage({key: 'latitude',latitude})
        //         // wx.setStorage({key: 'longitude',longitude})
        //         wx.setStorageSync('latitude', latitude)
        //         wx.setStorageSync('longitude', longitude)
        //     }
        // })
        // setTimeout(function () {
        wx.navigateTo({
            url: '../detail/weatherDetail'
        })
        // }, 500)
    },






})