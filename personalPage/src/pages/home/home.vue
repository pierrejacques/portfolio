<template>
  <div class=home>
		<main :class="{'blur': isBigViewOpen || isBlur}">
		  <cover :menu-list="menuList"></cover>
		   <show-works title="sketch / modeling / product" flag="product" id="product"></show-works>
		  <show-works title="UI / front-end / graphic" flag="ui" id="ui" direction="left"></show-works>
		  <show-works title="photography" flag="photo" id="photo"></show-works>
		  <!-- <show-works title="musical / audio works" flag="music" id="music"></show-works> -->
		  <!-- <show-works title="aesthetics research" flag="research" id="research"></show-works> -->
		  <!-- <show-works title="resume" flag="resume" id="resume"></show-works> -->
<!--       <resume></resume> -->
		</main>
    <div class="big-view" v-show="isBigViewOpen">
      <img class="big-img" :src="bigUrl" @click="toCloseBigView">
    </div>
		<menu-list :list="menuList" class="menu-list" :class="{hide: isMenuHide || isBigViewOpen}"></menu-list>
  </div>
</template>

<script>
import $ from 'jquery'
import api from '@/common/api'
import menuList from './components/menu-list'
import cover from './components/cover/cover'
import showWorks from './components/show-works/show-works'
export default {
  name: 'home',
  data () {
    return {
      isMenuHide: true,
			menuList: [],
    }
  },
  methods: {
    toCloseBigView() {
      this.$store.state.isBigViewOpen = false
    }
  },
  components: {
		menuList,
    cover,
    showWorks,
  },
  computed: {
    isBigViewOpen() {
      return this.$store.state.isBigViewOpen
    },
    bigUrl() {
      return this.$store.state.bigUrl
    },
		isBlur() {
			return this.$store.state.isBlur
		}
  },
  created() {
    const domOperations = () => {
      const scrollTo = targetY => {
        $('html, body').stop().animate({
          scrollTop: targetY - 20
        }, 500)
      }
      $(document).ready(() => {
        $(window).scroll((event) => {
          this.isMenuHide = $(window).scrollTop() < 0.9 * $(window).height()
        })
        $('[scroll-fire]').on('click', (e) => {
          e.preventDefault();
          const targetId = $(e.target).attr('href')
          const targetY = $(targetId).offset().top
          scrollTo(targetY)
        })
      })
    }
    domOperations()
    api.getMenu().then(data => {
      this.menuList = data
    })
  },
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
	.menu-list.hide {
		right: -300px;
	}
	main{
		transition: 0.5s;
		filter: blur(0);
	}
  main.blur {
    filter: blur(10px);
  }
  .big-view {
    display: flex;
    position: fixed;
    left: 0; top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }
  .big-img {
    max-width: 90%;
    max-height: 90%;
    margin: auto;
    pointer-events: all;
    cursor: zoom-out;
    box-shadow: 0 5px 10px gray;
  }
</style>
