<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" @load="itemImgSwiper">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {Swiper, SwiperItem},
    methods: {
      itemImgSwiper() {
        if (!this.isLoad) {
          this.$emit('itemImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }
</style>
