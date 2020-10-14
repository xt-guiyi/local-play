<template>
<router-view v-slot="{Component, route}">
  <transition :enter-active-class="route.meta.transitionName">
    <keep-alive include="ShopDetails">
      <component :is=" Component">
      </component>
    </keep-alive>
  </transition>
</router-view>
</template>

<script>
import {
  ref
} from 'vue'
export default {
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss">
#app {}

.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

// .slide-left-enter-from,
// .slide-left-leave-to {
//   transform: translateX(-30px);
//   opacity: 0;
// }

// .slide-left-enter-active,
// .slide-left-leave-active {
//   transition: all 1s ease-out;
// }
</style>
