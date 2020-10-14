<template>
  <div class="cart-list">
    <scroll class="cart-content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :itemInfo="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll,
      CartListItem
    },
    //  进入购物车组件就让滚动插件重新计算高度
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 54px);
  }

  .cart-content {
    height: 100%;
    overflow: hidden;
  }
</style>
