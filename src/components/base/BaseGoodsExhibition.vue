<template>
  <div class="goods-container">
    <div class="goods-img">图片</div>
    <div class="goods-detailed">
      <div class="top">{{ goodsSouce.foodName }}</div>
      <div class="bottom">
        <p>已售{{ goodsSouce.alreadySell }}</p>
        <p>￥{{ goodsSouce.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 商品展示栏组件
export default {
  name: 'BaseGoodsExhibition',
  props: {
    goodsSouce: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-container {
  display: flex;

  .goods-img {
    width: 10rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
    background-color: grey;
    border-radius: 5%;
  }

  .goods-detailed {
    text-indent: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bottom p {
      color: #746f6f2a;
    }

    .bottom p:last-child {
      color: #e74e45;
    }
  }
}
</style>
