<template lang="html">
  <div class="recho-menu">
    <header class="section-header">
      <div class="user iconfont icon-user" @click="routoLogin()"></div>
      <span class="title">Recho</span>
      <button class="btn-close iconfont icon-close" @click="$emit('close')"></button>
    </header>
    <section class="section-body">
      <ul class="menu-list">
        <li>
          <div @click="toggleFolder"><i class="iconfont icon-tutor"></i>Tutorials</div>
          <ul class="sublist" :class="{folded: isFolded}">
            <li class="sublist-item"><i class="iconfont icon-fader"></i>Fundamental</li>
            <li class="sublist-item"><i class="iconfont icon-piano"></i>Instrumental</li>
            <li class="sublist-item"><i class="iconfont icon-record"></i>Recording</li>
            <li class="sublist-item"><i class="iconfont icon-arrange"></i>Arrangement</li>
            <li class="sublist-item"><i class="iconfont icon-disc"></i>Post-production</li>
          </ul>
        </li>
        <li><i class="iconfont icon-list"></i>Term list</li>
        <li><i class="iconfont icon-issue"></i>Issues</li>
        <li><i class="iconfont icon-download1"></i>Downloads</li>
        <li><i class="iconfont icon-knight"></i>About Recho</li>
      </ul>
    </section>
    <footer class="section-footer">
      <div class="iconfont icon-recho-long"></div>
      <p class="copyright">2017<br/>build by SJTU Band Union</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'rechoMenu',
  data() {
    return {
      isFolded: true,
    }
  },
  methods: {
    toggleFolder() {
      this.isFolded = !this.isFolded
    },
    routoLogin() {
      this.$emit('close')
      this.$router.push({ name: 'recho-login' })
    }
  },
}
</script>

<style lang="css" scoped>
.recho-menu {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.section-header {
  position: relative;
  height: 45px;
  text-align: left;
  margin: 18px 12px 0;
  border-bottom: 1px solid #d8d8d8;
}
.section-body {
  flex-grow: 1;
  padding-left: 24px;
  overflow: auto;
}
.section-footer {
  height: 50px;
}
/* header section */
.user {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #d8d8d8;
  border-radius: 6px;
  color: white;
  margin: 0 30px 0 10px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
}
.icon-user {
  font-size: 21px;
  line-height: 2em;
}
.title {
  font-size: 40px;
  letter-spacing: -.01em;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 5px;
  color: gray;
  font-size: 1.2em;
}
.icon-recho-long {
  float: right;
  font-size: 160px;
  color: #F7624F;
  opacity: 0.66;
  transform: rotate(-90deg);
  margin-top: -80px;
}
.copyright {
  float: right;
  margin: -75px 10px 0 0;
  color: #bbbbbb;
  font-size: 12px;
  white-space: nowrap;
  text-align: right;
  line-height: 1em;
}

/* body */
li {
  list-style-type: none;
  text-align: left;
  font-size: 18px;
  letter-spacing: -0.01em;
  line-height: 40px;
  cursor: pointer;
}
li .iconfont {
  margin-right: 18px;
}
.menu-list {
  padding: 0;
  margin-top: 20px;
}
.sublist {
  overflow: hidden;
  color: #a7a7a7;
  margin-left: -5px;
  margin-bottom: 10px;
}
.sublist.folded {
  margin-bottom: 0;
}
.sublist-item {
  height: 40px;
  opacity: 1;
  transition: 0.3s;
}
.folded .sublist-item {
  height: 0;
  opacity: 0;
}
</style>
