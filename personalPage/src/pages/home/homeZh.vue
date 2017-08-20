<template lang="html">
  <home></home>
</template>

<script>
import home from './home'
export default {
  name: 'homeZh',
  components: {
    home
  },
  created () {
    this.$store.state.isEnglish = false
    document.title = "金辰浩的作品集"
  }
}
</script>
