<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners"
                 :key="index">
      <a :href="item.link">
        <img :src="item.image"
             @load="swiperItemImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad: true
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {Swiper, SwiperItem},
    methods: {
      //  监听轮播图图片加载完成, 发出事件
      swiperItemImgLoad() {
        if (this.isLoad) {
          this.$emit('swiperItemImgLoad')
          this.isLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
