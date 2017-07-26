<template>
  <div id="app">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.8">
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}
.screen-box {
  box-sizing: border-box;
  margin: 20px auto;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
}
</style>
