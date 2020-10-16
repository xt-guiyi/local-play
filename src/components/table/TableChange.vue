<template>
<div id="table-container">
  <div class="table-main" @click="tableChange">
    <div v-for="(item, index) of titleSouce" :key="index" class="table-items" :class="[index === currentItem - 1 ? 'active-table' : '']" :data-key="++index">
      {{ item }}
    </div>
  </div>
</div>
<slot></slot>
</template>

<script>
import {
  provide,
  ref
} from "vue";
export default {
  name: "TableChange",
  props: {
    // 数据源
    titleSouce: {
      type: Array,
      required: true
    },
    // 默认项
    defaultItem: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const currentItem = ref(props.defaultItem);
    // console.log(currentItem)
    const tableChange = function (e) {
      let keyValue = e.target.parentNode.dataset.key ?
        e.target.parentNode.dataset.key :
        e.target.dataset.key;
      currentItem.value = keyValue;
    };
    provide("currentItem", currentItem);
    return {
      currentItem,
      tableChange
    };
  }
};
</script>

<style lang="scss" scoped>
#table-container {
  height: 4rem;
  text-align: center;
  background-color: white;
  font-size: 1.4rem;
  border-bottom: 1px solid #eeeeee;
}

.table-main {
  height: 100%;
  color: #919191;
  display: flex;

  .table-items {
    flex: 0 0 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}

.active-table {
  color: black;
  font-weight: 900;
  font-size: 1.6rem;

  &::after {
    content: "";
    background-color: #ffce43;
    height: 4px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
