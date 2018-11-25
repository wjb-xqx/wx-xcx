module.exports = (url,data) => {
    return new Promise((resolve,reject)=>{
        wx.request({
            //这里的地址没有跨域的概念
            url:`https://locally.uieee.com/${url}`,
            data:data,
            success: resolve,
            fail:reject
          })
    })
}