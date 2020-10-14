<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar"><div slot="center">购物车({{ cartListLength }})</div></nav-bar>
    <cart-list :cartList="cartList"/>
    <button-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CartList from "./childComponents/CartList";
  import ButtonBar from "./childComponents/ButtomBar";

  //  mapGetters是vuex的辅助函数可以把状态中的getters映射到组件中的计算属性中
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      ButtonBar
    },
    computed: {
      ...mapGetters(['cartListLength', 'cartList'])
    }
  }
</script>

<style scoped>
  .cart-nav-bar {
    background: var(--color-tint);
    color: #fff;
  }

  .cart {
    height: 100vh;
  }
</style>
