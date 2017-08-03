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
    <div class="background"></div>
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
      isOpen: false,
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
      const idx = this.ids.indexOf(id)
      if (this.isValid(idx)) {
        this.currentPic = idx
        this.requestImgs(idx)
      }
    },
    toOpenBigView() {
      this.$store.state.isBigViewOpen = true
      this.$store.state.bigUrl = this.imgSrc[this.currentPic]
    },
  },
  created() {
    api.getJSON(this.flag)
    .then(data => {
      this.pics = data.pics
			this.works = data.works
      if (this.pics) {
        this.pics.forEach(pic => {
          this.ids.push(pic.of)
        })
        this.toSelectPic(0)
      }
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
  grid-template-rows: 1fr 3fr ;
  grid-row-gap: 20px;
  grid-template-areas: "slider slider title" "slider slider list";
  perspective: 400px;
}
.show-works.reverse {
  grid-template-areas: "title slider slider" "list slider slider";
}
.work-menu {
  grid-area: list;
  position: relative;
  list-style-type: none;
  left: -20px;
}
.work-menu li {
  cursor: pointer;
  font-family:'msyhlc4dfe54171858c';
  letter-spacing: .2em;
  line-height: 1.5em;
  opacity: 0.3;
  /* font-family: 'Raleway'; */
}
.work-menu .active, .work-menu li:hover {
  opacity: 1;
}
.title {
  grid-area: title;
  font-family: 'Quicksand', sans-serif;
  font-family:'msyhlc4dfe54171858c';
  font-size: 1.2rem;
  height: 50px;
  margin-top: calc(5vw - 20px);
  border-bottom: 1px solid black;
}
/* slider */
.img-slider {
  position: relative;
  top: -8vw;
  grid-area: slider;
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
  cursor: zoom-in;
}
.pre > img, .post > img {
  opacity: 0.5;
  cursor: pointer;
  /* filter: blur(7px); */
}
.left-to-main > img {
  left: 0;
  transform: translate(0, -50%);
}
.right-to-main > img {
  left: 100%;
  transform: translate(-100%, -50%);
}
/* reverse */
.reverse {
  text-align: right;
}
</style>
