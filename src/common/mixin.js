//  混入, 可以将组件中的内容跟此文件进行合并混入
import { debounce } from "./utils";
//  监听图片加载完成的混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //  1: 使用防抖函数, 100秒之内如果要重新计算高度, 就会去除上次操作, 不会重新计算, 反之重新计算高度
    const refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = () => {
      refresh()//  调用防抖函数
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

//  backTop的混入
import BackTop from "components/common/backTop/BackTop";
export const backTopMixin = {
  data() {
    return {
      currentShow: false,// 用来控制backtop回到顶部是否显示 默认不显示
    }
  },
  components: {
    BackTop
  },
  methods: {
    //  监听回调顶部的点击
    backClick() {
      //  调用滚动插件内部封装好的方法, 传入x和y及过度时间(过度时间默认为300毫米, 可不传)
      this.$refs.scroll.scrollToXAndY(0, 0)
    }
  }
}
