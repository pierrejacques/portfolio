<template lang="html">
  <div class="work-list">
    <div class="work" :class="{selected: isSelected(idx)}" v-for="(work, idx) in works">
      <span class="name">{{work.name}}</span>
      <img class="icon-image" :src="work.iconUrl"  @click="toSelect(idx)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'workList',
  props: ['works'],
  data() {
    return {
      currentSelected: undefined,
    }
  },
  methods: {
    isSelected(idx) {
      return this.currentSelected === idx;
    },
    toSelect(idx) {
      if (!this.isSelected(idx)) {
        this.currentSelected = idx;
        this.$emit('selectWork', idx)
      }
    },
  },
  created() {
    this.toSelect(0)
  },
}
</script>

<style scoped lang="css">
.work-list {
  padding-top: 20px;
}
.work {
  display: grid;
  grid-template-columns: auto 80px;
  grid-column-gap: 20px;
  height: 80px;
  margin: 20px 0;
}
.name {
  text-align: right;
}
.icon-image {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
