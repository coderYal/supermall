<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners" />
    <recommend :recommends="recommends" />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./homeChild/HomeSwiper";
  import Recommend from "./homeChild/Recommend";

  import { getHomeMultidata } from "network/home";
  export default {
    name: "Home",
    data() {
      return {
        //  轮播图数据
        banners: [],
      //  推荐商品数据
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommend
    },
    created() {
      //  1: 请求轮播图数据
      getHomeMultidata().then(res => {
        console.log(res.data);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
