<template lang="html">
  <div class="show-works" :class="{'reverse': direction == 'left'}">
    <div class="title">{{title}}</div>
    <ul class="work-menu" v-if="works">
      <li v-for="work in works"
          :class="{active: work.id === ids[currentPic]}"
          @click="toSelectWork(work.id)">
        {{work.name}}
      </li>
    </ul>
    <div class="img-slider">
      <div class="img-box"
           v-for="(pic, idx) in pics"
           :class="{
						 'loading': !srcs[idx],
             'main': idx === currentPic,
             'pre': idx === currentPic - 1,
             'post': idx === currentPic + 1,
             'left-to-main': idx < currentPic,
             'right-to-main': idx > currentPic,
           }">
			  <img :src="srcs[idx]"
             @click="toSelectPic(idx)"/>
				<a class="page-url iconfont icon-routo" :href="pic.pageUrl" target="_blank" v-if="pic.pageUrl && idx === currentPic">
				</a>
      </div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import api from '@/common/api'
export default {
  name: 'show-works',
  props: [
    'flag',
    'direction',
  ],
  data() {
    return {
      title: '',
      currentPic: undefined,
      works: [],
      pics: [],
			srcs: [],
      ids: [], // 初始化后存放每个pic的id以便于查找
      isOpen: false,
    }
  },
  methods: {
    isValid(idx) {
      return idx < this.pics.length && idx >= 0
    },
		getImg(idx) {
			if (!this.srcs[idx]) {
				api.getUrl(this.flag, this.pics[idx].url, url => {
					this.srcs.splice(idx, 1, url)
				})
			}
		},
    requestImgs(idx) {
			this.getImg(idx)
			if (this.isValid(idx - 1)) { this.getImg(idx - 1) }
     	if (this.isValid(idx + 1)) { this.getImg(idx + 1) }
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
		toPage (url) {
			console.log(11)
			window.open(url)
		},
    toOpenBigView() {
      this.$store.state.isBigViewOpen = true
      this.$store.state.bigUrl = this.srcs[this.currentPic]
			this.$store.state.pageUrl = this.pics[this.currentPic].pageUrl
    },
  },
  created() {
    api.getJSON(this.flag, this.$store.state.isEnglish)
    .then(data => {
      this.title = data.title
      this.pics = data.pics
			this.works = data.works
      if (this.pics) {
        this.pics.forEach(pic => {
          this.ids.push(pic.of)
					this.srcs.push('')
        })
        this.toSelectPic(0)
      }
    })
  },
}
</script>

<style scoped lang="css">
* {
  font-weight: 300;
}
/* gridding */
.show-works {
  display: grid;
  display: -ms-grid;
  box-sizing: border-box;
  padding: 100px 50px;
  width: 100vw;
	max-width: 1680px;
	margin: auto;
  height: 45vw;
  grid-template-columns: 1fr 2fr 1fr ;
  grid-column-gap: 50px;
  grid-template-rows: 1fr 3fr ;
  grid-row-gap: 20px;
  grid-template-areas: "slider slider title" "slider slider list";
	-ms-grid-columns: 1fr 50px 2fr 50px 1fr;
	-ms-grid-rows: 1fr 20px 3fr;
  perspective: 400px;
}
.show-works.reverse {
  grid-template-areas: "title slider slider" "list slider slider";
}
.work-menu {
  grid-area: list;
	-ms-grid-column: 5;
	-ms-grid-row: 3;
  position: relative;
  list-style-type: none;
  left: -20px;
}
.reverse .work-menu { -ms-grid-column: 1;}
.work-menu li {
  cursor: pointer;
  /* font-family:'msyhlc4dfe54171858c'; */
  letter-spacing: .2em;
  line-height: 1.5em;
  opacity: 0.6;
  /* font-family: 'Raleway'; */
}
.work-menu .active, .work-menu li:hover {
  opacity: 1;
}
.title {
  grid-area: title;
	-ms-grid-column: 5;
	-ms-grid-row: 1;
/*   font-family: 'Quicksand', sans-serif; */
  font-size: 1.2rem;
  height: 50px;
  margin-top: calc(7vw - 20px);
  border-bottom: 1px solid black;
}
.reverse .title { -ms-grid-column: 1;}
/* slider */
.img-slider {
  position: relative;
  height: 100%;
  grid-area: slider;
	-ms-grid-column: 1;
	-ms-grid-row: 1;
	-ms-grid-column-span: 3;
	-ms-grid-row-span: 3;
}
.reverse .img-slider {
	-ms-grid-column: 3;
}
.img-box {
  position: absolute;
  top: 50%;
  width: 80%;
  height: 100%;
  transition: 0.5s;
  pointer-events: none;
  opacity: 0;
}
.img-box.main {
  opacity: 1;
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
  opacity: 1;
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
  opacity: 1;
  z-index: 1;
  transform: translate3d(-100%, -50%, -10px) rotateY(-10deg);
}

/* 幻灯 */
img {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 50%;
  transition: 0.5s;
  opacity: 0;
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
.page-url {
	bottom: 20%;
	right: 55px;
  line-height: 25px;
  width: 25px;
  padding: 10px;
}

/* loading效果 */
@keyframes imgLoader {
 0% { background: #FF2121; }
 25% { background: #FF8BB5; }
 50% { background:  #78A4FC; }
 75% { background: #8BF0FF; }
 100% { background:  #FF2121; }
}
.loading {
  background: white url('./loading.gif');
  background-repeat: no-repeat;
  background-size: 80px;
  background-position: center;
  box-shadow: 0 0 15px grey;
}
.left-to-main.loading {
  background-position: left;
}
.right-to-main.loading {
  background-position: right;
}
.loading img {
  opacity: 0;
	width: 50%;
  height: 100%;
}
/* reverse */
.reverse {
  text-align: right;
}
/* TODO: grid适度 */
</style>
