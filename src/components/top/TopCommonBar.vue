<template>
  <header class="common-header">
    <i class="back iconfont icon-cuowu" @click="emitBack"></i>
    <div class="title">
      {{ title }}
    </div>
    <i class="more iconfont icon-gengduo"></i>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  setup(props, context) {
    const emitBack = function() {
      context.emit('back-event')
    }
    return {
      emitBack
    }
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  height: 6rem;
  line-height: 6rem;
  background: #f8f8fa;
  display: flex;
  justify-content: center;
  text-align: center;
}

.back {
  flex: 2;
}

.title {
  flex: 8;
  font-size: 2rem;
  text-align: left;
}

.more {
  flex: 2;
}
</style>
