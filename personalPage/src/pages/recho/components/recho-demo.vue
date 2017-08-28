<template>
  <div class="phone-box">
    <main>
      <span class="btn-menu iconfont icon-menu"></span>
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
    </main>
    <aside class="menu">
      <recho-menu></recho-menu>
    </aside>
    <div class="mask">
    </div>
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
* {
  font-family: 'DINCondensedC';
}
main {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
}
main::-webkit-scrollbar {
  width: 0;
}
.phone-box {
  position: relative;
  height: 100%;
  background: linear-gradient(to left, #F26552 50%, #F16745);
  background-blend-mode: overlay;
}
.btn-menu {
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 23px;
  color: white;
}
hgroup {
  display: grid;
  width: 155px;
  height: 125px;
  color: white;
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
.menu {
  position: absolute;
  width: 60%;
  height: 100%;
  top: 0;
  right: 0;
  background: white;
  box-shadow: -2px 0 10px hsla(0, 0%, 0%, 0.5);
  z-index: 1;
}
.mask {
  position: absolute;
  z-index: -10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(0, 0%, 0%, 0.2);
}
</style>
