<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";

  import { getDetail } from "network/detail";
  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: []
      }
    },
    components: {DetailSwiper, DetailNavBar },
    created() {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        const data = res.result
        //  1: 轮播图数据
        this.topImages = data.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
