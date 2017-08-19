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

/* pageUrl */
 .page-url {
	display: inline-block;
	position: absolute;
	z-index: 1;
	border-radius: 50%;
	font-weight: normal;
	cursor: pointer;
	pointer-events: all;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
	background: rgba(255, 255, 255, 0.8);
	transition: 0.3s;
}
.page-url:hover {
	background: white;
	box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3)
}
.page-url:hover .iconfont { opacity: 1; }
</style>
