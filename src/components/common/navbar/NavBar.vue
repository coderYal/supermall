<template>
  <div class="nav-bar">
    <!--如果不用一个div包着, 直接替换的话, 设置在插槽上的样式就没了-->
    <div class="nav-bar-left"><slot name="left"></slot></div>
    <div class="nav-bar-center"><slot name="center"></slot></div>
    <div class="nav-bar-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .nav-bar-center {
    flex: 1;
  }
  .nav-bar-left, .nav-bar-right {
    width: 60px;
  }
</style>
