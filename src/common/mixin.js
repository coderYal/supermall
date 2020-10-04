//  混入, 可以将组件中的内容跟此文件进行合并混入
import { debounce } from "./utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //  1: 使用防抖函数, 80秒之内如果要重新计算高度, 就会去除上次操作, 不会重新计算, 反之重新计算高度
    const refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = () => {
      refresh()//  调用防抖函数
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}
