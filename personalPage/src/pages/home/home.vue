<template>
  <div class=home>
		<main>
			<cover></cover>
			<show-works title="sketch / modeling / product" flag="product" id="product"></show-works>
			<show-works title="UI / front-end / graphic" flag="ui" id="ui"></show-works>
			<show-works title="photography" flag="photo" id="photo"></show-works>
			<show-works title="musical / audio works" flag="music" id="music"></show-works>
			<show-works title="aesthetics research" flag="research" id="research"></show-works>
			<show-works title="resume" flag="resume" id="resume"></show-works>
		</main>
		<menu-list class="menu-list" :class="{hide: isHide}"></menu-list>
  </div>
</template>

<script>
import $ from 'jquery'
import menuList from './components/menu-list'
import cover from './components/cover/cover'
import showWorks from './components/show-works/show-works'
export default {
  name: 'home',
  data () {
    return {
      isHide: true,
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
		$(document).ready(() => {
			const scrollTo = targetY => {
        $('html, body').stop().animate({
          scrollTop: targetY - 20
        }, 500)
      }
			$(window).scroll((event) => {
				this.isHide = $(window).scrollTop() < 0.75 * $(window).height()
			})
      $('[scroll-fire]').on('click', (e) => {
        e.preventDefault();
        const targetId = $(e.target).attr('href')
        const targetY = $(targetId).offset().top
        scrollTo(targetY)
      })
    })
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
	.menu-list.hide {
		right: -300px;
	}
</style>
