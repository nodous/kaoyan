
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 5; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

  data: {
    currentIndex: 0
  },

  onLoad: function (options) {

  },
  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current,
      bgColor: getRandomColor()
    })
  }
})