<template lang="html">
  <div class="stage-2">
    <p class="stage-hint"><span class="iconfont icon-arrow"></span>YOU WILL DO</p>
    <div class='options'>
      <div class="option"
           v-for="(option, idx) in options"
           :class="{'selected': selected[idx]}"
           @click="toggle(idx)">
        <div class="persona-oval">
        </div>
        <p class="option-title">{{option.title}}</p>
        <p class="option-note">{{option.note}}</p>
        <div class="iconfont icon-check-box"></div>
      </div>
    </div>
    <button class="btn-rect btn-ok"
            @click="ok"
            :class="{'valid': isValid}">OK</button>
  </div>
</template>

<script>
export default {
  name: 'rechoStageDo',
  props: [
    'options',
  ],
  data() {
    return {
      selected: [],
    }
  },
  watch: {
    options(val) {
      val.forEach(() => {
        this.selected.push(false)
      })
    }
  },
  computed: {
    isValid() {
      let bool = false
      this.selected.forEach(item => {
        bool = bool || item
      })
      return bool
    },
  },
  methods: {
    toggle(idx) {
      this.selected.splice(idx, 1, !this.selected[idx])
    },
    ok() {
      const arr = []
      this.selected.forEach((bool, idx) => {
        if (bool) {
          arr.push(idx)
        }
      })
      this.$emit('next', arr)
    }
  }
}
</script>

<style lang="css" scoped>
.stage-2 {
  width: 375px;
}
.options {
  margin-top: 35px;
  cursor: pointer;
  height: 425px;
  overflow: auto;
}
.options::-webkit-scrollbar {
  width: 0;
}
.option {
  position: relative;
  box-sizing: border-box;
  height: 135px;
  text-align: left;
  padding: 15px 35px 20px 65px;
  color: #A0A0A0;
}
.option-title {
  font-size: 20px;
  text-decoration: underline;
}
.option-note {
  font-size: 12px;
  width: 150px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.persona-oval {
  float: right;
  height: 100px;
  width: 100px;
}
.icon-check-box {
  position: absolute;
  top: 35px;
  left: 30px;
}
.option.selected, .option:hover {
  background: #F0F0F0;
}
.option.selected {
  color: #F7624F;
}
.btn-ok {
  float: right;
  width: 150px;
  margin: 10px 25px;
  color: gray;
  pointer-events: none;
}
.btn-ok.valid {
  color: black;
  pointer-events: all;
}
</style>
