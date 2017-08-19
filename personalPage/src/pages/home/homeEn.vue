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
    document.title = "Jin Chenhao's Portfolio"
  }
}
</script>
