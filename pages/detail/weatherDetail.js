const marginHori = 74
const marginVerti = 100

const app = getApp()
import  HTTP  from "../../request/api";

import { getMainColor } from '../../utils/pickColor.js'

Page({

    data: {

        animation1: {},
        animation2: {},

        top1: marginVerti,
        left1: marginHori,
        top2: marginVerti,
        left2: marginHori,

        startX: 0,
        startY: 0,

        count1: 0,
        count2: 1,

        name1: "",
        cover1:'',
        actors1:'',
        location1: "",
        name2: "",
        cover2:'',
        actors2:'',
        location2: "",
        isLike1: null,
        isLike2: null,

        likeImgURL1: "../../images/icon_like.png",
        likeImgURL2: "../../images/icon_like.png",

        windowWidth: 0,
        windowHeight: 0,

        isFirstCard: true,
        isFirstInit: true,

        data: [],

        count: 0,
        color1:'',
        color2:'',
        imageSrc: "https://s1.ax1x.com/2020/04/17/JVIq3T.jpg",

    },


    onLoad: function (options) {

        var that = this;

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight
                })
            }
        })

        that.requestMenu()
        this.setBackgroundColor()

    },


    onReady: function () {},


    onShow: function () {},

    viewTouchInside: function (event) {

        var that = this

        var pointX = event.touches[0].clientX
        var pointY = event.touches[0].clientY

        that.setData({
            startX: pointX,
            startY: pointY
        })

        var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease-out',
        })
        animation.scale(0.9).step()

        if (that.data.isFirstCard == true) {
            that.setData({
                animation1: animation.export()
            })
        } else {
            that.setData({
                animation2: animation.export()
            })
        }

    },

    watchOnline: function(event){
        var that = this;
        that.jump(event.currentTarget.dataset.item)
    },

    jump:function(id){
        wx.navigateTo({
            url: '../onView/watchVideo?id='+id
        })
    },

    //获取图片主题色
    // getImgColor:function (_img) {
    //     console.log(_img)
    //     // var _this = this;
    //     // var img = _img;
    //     const imagePath = _img;
    //     const canvasId = "img-canvas";
    //     utils.colors(imagePath, canvasId, {
    //         success: function (res) {
    //             console.log("dominant: " + res.dominant);
    //             console.log("secondary: " + res.secondary);
    //             console.log("palette: " + res.palette);
    //
    //             const fontColor = utils.isLight(res.dominant)?"#000000":"#ffffff";
    //             const bgColor = utils.rgbToHex(res.secondary);
    //             console.log("fontColor: " + fontColor);
    //             console.log("bgColor: " + bgColor);
    //             wx.setNavigationBarColor({
    //                 frontColor: fontColor,//前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
    //                 backgroundColor: bgColor,
    //                 animation: {
    //                     duration: 400,
    //                     timingFunc: 'easeIn'
    //                 }
    //             })
    //         },
    //         width: 375,
    //         height: 280
    //     });
    // },


    viewDidMove: function (event) {

        var that = this

        var pointX = event.touches[0].clientX
        var pointY = event.touches[0].clientY

        var widthCenter = that.data.windowWidth / 2
        var heightCenter = that.data.windowHeight / 2

        var perX = (pointX - that.data.startX) / widthCenter
        var perY = (pointY - that.data.startY) / heightCenter
        var maxPer = (Math.abs(perX) > Math.abs(perY)) ? Math.abs(perX) : Math.abs(perY)


        var animationOpacity = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease-out',
        })
        animationOpacity.opacity(maxPer).step()

        var animationRotate = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease-out',
        })
        animationRotate.scale(0.9).rotate(perX * 20).step()

        var x = marginHori + pointX - that.data.startX
        var y = marginVerti + pointY - that.data.startY

        if (that.data.isFirstCard == true) {
            that.setData({
                left1: x,
                top1: y
            })
            that.setData({
                animation1: animationRotate.export(),
                animation2: animationOpacity.export()
            })
        } else {
            that.setData({
                left2: x,
                top2: y
            })
            that.setData({
                animation1: animationOpacity.export(),
                animation2: animationRotate.export(),
            })
        }
    },


    viewTouchUpDownInside: function (event) {

        var that = this

        var endX = event.changedTouches[0].clientX
        var endY = event.changedTouches[0].clientY

        var distanceX = endX - that.data.startX
        var distanceY = endY - that.data.startY

        if (distanceX > 93.75) {
            that.removeCard('right')
        } else if (distanceX < -93.75) {
            that.removeCard('left')
        } else if (distanceY < -100) {
            that.removeCard('up')
        } else if (distanceY > 100) {
            that.removeCard('down')
        }

        if (distanceX < 93.75 && distanceX > -93.75 && distanceY > -150 && distanceY < 150) {
            if (that.data.isFirstCard == true) {
                that.setData({
                    top1: marginVerti,
                    left1: marginHori
                })
            } else {
                that.setData({
                    top2: marginVerti,
                    left2: marginHori
                })
            }
        }

        var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease-out',
        })
        animation.scale(1).step()

        if (that.data.isFirstCard == true) {
            that.setData({
                animation1: animation.export()
            })
        } else {
            that.setData({
                animation2: animation.export()
            })
        }

        if (that.data.data.length - that.data.count < 5) {
            that.requestMenu()
        }
    },

    removeCard: function (direction) {

        var that = this

        var animation = wx.createAnimation({
            duration: 250,
            timingFunction: 'linear',
        })

        if (direction == 'right') {
            animation.translateX(400).rotate(45).opacity(0).step()
            animation.translateX(0).rotate(0).step()
        } else if (direction == 'left') {
            animation.translateX(-400).rotate(-45).opacity(0).step()
            animation.translateX(0).rotate(0).step()
        } else if (direction == 'up') {
            animation.translateY(-400).opacity(0).step()
            animation.translateY(0).step()
        } else if (direction == 'down') {
            animation.translateY(400).opacity(0).step()
            animation.translateY(0).step()
        }

        if (that.data.isFirstCard == true) {
            that.setData({
                animation1: animation.export(),
                count1: that.data.count1 + 2,
                count: that.data.count + 1,
                id1: that.data.data[that.data.count1 + 2]["id"],
                name1: that.data.data[that.data.count1 + 2]["name"],
                cover1: that.data.data[that.data.count1 + 2]["cover"],
                actors1: that.data.data[that.data.count1 + 2]["actors"],
                isLike1: that.data.data[that.data.count1 + 2]["is_like"],
                location1: that.data.data[that.data.count1 + 2]["location"],
                isFirstCard: false
            })

            setTimeout(function () {
                that.setData({
                    top1: marginVerti,
                    left1: marginHori
                })
            }.bind(that), 250)

            // that.getImgColor(that.data.data[that.data.count1 + 2].cover);
        } else {
            that.setData({
                animation2: animation.export(),
                count2: that.data.count2 + 2,
                count: that.data.count + 1,
                id2: that.data.data[that.data.count2 + 2]["id"],
                name2: that.data.data[that.data.count2 + 2]["name"],
                cover2: that.data.data[that.data.count2 + 2]["cover"],
                actors2: that.data.data[that.data.count2 + 2]["actors"],
                isLike2: that.data.data[that.data.count2 + 2]["is_like"],
                location2: that.data.data[that.data.count2 + 2]["location"],
                isFirstCard: true
            })

            setTimeout(function () {
                that.setData({
                    top2: marginVerti,
                    left2: marginHori
                })
            }.bind(that), 100)

            that.setImgURL()
            // that.getImgColor(that.data.data[that.data.count2 + 2].cover);
        }

    },

    likeImgDidClick: function () {
        var that = this
        that.requestLike()
    },



    setImgURL: function () {
        var that = this

        if (that.data.isLike1 == true) {
            that.setData({
                likeImgURL1: "../../images/icon_like_hl.png",
            })
        } else {
            that.setData({
                likeImgURL1: "../../images/icon_like.png",
            })
        }
        if (that.data.isLike2 == true) {
            that.setData({
                likeImgURL2: "../../images/icon_like_hl.png",
            })
        } else {
            that.setData({
                likeImgURL2: "../../images/icon_like.png",
            })
        }
    },

    requestLike: function () {

        var that = this

        var newData = that.data.data

        newData[that.data.count]["is_like"] = !newData[that.data.count]["is_like"]

        that.setData({
            data: newData,
        })

        if (that.data.isFirstCard == true) {
            that.setData({
                isLike1: !that.data.isLike1
            })
        } else {
            that.setData({
                isLike2: !that.data.isLike2
            })
        }

        that.setImgURL()

        var noticeMsg = (newData[that.data.count]["is_like"] == true ? "添加成功" : "取消成功")

        wx.showToast({
            title: noticeMsg,
            duration: 1000,
            icon: 'success',
        })
    },

    requestMenu: function () {

        var that = this
        that.pushData()

    },

    getData: function(){
        return new Promise((resolve, reject) => {
            HTTP.forRecent().then(res => {
                res.data.map(v=>{
                    v.is_like = false;
                })
                resolve(res.data)
            }).catch((err) => {
                reject("请求出错!");
            });
        });
    },

    async pushData () {
        var that = this;
        var newData = that.data.data;
        // https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=561
        newData = await that.getData();


        // console.log(newData)

        // var dish = {
        //     "dish_id": 0,
        //     "is_like": false,
        //     "name": "名字" + that.data.data.length.toString(),
        //     "location": "康桥",
        //     "is_like": false
        // }
        //
        // for (var i = 0; i < 10; i++) {
        //     dish = {
        //         "dish_id": that.data.data.length.toString(),
        //         "is_like": false,
        //         "name": "名字" + that.data.data.length.toString(),
        //         "location": "地点" + that.data.data.length.toString(),
        //         "is_like": (i % 2 == 0 ? false : true)
        //     }
        //     newData.push(dish)
        // }







        if (that.data.isFirstInit == true) {
            that.setData({
                data: newData,
                id1: newData[that.data.count]["id"],
                id2: newData[that.data.count+1]["id"],
                name1: newData[that.data.count]["name"],
                name2: newData[that.data.count + 1]["name"],
                actors1: newData[that.data.count]["actors"],
                actors2: newData[that.data.count + 1]["actors"],
                cover1: newData[that.data.count]["cover"],
                cover2: newData[that.data.count + 1]["cover"],
                location1: newData[that.data.count]["location"],
                location2: newData[that.data.count + 1]["location"],
                isLike1: newData[that.data.count]["is_like"],
                isLike2: newData[that.data.count + 1]["is_like"],
                isFirstInit: false
            })

            that.setImgURL()

            // data: newData,  // img: newData[that.data.count]["img"],
            // tCn: newData[that.data.count + 1]["tCn"],
            // tEn: newData[that.data.count]["tEn"],
            // actors: newData[that.data.count + 1]["actors"],
            // movieType: newData[that.data.count]["movieType"],
            // dN: newData[that.data.count + 1]["dN"],
            // rd:newData[that.data.count + 1]["rd"],
            // is_like:newData[that.data.count + 1]["is_like"],
        }

        // this.setBackgroundColor(newData[0].cover);

    },

    setBackgroundColor(img) {
        // console.log(img)
        const ctx = wx.createCanvasContext('myCanvas')
        const that = this
        wx.getImageInfo({
            src: img,
            success: function (res) {
                const poster = res.path
                ctx.drawImage(poster, 0, 0, 150, 100)
                ctx.draw(false, () => {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 150,
                        height: 100,
                        destWidth: 150,
                        destHeight: 100,
                        canvasId: "myCanvas",
                        success(res) {
                            let tempPath = res.tempFilePath
                            // 这种方式获取canvas区域隐含的像素数据
                            wx.canvasGetImageData({
                                canvasId: 'myCanvas',
                                x: 0,
                                y: 0,
                                width: 150,
                                height: 100,
                                success(res) {
                                    const imageData = res.data
                                    // 分区块，可以拓展性的求主要色板，用来做palette
                                    let resImageObj = getMainColor(imageData)
                                    const { defaultRGB } = resImageObj
                                    const { r, g, b } = defaultRGB
                                    let resBackground = `rgb(${r}, ${g}, ${b})`
                                    ctx.setFillStyle(resBackground)
                                    ctx.fillRect(0, 0, 150, 100)
                                    ctx.draw()
                                },
                            })
                        },
                        fail() {
                            throw new Error()
                        }
                    })
                })
            },
            fail() {

            }
        })
    },



})
