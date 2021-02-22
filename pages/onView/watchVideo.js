
import  HTTP  from "../../request/api";
Page({
    data: {
        videoSrc:'',
        series:''
    },
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    onLoad: function (options) {
        var id = options.id;

        this.setData({
            id: id
        })
        this.getDetail(id)
    },

    bindPlay: function() {
        this.videoContext.play()
    },
    bindPause: function() {
        this.videoContext.pause()
    },
    videoErrorCallback: function(e) {
        console.log('视频错误信息:')
        console.log(e.detail.errMsg)
    },
    getDetail: function(id){
        return new Promise((resolve, reject) => {
            let data ={
                ids:id
            }
            HTTP.details(data).then(res => {
                console.log(res.data[0])
                this.setData({
                    data:res.data[0],
                    videoSrc:res.data[0].data[0].url,
                    series:'第1集'
                })
                resolve(res.data[0])
            }).catch((err) => {
                reject("请求出错!");
            });
        });
    },

    changeVideo:function(event){
        console.log(event.currentTarget.dataset.item)
        let url = event.currentTarget.dataset.item.url
        this.setData({
            videoSrc:url,
            series:event.currentTarget.dataset.item.name
        })
    }

})
