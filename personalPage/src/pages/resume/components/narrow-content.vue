<template lang="html">
		<div class="narrow-content">

        <ball :ball="balls[0]"></ball>
				<section class="basic">
					<dl class="">
						<div v-for="item in content.basic">
							<dt>{{item.item}}</dt>
							<dd>{{item.text}}</dd>
						</div>
					</dl>
				</section>

        <ball :ball="balls[1]"></ball>
				<section class="edu">
					<dl>
						<div v-for="item in content.edu">
							<dt>{{format(item.from)}} - {{format(item.to)}}</dt>
							<dd>{{item.at}}</dd>
						</div>
					</dl>
				</section>

        <ball :ball="balls[2]"></ball>
				<section class="leader">
					<dl>
						<div v-for="item in content.leader">
							<dt>{{format(item.from)}}
								<span v-show="item.to">- {{format(item.to)}}</span>
								</dt>
							<dd><span v-if="item.at">{{item.at}} · </span>{{item.as}}</dd>
						</div>
					</dl>
				</section>

        <ball :ball="balls[3]"></ball>
				<section class="intern">
					<dl>
						<div v-for="item in content.intern">
							<dt>{{format(item.from)}} - {{format(item.to)}}
							</dt>
							<dd>{{item.at}} · {{item.as}}</dd>
						</div>
					</dl>
				</section>

        <ball :ball="balls[4]"></ball>
				<section class="perform">
					<dl>
						<div v-for="item in content.perform">
							<dt>{{format(item.from)}}
								<span v-if="item.to"> - {{format(item.to)}}</span>
							</dt>
							<dd>{{item.at}} · {{item.as}}</dd>
						</div>
					</dl>
				</section>

        <ball :ball="balls[5]"></ball>
				<section class="design">
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

        <ball :ball="balls[6]"></ball>
				<section class="programming">
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

        <ball :ball="balls[7]"></ball>
				<section class="research">
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'note' : '自述'}}</h6>
						<p class="note" v-html="content.research.note"></p>
					</div>
					<div class="content-box">
						<h6 class="content-title">{{isEnglish ? 'projects' : '项目'}}</h6>
						<div class="research-projects" v-for="item in content.research.projects">
							{{item.name}}<span class="text-align-right">{{item.note}}</span>
						</div>
					</div>
				</section>
		</div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import ball from './ball'

export default {
  name: 'narrowContent',
  components: {
    ball,
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
  methods: {
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
.narrow-content {
  text-align: center;
  margin-bottom: 100px;
}

/* 内容 */
.text-align-right {
	float: right;
}
.iconfont {
	font-size: 24px;
	text-align: center;
}

.content-box {
  text-align: left;
	position: relative;
	box-sizing: border-box;
	width: calc(100% - 50px);
	padding: 15px 20px 13px 50px;
	margin: 10px 0 10px 30px;
	font-size: 12px;
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
  display: inline-block;
  text-align: left;
	font-size: 12px;
	margin: auto;
	overflow: auto;
}
dl > div {
	width: 100%;
  height: 32px;
}
dd, dt {
	vertical-align: top;
  margin: 0;
  box-sizing: border-box;
  display: inline-block;
}
dt {
  padding-right: 17px;
  width: 28%;
	white-space: nowrap;
}
dd {
  padding-left: 20px;
  width: 70%;
	white-space: nowrap;
}

/* 专项的规定 */
.basic dl {
	margin-left: 10%;
}
.basic dt {
  width: 50px;
}
.prog-projects, .research-projects {
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
