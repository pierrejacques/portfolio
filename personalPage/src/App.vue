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
html::-webkit-scrollbar {
	width: 0;
}
html::-webkit-scrollbar-thumb {
	width: 10px;
}
* {
  font-family: 'Quicksand', sans-serif;
}
body {
  margin: 0;
}
.screen-box {
  box-sizing: border-box;
  margin: 1.5vw;
  width: 97vw;
  height: calc(100vh - 3vw);
}
a, a:active {
  color: black;
  text-decoration: none;
}
</style>
