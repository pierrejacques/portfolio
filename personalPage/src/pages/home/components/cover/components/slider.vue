<template>
  <div class="slider">
    <div class="slider-ctrl">
      <div v-for="(ctrl, idx) in data.srcs" :class="{active: isActive(idx)}" class="ctrl-unit" @click="toSelect(idx)"></div>
    </div>
    <div class="slider-img" id="slider1"></div>
    <div class="slider-img" id="slider2"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import api from '@/common/api'

const doomyImg = new Image
const $imgs = {} // 用于存放两张交替显示的背景图片

export default {
  name: 'slider',
  data () {
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
  mounted() {
    $imgs[0] = $('#slider1')
    $imgs[1] = $('#slider2')
  },
}
</script>

<style scoped media="screen">
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
