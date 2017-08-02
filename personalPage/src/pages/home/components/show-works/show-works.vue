<template lang="html">
  <div class="show-works" :class="{'reverse': direction == 'left'}">
    <div class="title">{{title}}</div>
    <ul class="work-menu" v-if="works">
      <li v-for="work in works"
          :class="{active: work.id === ids[currentPic]}"
          @click="toSelectWork(work.id)">
        {{work.name}}
        {{work.note}} <!-- TODO: alter JSON note for each work, not each pic -->
      </li>
    </ul>
    <div class="img-slider">
      <div class="img-box"
           v-for="(pic, idx) in pics"
           :class="{
             'main': idx === currentPic,
             'pre': idx === currentPic - 1,
             'post': idx === currentPic + 1,
             'left-to-main': idx < currentPic,
             'right-to-main': idx > currentPic,
           }">
         <img :src="imgSrc[idx]" @click=toSelectPic(idx)>
      </div>
    </div>
    <div class="big-view"></div>
  </div>
</template>

<script>
import api from '@/common/api'
export default {
  name: 'show-works',
  props: [
    'title',
    'flag',
    'direction',
  ],
  data() {
    return {
      currentPic: undefined,
      works: [],
      pics: [],
      imgSrc: [],
      ids: [], // 初始化后存放每个pic的id以便于查找
    }
  },
  methods: {
    isValid(idx) {
      return idx < this.pics.length && idx >= 0
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
    toSelectPic(idx) {
      if (idx === this.currentPic) {
        this.toOpenBigView()
      } else if (this.isValid(idx)) {
        this.currentPic = idx
        this.requestImgs(idx)
      }
    },
    toSelectWork(id) {
      this.toSelectPic(this.ids.indexOf(id))
    },
    toOpenBigView() {

    },
  },
  created() {
    api.getJSON(this.flag)
    .then(data => {
      this.pics = data.pics
			this.works = data.works
      this.pics.forEach(pic => {
        this.ids.push(pic.of)
      })
      this.toSelectPic(0)
    })
  },
}
</script>

<style scoped lang="css">
/* gridding */
.show-works {
  display: grid;
  box-sizing: border-box;
  padding: 100px 50px;
  width: 100vw;
  height: 45vw;
  grid-template-columns: 1fr 2fr 1fr ;
  grid-column-gap: 50px;
  grid-template-rows: 1fr 2fr ;
  grid-template-areas: "slider slider title" "slider slider list";
}
.show-works.reverse {
  grid-template-areas: "title slider slider" "list slider slider";
}
.work-menu {
  grid-area: list;
}
.work-menu .active {
  color: red;
}
.title {
  grid-area: title;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.4rem;
}

/* slider */
.img-slider {
  position: relative;
  top: -10vw;
  grid-area: slider;
  perspective: 400px;
}
.img-box {
  position: absolute;
  top: 50%;
  width: 80%;
  height: 100%;
  transition: 0.5s;
  pointer-events: none;
  /* background: black; */
}
.img-box.main {
  z-index: 3;
  left: 50%;
  max-width: 100%;
  transform-origin: center;
  transform: translate3d(-50%, -50%, 0);
}
.img-box.left-to-main {
  left: 0;
  max-width: 70%;
  transform-origin: left;
  transform: translate3d(0, -50%, -10px) rotateY(90deg);
}
.img-box.left-to-main.pre {
  z-index: 2;
  transform: translate3d(0, -50%, -10px) rotateY(10deg);
}
.img-box.right-to-main {
  left: 100%;
  max-width: 70%;
  transform-origin: right;
  transform: translate3d(-100%, -50%, -10px) rotateY(-90deg);
}
.img-box.right-to-main.post {
  z-index: 1;
  transform: translate3d(-100%, -50%, -10px) rotateY(-10deg);
}
img {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 80%;
  transition: 0.7s;
  opacity: 0;
  background: white;
  pointer-events: all;
  filter: none;
}
.main > img {
  left: 50%;
  opacity: 1;
  transform: translate(-50%, -50%);
}
.main > img, .pre > img, .post > img {
  box-shadow: 0 0 15px grey;
}
.pre > img, .post > img {
  opacity: 0.5;
  filter: blur(7px);
}
.left-to-main > img {
  left: 0;
  transform: translate(0, -50%);
}
.right-to-main > img {
  left: 100%;
  transform: translate(-100%, -50%);
}

/* big view */

</style>
