<template lang="html">
  <div class="work-detail" v-if="work">
    <div class="slider">
      <div v-for="(pic, idx) in work.pics" @click="toOperate(idx)" class="work-box"
      :class="{
        'pre-main': isPreMain(idx),
        'post-main': isPostMain(idx),
        'main': isMain(idx),
      }">
        <img :src="getImgSrc(idx)" alt="" class="slider-img" :class="{hide: unLoaded(idx)}">
      </div>
    </div>
    <p class="note">{{currentActive + 1}}/{{work.pics.length}}
    {{work.pics[currentActive].note}}</p>
    <div class="big-view" @click="toCloseBigView" v-show="isScaled">
      <button class="btn-pre"
              :class"{hide: currentActive === 0}"
              @click="toOperate(currentActive - 1)"
              >
      </button>
      <div class="big-img"  :class="{
          hide: !isScaled || unLoaded(currentActive),
          }">
        <img :src="getImgSrc(currentActive)">
        <a class="btn-close" @click="toCloseBigView"><img src="../../../../../common/asset/btn-close.png"></a>
      </div>
      <button class="btn-post"
              :class="{hide: currentActive + 1 === work.pics.length}"
              @click="toOperate(currentActive + 1)"
      >
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
export default {
  name: 'workDetail',
  props: [
    'work',
    'flag',
  ],
  data() {
    return {
      imgSrc: {},
      currentActive: 0,
      isScaled: false,
    }
  },
  watch: {
    work(newVal) {
      if (newVal) {
        this.imgSrc = {}
        this.currentActive = 0
        this.requestImgs(this.currentActive)
      }
    }
  },
  methods: {
    unLoaded(idx) {
      return this.imgSrc[idx] === undefined
    },
    requestImgs(idx) {
      this.imgSrc[idx] = this.imgSrc[idx] || api.getUrl(this.flag, this.work.pics[idx].url)
      if (idx - 1 >= 0) {
        this.imgSrc[idx - 1] = this.imgSrc[idx - 1] || api.getUrl(this.flag, this.work.pics[idx - 1].url)
      }
      if (idx + 1 < this.work.pics.length) {
        this.imgSrc[idx + 1] = this.imgSrc[idx + 1] || api.getUrl(this.flag, this.work.pics[idx + 1].url)
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
    toOperate(idx) {
      if (this.isMain(idx)) {
        this.toOpenBigView()
      } else {
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
.work-detail {

}
.slider {
  position: relative;
  height: 75%;
	margin-top: 5%;
}
.work-box {
  display: flex;
  position: absolute;
  transition: 0.5s;
  bottom: 50%;
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
  filter: blur(2px);
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
  transform: translate(-50%, -50%) scale(1.2);
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
  background: rgba(0, 0, 0, 0.8);
}
.big-view .big-img {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  transition: 0.5s;
  opacity: 1;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
}
.btn-close {
  position: absolute;
  display: block;
  height: 24px;
  width: 24px;
  top: -12px;
  right: -12px;
  border-radius: 50%;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}
.btn-close:hover {
  background: rgba(0, 0, 0, 0.3);
}
.btn-close > img {
  height: 100%;
  width: 100%;
}
.btn-pre, .btn-post {
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
}
.btn-post {
  transform: rotate(135deg)
}
.btn-post, .btn-pre, .btn-close {
  transition: 0.3s;
}
/* .btn-post.hide, .btn-pre.hide {
  pointer-events: none;
} */
.hide {
  opacity: 0;
}
</style>
