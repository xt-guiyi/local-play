<template>
<div class="shoping-bar">
  <div class="shop-basket iconfont icon-gouwuche1 " :class="[shopCartTotalPrice === 0 ? 'shop-change-style' : '']">
    <span v-show="foodClassify.total !== 0" class="red-total-ball">{{ foodClassify.total }}</span>
  </div>
  <div class="shop-total">
    <div class="total">
      <div class="discount-price">￥{{ shopCartTotalPrice }}</div>
      <div class="original-price" v-show="shopCartDefaultTotalPrice">￥{{ shopCartDefaultTotalPrice }}</div>
    </div>
    <div class="introduce">3公里0元送 另需包赚费￥1</div>
  </div>
  <div class="go" :class="[shopCartTotalPrice === 0 ? 'shop-change-style' : '']">立即下单</div>
</div>
</template>

<script>
import {
  computed
} from "vue"
import {
  useStore
} from 'vuex'
export default {
  name: 'CartShopingBar',
  setup(props) {
    const store = useStore()
    const foodClassify = computed(() => store.getters['cart/foodClassifyNumber']) // 食物分类数量对象
    const shopCartTotalPrice = computed(() => store.getters['cart/cartTotalPrice']) // 折扣总价
    const shopCartDefaultTotalPrice = computed(() => store.getters['cart/cartDefaultTotalPrice']) // 原价
    return {
      foodClassify,
      shopCartTotalPrice,
      shopCartDefaultTotalPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.shoping-bar {
  width: 90vw;
  height: 5rem;
  text-align: center;
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translate(-50%);
  background-color: #373A43;
  border-radius: 25px;
  display: flex;

  .shop-basket {
    flex: 0 0 5rem;
    line-height: 5rem;
    font-size: 2.5rem;
    font-weight: 900;
    border-radius: 50%;
    background-color: yellow;
    position: relative;

    .red-total-ball {
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 1.2rem;
      font-weight: initial;
      color: white;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 0.25rem;
    }
  }

  .shop-change-style {
    background-color: #CCCCCC !important;
  }

  .shop-total {
    flex: 5;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .total {
      text-align: center;
      display: flex;
      align-items: center;

      .discount-price {
        color: red;
        font-size: 1.8rem;
        text-indent: 0.5rem;
      }

      .original-price {
        color: white;
        font-size: 1.2rem;
        text-decoration: line-through;
        text-indent: 0.5rem;
      }
    }

    .introduce {
      font-size: 0.8rem;
      text-align: left;
      text-indent: 0.5rem;

    }
  }

  .go {
    flex: 0 0 10rem;
    line-height: 5rem;
    font-size: 1.6rem;
    font-weight: 900;
    border-radius: 25px;
    background-color: yellow;
  }
}
</style>
