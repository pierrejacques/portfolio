<template lang="html">
		<div class="wide-content">
			<div class="horiz-scroll" id="test">
				<div class="ball ball-3d" v-for="(ball, idx) in balls"
						 :class="{'active': idx === currentActive}"
						 @click="toSelectBall(idx)"
						 :data-key="ball.text"
				>
					<img v-if="ball.img && idx === currentActive" :src="ball.img">
					<i v-if="ball.icon && idx === currentActive" :class="ball.icon" class="iconfont icon"></i>
				</div>
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
						<h6 class="content-title">{{isEnglish ? 'note' : '自述'}}</h6>
						<p class="note" v-html="content.design.note"></p>
					</div>
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'softwares' : '熟悉软件'}}</h6>
						<div class="design-soft" v-for="item in content.design.softs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
				</section>
				<section class="programming" v-if="balls[currentActive].key === 'programming'">
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'note' : '自述'}}</h6>
						<p class="note" v-html="content.programming.note"></p>
					</div>
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'languages': '熟悉语言'}}</h6>
						<div class="prog-langs" v-for="item in content.programming.langs">
							<i :class="item.icon" class="iconfont" :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'frameworks' : '熟悉框架'}}</h6>
						<div class="prog-tools" v-for="item in content.programming.tools">
							<i :class="item.icon" class="iconfont"  :style="`color:${item.color}`"></i><br/>{{item.name}}
						</div>
					</div>
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'projects' : '项目经历'}}</h6>
						<div class="prog-projects" v-for="item in content.programming.projects">
							{{item.name}} <span class="text-align-right">{{item.note}}</span>
						</div>
					</div>
				</section>
				<section class="research" v-if="balls[currentActive].key === 'research'">
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'note' : '自述'}}</h6>
						<p class="note" v-html="content.research.note"></p>
					</div>
					<dl class="content-box">
						<h6 class="content-title">{{isEnglish ? 'projects' : '项目'}}</h6>
						<div v-for="item in content.research.projects">
							<dt>{{item.name}}</dt><dd>{{item.note}}</dd>
						</div>
					</dl>
				</section>
			</div>
		</div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import scrollCatcher from '@/common/utils/scrollCatcher'

let $firstBall

export default {
  name: 'wideContent',
  data() {
    return {
      currentActive: 0
    }
  },
  props: [
    'balls',
    'content',
  ],
  computed: {
    isEnglish() {
      return this.$store.state.isEnglish
    },
  },
  created() {
    $(document).ready(() => {
      $firstBall = $('.ball').eq(0)
    })
    scrollCatcher(delta => {
      this.toSelectBall(this.currentActive - delta)
    })
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
  },
}
</script>

<style lang="css" scoped>
* {
  font-weight: lighter;
}
.wide-content {
  display: flex;
  position: relative;
  wide: 100%;
  height: 100vh;
}
.wide-content::before, .wide-content::after {
  pointer-events: none;
  position: absolute;
  z-index: 1;
  content: '';
  width: 100vw;
  height: 40vh;
  left: 0;
}
.wide-content::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), transparent);
}
.wide-content::after {
  bottom: 0;
  background: linear-gradient(to top,rgba(255, 255, 255, 0.75), transparent);
}
/* 滚动区域 */
.horiz-scroll {
	width: 360px;
	height: 100%;
  position: relative;
  padding-left: 7%;
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
  background: rgba(255, 255, 255, 0.6);
  /* filter: blur(3px); */
  opacity: 0.7;
  cursor: pointer;
}
.ball.active {
	transform: scale(1.5);
	opacity: 1;
	margin: 55px 0;
	background: rgba(255, 255, 255, 0.4);
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

.ball:not(.active):hover::before {
  opacity: 1;
	transform: scale(1.5);
}
.ball.active::before, .ball.active:hover::before {
	opacity: 1;
  left: 35px;
	transform: scale(0.3);
}
.ball:first-of-type, .ball.active:first-of-type {
  margin-top: -40px;
}
.ball img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	margin: auto;
	opacity: 0.9;
	filter: hue-rotate(-10deg);
}
.ball .icon {
	position: absolute;
	display: inline-block;
	width: 100%; line-height: 80px;
	text-align: center;
	z-index: 10;
	font-size: 12px;
	opacity: 0.5;
}

/* 内容 */
.resume-detail {
	flex-grow: 1;
	height: 100%;
	position: relative;
	z-index: 2;
	padding-top: 45vh;
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
	padding: 15px 30px 13px 80px;
	margin: 10px 0 0 0px;
	/* border: 1px solid black; */
	box-shadow: 2px 1px 5px rgba(58, 67, 88, 0.1);
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
	line-height: 1.6em;
	margin: -5px 0 5px 15px;
}
/* dl dt dd */
dl {
		margin-left: 4%;
}
dl > div {
  width: 100%;
  height: 36px;
}
dd, dt {
  margin: 0;
  box-sizing: border-box;
  display: inline-block;
	white-space: nowrap;
}
dt {
  padding-right: 17px;
  width: 25%;
	white-space: nowrap;
}
dd {
  padding-left: 20px;
  width: 70%;
}

/* 专项的规定 */
.basic dl {
	margin-left: 10%;
}
.basic dt {
  width: 50px;
}
.prog-projects {
	padding-left: 20px;
	height: 32px;
}
.design-soft, .prog-langs, .prog-tools {
	display: inline-block;
	width: 70px;
	margin: 5px;
	text-align: center;
	line-height: 25px;
	font-size: 12px;
}

</style>
