<template lang="html">
    <home></home>
</template>

<script>
import home from './home'
export default {
  name: 'homeEn',
  components: {
    home
  },
  created () {
    this.$store.state.isEnglish = true
  }
}
</script>
