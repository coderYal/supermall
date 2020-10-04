<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll
      class="center"
      ref="scroll">
      <detail-swiper
        :top-images="topImages"
        @itemImageLoad="itemImageLoad"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detailInfo="detailInfo" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import Goods from "components/content/goods/Goods"

  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";

  import { getDetail, getDetailRecommend, GoodsInfo, Shop } from "network/detail";
  import { debounce } from "common/utils";
  import { itemListenerMixin } from "common/mixin";
  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImages: [],
        goodsInfo: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: []
      }
    },
    components: {
      Goods,
      DetailCommentInfo,
      DetailShopInfo,
      Scroll,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar,
      DetailGoodsInfo,
      DetailParamInfo
    },
    created() {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        const data = res.result
        //  1: 轮播图数据
        this.topImages = data.itemInfo.topImages
        //  2: 创建商品的对象
        this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //  3: 创建店铺的对象
        this.shop = new Shop(data.shopInfo)
        //  4: 详情的信息
        this.detailInfo = data.detailInfo
        //  5: 参数的信息
        this.paramInfo = data.itemParams
        //  6: 评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getDetailRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      itemImageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    mixins: [itemListenerMixin],
    //  组件被销毁后调用该钩子函数, 如果组件被缓存就不调用这个
    destroyed() {
      //  离开组件注销全局图片加载完成监听事件
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
  }
  .detail-nav-bar {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
  .center {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
