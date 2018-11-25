const fetch = require('../../utils/fetch')
Page({
  data: {
    category:{},
    shops:[],
    PageIndex:0,
    pageSize:20,
    hasMore:true
  },
  loadMore(){
    if(!this.data.hasMore)  return
    let {PageIndex,pageSize} = this.data;
    const params ={_page: ++PageIndex, _limit: pageSize};
    return  fetch( `categories/${this.data.category.id}/shops`, params)
    .then(res => {
      const totalCount = parseInt(res.header["X-Total-Count"])
      const hasMore = PageIndex * pageSize  < totalCount;
      const shops =this.data.shops.concat(res.data)
      this.setData({shops,PageIndex,hasMore})
      })
  },
  onLoad: function (options) {
   fetch(`categories/${options.cat}`).then(res => {
    this.setData({category:res.data})
     //这里不能确定一定是在onReady 过后执行
     wx.setNavigationBarTitle({
      title:res.data.name
    })
    //加载完分类信息过后再加载商铺信息  下载第一页
  this.loadMore();
  })
  },
  onReady: function () {
    if(this.data.category.name){
      title:this.data.category.name
    }
  },
  onPullDownRefresh:function(){
    this.setData({shops:[],PageIndex:0,hasMore:true})
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})