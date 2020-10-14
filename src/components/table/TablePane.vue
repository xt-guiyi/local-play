<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>

<script>
import { inject, ref, watchEffect } from "vue";
export default {
  name: "TablePane",
  props: {
    activeKey: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const show = ref(false);
    const selectionitem = inject("currentItem");
    watchEffect(() => {
      if (selectionitem.value == props.activeKey) {
        // console.log('好了')
        show.value = true;
      } else {
        show.value = false;
      }
    });

    return {
      show
    };
  }
};
</script>
