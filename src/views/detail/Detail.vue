<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="detailNavBar"/>
    <scroll
      class="center"
      ref="scroll"
      :probeType="3"
      @scroll="scrollPosition">
      <detail-swiper
        :top-images="topImages"
        @itemImageLoad="itemImageLoad"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detailInfo="detailInfo"
        @itemImgLoadEmit="itemImgLoadEmit"/>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="detailParam"/>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="detailComment"/>
      <goods
        :goods="recommends"
        ref="detailRecommends"/>
    </scroll>
    <back-top
      v-show="currentShow"
      @click.native="backClick" />
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
  import { itemListenerMixin, backTopMixin } from "common/mixin";
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
        recommends: [],
        themeTopYs: [],// 存储商品,参数,评论,推荐对应的offsetTop值
        getThemeTopY: null,// 防抖函数, 监听商品图片的加载完成
        currentIndex: null,// 用来存放每次滚动到某个位置的index值
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
    mounted() {
      this.getThemeTopY = debounce(() => {
        //  每次先把数组赋值为空, 因为防抖会多次执行, 不把上一次的清空就会push多余的数据
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.detailParam.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailRecommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    methods: {
      //  监听轮播图加载完成然后刷新滚动插件重新计算高度
      itemImageLoad() {
        this.$refs.scroll.refresh()
      },
      //  详情商品图片加载完成接收
      itemImgLoadEmit() {
        this.getThemeTopY()
      },
      //  子组件NavBar点击跳转到对应的位置
      titleClick(index) {
        this.$refs.scroll.scrollToXAndY(0, -this.themeTopYs[index], 100)
      },
      //  监听滚动插件滚动的位置
      scrollPosition(position) {
        const positionY = -(position.y)
        //  遍历商品参数评论和推荐四个功能块的offsetTop值
        for (let i in this.themeTopYs) {
          //  拿滚动的距离和第i个和第i+1个比较, 然后获得index赋值给navbar的currentIndex
          if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[parseInt(i)+1])) {
            this.currentIndex = parseInt(i)
            this.$refs.detailNavBar.currentIndex = this.currentIndex
          }
        }
        //  如果距离大于1000, 就显示回到顶部
        //  使用混入backTop, 但是混入不会合并methods方法内的具体, 只会合并methods内的方法
        this.currentShow = -(position.y) > 1000
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
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
