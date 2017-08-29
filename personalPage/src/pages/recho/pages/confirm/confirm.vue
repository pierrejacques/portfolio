<template lang="html">
<div class="confirm">
  <recho-header></recho-header>
</div>
</template>

<script>
import rechoHeader from '../../components/recho-header'
export default {
  name: 'rechoConfirm',
  components: {
    rechoHeader,
  },
  created() {
    this.$store.state.isRechoMenuAvailable = false;
  },
}
</script>

<style lang="css" scoped>
</style>
