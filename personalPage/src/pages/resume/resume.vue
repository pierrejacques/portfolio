<template lang="html">
	<div class="wrapper">
		<div class="slider-img" id="slider1"></div>
		<div class="slider-img" id="slider2"></div>
		<div class="resume" id="resume" v-if="balls.length">
			<wide-content v-if="isWide" :balls="balls" :content="content"></wide-content>
			<narrow-content v-else :balls="balls" :content="content"></narrow-content>
			<div class="select-lang">
				<a href="#" @click.prevent="routeZh()">中文</a>
				|
				<a href="#" @click.prevent="routeEn()">English</a>
			</div>
			<div class="functional">
				<a class="page-url iconfont icon-download" title="download pdf" href="#" @click.prevent="download()"></a>
				<a class="page-url iconfont icon-routo" title="to portfolio" href="#" @click.prevent="routeHome()"></a>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import api from '@/common/api'
import wideContent from './components/wide-content'
import narrowContent from './components/narrow-content'

// 背景变色相关
let timer
let nowShow = true
let srcs = []
const $imgs = {} // 用于存放两张交替显示的背景图片
// 屏幕宽度监听
const thres = 950

export default {
  name: 'Resume',
	components: {
		wideContent,
		narrowContent,
	},
  data() {
    return {
      balls: [],
      content: {},
			isWide: $(window).width() >= thres,
    }
  },
  created() {
		$(window).on('resize', () => {
			this.isWide = $(window).width() >= thres
		})
    api.getJSON('resume', this.isEnglish)
    .then(data => {
      if (data.catalog) {
        this.balls = data.catalog
        this.content = data.content
      }
    })
  },
	mounted() {
    $imgs[0] = $('#slider1')
    $imgs[1] = $('#slider2')
		api.getJSON('cover')
    .then(
      data => {
        const root = '../../../../static/data/cover/'
        srcs = data.alter
        this.toSelect(0)
      },
      () => {}
    )
  },
	computed: {
		isEnglish() {
			return this.$store.state.isEnglish
		},
	},
  methods: {
		download() {
			window.open(this.isEnglish ?
				'/static/data/resume/Jin_Chenhao_Resume.pdf'
				: '/static/data/resume/金辰浩简历.pdf')
		},
		routeHome() {
			this.isEnglish ? this.$router.push({ name: 'homeEn' }) : this.$router.push({ name: 'homeZh' })
		},
		routeZh() {
			if (this.isEnglish) {
				this.$router.push({ name: 'resumeZh' })
			}
		},
		routeEn() {
			if (!this.isEnglish) {
				this.$router.push({ name: 'resumeEn' })
			}
		},
		toSelect(idx) { // 变色的函数
			clearTimeout(timer)
			timer = setTimeout(() => {
				this.toSelect(idx < srcs.length - 1 ? idx + 1 : 0)
			}, 3000);
			$imgs[Number(nowShow)].css('background-image', srcs[idx]).addClass('show')
			$imgs[Number(!nowShow)].removeClass('show')
			nowShow = !nowShow
    },
  },
}
</script>

<style lang="css" scoped>
* {
  font-weight: lighter;
}
.wrapper {
	position: relative;
	background: rgba(255, 255, 255, 0.4);
	min-height: 700px;
	overflow: hidden;
}
.resume {
  position: relative;
  overflow: hidden;
 	max-width: 1280px;
	width: 100vw;
	margin: auto;
	background: rgba(255, 255, 255, 0.1);
	box-shadow: 0 0 20px rgba(50, 50, 50, 0.3);
}
.select-lang {
  z-index: 10;
  position: absolute;
  font-size: 12px;
  top: 10px;
  right: 20px;
}

/* functional */
.functional {
	z-index: 2;
	position: fixed;
	bottom: 30px;
	right: 30px;
}
.page-url {
	position: relative;
  line-height: 25px;
  width: 25px;
  padding: 10px;
	font-size: 15px;
	margin-left: 7px;
	opacity: 0.8;
}
.page-url:hover {
	opacity: 1;
}
.icon-download {
	background: black;
	color: white;
}

/* 背景色 */
.slider-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
	bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  transition: opacity 3s;
  opacity: 0;
}
.slider-img.show {
  opacity: 1;
}

</style>
