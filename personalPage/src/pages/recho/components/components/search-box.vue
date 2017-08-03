<template lang="html">
  <div class="search-box">
    <input type="text" v-model="keyword">
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'searchBox',
}
</script>

<style lang="css" scoped>
.search-box {
  margin: auto;
  width: 343px;
  height: 50px;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.17);
  
}
</style>
