<template>
  <div class="button-bar">
    <check-button class="check-button"
                  :isCheck="isAllSelectCheck"
                  @click.native="allSelectCheckClick"/>
    <span>全选</span>
    <span class="total-price">合计: {{ totalPrice }}</span>
    <span class="buy-product">去计算({{ buyProduct }})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  import { mapGetters } from 'vuex'

  export default {
    name: "ButtomBar",
    components: {CheckButton},
    computed: {
      ...mapGetters(['cartList']),
      // 计算价格
      totalPrice() {
        return this.cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.realPrice * item.count
        }, 0).toFixed(2)
      },
      // 显示总共选中的
      buyProduct() {
        return this.cartList.filter(item => {
          return item.check
        }).length
      },
      //  默认没有数据 就显示全选按钮为true
      isAllSelectCheck() {
        return (this.cartList.find(item => {
          return !item.check
        })) === undefined
      }
    },
    methods: {
      //  点击先判断当前有没有未选中的, 如果有未选中的就把全部的都设置为true, 反之设置为false
      allSelectCheckClick() {
        const isAllSelectCheck = this.cartList.find(item => !item.check)
        if (isAllSelectCheck) {
          this.cartList.forEach(item => item.check = true)
        } else {
          this.cartList.forEach(item => item.check = false)
        }
      }
    }
  }
</script>

<style scoped>
  .button-bar {
    position: relative;
    bottom: 40px;
    display: flex;
    padding-left: 10px;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    align-items: center;
  }

  .check-button {
    margin-right: 5px;
    height: 20px;
  }

  .check {
    background: var(--color-tint);
  }

  .total-price {
    margin-left: 20px;
    flex: 1;
  }

  .buy-product {
    background: orangered;
    padding: 0 15px;
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
</style>
