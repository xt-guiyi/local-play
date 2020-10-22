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
              <li
                v-for="(item, index) of goodsType"
                :key="index"
                :data-number="index"
                :class="[lastSelected == index ? 'active-bg-color' : '']"
              >
                <i v-if="index === 0" class="iconfont icon-zhekou"></i>
                {{ item }}
                <span v-show="foodClassify[item] !== 0" class="red-count-ball">
                  {{ foodClassify[item] }}
                </span>
              </li>
            </ul>
            <!-- 食物列表-->
            <div
              class="ordering-main"
              ref="orderingMainRef"
              @scroll.self="wtachScroll"
            >
              <section v-for="(item, index) of foodData" :key="index">
                <h1>{{ item.type }}</h1>
                <div
                  class="good-item"
                  v-for="(foodItem, foodIndex) of item.data"
                  :key="foodIndex"
                >
                  <div
                    class="left"
                    @click="jumpnewPage({ type: item.type, ...foodItem })"
                  >
                    <div class="good-picture">
                      <base-goods-exhibition
                        :goodsSouce="foodItem"
                      ></base-goods-exhibition>
                    </div>
                    <div class="good-discount clearfix">
                      <base-discounted-card
                        class="discount-style "
                        v-if="foodItem.Discount ? true : false"
                        :isColumn="true"
                      >
                        <template v-slot:DiscountedPrice>
                          {{
                            floatObj
                              .multiply(foodItem.Discount, foodItem.price)
                              .toFixed(2)
                          }}
                        </template>
                        <template v-slot:DiscountedRate>
                          {{ floatObj.multiply(foodItem.Discount, 10) }}
                        </template>
                      </base-discounted-card>
                    </div>
                  </div>
                  <div class="right">
                    <div class="add-center-container">
                      <cart-increase-and-decrease-button
                        :foodId="foodItem.id"
                        :foodType="item.type"
                      ></cart-increase-and-decrease-button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </table-pane>
        <table-pane :active-key="2">2</table-pane>
      </table-change>
    </main>
  </div>
</template>

<script>
import TopNavBar from 'components/top/TopNavBar.vue'
import TableChange from 'components/table/TableChange.vue'
import TablePane from 'components/table/TablePane.vue'
import BaseGoodsExhibition from 'components/base/BaseGoodsExhibition.vue'
import BaseDiscountedCard from 'components/base/BaseDiscountedCard.vue'
import CartIncreaseAndDecreaseButton from 'components/cart/CartIncreaseAndDecreaseButton.vue'
import { throttle } from 'utils/common.js'
import { floatObj } from 'utils/floatObj.js'
import { foodType, foodData } from 'request/data.js'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'ShopDetails',
  components: {
    TopNavBar,
    TableChange,
    TablePane,
    BaseGoodsExhibition,
    BaseDiscountedCard,
    CartIncreaseAndDecreaseButton
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.orderingMainRef.scrollTop = vm.scrollTop // 返回原先滚动位置
    })
  },

  setup() {
    const tableTitle = reactive(['点餐', '商家信息']) // 商家信息
    const goodsType = reactive(foodType) // 食物分类
    const orderingMainRef = ref(null) // 食物栏dom ref
    let navRef = ref(null) //  导航栏dom ref
    let lastSelected = ref(0) // 上一次选择的导航栏
    let scrollTop = ref(0) // 用于滚动位置
    const router = useRouter()
    const store = useStore()
    const foodClassify = computed(
      () => store.getters['cart/foodClassifyNumber']
    ) // 食物分类数量对象
    store.dispatch('cart/setFoodList', foodData) // 保存食物列表到vuex

    /**
     * 点击导航栏产生联动效果
     * @e clickEvent 单击事件对象
     */
    const choiceGoodsType = function(e) {
      if (e.target.nodeName === 'LI') {
        lastSelected.value = e.target.dataset.number
        // 切换到相应位置
        // 设置父容器的滚动距离等于子section标签离顶部容器的距离
        // 在使用显示比例缩放的系统上，scrollTop可能会提供一个小数。
        // 不要在电脑上缩放屏幕！！！！！
        orderingMainRef.value.scrollTop =
          orderingMainRef.value.children[lastSelected.value].offsetTop
      }
    }

    /**
     * 滑动食物列表产生联动效果
     * @e clickEvent 滚动事件对象
     */

    let wtachScroll = function(e) {
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
    const jumpnewPage = function(data) {
      // 计算折扣
      const isDiscount = data.Discount ? true : false
      const DiscountedRate = data.Discount
        ? floatObj.multiply(data.Discount, 10)
        : ''
      const DiscountedPrice = data.Discount
        ? floatObj.multiply(data.Discount, data.price)
        : ''
      let foodData = {
        ...data,
        isDiscount: isDiscount,
        DiscountedRate: DiscountedRate,
        DiscountedPrice: DiscountedPrice
      }
      window.sessionStorage.setItem('foodData', JSON.stringify(foodData))
      router.push({
        name: 'shopFoodDetails'
      })
    }

    return {
      tableTitle,
      goodsType,
      orderingMainRef,
      lastSelected,
      navRef,
      choiceGoodsType,
      wtachScroll,
      foodData,
      jumpnewPage,
      scrollTop,
      floatObj,
      foodClassify
    }
  }
}
</script>

<style lang="scss" scoped>
.ordering-container {
  height: calc(100vh - 10rem);
  display: flex;

  .ordering-nav {
    flex: 0 0 10rem;
    background-color: #f8f8f8;
    height: 100vh;
    font-size: 1.4rem;

    li:nth-of-type(1) {
      i:first-of-type {
        color: #ffce43;
        margin-right: 0.8rem;
      }
    }

    li {
      height: 4rem;
      line-height: 4rem;
      text-indent: 0.5rem;
      position: relative;
    }

    .red-count-ball {
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      text-indent: initial;
      color: white;
      font-size: 1rem;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
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

      .add-center-container {
        flex: 0 0 80%;
      }
    }
  }
}
</style>
