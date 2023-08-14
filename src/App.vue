<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
<script>
import windowForbid from "@/utils/window"
export default {
  created(){
    // windowForbid()//禁止浏览器缩放
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
