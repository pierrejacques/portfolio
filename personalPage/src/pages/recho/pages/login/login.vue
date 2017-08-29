<template lang="html">
<div class="login">
  <recho-header></recho-header>
</div>
</template>

<script>
import rechoHeader from '../../components/recho-header'
export default {
  name: 'rechoLogin',
  components: {
    rechoHeader,
  },
  created() {
    this.$store.state.isRechoMenuAvailable = true;
  },
}
</script>

<style lang="css" scoped>
</style>
