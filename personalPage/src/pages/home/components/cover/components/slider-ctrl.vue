<template lang="html">
  <div class="slider-ctrl">
    <div v-for="(ctrl, idx) in ctrlList" :class="{active: isActive(idx)}" class="ctrl-unit" @click="toSelect(idx)"></div>
  </div>
</template>

<script>
export default {
  name: 'sliderCtrl',
  data () {
    return {
      ctrlList: [1, 2, 3, 4, 5],
      currentActive: undefined,
      timer: undefined,
    }
  },
  methods: {
    toSelect(idx) {
      if (!this.isActive(idx)) {
        this.currentActive = idx
        this.$emit('shift', idx);
        this.timeOut()
      }
    },
    isActive(idx) {
      return idx === this.currentActive;
    },
    timeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const nextIdx = this.currentActive < this.ctrlList.length - 1 ? this.currentActive + 1 : 0
        this.toSelect(nextIdx);
      }, 5000);
    },
  },
  created() {
    this.toSelect(0)
  },
  destroyed() {
    clearTimeout(this.timer);
  }
}
</script>

<style scoped lang="css">
.ctrl-unit {
  display: inline-block;
  margin: 3.5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d8d8d8;
  opacity: 0.13;
  transition: 0.3s;
}
.ctrl-unit.active {
  opacity: 0.46;
}
</style>
