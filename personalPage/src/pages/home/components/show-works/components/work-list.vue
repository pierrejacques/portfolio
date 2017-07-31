<template lang="html">
  <div class="work-list">
    <div class="work" :class="{selected: isSelected(idx)}" v-for="(work, idx) in works">
      <span class="name">{{work.name}}</span>
      <img class="icon-image" :src="iconList[idx]"  @click="toSelect(idx)">
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
      currentSelected: undefined,
    }
  },
  computed: {
    iconList() {
      const urlList = []
      this.works.forEach(work => {
        urlList.push(api.getUrl(this.flag, work.icon))
      })
      return urlList
    }
  },
  methods: {
    isSelected(idx) {
      return this.currentSelected === idx;
    },
    toSelect(idx) {
      if (!this.isSelected(idx)) {
        this.currentSelected = idx;
        this.$emit('toPic', this.works[idx].id)
      }
    },
  },
	watch: {
		toWorkId(newId) {
			this.works.forEach((work, idx) => {
				if (work.id === newId) {
					this.currentSelected = idx
					break
				}
			})
		},
	},
  created() {
    this.toSelect(0)
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
}
</style>
