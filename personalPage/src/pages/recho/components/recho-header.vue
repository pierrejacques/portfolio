<template lang="html">
  <div class="recho-header">
    <button class="iconfont icon-left" @click="$router.go(-1)"></button>
    <h4 class="title">{{title}}</h4>
    <button :class="{'icon-ask': hasAsk}" class="iconfont"></button>
  </div>
</template>

<script>
export default {
  name: 'rechoHeader',
  props: [
    'hasAsk',
    'title',
  ],
  methods: {
  },
}
</script>

<style lang="css" scoped>
.recho-header {
  display: flex;
  margin: 0;
  height: 53px;
  box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.3);
  background: linear-gradient(to left, #F7624F 50%, #FF7041);
}
.title {
  flex-grow: 1;
  color: white;
  font-size: 22.5px;
  line-height: 60px;
  margin: 0;
  font-weight: normal;
}
.iconfont {
  color: white;
  line-height: 50px;
  font-size: 25px;
  margin: 0 10px;
  width: 40px;
}
</style>
