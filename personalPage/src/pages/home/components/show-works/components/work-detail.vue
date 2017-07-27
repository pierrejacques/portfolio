<template lang="html">
  <div class="work-detail" v-if="picUrls.length > 0">
    <div class="slider">
      <div v-for="(pic, idx) in pics" @click="toOperate(idx)" class="work-box"
      :class="{
        'pre-main': isPreMain(idx),
        'post-main': isPostMain(idx),
        'main': isMain(idx),
        'scaled': isScaled,
      }">
      </div>
    </div>
    <p class="note">{{currentActive + 1}}/{{pics.length}}
      {{pics[currentActive].note}</p>
  </div>

</template>

<script>
export default {
  name: 'workDetail',
  props: ['work'],
  data() {
    return {
      currentActive: undefined,
      isScaled: false,
    }
  },
  methods: {
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
        // this.isScaled = !this.isScaled
      } else {
        this.currentActive = idx
      }
    },
  },
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
  display: block;
  position: absolute;
  cursor: pointer;
  transition: 0.5s;
  bottom: 50%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.3);
}
.work-box.main {
  z-index: 1;
  background: white;
  height: 100%; /**/
  width: 500px; /**/
  max-width: 70%;
  top: 50%;
  left: 45%;
  opacity: 1;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}
.work-box.pre-main, .work-box.post-main {
  z-index: 0;
  background: gray;
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
</style>
