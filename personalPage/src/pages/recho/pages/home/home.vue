<template>
	<div class="homepage">
		<hgroup class="title-group">
			<img src="/static/recho/home-title-group.svg">
		</hgroup>
		<search-box>
		</search-box>
		<button class="login"><i class="iconfont icon-user"></i>Login</button>
		<button class="start">Get Started<i class="iconfont icon-arrow"></i></button>
		<a class="latest">
			<p>latest issues</p>
			<p class="iconfont icon-slidedown"></p>
		</a>
	</div>
</template>

<script>
import searchBox from './components/search-box.vue'
export default {
	name: 'rechoHome',
	components: {
		searchBox,
	},
	created() {
		this.$store.state.isRechoMenuAvailable = true
	}
}
</script>

<style scoped>
* {
  font-family: 'DINCondensedC';
}
.homepage {
	position: relative;
	transition: top 0.6s;
	top: 0;
	height: 100%;
	width: 100%;
	background:	url('/static/recho/home_bk.jpg'),
							#FF6040;
	background-repeat: no-repeat;
}
.title-group {
	padding: 200px 25px 50px;
	text-align: left;
}
.login, .start {
	width: 40%;
	background: none;
	border: none;
	outline: none;
	font-size: 22.5px;
	cursor: pointer;
	margin-top: 50px;
}
.login {
	text-align: left;
	padding-left: 10px;
}
.iconfont {
	opacity: 0.73;
	font-size: 1.1em;
	margin: 0 5px;
}
.latest {
	display: block;
	position: absolute;
	top: 578px;
	width: 100%;
	font-size: 14px;
	color: white;
	cursor: pointer;
	line-height: .5em;
}
</style>
