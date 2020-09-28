<template>
  <tab-bar>
    <!--
      注意: 在dom中使用别名, 前面需要加上~波浪符号
    -->
    <!--每个item组件可以自定义显示高亮文字颜色, 默认为粉色-->
    <tab-bar-item path="/home" colorActive="red">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="mine">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: { TabBar, TabBarItem }
  }
</script>

<style scoped>

</style>
