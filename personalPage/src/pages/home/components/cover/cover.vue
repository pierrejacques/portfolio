<template>
  <div class="cover">
		<section class="cover-section screen-box">
			<h-fullwidth class="big-title" content="PORTFOLIO"></h-fullwidth>
			<h2 v-if="isEnglish" class="name-title">Jin</br>Chenhao</h2>
			<h2 v-else class="name-title">金辰浩</h2>
      <div class="select-lang">
        <a @click.prevent = "routeZh()" href="#">中文</a>
        |
        <a @click.prevent = "routeEn()" href="#">English</a>
      </div>
			<div class="contact-list">
				<a target="_blank" href="https://github.com/pierrejacques"><i class="iconfont icon-github"></i> Github</a>
				<a target="_blank" href="mailto:pierrejacques@126.com"><i class="iconfont icon-email"></i> Email</a>
			</div>
			<ul class="menu">
				<li v-for="item in menuList" :href="item.url" scroll-fire>
					{{item.name}}
				</li>
				<li @click="routeResume">
					resume
				</li>
			</ul>
			<div class=btn-down href="#product" scroll-fire></div>
    </section>
    <div class="slider">
			<div class="slider-img" id="slider1"></div>
			<div class="slider-img" id="slider2"></div>
		</div>
		<div class="slider-ctrl">
			<div v-for="(ctrl, idx) in data.srcs" :class="{active: isActive(idx)}" class="ctrl-unit" @click="toSelect(idx)"></div>
		</div>
  </div>
</template>

<script>
import slider from './components/slider'
import hFullwidth from './components/h-fullwidth'
import Router from 'vue-router'
import $ from 'jquery'
import api from '@/common/api'

const doomyImg = new Image
const $imgs = {} // 用于存放两张交替显示的背景图片

export default {
  name: 'cover',
	props: ['menuList'],
  components: {
    hFullwidth,
  },
  data() {
    return {
			currentActive: undefined,
      timer: undefined,
      data: {
        length: 0,
        isLoaded: [], // 判断一个位置是否已经被一部替换
        srcs: [], // img读取src的地方
        imgUrls: [], // 暂存待加载的图片地址
      },
      nowShow: true,
    }
  },
  methods: {
    routeEn() {
      if (!this.isEnglish) {
        this.$router.push({ name: 'homeEn' })
      }
    },
    routeZh() {
      if (this.isEnglish) {
        this.$router.push({ name: 'homeZh' })
      }
    },
    routeResume() {
      this.isEnglish ? this.$router.push({ name: 'resumeEn' }) : this.$router.push({ name: 'resumeZh' })
    },
		isActive(idx) {
      return idx === this.currentActive;
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
  computed: {
    isEnglish() {
      return this.$store.state.isEnglish
    },
  },
	created() {
    api.getJSON('cover')
    .then(
      data => {
        const root = '../../../../../../static/data/cover/'
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
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  mounted() {
    $imgs[0] = $('#slider1')
    $imgs[1] = $('#slider2')
  },
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
/* common style for this page */
a {
  color: white;
}
.cover-section {
  display: grid;
  display: -ms-grid;
  grid-template-columns: 3fr 4fr 3fr;
  grid-template-rows: 35% 20% auto 50px;
  grid-template-areas: "contact . lang"
    "portfolio portfolio portfolio"
    "name . menu"
    ". . menu";
	-ms-grid-columns: 3fr 4fr 3fr;
  -ms-grid-rows: 35% 20% auto 50px;
	position: relative;
  background: rgba(0,0,0,0.2);
  padding: 30px 60px;
  color: white;
}
.big-title {
  grid-area: portfolio;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  -ms-grid-row: 2;
  font-size: 30px;
  vertical-align: bottom;
  font-weight: lighter;
  text-align: justify;
  width: 100%;
}
.name-title {
  grid-area: name;
  -ms-grid-column: 1;
  -ms-grid-row: 3;
  font-size: 20px;
  text-align: left;
  font-weight: lighter;
}
.select-lang {
  position: relative;
  grid-area: lang;
  -ms-grid-column: 3;
  -ms-grid-row: 1;
  font-size: 12px;
  font-weight: lighter;
  text-align: right;
  width: calc( 100% + 30px );
}
.contact-list {
  grid-area: contact;
  -ms-grid-column: 1;
  -ms-grid-row: 1;
  font-size: 12px;
  font-weight: lighter;
  text-align: left;
  text-indent: -30px;
}
	.contact-list a {
		margin: 10px;
	}
.menu {
  grid-area: menu;
  -ms-grid-column: 3;
  -ms-grid-row-span: 2;
  -ms-grid-row: 3;
  font-weight: lighter;
  list-style: none;
  line-height: 1.8em;
  font-size: 18px;
  cursor: pointer;
}
.menu > li {
  position: relative;
  left: 0;
  transition: 0.3s;
  text-indent: -1em;
}
.menu > li:hover {
  left: -10px;
  opacity: 1;
}
.menu > li::before {
  content: '-   ';
  white-space: pre;
  font-size: 0.7em;
}
.btn-down {
  position: absolute;
	bottom: 30px; left: 50%;
  transform: scale(2, 1.2);
  text-align: center;
  cursor: pointer;
}
.btn-down::before {
  position: absolute;
  display: inline-block;
  content: '';
  bottom: 0;
  width: 20px;
  height: 20px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  transform: rotate(45deg);
  transition: 0.3s;
  opacity: 0.5;
}
.btn-down:hover::before {
  bottom: -5px;
  opacity: 0.9;
}
/* stretch */
.name-title, .menu {
  transform-origin: left;
}
/* opacity reduction */
.menu > li {
  opacity: 0.8;
}
.contact-list, .select-lang {
  opacity: 0.7;
}
/* text-shadow */
.big-title,
.menu > li:hover {
  text-shadow: 1px 0 0 black;
}

/* slider */
.slider {
  position: absolute;
  top: 1.5vw;
  left: 1.5vw;
  right: 1.5vw;
  bottom: 1.5vw;
  z-index: -1;
}
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
.slider-ctrl {
  z-index: 1;
  position: absolute;
  bottom: calc(1.5vw + 30px);
  left: calc(1.5vw + 60px);
}
.ctrl-unit {
  display: inline-block;
  margin: 3.5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  opacity: 0.3;
  transition: 0.3s;
}
.ctrl-unit.active {
  opacity: 0.7;
}

/* 小屏 */
@media screen and (max-width: 768px) {
  .cover-section {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 25% 10% 13% auto 30px;
    grid-template-areas: "contact lang"
      "portfolio portfolio"
      "name name"
      "menu menu"
      ". .";
		-ms-grid-columns: 1fr 1fr;
    -ms-grid-rows: 25% 10% 13% auto 30px;
    -ms-grid-areas: "contact lang"
      "portfolio portfolio"
      "name name"
      "menu menu"
      ". .";
  }
  .slider {
    /* display: none; */
  }
  .name-title {
    font-size: 16px;
  }
	.menu {
    padding-left: 20px;
  }
}

/* 大屏 */
@media screen and (min-width: 1440px) {
	.big-title {
		font-size: 35px;
		text-shadow: none;
	}
	.name-title {
		font-size: 30px;
		text-shadow: none;
	}
	.menu {
		font-size: 20px;
	}
}
</style>
