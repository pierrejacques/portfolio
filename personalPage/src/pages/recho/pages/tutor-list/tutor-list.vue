<template lang="html">
<div class="tutor-list">
  <recho-header title="checkout your tutorials" :has-ask="true"></recho-header>
</div>
</template>

<script>
import rechoHeader from '../../components/recho-header'
export default {
  name: 'rechoTutorList',
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
