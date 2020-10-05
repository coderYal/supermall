<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      //  2: 手指滚动才会触发
      //  3: 只要是滚动 都会触发
      probeType: {
        type: Number,
        default: 0
      },
      //  是否监听上拉加载更多
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //  1: 创建scroll实例对象
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: true
      })
      //  2: 监听滚动的位置
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
      //  3: 监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      //  1: 定义方法,滚动插件到达的x和y轴的位置,及到达过度时间
      scrollToXAndY(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      //  2: 当上拉加载完成后, 用此方法告诉滚动插件, 上拉加载已经完成, 否则默认只执行一次上拉加载
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      //  3: 调用refresh()重新计算高度, dom结构发生变化就要重新计算高度
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //  4: 滚动插件滚动的距离
      scrollY() {
        return this.scroll && this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
