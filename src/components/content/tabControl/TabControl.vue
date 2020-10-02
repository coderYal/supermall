<template>
  <div class="tab-control">
    <div class="tab-control-item"
         :class="{active: currentIndex === index}"
         v-for="(item, index) in tabControls"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      tabControls: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      //  下边框显示高亮
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    background: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
