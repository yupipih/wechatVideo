const requestFn = require('../request/request');

// const API = {
// //     banner:"/web/getBanner.am",//轮播图
// // };

const HTTP = {
    /**
     * banner
     * @param {String} userId - 用户ID
     * @param {String} appClientTypeCode - 设备端类型DICT_APP_CLIENT_TYPE_CODE_ANDROID（安卓DICT_APP_CLIENT_TYPE_CODE_IOS（苹果）
     */
    forRecent(){
        return requestFn.Request({
            url:"/resource/list",
            method:'Get',
            data:{
                page:'1',
            }
        })
    },

    details(data){
        return requestFn.Request({
            url:"/detail",
            method:'Get',
            data:data
        })
    },
}

module.exports =  HTTP;
