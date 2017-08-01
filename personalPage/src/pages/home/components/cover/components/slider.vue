<template>
  <div class="slider">
    <div class="slider-ctrl">
      <div v-for="(ctrl, idx) in urls" :class="{active: isActive(idx)}" class="ctrl-unit" @click="toSelect(idx)"></div>
    </div>
    <div class="slider-img" id="slider1"></div>
    <div class="slider-img" id="slider2"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import api from '@/common/api'
const $imgs = {}
const cache = []
export default {
  name: 'slider',
  data () {
    return {
      currentActive: undefined,
      timer: undefined,
      urls: [],
      nowShow: true,
    }
  },
  methods: {
    isActive(idx) {
      return idx === this.currentActive;
    },
    toSelect(idx) {
      if (!this.isActive(idx)) {
        this.currentActive = idx
        this.timeOut()
        $imgs[Number(this.nowShow)].css('background-image', `url(${this.urls[idx]})`).addClass('show')
        $imgs[Number(!this.nowShow)].removeClass('show')
        this.nowShow = !this.nowShow
      }
    },
    timeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const nextIdx = this.currentActive < this.urls.length - 1 ? this.currentActive + 1 : 0
        this.toSelect(nextIdx);
      }, 3000);
    },
  },
  created() {
    api.getJSON('cover')
    .then(
      urls => {
        this.urls = []
        const root = '../../../../../../static/data/cover/'
        urls.forEach(url => {
          this.urls.push(`${root}${url}`)
          const doomyImg = document.createElement('img')
          doomyImg.setAttribute('src', `${root}${url}`)
        })
        this.toSelect(0)
      },
      () => {}
    )
  },
  mounted() {
    $imgs[0] = $('#slider1')
    $imgs[1] = $('#slider2')
  },
}
</script>

<style scoped media="screen">
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.slider-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
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
  bottom: 30px;
  left: 50px;
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
</style>
