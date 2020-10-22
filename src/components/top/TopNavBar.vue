<template>
  <header class="nav-bar-container">
    <i class="nav-left  iconfont icon-zuojiantou"></i>
    <div class="nav-form">
      <input type="text" placeholder="请输入商品名称" />
      <i class="nav-right iconfont icon-search"></i>
    </div>
    <i class=" iconfont icon-shoucang"></i>
    <i class="iconfont icon-fenxiang"></i>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  height: 6rem;
  line-height: 6rem;
  background-color: #ffce43;
  display: flex;

  i {
    flex: auto;
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
  }

  .nav-form {
    flex: 7;
    position: relative;

    input {
      width: 100%;
      height: 3rem;
      border: none;
      border-radius: 20px;
      text-indent: 1.5rem;
      outline: none;
    }

    i {
      position: absolute;
      right: 0.5rem;
      color: #b4b4b4;
    }
  }
}
</style>
