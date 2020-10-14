<template>
<div>
  <top-common-bar title="商品详情" @back-event="backPreviouPage"></top-common-bar>
  <main>
    <div class="food-img">
      <img src="" alt="">
    </div>
    <div class="food-details">
      <section class="food-left">
        <h5>{{ foodData.foodName }}</h5>
        <p class="food-price">￥{{ foodData.price }}</p>
        <base-discounted-card v-if="foodData.isDiscount">
          <template v-slot:DiscountedPrice>
            {{ floatObj.multiply(foodData.Discount, foodData.price) }}
          </template>
          <template v-slot:DiscountedRate>
            {{ floatObj.multiply(foodData.Discount, 10) }}折
          </template>
        </base-discounted-card>
        <p class="already-sell">已售：{{ foodData.alreadySell }}</p>
      </section>
      <div class="food-right">
        <div class="add-shopping-cart"><i class="iconfont icon-jiahao"></i>加入购物车</div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
import TopCommonBar from "components/top/TopCommonBar.vue";
import BaseDiscountedCard from "components/base/BaseDiscountedCard.vue";
import {
  floatObj
} from "utils/floatObj.js";
import {
  useRouter,
} from 'vue-router'
import {
  computed
} from 'vue';

export default {
  name: 'ShopFoodDetails',
  components: {
    TopCommonBar,
    BaseDiscountedCard
  },
  setup(props) {
    const router = useRouter()

    // 触发返回事件
    const backPreviouPage = function () {
      router.go(-1)
    }
    // 食物数据
    const foodData = JSON.parse(sessionStorage.getItem('foodData'))
    // // 是否有折扣
    // const isDiscount = computed(() => foodData.Discount ? true : false)
    // // 折扣率
    // const DiscountedRate = computed(() => floatObj.multiply(foodData.Discount, 10))
    // // 折扣价
    // const DiscountedPrice = computed(() => floatObj.multiply(foodData.Discount, foodData.price))
    return {
      foodData,
      backPreviouPage,
      floatObj
    }
  }
}
</script>

<style lang="scss" scoped>
.food-img {
  height: 100vw;
  background-color: silver;
}

.food-details {
  height: 12rem;
  display: flex;
  padding: 1rem;

  .food-left {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h5 {
      font-size: 1.6rem;
    }

    .food-price {
      font-size: 1.4rem;
    }

    .Discount-style {
      display: flex;
      height: 2.5rem;
      line-height: 2.5rem;
      box-sizing: content-box;
      color: #F63E40;

      .Discounted-price {
        flex: 6;
        display: flex;

        p {
          flex: 5;
          text-align: center;
          border: 1px solid #F63E40;
          color: #F63E40;

        }

        p:first-child {
          background-color: #F63E40;
          color: white;
          border-radius: 0.5rem 0 0 0.5rem;

        }

        p:last-child {
          border-radius: 0 0.5rem 0.5rem 0;

        }
      }

      .Discount-rate {
        flex: 4;
        font-size: 1.6rem;
        padding-left: 2rem;

        p {
          text-indent: 0.5rem;
          display: inline-block;
          height: 100%;
        }
      }
    }

    .already-sell {
      color: silver;
    }
  }

  .food-right {
    font-size: 1.6rem;
    flex: 5;
    position: relative;

    .add-shopping-cart {
      width: 12rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      background-color: #FEC81E;
      border-radius: 25px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

    }
  }
}
</style>
