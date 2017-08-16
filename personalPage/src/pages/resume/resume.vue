<template lang="html">
	<div class="wrapper">
		<div class="slider-img" id="slider1"></div>
		<div class="slider-img" id="slider2"></div>
		<div class="resume" id="resume" v-if="balls.length">
<!--
			<div class="select-lang">
				<a>中文</a>
				|
				<a>English</a>
			</div>
-->
			<div class="horiz-scroll" id="test">
				<div class="ball ball-3d" v-for="(ball, idx) in balls"
						 :class="{'active': idx === currentActive}"
						 @click="toSelectBall(idx)"
						 :data-key="ball.text"
				></div>
			</div>
			<div class="resume-detail">
				<section class="basic" v-if="balls[currentActive].key === 'basic'">
					<dl class="">
						<div v-for="item in content.basic">
							<dt>{{item.item}}</dt>
							<dd>{{item.text}}</dd>
						</div>
					</dl>
				</section>
				<section class="edu" v-if="balls[currentActive].key === 'edu'">
					<dl>
						<div v-for="item in content.edu">
							<dt>{{format(item.from)}} - {{format(item.to)}}</dt>
							<dd>{{item.at}}</dd>
						</div>
					</dl>
				</section>
				<section class="leader" v-if="balls[currentActive].key === 'leader'">
					<dl>
						<div v-for="item in content.leader">
							<dt>{{format(item.from)}}
								<span v-show="item.to">- {{format(item.to)}}</span>
								</dt>
							<dd><span v-if="item.at">{{item.at}} · </span>{{item.as}}</dd>
						</div>
					</dl>
				</section>
				<section class="intern" v-if="balls[currentActive].key === 'intern'">
					<dl>
						<div v-for="item in content.intern">
							<dt>{{format(item.from)}} - {{format(item.to)}}
							</dt>
							<dd>{{item.at}} · {{item.as}}</dd>
						</div>
					</dl>
				</section>
				<section class="perform" v-if="balls[currentActive].key === 'perform'">
					<dl>
						<div v-for="item in content.perform">
							<dt>{{format(item.from)}}
								<span v-if="item.to"> - {{format(item.to)}}</span>
							</dt>
							<dd>{{item.at}} · {{item.as}}</dd>
						</div>
					</dl>
				</section>
				<section class="design" v-if="balls[currentActive].key === 'design'">
					<div class="content-box">
						<h6 class="content-title">自述</h6>
						<p class="note" v-html="content.design.note"></p>
					</div>
					<div class="content-box">
						<h6 class="content-title">熟悉软件</h6>
						<div class="design-soft" v-for="item in content.design.softs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
				</section>
				<section class="programming" v-if="balls[currentActive].key === 'programming'">
					<div class="content-box">
						<h6 class="content-title">自述</h6>
						<p class="note" v-html="content.programming.note"></p>
					</div>
					<div class="content-box">
						<h6 class="content-title">熟悉语言</h6>
						<div class="prog-langs" v-for="item in content.programming.langs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<h6 class="content-title">熟悉框架</h6>
						<div class="prog-tools" v-for="item in content.programming.tools">
							<i :class="item.icon" class="iconfont"  :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<h6 class="content-title">项目经历</h6>
						<div class="prog-projects" v-for="item in content.programming.projects">
							{{item.name}} <span class="text-align-right">{{item.note}}</span>
						</div>
					</div>
				</section>
				<section class="research" v-if="balls[currentActive].key === 'research'">
					<div class="content-box">
						<h6 class="content-title">自述</h6>
						<p class="note" v-html="content.research.note"></p>
					</div>
					<dl class="content-box">
						<h6 class="content-title">项目</h6>
						<div v-for="item in content.research.projects">
							<dt>{{item.name}}</dt><dd>{{item.note}}</dd>
						</div>
					</dl>
				</section>
			</div>
			<a class="page-url iconfont icon-routo" href="../"></a>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import scrollCatcher from '@/common/utils/scrollCatcher'
import api from '@/common/api'

let $firstBall
let timer
let nowShow = true
let srcs = []
const doomyImg = new Image
const $imgs = {} // 用于存放两张交替显示的背景图片

export default {
  name: 'Resume',
  data() {
    return {
      currentActive: 0,
      balls: [],
      content: {},
    }
  },
  created() {
    api.getJSON('resume')
    .then(data => {
      if (data.catalog) {
        this.balls = data.catalog
        this.content = data.content
        $(document).ready(() => {
          $firstBall = $('.ball').eq(0)
        })
        scrollCatcher(delta => {
          this.toSelectBall(this.currentActive - delta)
        })
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
  methods: {
    isValid(idx) {
      return idx >= 0 && idx < this.balls.length
    },
    toSelectBall(idx) {
      if (this.isValid(idx)) {
        this.currentActive = idx
        let marginTop
        const width = parseInt($firstBall.css('width'))
        const sMargin = 15
        const bMargin = 40
        if (this.currentActive === 0) {
          marginTop = width / 2
        } else {
          marginTop = this.currentActive*width
            + sMargin*2*(this.currentActive - 1)
            + sMargin + bMargin + width/2
        }
        $firstBall.css('margin-top', `-${marginTop}px`)
      }
    },
    format(stamp) {
      return moment(parseInt(stamp)).format('YYYY.MM')
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

<style lang="css">
.wrapper {
	background: #eee;
	background: rgba(255, 255, 255, 0.6);
}
.resume {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 150px;
  position: relative;
  overflow: hidden;
 	width: 1300px;
	height: 100vh;
	margin: auto;
	background: rgba(255, 255, 255, 0.1);
	box-shadow: 0 0 20px rgba(50, 50, 50, 0.3);
}
.resume::before, .resume::after {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  content: '';
  width: 100vw;
  height: 40vh;
  left: 0;
}
.resume::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), transparent);
}
.resume::after {
  bottom: 0;
  background: linear-gradient(to top,rgba(255, 255, 255, 0.75), transparent);
}
.select-lang {
  z-index: 10;
  position: absolute;
  font-size: 12px;
  top: 10px;
  right: 20px;
}

/* 滚动区域 */
.horiz-scroll {
  position: relative;
  margin-left: 6vw;
  height: 100vh;
  padding-top: 45vh; /* 中线位置 */
}
.ball {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 30px 0;
  transition: 0.25s;
  transform: scale(0.2);
  background-image: linear-gradient(to bottom left, #FF8DBC, #FFF8D9);
  /* filter: blur(3px); */
  opacity: 0.7;
  cursor: pointer;
}
.ball.active {
	transform: scale(1.5);
	opacity: 1;
	margin: 55px 0;
	/*   filter: blur(0); */
}
.ball:not(.active):hover {
	transform: scale(0.3);
}
.ball::before {
  content: attr(data-key);
  position: absolute;
  z-index: 1;
  color: black;
  top: 5px;
  left: 200px;
  font-size: 3em;
  text-align: left;
  width: 200px;
  opacity: 0;
	transform: scale(0.3);
}

.ball:not(.active):hover::before, .ball.active::before {
  opacity: 1;
	transform: scale(1.5);
}
.ball.active::before {
  left: 30px;
	transform: scale(0.3);
}
.ball:first-of-type, .ball.active:first-of-type {
  margin-top: -40px;
}

/* 内容 */ /* TODO: 排版显示 */
* {
  font-weight: lighter;
}
.resume-detail {
	position: relative;
	z-index: 2;
	padding-top: 45vh; /* 中线位置 */
	padding-right: 5vw;
	font-size: 15px;
}
.resume-detail section {
	transform: translate(0, -50%);
}
.text-align-right {
	float: right;
}
.iconfont {
	font-size: 24px;
	text-align: center;
}
	
	
.content-box {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	padding: 22px 30px 17px 80px;
	margin: 10px 0 0 0px;
	/* border: 1px solid black; */
	box-shadow: 3px 1px 5px #ccc;
	background: rgba(255, 255, 255, 0.35);
}
.content-title {
	display: inline-block;
	position: absolute;
	left: -10px;
	top: 10px;
	padding: 1px 5px;
	margin: 0;
	line-height: 18px;
	background: #444;
	color: white;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}
	
.note {
	line-height: 2em;
	margin: -5px 0 5px 15px;
}
/* dl dt dd */
dl {
		margin-left: 5vw;
	}
dl > div {
  width: 100%;
  height: 36px;
}
dd, dt {
  margin: 0;
  box-sizing: border-box;
  display: inline-block;
}
dt {
  padding-right: 17px;
  width: 25%;
}
dd {
  padding-left: 20px;
  width: 70%;
}

/* 专项的规定 */
.basic dt {
  width: 10%;
	margin-left: 10%;
}
.prog-projects {
	padding-left: 20px;
	height: 32px;
}
.design-soft, .prog-langs, .prog-tools {
	display: inline-block;
	width: 70px;
	margin: 10px 5px;
	text-align: center;
	line-height: 25px;
	font-size: 12px;
}

/* page-url */
.page-url {
	z-index: 2;
	bottom: 30px;
	right: 30px;
  line-height: 25px;
  width: 25px;
  padding: 10px;
	font-size: 15px;
}
/* ball-3d */
.ball-3d {
  position: relative;
	border-radius: 50%;
	background: radial-gradient(circle 141px at 21% 21%, #eee 0, #ddd 14%, #666 53%, #aaa 71%);
}

.ball-3d::after {
	content: '';
	z-index: -1;
	position: absolute;
	width: 60%;
	height: 20%;
	background: #151515;
	border-radius: 50%;
	bottom: -7px;
	right: 45%;
	transform: translate(50%, 0);
	filter: blur(10px);
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
  transition: 3s;
  opacity: 0;
}
.slider-img.show {
  opacity: 1;
}
</style>
