<template lang="html">
  <div class="recho">
    <h1>RECHO demo</h1>
    <div class="iphone-7">
      <div class="iphone-toolbar">
      </div>
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
    display: flex;
    text-align: center;
  }
  .iphone-7 {
    display: inline-block;
    width: 375px;
    height: 667px;
    margin: 20px;
    box-shadow: 0px 5px 10px gray;
  }
  .iphone-toolbar {
    width: 100%;
    height: 22px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
</style>
