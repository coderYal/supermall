<template>
  <div class="tab-bar-item" @click="itemClick" :style="styleActive">
    <slot v-if="itemActive" name="item-icon-active"></slot>
    <slot v-else name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
  import TabBar from "./TabBar";
  export default {
    name: "TabBarItem",
    components: {TabBar},
    //  接收父组件传递过来的值
    props: {
      //  接收传递的路径
      path: String,
      //  接收自定义高亮文字颜色
      colorActive: {
        type: String,
        default: 'pink'
      }
    },
    methods: {
      //  点击就跳转路由, 点击哪个子组件, 就跳转到该子组件传递过来的路由
      itemClick() {
        this.$router.push(this.path)
      }
    },
    computed: {
      //  显示高亮图片
      //  判断当前高亮的路由是否等于传递过来的路由, 等于即可显示高亮的图片
      itemActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      //  显示高亮字体
      styleActive() {
        return this.itemActive ? {color: this.colorActive} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
  }
  .tab-bar-item img {
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin: 6px 0;
  }
</style>
