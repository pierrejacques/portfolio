<template lang="html">
  <div class="h-fullwidth">
    <span class="letter" v-for="letter in contentArr">{{letter}}</span>
  </div>
</template>

<script>
export default {
  name: 'hFullwidth',
  props: ['content'],
  data () {
    return {
      contentArr: this.content.split(''),
    }
  },
}
</script>

<style scoped lang="css">
.h-fullwidth {
  display: flex;
  width: 100%;
}
.letter {
  flex-grow: 1;
  display: flex;
}
.letter:last-of-type {
  flex-grow: 0;
}
</style>
