<template>
  <div id="app">
    <!--router-view根据当前的路由,动态渲染不同的组件, 路由切换时, 切换的是router-view挂载的组件, 其它东西不会改变router-view会和tabbar处于同级,如果router-view放在上面, 那么router-view下挂载的组件就会在上面显示, 放在下面就会在tabbar下面显示 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: 'App',
    components: {
      MainTabBar,
      NavBar
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
