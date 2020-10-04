<template>
  <nav-bar class="detail-nav-bar">
    <div slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center">
      <div
        class="center-item"
        v-for="(item, index) in titles"
        :class="{active: currentIndex === index}"
        @click="navBarClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {NavBar},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      navBarClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav-bar img {
    margin-top: 10px;
  }
  .center {
    display: flex;
    font-size: 13px;
  }
  .center-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
</style>
