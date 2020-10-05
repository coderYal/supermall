<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :tabControls="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControls"
      :class="{fixed: isFixed}"/>
    <scroll
      class="content"
      :probeType="3"
      :pullUpLoad="true"
      ref="scroll"
      @scroll="scroll"
      @pullingUp="pullingUp">
      <HomeSwiper
        :banners="banners"
        @swiperItemImgLoad="swiperItemImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :tabControls="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2" />
      <goods :goods="goods[currentType].list" />
    </scroll>
    <back-top
      v-show="currentShow"
      @click.native="backClick" />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl";
  import Goods from "components/content/goods/Goods";
  import Scroll from "components/common/scroll/Scroll";

  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { itemListenerMixin, backTopMixin } from "common/mixin";
  export default {
    name: "Home",
    data() {
      return {
        banners: [],// 轮播图数据
        recommends: [],// 推荐商品数据
        goods: {// 三个大类商品数据, 划分数据结构
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',// 三个大类点击分别显示不同商品,默认为pop的标记
        tabOffsetTop: 0,// 记录tabControl距离上方的位置
        isFixed: false,// 记录tabControl是否可以吸顶
        scrollY: 0,// 记录离开时滚动的距离
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      Goods,
      Scroll
    },
    created() {
      //  1: 请求轮播图数据和推荐信息数据
      this.getHomeMultidata()

      //  2:  请求商品数据, 默认三个大类都请求数据过来
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * ---------------网络请求相关的方法------------------
       */
      //  1: 请求轮播图数据和推荐信息数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      //  2:  请求商品数据, 传入类型, page默认加1, 每次调用, page都会+1
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        //  上拉加载更多, 每次上拉加载过后, 要重新刷新一下滚动插件, 重新计算高度, 否则不会触发下次的上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

      /**
       * ---------------事件监听处理相关的方法------------------
       */
      //  1: 点击tab,切换到对应的数据
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //  2: 监听滚动插件的滚动距离
      scroll(position) {
        //  2.1: 如果距离大于1000, 就显示回到顶部
        //  使用混入backTop, 但是混入不会合并methods方法内的具体, 只会合并methods内的方法
        this.currentShow = -(position.y) > 1000
        //  2.2: 如果滚动距离大于tabControl距离顶部的距离 就设置fixed为true
        this.isFixed = -(position.y) > this.tabOffsetTop
      },
      //  3: 监听回调顶部的点击
      //  使用混入, 就不需要该方法了
      // backClick() {
      // //  调用滚动插件内部封装好的方法, 传入x和y及过度时间(过度时间默认为300毫米, 可不传)
      //   this.$refs.scroll.scrollToXAndY(0, 0)
      // },
      //  4: 监听滚动插件发出的事件, 上拉加载更多, 每次上拉加载过后, 要重新刷新一下滚动插件, 重新计算高度, 否则不会触发下次的上拉加载更多
      pullingUp() {
        this.getHomeGoods(this.currentType)
      },
      //  5: 监听轮播图加载完成, 获取tabControl距离上方的距离
      swiperItemImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    //  使用混入, 将全局监听图片加载完成事件总线功能使用混入, 各个组件都可以使用
    mixins: [itemListenerMixin, backTopMixin],
    //  在组件被缓存的时候, 进入home组件的回调
    activated() {
    //  进入到home组件 就让滚动插件的位置等于上次离开home组件的位置
      this.$refs.scroll.scrollToXAndY(0, this.scrollY, 0)
    },
    //  在组件被缓存的时候, 离开home组件的回调
    deactivated() {
      //  离开home组件就记录当前滚动插件滚动的距离
      this.scrollY = this.$refs.scroll.scrollY()
      //  离开取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;

    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 54px;
    right: 0;
    left: 0;

    overflow: hidden;
  }
  div.fixed {
    position: relative;
    z-index: 9;
    display: flex;
  }
  .tabControls {
    display: none;
  }
</style>
