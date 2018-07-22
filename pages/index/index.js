const md5 = require('/../libs/md5.js');

Page({
  data: {
    // 新闻类别tab页面切换  
    category_all: ['实时', '时政', '军事', '财经', '社会', '国际', '娱乐', '体育', '科技', '生活'],
    category_all_eng: ['Hot', 'Politics', 'Military', 'Finance', 'Society', 'World', 'Entertainment', 'Sport', 'Tech', 'Living'],
    currentTab: 0,
    hidden: false
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  //滑动切换将变换tab页面并更新对应类别新闻
  swiperChange: function(e) {
    this.setData({
      currentTab: e.detail.current,
    })
    this.getNews(this.data.category_all_eng[e.detail.current])
  },

  getNews(categoryName, callback) {
    this.setData({
      hidden: false
    });
    //建立时间戳配合key进行MD5编码后的签名取得API接口的新闻内容
    let timestamp = Date.parse(new Date())
    //需要判断是否为实时类别新闻，API接口与其他类别不同
    wx.request({
      url: (categoryName === 'Hot') ? 'https://api.xinwen.cn/news/hot' : 'https://api.xinwen.cn/news/all',
      data: {
        category: (categoryName === 'Hot') ? '' : categoryName,
        size: 10,
        timestamp: timestamp,
        access_key: 'Ax7UB7fs1gSfmVHH',
        signature: md5.hexMD5('49b124f6424340d0aba690c9238c1e10' + timestamp + 'Ax7UB7fs1gSfmVHH')
      },
      success: res => {
        var self = this;
        let result = res.data.data.news
        let news = []
        for (let i = 0; i < 10; i += 1) {
          let img_flag = result[i].thumbnail_img[0]
          if (!img_flag)
            img_flag = '/images/nopics.jpg'
          news.push({
            title: result[i].title,
            source: result[i].source,
            img: img_flag,
            url: result[i].url
          })
        }
        self.setData({
          news: news
        })
        setTimeout(function() {
          self.setData({
            hidden: true
          })
        }, 100)
      },
      complete: () => {
        callback && callback()
      }
    })

  },
  onTapNews: function(e) {
    wx.navigateTo({
      url: '../detail/detail?url=' + e.currentTarget.id,
    })
  },
  onLoad: function(options) {
    this.getNews('Hot')
  },
  //下拉刷新，根据当前页面刷新，完成后回调停止刷新函数
  onPullDownRefresh() {
    this.getNews(this.data.category_all_eng[this.data.currentTab], () => {
      wx.stopPullDownRefresh()
    })
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})