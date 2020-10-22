<template>
  <router-view v-slot="{ Component, route }">
    <transition :enter-active-class="route.meta.transitionName">
      <keep-alive include="ShopDetails">
        <component :is="Component"> </component>
      </keep-alive>
    </transition>
    <cart-shoping-bar
      v-show="route.meta.isShowCartComponents"
    ></cart-shoping-bar>
    <base-ball v-show="route.meta.isShowCartComponents" />
  </router-view>
</template>

<script>
import CartShopingBar from 'components/cart/CartShopingBar'
import BaseBall from 'components/base/BaseBall.vue'
export default {
  components: {
    CartShopingBar,
    BaseBall
  }
}
</script>

<style lang="scss">
.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
</style>
