<template>
  <div class="phone-box">
    <span class="menu iconfont icon-menu"></span>
    <hgroup>
      <span class="iconfont icon-recho"></span>
      <h1>Recho</h1>
      <p class="subtitle">audio-technology sharing & learningsupported by SJTU Band United</p>
    </hgroup>
    <search-box :keyword = "keyword">
    </search-box>
    <button class="login"></button>
    <button class="start"></button>
    <a class="latest"></a>
  </div>
</template>

<script>
import searchBox from './components/search-box.vue'
export default {
  name:'recho',
  data() {
    return {
      keyword: '',
    }
  },
  components: {
    searchBox,
  },
}
</script>

<style lang="css" scoped>
.menu {
  font-size: 23px;
  color: white;
}
hgroup {
  display: grid;
  width: 155px;
  height: 125px;
  grid-template-columns: 20px 70px auto;
  grid-template-rows: auto 60px;
  grid-template-areas: "icon head head" "icon sub .";
}
.icon-recho {
  grid-area: icon;
  font-size: 120px;
}
h1 {
  grid-area: head;
  font-size: 72px;
}
.subtitle {
  grid-area: sub;
  font-size: 12px;
}
</style>
