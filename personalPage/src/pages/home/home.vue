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
			<a v-if="pageUrl" class="page-url iconfont icon-routo" target="_blank" :href="pageUrl"></a>
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
		},
		pageUrl() {
			return this.$store.state.pageUrl
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
		transition: 0.2s;
		filter: blur(0);
	}
  main.blur {
    filter: blur(10px);
    /* TODO：打开的时候要屏蔽 */
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
  .page-url {
  	display: inline-block;
  	position: absolute;
  	z-index: 1;
  	bottom: 50px;
  	right: 50px;
    line-height: 30px;
    width: 30px;
    padding: 15px;
    border-radius: 50%;
  	font-weight: normal;
    font-size: 1.5em;
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
