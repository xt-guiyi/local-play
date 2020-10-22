<template>
  <div class="add-center">
    <transition name="list">
      <div v-show="shopCart.get(foodId)" class="reduce-wrap">
        <i
          class="reduce iconfont icon-jianhao"
          @click="decreate(foodId, foodType)"
        ></i>
        <div class="number">{{ { ...shopCart.get(foodId) }.quantity }}</div>
      </div>
    </transition>
    <div class="add-wrap">
      <i
        class="add iconfont icon-jiahao"
        @click="increate(foodId, foodType, $event)"
      ></i>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'CartIncreaseAndDecreaseButton',
  props: {
    // 食物id
    foodId: {
      type: Number,
      required: true
    },
    // 食物类型
    foodType: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const shopCart = computed(() => store.state.cart.shopCart) // 购物车
    /**
     * 添加食物到购物车
     * @id  食物id号
     */
    const increate = function(id, type, event) {
      store.dispatch('cart/addToShopCart', {
        id,
        type,
        isAdd: true
      })

      // 添加小球动画
      for (let i = 0; i < store.state.ball.balls.length; i++) {
        if (!store.state.ball.balls[i].show) {
          store.commit('ball/changeShow', {
            index: i,
            isShow: true,
            el: event.target
          })
          store.commit('ball/changeDropBall', store.state.ball.balls[i])
          return
        }
      }
    }

    /**
     * 减少食物到购物车
     * @id  食物id号
     */
    const decreate = function(id, type) {
      store.dispatch('cart/addToShopCart', {
        id,
        type,
        isAdd: false
      })
    }
    return {
      shopCart,
      increate,
      decreate
    }
  }
}
</script>

<style lang="scss" scoped>
.add-center {
  flex: 0 0 80%;
  height: 2rem;
  line-height: 2rem;
  margin: 0 auto;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: flex-end;

  .reduce-wrap {
    flex: 6;
    display: flex;

    .number {
      flex: 4;
    }

    .reduce {
      flex: 0 0 2rem;
      background-color: white;
      border-radius: 50%;
      border: 1px solid #ffce43;
    }
  }

  .add-wrap {
    flex: 0 0 2rem;
    background-color: #ffce43;
    border-radius: 50%;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.1s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translate(30px);
}
</style>
