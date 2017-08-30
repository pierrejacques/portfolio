<template lang="html">
  <div class="stage-1">
    <p class="stage-hint"><span class="iconfont icon-arrow"></span>YOU ARE A</p>
    <div class="option" v-for="(option, idx) in options" @click="$emit('next', idx)">
      <div class="persona-oval">
      </div>
      <p class="option-title">{{option.title}}</p>
      <p class="option-note">{{option.note}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rechoStageAs',
  props: [
    'options'
  ]
}
</script>

<style lang="css" scoped>
.stage-1 {
  width: 375px;
}
.option {
  text-align: center;
  color: #F7624F;
  margin: 35px auto 0;
  cursor: pointer;
}
.persona-oval {
  width: 150px;
  height: 150px;
  margin: auto;
}
.option-title {
  font-size: 20px;
  text-decoration: underline;
  margin: 0;
  margin-top: 20px;
}
.option-note {
  font-size: 14px;
  margin: 0;
  line-height: 25px;
}
</style>
