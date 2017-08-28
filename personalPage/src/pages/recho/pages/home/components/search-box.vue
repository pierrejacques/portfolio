<template lang="html">
  <form class="search-box">
    <input class="text-input" type="text" placeholder="terms/ issues/ tutorials" v-model="keyword">
    <button class="btn-submit iconfont icon-search"></button>
  </form>
</template>

<script>
export default {
  name: 'searchBox',
  data() {
    return {
      keyword: '',
    }
  },
}
</script>

<style lang="css" scoped>
.search-box {
  position: relative;
  margin: auto;
  width: 343px;
  height: 50px;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.17);
  background: white;
}
.text-input, .btn-submit {
  border: none;
  background: transparent;
  outline: none;
}
.text-input {
  position: absolute;
  left: 0;
  width: 85%;
  height: 100%;
  font-size: 24px;
  font-family: 'DINCondensedC';
  padding-top: 5px;
  text-indent: .5em;
}
.btn-submit {
  position: absolute;
  right: 5px;
  top: 7px;
  font-size: 30px;
  color: #e1e1e1;
}

input::-webkit-input-placeholder{
        color: #e1e1e1;
}
input::-moz-placeholder{
        color: #e1e1e1;
}
input:-ms-input-placeholder{
        color: #e1e1e1;
}
</style>
