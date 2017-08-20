<template lang="html">
  <div v-if="ball"
       class="title"
       :class="{
         'img-ball': ball.img,
         }">
    <img v-if="ball.img" :src="ball.img">
    <i v-if="ball.icon" :class="ball.icon" class="iconfont icon"> {{ball.text}}</i>
  </div>
</template>

<script>
export default {
  name: 'ball',
  props: [
    'ball'
  ],
}
</script>

<style lang="css" scoped>
.title {
  display: block;
  position: relative;
  width: 120px;
  height: 30px;
  border-radius: 50%;
  margin: 70px auto 20px;
  transition: 0.25s;
  text-align: left;
}
.img-ball {
  height: 120px;
  margin-top: 20vh;
  background: rgba(255, 255, 255, 0.6);
}

.title img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	margin: auto;
	opacity: 0.9;
	filter: hue-rotate(-10deg);
}
.title .icon {
	position: absolute;
	display: inline-block;
	width: 100%;
  line-height: 30px;
	text-align: center;
	z-index: 10;
	font-size: 16px;
  font-weight: normal;
	opacity: 0.5;
}
</style>
