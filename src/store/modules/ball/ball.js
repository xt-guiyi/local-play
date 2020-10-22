export default {
  namespaced: true,
  state: {
    // 默认五个小球
    balls: [
      { show: false },
      { show: false },
      { show: false },
      { show: false },
      { show: false }
    ],
    dropBall: []
  },
  mutations: {
    // 改变状态
    changeShow({ balls }, { index, isShow, el }) {
      balls[index].show = isShow
      balls[index].el = el
    },
    // 添加到待删除数组
    changeDropBall({ dropBall }, ball) {
      dropBall.push(ball)
    }
  }
}
