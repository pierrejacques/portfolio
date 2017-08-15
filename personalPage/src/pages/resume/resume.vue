<template lang="html">
	<div class="wrapper">
		<div class="slider-img" id="slider1"></div>
		<div class="slider-img" id="slider2"></div>
		<div class="resume" id="resume" v-if="balls.length">
			<div class="select-lang">
				<a>中文</a>
				|
				<a>English</a>
			</div>
			<div class="horiz-scroll" id="test">
				<div class="ball ball-3d" v-for="(ball, idx) in balls"
						 :class="{'active': idx === currentActive}"
						 @click="toSelectBall(idx)"
						 :data-key="ball.text"
				></div>
			</div>
			<div class="resume-detail">
				<section class="basic" v-if="balls[currentActive].key === 'basic'">
					<dl>
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
					<div class="content-box">{{content.design.note}}</div>
					<div class="content-box">
						<div class="design-soft" v-for="item in content.design.softs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
				</section>
				<section class="programming" v-if="balls[currentActive].key === 'programming'">
					<div class="content-box">{{content.programming.note}}</div>
					<div class="content-box">
						<div class="prog-langs" v-for="item in content.programming.langs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<div class="prog-tools" v-for="item in content.programming.tools">
							<i :class="item.icon" class="iconfont"  :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<div class="prog-projects" v-for="item in content.programming.projects">
							{{item.name}} <span class="text-align-right">{{item.note}}</span>
						</div>
					</div>
				</section>
				<section class="research" v-if="balls[currentActive].key === 'research'">
					<div class="content-box">{{content.research.note}}</div>
					<dl class="content-box">
						<div v-for="item in content.research.projects">
							<dt>{{item.name}}</dt><dd>{{item.note}}</dd>
						</div>
					</dl>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import scrollCatcher from '@/common/utils/scrollCatcher'
import api from '@/common/api'

let $firstBall
const doomyImg = new Image
const $imgs = {} // 用于存放两张交替显示的背景图片

export default {
  name: 'Resume',
  data() {
    return {
      currentActive: 0,
      balls: [],
      content: {},
			length: 0,
			isLoaded: [], // 判断一个位置是否已经被一部替换
			srcs: [], // img读取src的地方
			imgUrls: [], // 暂存待加载的图片地址
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
		api.getJSON('cover')
    .then(
      data => {
        const root = '../../../../static/data/cover/'
        this.data.length = data.alter.length
        data.url.forEach(url => {
          this.data.imgUrls.push(`${root}${url}`)
        })
        this.data.srcs = data.alter
        this.toSelect(0)
        this.loadImgs(0)
      },
      () => {}
    )
  },
	mounted() {
    $imgs[0] = $('#slider1')
    $imgs[1] = $('#slider2')
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
		toSelect(idx) {
      if (!this.isActive(idx)) {
        this.currentActive = idx
        this.timeOut()
        $imgs[Number(this.nowShow)].css('background-image', this.data.srcs[idx]).addClass('show')
        $imgs[Number(!this.nowShow)].removeClass('show')
        this.nowShow = !this.nowShow
      }
    },
    next(idx) {
      return idx < this.data.length - 1 ? idx + 1 : 0
    },
    timeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.toSelect(this.next(this.currentActive))
      }, 3000);
    },
    loadImgs(idx) {
      if (idx < this.data.srcs.length) {
        doomyImg.src = this.data.imgUrls[idx]
        doomyImg.onload = () => {
          let srcIdx = this.next(this.currentActive)
          while (this.data.isLoaded[srcIdx]) { srcIdx = this.next(srcIdx) }
          this.data.srcs[srcIdx] = `url(${doomyImg.src})`
          this.data.isLoaded[srcIdx] = true
          this.loadImgs(idx + 1)
        }
      }
    }
  },
}
</script>

<style lang="css">
.wrapper {
	background: #eee;
}
.resume {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 150px;
  position: relative;
  overflow: hidden;
 	max-width: 1200px;
	margin: auto;
  height: 100vh;
	background: #fcfcfc;
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
  margin-left: 8vw;
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
.ball::before {
  content: attr(data-key);
  position: absolute;
  z-index: 1;
  color: black;
  top: 5px;
  left: 150px;
  font-size: 3em;
  text-align: left;
  width: 200px;
  opacity: 0;
}
.ball:not(.active):hover {
  transform: scale(0.3);
}
.ball:not(.active):hover::before, .ball.active::before {
  opacity: 1;
}
.ball.active::before {
  transform: scale(0.3);
  left: 30px;
}
.ball:first-of-type, .ball.active:first-of-type {
  margin-top: -40px;
}
.ball.active {
  transform: scale(1.5);
  opacity: 1;
  margin: 55px 0;
/*   filter: blur(0); */
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
	font-size: 14px;
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
	box-sizing: border-box;
	width: 100%;
	padding: 22px 50px 17px 80px;
	margin: 10px 0 0 0px;
	/* border: 1px solid black; */
	box-shadow: 0 3px 5px #ddd;
	background: white;
}
/* dl dt dd */
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
