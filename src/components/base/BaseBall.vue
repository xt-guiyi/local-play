<template>
  <div class="ball-container">
    <transition
      v-for="(ball, index) in balls"
      :key="index"
      name="drop"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div v-show="ball.show" class="ball">
        1
      </div>
    </transition>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const balls = store.state.ball.balls
    const beforeEnter = function(el) {
      let count = balls.length
      while (count--) {
        let ball = balls[count]
        if (ball.show) {
          //getBoundingClientRect返回值是一个 DOMRect 对象, 此包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
          //除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 40
          let y = -(window.innerHeight - rect.top - 32)
          // translate3d() 可以开启硬件加速
          el.style.display = ''
          el.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
      }
    }
    const enter = function(el) {
      // 触发浏览器重绘
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
      })
    }
    const afterEnter = function(el) {
      // 删除数组第一个元素, 并返回第一个元素,因对象都是指向地址,所以操作dropBall数组也就操作了balls数组
      let ball = store.state.ball.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
    return {
      balls,
      beforeEnter,
      enter,
      afterEnter
    }
  }
}
</script>

<style lang="scss" scoped>
.ball-container {
  .ball {
    position: fixed;
    left: 3.5rem;
    bottom: 2.5rem;
    z-index: 200;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    background: red;
    text-align: center;
    color: white;

    &.drop-enter-active {
      transition: all 0.4s cubic-bezier(0.45, -0.2, 0.45, 0.41);
    }
  }
}
</style>
