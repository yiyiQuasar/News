# News 微信小程序 新闻

实现了新闻客户端的微信小程序简易版

![img](https://github.com/yiyiQuasar/News/blob/master/newsShow.gif)

实现效果如图，新闻接口为[数闻分发平台](https://fenfa.shuwen.com/)的免费API接口，显示了不同门类的即时热点新闻。

主界面包含不同分类的新闻列表，包括新闻标题和题图，没有图的用默认图片标示。每个分类下均包含10条该类的新闻及来源，可
随时下拉刷新。点击具体新闻实现跳转至详情页面，详情页面包含该新闻的标题作者，时间以及正文。

导航栏由横向滚动的10项新闻类别构成，页面切换由```<swiper-item>```和```wx:for```实现，滑动或点击导航栏改变页面标识后
，利用```wx.request```访问接口更新页面，接口MD5签名见平台文档。点击跳转和下拉刷新为```wx.navigateTo```和```onPullDownRefresh```

详情是接口提供url得到的html页面，小程序无法直接显示，因此将html页面转换为小程序页面通常有几种方法
- ```<web-view>```[组件](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html?search-key=web-view)是一个
可以用来承载网页的容器，方便快捷，但是个人类型的小程序暂不支持使用。。。
- 使用```wxParse```[组件](https://github.com/icindy/wxParse)解析html页面，但新闻页面比较复杂，试用过后发现解析效果比较糟糕，bug很多，就放弃了。。。
- 最后使用正则匹配获取文章正文中的图文段落，以及标题来源等信息重新排列，比较麻烦，也没有做更多的显示效果调整。
