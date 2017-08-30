<template lang="html">
<div class="recho-input">
  <input v-if="focus" :class="{polluted: model !== ''}" v-model="model" autofocus></input>
  <input v-else :class="{polluted: model !== ''}" v-model="model"></input>
  <label>{{label}}</label>
</div>
</template>

<script>
export default {
  name: 'rechoInput',
  props: [
    'label',
    'focus',
  ],
  data() {
    return {
      model: '',
    }
  }
}
</script>

<style lang="css">
.recho-input {
  position: relative;
  width: 293px;
  height: 50px;
  margin: 0 auto 26px;
}
input {
  position: absolute;
  line-height: 30px;
  width: 100%;
  left: 0; bottom: 0;
  font-size: 24px;
  outline: none;
  border: none;
  text-indent: 0.2em;
  transition: 0.3s;
  border-bottom: 1px solid #bbb;
}
input:focus {
  border-bottom: 1px solid #F7624F;
}
label {
  position: absolute;
  transition: 0.3s;
  font-size: 24px;
  top: 20px;
  left: 5px;
  color: #bbb;
  pointer-events: none;
}
input:focus + label,
input.polluted + label {
  font-size: 12px;
  top: 5px;
  left: 5px;
  color: black;
  pointer-events: all;
}
</style>
