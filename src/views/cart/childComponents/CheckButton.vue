<template>
  <div
    class="icon-selector"
    :class="{check: isCheck}">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .icon-selector {
    border-radius: 50%;
    border: 1px solid #a0a0a0;
  }

  .check {
    background: var(--color-tint);
  }
</style>
