<template lang="html">
<div class="confirm">
  <recho-header title="Well Done!" :has-ask="false"></recho-header>
  <section class="section-hgroup">
    <span class="title">SO YOU ARE:</span>
  </section>
  <section class="card">
    <div class="persona-oval"></div>
    <span class="iconfont icon-recho-long"></span>
    <p class="description">an<span class="highlight">{{selection.as}}</span>who will<br/>
      do<span class="highlight">{{selection.dos.join('&')}}</span><br/>
      on a<span class="highlight">{{selection.at}}</span>
    </p>
  </section>
  <button class="btn-rect btn-highlight btn-bingo">Bingo!</button>
  <button class="btn-rect btn-redo">Select again!</button>
</div>
</template>

<script>
import rechoHeader from '../../components/recho-header'
export default {
  name: 'rechoConfirm',
  components: {
    rechoHeader,
  },
  data() {
    return {
      selection: undefined,
    }
  },
  created() {
    this.$store.state.isRechoMenuAvailable = false;
    console.log(this.$route.params)
    if (!this.$route.params.at) {
      this.$router.push({ name: 'recho-start' })
    } else {
      this.selection = this.$route.params
    }
  },
}
</script>

<style lang="css" scoped>
.confirm {
  height: 100%;
  background: #F4F4F4;
}
.section-hgroup {
  position: relative;
  height: 130px;
  background: url('/static/recho/back_pic.png'), hsla(0, 0%, 100%, 0.8);
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: 0 -150px;
}
.title {
  position: absolute;
  bottom: 15px;
  left: 30px;
}
.card {
  position: relative;
  height: 240px;
  margin-top: -25px;
  box-shadow: 0 4px 10px hsla(0, 0%, 0%, 0.2);
  background: linear-gradient(120deg, white 68%, rgba(62, 34, 124, 0.05) 0);
}
.card::before {
  content: '';
  position: absolute;
  z-index: 1;
  width: 50%;
  height: 100%;
  right: 0; top: 0;
  background: linear-gradient(to left, white, transparent);
}
.description {
  padding: 90px 0 0 35px;
  text-align: left;
  line-height: 25px;
  font-size: 20px;
}
.highlight, .icon-recho-long {
  color: #F7624F;
  margin: 0 10px;
}
.icon-recho-long {
  position: absolute;
  z-index: 10;
  font-size: 160px;
  bottom: -50px;
  right: 10px;
  transform: rotate(-90deg);
}
.persona-oval {
  position: absolute;
  z-index: 2;
  width: 120px;
  height: 120px;
  top: -60px;
  right: 30px;
}
.btn-rect {
  display: block;
  width: 325px;
  margin: 24px auto;
}
.btn-bingo {
  margin-top: 36px;
}
.btn-redo {
  color: #858585;
}

</style>
