Page({
    data: {
        motto: 'welcome to weather',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    onLoad: function () {
        const latitude = wx.getStorageSync('latitude')
        const longitude = wx.getStorageSync('longitude')
        this.getCity(latitude, longitude)
    },

    //获取城市信息
    getCity: function (latitude, longitude) {
        var that = this
        var url = "https://api.map.baidu.com/geocoder/v2/";
        var params = {
            ak: "0yfSc98kIspBnnaG99Hw0665ic8o753o",
            output: "json",
            location: latitude + "," + longitude
        }
        wx.request({
            url: url,
            data: params,
            success: function (res) {
                var city = res.data.result.addressComponent.city;
                var district = res.data.result.addressComponent.district;
                var street = res.data.result.addressComponent.street;

                that.setData({
                    city: city,
                    district: district,
                    street: street,
                })

                var descCity = city.substring(0, city.length - 1);
                that.getWeahter(descCity);
            },
            fail: function (res) {},
            complete: function (res) {},
        })
    },
    //获取天气信息
    getWeahter: function (city) {
        var that = this
        var url = "https://free-api.heweather.com/v5/weather"
        var params = {
            city: city,
            key: "894fc2a749104d679fa022c3e71afe83"
        }
        wx.request({
            url: url,
            data: params,
            success: function (res) {
                var tmp = res.data.HeWeather5[0].now.tmp;
                var txt = res.data.HeWeather5[0].now.cond.txt;
                var code = res.data.HeWeather5[0].now.cond.code;
                var qlty = res.data.HeWeather5[0].aqi.city.qlty;
                var dir = res.data.HeWeather5[0].now.wind.dir;
                var sc = res.data.HeWeather5[0].now.wind.sc;
                var hum = res.data.HeWeather5[0].now.hum;
                var fl = res.data.HeWeather5[0].now.fl;
                var daily_forecast = res.data.HeWeather5[0].daily_forecast;
                var day1 = res.data.HeWeather5[0].daily_forecast[0].date;
                var day2 = res.data.HeWeather5[0].daily_forecast[1].date;
                var day3 = res.data.HeWeather5[0].daily_forecast[2].date;
                that.setData({
                    tmp: tmp,
                    txt: txt,
                    code: code,
                    qlty: qlty,
                    dir: dir,
                    sc: sc,
                    hum: hum,
                    fl: fl,
                    daily_forecast: daily_forecast,
                    day1: day1,
                    day2: day2,
                    day3: day3
                })
            },
            fail: function (res) {},
            complete: function (res) {},
        })
    },

    jump() {
        wx.navigateTo({
            url: '../detail/weatherDetail'
        })
    }
})