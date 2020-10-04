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
        :detailInfo="detailInfo"
        @goodsImgLoad="goodsImgLoad"/>
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";

  import { getDetail, Goods, Shop } from "network/detail";
  import { debounce } from "common/utils";
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
        commentInfo: {}
      }
    },
    components: {
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
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
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
    },
    methods: {
      itemImageLoad() {
        this.$refs.scroll.refresh()
      },
      goodsImgLoad() {
        debounce(this.$refs.scroll.refresh(), 100)
      }
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
