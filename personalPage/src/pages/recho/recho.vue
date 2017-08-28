<template lang="html">
  <div class="recho">
    <h1>RECHO demo</h1>
    <div class="iphone-7">
      <div class="iphone-toolbar"></div>
      <div class="phone-box">
				<main>
					<router-view></router-view>
				</main>
				<aside v-if="false" class="menu">
					<recho-menu></recho-menu>
				</aside>
				<div v-if="false" class="mask">
				</div>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recho',
  created() {
    document.title = "Recho demo"
  }
}
</script>

<style lang="css">
  .recho {
    display: flex;
    text-align: center;
  }
	.recho * {
		font-family: 'DINCondensedC';
	}
  .iphone-7 {
    display: inline-block;
    position: relative;
    width: 375px;
    height: 667px;
    margin: 20px;
    overflow: hidden;
    box-shadow: 0px 5px 10px silver;
  }
	.phone-box {
		position: relative;
		height: 100%;
		background: linear-gradient(to left, #F26552 50%, #F16745);
		background-blend-mode: overlay;
	}
  .iphone-toolbar {
    position: absolute;
    z-index: 2;
    top:0;
    width: 100%;
    height: 22px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
	.recho main {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.recho main::-webkit-scrollbar {
		width: 0;
	}
	.recho .menu {
		position: absolute;
		width: 60%;
		height: 100%;
		top: 0;
		right: 0;
		background: white;
		box-shadow: -2px 0 10px hsla(0, 0%, 0%, 0.5);
		z-index: 1;
	}
	.recho .mask {
		position: absolute;
		z-index: -10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: hsla(0, 0%, 0%, 0.2);
	}
	</style>
