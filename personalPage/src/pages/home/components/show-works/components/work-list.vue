<template lang="html">
  <div class="work-list">
    <div class="work" :class="{selected: isSelected(idx)}" v-for="(work, idx) in works">
      <span class="name">{{work.name}}</span>
      <img class="icon-image" :src="icons[idx]"  @click="toSelect(idx)">
    </div>
  </div>
</template>

<script>
import api from '@/common/api'
export default {
  name: 'workList',
  props: [
    'works',
    'flag',
		'toWorkId',
  ],
  data() {
    return {
      currentSelected: 0,
      icons: [],
      ids: [],
    }
  },
  watch: {
    works(newVal) {
      if (newVal) {
        this.icons = []
        this.ids = []
        newVal.forEach(work => {
          this.icons.push(api.getUrl(this.flag, work.icon))
          this.ids.push(work.id)
        })
      }
    },
		toWorkId(newId) {
      this.currentSelected = this.ids.indexOf(newId)
		},
	},
  methods: {
    isSelected(idx) {
      return this.currentSelected === idx;
    },
    toSelect(idx) {
      if (!this.isSelected(idx)) {
        this.currentSelected = idx;
        this.$emit('onchange', this.works[idx].id)
      }
    },
  },
}
</script>

<style scoped lang="css">
.work-list {
  padding-top: 100px;
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
  transition: 0.3s;
}
.selected .icon-image {
  transform: scale(1.1);
}
</style>
