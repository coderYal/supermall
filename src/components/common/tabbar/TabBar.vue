<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    text-align: center;
    background-color: #ececec;
  }
</style>
