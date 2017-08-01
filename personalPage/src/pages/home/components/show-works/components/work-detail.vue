<template lang="html">
  <div class="work-detail" v-if="pics.length > 0">
    <div class="slider">
      <div v-for="(pic, idx) in pics" @click="toOperate(idx)" class="work-box"
      :class="{
        'pre-main': isPreMain(idx),
        'post-main': isPostMain(idx),
        'main': isMain(idx),
      }">
        <img :src="getImgSrc(idx)" alt="" class="slider-img" :class="{hide: unLoaded(idx)}">
      </div>
    </div>
    <p class="note">{{currentActive + 1}}/{{pics.length}}
    {{pics[currentActive].note}}</p>
    <div class="big-view" @click="toCloseBigView" v-if="isScaled" @keydown.esc="toCloseBigView">
      <button class="btn-pre"
              :class="{hide: !isValid(currentActive - 1)}"
              @click.stop="toOperate(currentActive - 1)"
              @keydown.left="toOperate(currentActive - 1)">
      </button>
      <div class="big-img"  :class="{
          hide: !isScaled || unLoaded(currentActive),
          }">
        <img :src="getImgSrc(currentActive)">
        </div>
      <button class="btn-post"
              :class="{hide: !isValid(currentActive + 1)}"
              @click.stop="toOperate(currentActive + 1)"
              @keydown.right="toOperate(currentActive + 1)">
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
export default {
  name: 'workDetail',
  props: [
    'pics',
    'flag',
		'toPicOf',
  ],
  data() {
    return {
      imgSrc: {},
      ids: [], // 便于之后的搜索计算
      currentActive: 0,
      isScaled: false,
    }
  },
  watch: {
    pics(newVal) {
      if (newVal) {
        this.imgSrc = {}
        this.ids = [];
        newVal.forEach(val => {
          this.ids.push(val.of)
        })
        this.currentActive = 0
        this.requestImgs(this.currentActive)
      }
    },
		toPicOf(newId) {
      const idx = this.ids.indexOf(newId)
      this.toOperate(idx)
		},
  },
  methods: {
    unLoaded(idx) {
      return this.imgSrc[idx] === undefined
    },
    requestImgs(idx) {
      this.imgSrc[idx] = this.imgSrc[idx] || api.getUrl(this.flag, this.pics[idx].url)
      if (this.isValid(idx - 1)) {
        this.imgSrc[idx - 1] = this.imgSrc[idx - 1] || api.getUrl(this.flag, this.pics[idx - 1].url)
      }
      if (this.isValid(idx + 1)) {
        this.imgSrc[idx + 1] = this.imgSrc[idx + 1] || api.getUrl(this.flag, this.pics[idx + 1].url)
      }
    },
    getImgSrc(idx) {
      return this.imgSrc[idx]
    },
    isMain(idx) {
      return idx === this.currentActive
    },
    isPreMain(idx) {
      return idx === this.currentActive - 1
    },
    isPostMain(idx) {
      return idx === this.currentActive + 1
    },
    isValid(idx) {
      return idx < this.pics.length && idx >= 0
    },
    toOperate(idx) {
      if (this.isMain(idx)) {
        this.toOpenBigView()
      } else if (this.isValid(idx)) {
				this.$emit('onchange', this.pics[idx].of)
        this.currentActive = idx
        this.requestImgs(idx)
      }
    },
    toOpenBigView() {
      this.isScaled = true
    },
    toCloseBigView() {
      this.isScaled = false
    },
  },
  created() {
  }
}
</script>

<style scoped lang="css">
.slider {
  position: relative;
  height: 75%;
	margin-top: 5%;
}
.work-box {
  display: flex;
  position: absolute;
  transition: 0.5s;
  top: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.3);
}
.work-box.main {
  z-index: 1;
  height: 100%; /**/
  width: 500px; /**/
  max-width: 70%;
  top: 50%;
  left: 45%;
  opacity: 1;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.work-box.pre-main, .work-box.post-main {
  z-index: 0;
  height: 70%; /**/
  width: 300px; /**/
  top: 55%;
  transform: scale(1) translate(0, -50%);
  filter: blur(3px);
}
.work-box.pre-main {
  left: 0;
  right: auto;
  opacity: 0.3;
}
.work-box.post-main {
  left: auto;
  right: 0;
  opacity: 0.5;
}
.work-box.scaled {
  position: fixed;
  top: 50vh; left: 50vw;
  transform: translate(-50%, -50%);
}
.slider-img {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  pointer-events: all;
  cursor: pointer;
}
.work-box.main .slider-img {
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}
.big-view {
  display: flex;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.85);
}
.big-view .big-img {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  transition: 0.1s; /**/
  opacity: 1;
  /* box-shadow: 0 5px 20px rgba(0,0,0,0.3); */
  transform: scale(1.5);
}
.btn-pre, .btn-post {
  position: relative;
  background: transparent;
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  margin: auto;
  border-top: 10px solid white;
  border-left: 10px solid white;
  transform: rotate(-45deg);
  opacity: 0.4;
  cursor: pointer;
}
.btn-post:hover, .btn-pre:hover {
  opacity: 1;
  transition: 0.1s; /**/
}
.btn-post::before, .btn-pre:before {
  position: absolute;
  content: '';
  left: -30px; right: -30px; top: -30px; bottom: -30px;
}
.btn-post {
  transform: rotate(135deg)
}
.hide, .hide:hover {
  opacity: 0;
  pointer-events: none;
}
</style>
