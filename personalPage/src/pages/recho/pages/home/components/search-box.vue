<template lang="html">
  <form class="search-box"
        :class="{focused: isFocused}"
        >
    <input class="text-input"
           type="text"
           @focus="toFocus()"
           @blur="toBlur()"
           placeholder="terms/ issues/ tutorials"
           v-model="keyword">
    <button class="btn-submit iconfont icon-search"></button>
  </form>
</template>

<script>
export default {
  name: 'searchBox',
  data() {
    return {
      keyword: '',
      isFocused: true,
    }
  },
  methods: {
    toFocus() {
      this.isFocused = true
    },
    toBlur() {
      this.isFocused = false
    },
  },
}
</script>

<style lang="css" scoped>
.search-box {
  position: relative;
  margin: auto;
  width: 343px;
  height: 50px;
  box-shadow: 0 7px 5px 0 rgba(0, 0, 0, 0.17);
  background: white;
  transition: box-shadow 0.3s;
}
.search-box.focused {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
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
  padding-top: 3px;
  text-indent: .5em;
}
.btn-submit {
  position: absolute;
  right: 5px;
  top: 8px;
  font-size: 30px;
  color: #e1e1e1;
  cursor: pointer;
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
