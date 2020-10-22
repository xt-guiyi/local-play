<template>
  <div class="Discount-style" :class="[isColumn ? 'flex-column' : '']">
    <div class="Discounted-price">
      <p>折后价</p>
      <p>
        <slot name="DiscountedPrice"></slot>
      </p>
    </div>
    <div class="Discount-rate">
      <i class="iconfont icon-zhekou"></i>
      <p><slot name="DiscountedRate"></slot>折</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDiscountedCard',
  props: {
    isColumn: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.Discount-style {
  display: flex;
  // height: 2.5rem;
  // line-height: 2.5rem;
  color: #f63e40;

  .Discounted-price {
    width: 100%;
    flex: 6;
    display: flex;
    align-content: center;
    justify-content: center;

    p {
      flex: 5;
      text-align: center;
      border: 1px solid #f63e40;
      color: #f63e40;
    }

    p:first-child {
      background-color: #f63e40;
      color: white;
      border-radius: 0.5rem 0 0 0.5rem;
    }

    p:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
      // font-size: 1.4rem;
    }
  }

  .Discount-rate {
    flex: 4;
    font-size: 1.6rem;
    text-align: center;

    p {
      text-indent: 0.5rem;
      display: inline-block;
      height: 100%;
    }
  }
}

.flex-column {
  flex-direction: column;
}
</style>
