<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
* {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
.screen-box {
  box-sizing: border-box;
  margin: 20px auto;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
}
a, a:active {
  color: black;
  text-decoration: none;
}
</style>
