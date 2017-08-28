<template>
	<div>
		<span class="btn-menu iconfont icon-menu"></span>
		<hgroup>
			<span class="iconfont icon-recho"></span>
			<h1>Recho</h1>
			<p class="subtitle">audio-technology sharing & learningsupported by SJTU Band United</p>
		</hgroup>
		<search-box :keyword = "keyword">
		</search-box>
		<button class="login"></button>
		<button class="start"></button>
		<a class="latest"></a>
	</div>
</template>

<script>
import searchBox from './components/search-box.vue'
export default {
	name: 'rechoHome',
	components: {
		searchBox,
	},
}
</script>

<style scoped>
* {
  font-family: 'DINCondensedC';
}
.phone-box {
  position: relative;
  height: 100%;
  background: linear-gradient(to left, #F26552 50%, #F16745);
  background-blend-mode: overlay;
}
.btn-menu {
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 23px;
  color: white;
}
hgroup {
  display: grid;
  width: 155px;
  height: 125px;
  color: white;
  grid-template-columns: 20px 70px auto;
  grid-template-rows: auto 60px;
  grid-template-areas: "icon head head" "icon sub .";
}
.icon-recho {
  grid-area: icon;
  font-size: 120px;
}
h1 {
  grid-area: head;
  font-size: 72px;
}
.subtitle {
  grid-area: sub;
  font-size: 12px;
}
</style>