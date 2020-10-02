<template>
  <div id="home-recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Recommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #home-recommend {
    display: flex;
    text-align: center;
    padding-bottom: 5px;
    border-bottom: 6px solid #eeeeee;
    background: #fff;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 60px;
    height: 60px;
    vertical-align: middle;
    margin: 5px 0;
  }
</style>
