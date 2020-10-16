<template>
<div>
  <top-nav-bar></top-nav-bar>
  <main>
    <table-change :title-souce="tableTitle">
      <table-pane :active-key="1">
        <!-- 订餐区域 -->
        <div class="ordering-container">
          <!-- 侧边导航栏-->
          <ul class="ordering-nav" @click="choiceGoodsType" ref="navRef">
            <li v-for="(item, index) of goodsType" :key="index" :data-number="index" :class="[lastSelected == index? 'active-bg-color' : '']">
              <i v-if="index === 0" class="iconfont icon-zhekou"></i>
              {{ item }}
            </li>
          </ul>
          <!-- 食物列表-->
          <div class="ordering-main" ref="orderingMainRef" @scroll.self="wtachScroll">
            <section v-for="(item, index) of foodData" :key="index">
              <h1>{{item.type}}</h1>
              <div class="good-item" v-for="(foodItem ,foodIndex) of item.data" :key="foodIndex">
                <div class="left" @click="jumpnewPage(foodItem)">
                  <div class="good-picture">
                    <base-goods-exhibition :goodsSouce="foodItem"></base-goods-exhibition>
                  </div>
                  <div class="good-discount clearfix">
                    <base-discounted-card class="discount-style " v-if="foodItem.Discount? true : false" :isColumn="true">
                      <template v-slot:DiscountedPrice>
                        {{ floatObj.multiply(foodItem.Discount, foodItem.price).toFixed(2)}}
                      </template>
                      <template v-slot:DiscountedRate>
                        {{ floatObj.multiply(foodItem.Discount, 10) }}
                      </template>
                    </base-discounted-card>
                  </div>
                </div>
                <div class="right">
                  <div class="add-center">
                    <transition name="list">
                      <div class="reduce-wrap" v-show="shopCart.get(foodItem.id)">
                        <i class="reduce iconfont icon-jianhao" @click="decreate(foodItem.id, item.type)"></i>
                        <div class="number">{{ {...shopCart.get(foodItem.id)}.quantity }}</div>
                      </div>
                    </transition>
                    <div class="add-wrap">
                      <i class="add iconfont icon-jiahao" @click="increate(foodItem.id, item.type)"></i>
                      <transition name="half-court" @before-enter="beforeenter" @enter="enter" @after-enter="afterenter">
                        <div class="small-red-sphere" v-if="(isShowHalfCourt)"></div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="shoping-bar">
            <div class="shop-basket iconfont icon-gouwuche1 " :class="[shopCartTotalPrice === 0 ? 'shop-change-style' : '']"></div>
            <div class="shop-total">
              <div class="total">
                <div class="discount-price">￥{{ shopCartTotalPrice }}</div>
                <div class="original-price">￥{{ shopCartDefaultTotalPrice }}</div>
              </div>
              <div class="introduce">3公里0元送 另需包赚费￥1</div>
            </div>
            <div class="go" :class="[shopCartTotalPrice === 0 ? 'shop-change-style' : '']">立即下单</div>
          </div>
        </div>
      </table-pane>
      <table-pane :active-key="2">2</table-pane>
    </table-change>
  </main>
</div>
</template>

<script>
import TopNavBar from "components/top/TopNavBar.vue";
import TableChange from "components/table/TableChange.vue";
import TablePane from "components/table/TablePane.vue";
import BaseGoodsExhibition from "components/base/BaseGoodsExhibition.vue";
import BaseDiscountedCard from "components/base/BaseDiscountedCard.vue";
import {
  throttle
} from "utils/common.js"
import {
  floatObj
} from "utils/floatObj.js";
import {
  foodType,
  foodData
} from "request/data.js";
import {
  computed,
  reactive,
  ref,
} from "vue";
import {
  useRouter,
} from 'vue-router'
import {
  useStore
} from "vuex"
export default {
  name: 'ShopDetails',
  components: {
    TopNavBar,
    TableChange,
    TablePane,
    BaseGoodsExhibition,
    BaseDiscountedCard
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.orderingMainRef.scrollTop = vm.scrollTop // 返回原先滚动位置
    })
  },

  setup() {
    const tableTitle = reactive(["点餐", "商家信息"]); // 商家信息
    const goodsType = reactive(foodType); // 食物分类
    const orderingMainRef = ref(null) // 食物栏dom ref
    let navRef = ref(null) //  导航栏dom ref
    let lastSelected = ref(0) // 上一次选择的导航栏
    let scrollTop = ref(0) //滚动位置
    const router = useRouter()
    const store = useStore()
    const shopCart = computed(() => store.state.cart.shopCart)
    const shopCartTotalPrice = computed(() => store.getters['cart/cartTotalPrice'])
    const shopCartDefaultTotalPrice = computed(() => store.getters['cart/cartDefaultTotalPrice'])
    // 保存食物列表到vuex
    store.dispatch('cart/setFoodList', foodData)
    console.log(store.state.cart.foodList)
    /**
     * 点击导航栏产生联动效果
     * @e clickEvent 单击事件对象
     */
    const choiceGoodsType = function (e) {
      if (e.target.nodeName === 'LI') {
        lastSelected.value = e.target.dataset.number
        // 切换到相应位置
        // 设置父容器的滚动距离等于子section标签离顶部容器的距离
        // 在使用显示比例缩放的系统上，scrollTop可能会提供一个小数。
        // 不要在电脑上缩放屏幕！！！！！
        orderingMainRef.value.scrollTop = orderingMainRef.value.children[lastSelected.value].offsetTop
      }
    };

    /**
     * 滑动食物列表产生联动效果
     * @e clickEvent 滚动事件对象
     */
    let wtachScroll = function (e) {
      for (var i = 0; i < navRef.value.children.length; i++) {
        if (e.target.scrollTop >= orderingMainRef.value.children[i].offsetTop) {
          lastSelected.value = i
        }
      }
      scrollTop.value = e.target.scrollTop

    }
    // 节流
    wtachScroll = throttle(wtachScroll, 50, 100)

    /**
     * 跳转食物详情页
     * @foodData  食物数据
     */
    const jumpnewPage = function (data) {
      const isDiscount = data.Discount ? true : false
      const DiscountedRate = data.Discount ? floatObj.multiply(data.Discount, 10) : ''
      const DiscountedPrice = data.Discount ? floatObj.multiply(data.Discount, data.price) : ''
      let foodData = {
        ...data,
        isDiscount: isDiscount,
        DiscountedRate: DiscountedRate,
        DiscountedPrice: DiscountedPrice
      }
      window.sessionStorage.setItem('foodData', JSON.stringify(foodData))
      router.push({
        name: 'shopFoodDetails',
      })
    }

    /**
     * 添加食物到购物车
     * @id  食物id号
     */
    const increate = function (id, type) {
      store.dispatch('cart/addToShopCart', {
        id,
        type,
        isAdd: true,
      })
      isShowHalfCourt.value = !isShowHalfCourt.value
      // console.log(store.state.cart.shopCart)
    }

    /**
     * 减少食物到购物车
     * @id  食物id号
     */
    const decreate = function (id, type) {
      store.dispatch('cart/addToShopCart', {
        id,
        type,
        isAdd: false,
      })
    }
    const isShowHalfCourt = ref(false)
    const beforeenter = function (el) {
      console.log(el)
      el.style.transform = "translate(0,0)";
    }

    const enter = function (el, don) {
      el.offsetWidth;
      el.style.transform = "translate(-30px,150px)";
      el.style.transition = "transform 1s ease"
      don();
    }

    const afterenter = function (el) {
      isShowHalfCourt.value = !isShowHalfCourt.value
    }
    return {
      tableTitle,
      goodsType,
      orderingMainRef,
      lastSelected,
      navRef,
      choiceGoodsType,
      wtachScroll,
      foodType,
      foodData,
      jumpnewPage,
      scrollTop,
      floatObj,
      shopCart,
      shopCartTotalPrice,
      shopCartDefaultTotalPrice,
      increate,
      decreate,
      beforeenter,
      enter,
      afterenter,
      isShowHalfCourt
    };
  }
};
</script>

<style lang="scss" scoped>
.ordering-container {
  height: calc(100vh - 10rem);
  display: flex;

  .ordering-nav {
    flex: 0 0 10rem;
    background-color: #f8f8f8;
    height: 100%;
    font-size: 1.6rem;

    li:nth-of-type(1) {
      i {
        color: #ffce43;
        margin-right: 0.8rem;
      }
    }

    li {
      height: 4rem;
      line-height: 4rem;
      text-indent: 0.5rem;
    }
  }
}

.active-bg-color {
  color: black;
  background-color: white;
}

.ordering-main {
  width: 100%;
  position: relative;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  section {
    padding-left: 1rem;
    padding-top: 1rem;
  }

  .good-item {
    width: 100%;
    height: 20rem;
    display: flex;
    margin-top: 1rem;
    border-bottom: 1px solid #eeeeee;

    .left {
      flex: 6.5;

      .good-discount {
        position: relative;

        .discount-style {
          width: 45%;
          height: 4rem;
          font-size: 1rem;
          margin-top: 1.5rem;
          float: right;
        }
      }
    }

    .right {
      flex: 3.5;
      display: flex;
      align-items: center;

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
            // position: absolute;
            // left: calc(50% - 1.5rem);
            // right: 50%;
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
          position: relative;

          .small-red-sphere {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
          }
        }

      }

    }
  }
}

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

.list-enter-active,
.list-leave-active {
  transition: all 0.1s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translate(30px);
  // position: absolute;
  // left: 0;
}

// .half-court-enter-from,
// .half-court-leave-to {
//   transform: translate(30px);
// }

// .half-court-enter-active,
// .half-court-leave-active {
//   translate: all 0.1 ease;
// }
</style>
