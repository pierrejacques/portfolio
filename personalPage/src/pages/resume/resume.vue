<template lang="html">
  <div class="resume" id="resume" v-if="balls.length">
    <div class="horiz-scroll" id="test">
      <div class="ball" v-for="(ball, idx) in balls"
           :class="{'active': idx === currentActive}"
           @click="toSelectBall(idx)"
           :data-key="ball.text"
      ></div>
      <h3 class="ball-note">{{balls[currentActive].text}}</h3>
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
        <div class="design-soft" v-for="item in content.design.softs">
          <img :src="item.icon">
          <i>{{item.name}}</i>
        </div>
        <p>{{content.design.note}}</p>
      </section>
      <section class="programming" v-if="balls[currentActive].key === 'programming'">
        <p>{{content.programming.note}}
        <h6>熟悉语言</h6>
        <div class="prog-langs" v-for="item in content.programming.langs">
          <img :src="item.icon">
          <i>{{item.name}}</i>
        </div>
        <h6>熟悉工具/框架</h6>
        <div class="prog-tools" v-for="item in content.programming.tools">
          <img :src="item.icon">
          <i>{{item.name}}</i>
        </div>
        <h6>项目经历</h6>
        <dl>
          <div class="prog-projects" v-for="item in content.programming.projects">
            <dt>{{item.name}}</dt>
            <dd>{{item.note}}</dd>
          </div>
        </dl>
      </section>
      <section class="research" v-if="balls[currentActive].key === 'research'">
        <p>{{content.research.note}}</p>
        <h6>研究项目</h6>
        <dl>
          <div v-for="item in content.research.projects">
            <dt>{{item.name}}</dt><dd>{{item.note}}</dd>
          </div>
        </dl>
      </section>
<!--       <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="10" rx="20" ry="20" width="150" height="100"
  style="fill:red;stroke:black;stroke-width:5;fill-opacity:0.5"/>
</svg> -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import scrollCatcher from '@/common/utils/scrollCatcher'
import api from '@/common/api'

let firstBall

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
          firstBall = $('.ball').eq(0)
        })
        scrollCatcher(delta => {
          this.toSelectBall(this.currentActive + delta)
        })
      }
    })
  },
  methods: {
    isValid(idx) {
      return idx >= 0 && idx < this.balls.length
    },
    toSelectBall(idx) {
      if (this.isValid(idx)) {
        this.currentActive = idx
        let marginLeft
        const width = parseInt(firstBall.css('width'))
        const sMargin = 30
        const bMargin = 55
        if (this.currentActive === 0) {
          marginLeft = width / 2
        } else {
          marginLeft = this.currentActive*width
            + sMargin*2*(this.currentActive - 1)
            + sMargin + bMargin + width/2
        }
        firstBall.css('margin-left', `-${marginLeft}px`)
      }
    },
    format(stamp) {
      return moment(parseInt(stamp)).format('YYYY.MM')
    }
  },
}
</script>

<style lang="css">
.resume {
  overflow: hidden;
  width: 100vw;
  scroll-behavior: smooth;
  font-family:'msyhlc4dfe54171858c';
}
.horiz-scroll {
  margin-top: calc(50px + 10vh);
  height: 180px;
  width: 10000px;
  padding-left: 50vw;
}
.ball {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 30px;
  transition: 0.2s;
  transform: scale(0.2);
  background-image: linear-gradient(to bottom left, #FF8DBC, #FFF8D9);
  /* filter: blur(3px); */
  opacity: 0.7;
  cursor: pointer;
}
.ball::before { /* TODO: 悬浮提示 */
  content: attr(data-key);
  position: absolute;
  z-index: 1;
  color: black;
  top: 130px;
  left: -60px;
  font-size: 2em;
  text-align: center;
  width: 200px;
  opacity: 0;
}
.ball:not(.active):hover {
  transform: scale(0.3);
}
.ball:not(.active):hover::before {
  opacity: 1;
}
.ball-note {
  position: relative;
  top: 20px;
  width: 80px;
  line-height: 2em;
  text-align: center;
  border-bottom: 1px solid gray;
}
.ball:first-of-type, .ball.active:first-of-type, .ball-note {
  margin-left: -40px;
}
.ball.active {
  transform: scale(1.5);
  opacity: 1;
  margin: 0 55px;
/*   filter: blur(0); */
}
/* 内容 */ /* TODO: 排版显示 */
* {
  font-weight: lighter;
}
.resume-detail {
  width: 800px;
  margin: auto;
}
dl > div {
  width: 100%;
  height: 28px;
}
dd, dt {
  margin: 0;
  box-sizing: border-box;
  display: inline-block;
}
dt {
  padding-right: 17px;
  text-align: right;
  width: 40%;
}
dd {
  padding-left: 20px;
  width: 57%;
}
.basic dt, .basic dd {
  width: 49%;
}
</style>
