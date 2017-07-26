<template>
  <main class=home>
    <cover></cover>
  </main>
</template>

<script>
import cover from './components/cover/cover'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    cover
  },
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
</style>
