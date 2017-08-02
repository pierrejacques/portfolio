<template lang="html">
  <div class="recho">
    <h1>TEST RECHO</h1>
    <div class="iphone-7">
      <recho-demo></recho-demo>
    </div>
  </div>
</template>

<script>
import rechoDemo from './components/recho-demo.vue'
export default {
  name: 'recho',
  components: {
    rechoDemo,
  }
}
</script>

<style lang="css" scoped>
  .recho {
    text-align: center;
  }
  .iphone-7 {
    display: inline-block;
    width: 375px;
    height: 667px;
    box-shadow: 0px 5px 10px gray;
  }
</style>
