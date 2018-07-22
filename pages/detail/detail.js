Page({
  onLoad: function (options) {
    wx.request({
      url: options.url,
      data: {},
      success: res => {
        this.getHtml(res.data)
      },
      fail: res => {
        console.log('Access Failed!!!!!!!!!!')
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '~连不上~',
        })      
      },
      complete: () => {}
    })
  },

  getHtml(result) {
    // let content = result
    // content = content.replace(/<table>[\s\S]*<\/table>/g, '')
    // content = content.replace(/<!DOCTYPE html>/g, '')
    // content = content.replace(/<\/article>[\s\S]*<\/body>/g, '<\/article><\/body>')
    // content = content.replace(/<img src=\"\/\/s.newscdn.cn\/common\/0.0.64\/logo\/xinwen.svg\">/g, '')
    // content = content.replace(/<title>[\s\S]*<\/title>/g, '')


    var allContent = []
    result = result.replace(/<table>[\s\S]*<\/table>/g, '')
    var tmpStr = result
    var doSearch = true//循环控制

    //获取文章的图片和文字，即段落
    var allText = tmpStr.match(/(?=<p>)[\s\S]*?(<\/p>)/g)
    //var allImg = result.match(/(<p>\s*<img src=).*?(<\/p>)/g)
    //var allImg = tmpStr.match(/(https:\/\/m.newscdn.cn).*?(\!medium)/g)

    //获取标题
    var title = tmpStr.match(/(<div class="title">).*?(<\/div>)/ig)[0].replace('<div class="title">', '').replace('<\/div>', '')
    //获取来源
    var source = tmpStr.match(/(<span class="source">).*?(<\/span>)/ig)[0].replace('<span class="source">', '').replace('<\/span>', '')
    //获取时间
    var time = tmpStr.match(/(<time>).*?(<\/time>)/ig)[0].replace('<time>', '').replace('<\/time>', '')

    //按照段落数量，根据每一段落为文字还是图片打包显示
    for (let i = 0; i < allText.length; i += 1) {
      var tmpContent = {
        'type': null,
        'content': null
      };
      if (allText[i].match(/img src/g)) {
        //图片类型则设为图片地址
        tmpContent.type = 'img'
        tmpContent.content = allText[i].match(/(https:\/\/m.newscdn.cn).*?(\!medium)/g)
        allContent.push(tmpContent)
      } else {
        //文字类型则设为文字内容
        tmpContent.type = 'text'
        tmpContent.content = allText[i].replace('<p>', '').replace('<\/p>', '')
        allContent.push(tmpContent)
      }
    }
    //设置标题、来源及时间、内容
    var newsDetails = {
      'title': title,
      'src': source + '   ' + time,
      'item': allContent
    }
    this.setData({
      detail: newsDetails
    });
  }

})