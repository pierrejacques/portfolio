<template lang="html">
  <div class="show-works screen-box">
    <div class="title">{{title}}</div>
    <work-detail :work="works[currentWork]" :flag="flag" class="work-detail"></work-detail>
    <work-list :works="works" :flag="flag" class="work-list" @selectWork="selectWork"></work-list>
  </div>
</template>

<script>
import api from '@/common/api'
import workList from './components/work-list'
import workDetail from './components/work-detail'
export default {
  name: 'show-works',
  props: [
    'title',
    'flag',
  ],
  data() {
    return {
      currentWork: 0,
      works: [],
    }
  },
  methods: {
    selectWork(workIdx) {
      this.currentWork = workIdx
    },
  },
  created() {
    api.getWorks(this.flag)
    .then(data => {
      this.works = data
    })
  },
  components: {
    workList,
    workDetail,
  }
}
</script>

<style scoped lang="css">
.show-works {
  position: relative;
  display: grid;
  padding: 30px 40px;
  grid-template-columns: 5fr 2fr ;
  grid-template-areas: "detail list";
}
.show-works::before {
  bottom: 0;
  left: 0;
  border-top-style: none;
  border-right-style: none;
}
.title {
  position: absolute;
  display: inline-block;
  padding: 5px 50px 7px 15px;
  right: -40px;
  top: 40px;
  text-align: right;
  font-size: 16px;
  /* font-family: 'Quicksand', sans-serif; */
  font-weight: lighter;
  color: white;
  background: #666;
}
.work-detail {
  grid-area: detail;
}
.work-list {
  grid-area: list;
}
</style>
