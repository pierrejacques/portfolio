<template lang="html">
  <div class="recho">
    <img class="recho-logo" src="/static/recho/logo.svg">
    <div class="iphone-7">
      <div class="iphone-toolbar">
        <img src="/static/recho/head-bar.svg">
      </div>
      <div class="phone-box">
				<main>
					<router-view></router-view>
				</main>
        <button v-if="isMenuAvailable" class="btn-menu iconfont icon-menu" @click="toShowMenu"></button>
        <aside v-if="isMenuAvailable" class="menu" :class="{'shown': isMenuShow}">
          <recho-menu @close="toCloseMenu"></recho-menu>
        </aside>
        <div :class="{shown: isMenuShow}" class="mask" @click="toCloseMenu">
        </div>
			</div>
    </div>
  </div>
</template>

<script>
import rechoMenu from './components/recho-menu'
export default {
  name: 'recho',
  created() {
    document.title = "Recho demo"
  },
  components: {
    rechoMenu,
  },
  data() {
    return {
      isMenuShow: false,
    }
  },
  computed: {
    isMenuAvailable() {
      return this.$store.state.isRechoMenuAvailable
    },
  },
  methods: {
    toCloseMenu() {
      this.isMenuShow = false
    },
    toShowMenu() {
      this.isMenuShow = true
    }
  },
}
</script>

<style lang="css">
  .recho {
    text-align: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, white 47%, #eee 0);
  }
	.recho * {
		font-family: 'DINCondensedC';
	}
  .recho-logo {
    position: absolute;
    top: 50%; left: 20%;
    transform: translate(-40%, -50%);
  }
  .iphone-7 {
    position: absolute;
    left: 55%; top: 0;
    transform: translate(-50%, 0);
    width: 375px;
    height: 667px;
    margin: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 10px hsla(0, 0%, 0%, 0.4);
  }
  .iphone-toolbar {
    position: relative;
    z-index: 10;
    top:0;
    width: 100%;
    height: 22px;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
	.phone-box {
		position: relative;
		height: calc(100% - 22px);
    background: white;
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
		width: 234px;
		height: 100%;
		top: 0;
		right: -100%;
		background: white;
		box-shadow: -2px 0 10px hsla(0, 0%, 0%, 0.5);
		z-index: 1;
    transition: right 0.4s;
	}
  .recho .menu.shown {
    right: 0;
  }
  .recho .btn-menu {
    position: absolute;
    color: white;
    right: 12px;
    top: 12px;
    font-size: 24px;
    z-index: 1;
  }
	.recho .mask {
		position: absolute;
		z-index: -10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
    transition: background 0.3s;
    background: hsla(0, 0%, 0% ,0);
    pointer-events: none;
  }
  .recho .mask.shown {
    background: hsla(0, 0%, 0% ,0.2);
    pointer-events: all;
  }
  .recho .btn-rect {
    box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.25);
    font-size: 24px;
    line-height: 50px;
    height: 50px;
    background: white;
  }
  .recho .btn-rect:not(.btn-highlight) {
    border: 1px solid #eee;
  }
  .recho .btn-rect.btn-highlight {
    background: #F7624F;
  }

  /* more specific */
  .recho .stage-hint {
    font-size: 20px;
  }
  .recho .stage-hint > .icon-arrow {
    display: inline-block;
    transform: scale(0.5) translate(-5px, 0);
    vertical-align: 1px;
  }
  .recho .persona-oval {
    border-radius: 50%;
    box-shadow: 0 5px 5px rgba(62, 94, 89, 0.4);
    background: linear-gradient(120deg, #6F5F8E 65%, #6E5A7E 0);
  }
	</style>
