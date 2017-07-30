<template>
  <div class=home>
		<main>
		  <cover :menu-list="menuList"></cover>
		  <!-- <show-works title="sketch / modeling / product" flag="product" id="product"></show-works> -->
		  <show-works title="UI / front-end / graphic" flag="ui" id="ui"></show-works>
		  <!-- <show-works title="photography" flag="photo" id="photo"></show-works> -->
		  <!-- <show-works title="musical / audio works" flag="music" id="music"></show-works> -->
		  <!-- <show-works title="aesthetics research" flag="research" id="research"></show-works> -->
		  <!-- <show-works title="resume" flag="resume" id="resume"></show-works> -->
		</main>
		<menu-list :list="menuList" class="menu-list" :class="{hide: isMenuHide}"></menu-list>
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
  },
  components: {
		menuList,
    cover,
    showWorks,
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
          this.isMenuHide = $(window).scrollTop() < 0.75 * $(window).height()
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
</style>
