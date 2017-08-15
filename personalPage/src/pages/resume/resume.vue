<template lang="html">
  <div class="resume" id="resume" v-if="balls.length">
    <div class="select-lang">
      <a>中文</a>
      |
      <a>English</a>
    </div>
    <div class="horiz-scroll" id="test">
      <div class="ball" v-for="(ball, idx) in balls"
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
          this.toSelectBall(this.currentActive - delta)
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
        let marginTop
        const width = parseInt(firstBall.css('width'))
        const sMargin = 30
        const bMargin = 60
        if (this.currentActive === 0) {
          marginTop = width / 2
        } else {
          marginTop = this.currentActive*width
            + sMargin*2*(this.currentActive - 1)
            + sMargin + bMargin + width/2
        }
        firstBall.css('margin-top', `-${marginTop}px`)
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
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 150px;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  font-family:'msyhlc4dfe54171858c';
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
  top: 30px;
  right: 30px;
}



/* 滚动区域 */
.horiz-scroll {
  position: relative;
  margin-left: 10vw;
  height: 100vh;
  padding-top: 40vh;
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
  transform: scale(0.4);
  left: 50px;
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
}
.resume-detail section {

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
  width: 20%;
}
dd {
  padding-left: 20px;
  width: 70%;
}
.basic dt {
  width: 10%;
}
</style>
