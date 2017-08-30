<template lang="html">
<div class="login">
  <recho-header :has-ask="false" title="Login"></recho-header>
  <section class="section-hgroup">
    <span class="title">"plug in" Recho</span>
    <span class="iconfont icon-recho-long"></span>
  </section>
  <form class="form-login">
    <recho-input label="Email address" focus="true"></recho-input>
    <recho-input label="Password"></recho-input>
    <button class="btn-rect btn-highlight btn-login">Login in</button>
    <div class="line-or">
      <div class="or">or</div>
    </div>
    <button class="btn-rect btn-sign-in">Sign in</button>
  </form>
</div>
</template>

<script>
import rechoInput from './components/recho-input'
import rechoHeader from '../../components/recho-header'
export default {
  name: 'rechoLogin',
  components: {
    rechoHeader,
    rechoInput,
  },
  created() {
    this.$store.state.isRechoMenuAvailable = true;
  },
}
</script>

<style lang="css" scoped>
.section-hgroup {
  position: relative;
  height: 133px;
  background: url('/static/recho/back_pic.png'), hsla(0, 0%, 100%, 0.7);
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: 0 -150px;
}
.title {
  position: relative;
  left: -70px;
  font-size: 36px;
  line-height: 133px;
}
.icon-recho-long {
  position: absolute;
  font-size: 135px;
  right: 0;
  top: -10px;
  transform: rotate(-90deg);
  color: #FF614D;
}
.form-login {
  padding: 60px 0 0;
}
.btn-login {
  margin-top: 35px;
  width: 292px;
  height: 50px;
}
.line-or {
  position: relative;
  margin: 20px auto 27px;
  height: 9px;
  width: 228px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
}
.or {
  display: inline-block;
  width: 60px;
  height: 18px;
  line-height: 18px;
  background: white;
  color: #d8d8d8;
}
.btn-sign-in {
  width: 228px;
  color: #858585;
}
</style>
