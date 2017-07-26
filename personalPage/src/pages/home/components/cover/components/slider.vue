<template>

</template>

<script>
export default {
  name: 'slider',
  props: ['sliderNum'],
  data () {
    return {
    }
  },
  methods: {
    shiftTo(num) {
      // console.log(`Slider ${num}`);
    },
  },
  watch: {
    sliderNum(val) {
      if (val !== undefined) {
        this.shiftTo(val)
      }
    }
  }
}
</script>

<style scoped media="screen">

</style>
