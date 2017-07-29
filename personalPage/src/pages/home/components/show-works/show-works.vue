<template lang="html">
  <div class="show-works screen-box">
    <h3 class="title">{{title}}</h3>
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
  grid-template-rows: 50px auto;
  grid-template-areas: "title title"
                       "detail list";
}
/*
.show-works::before, .show-works::after {
  position: absolute;
  content: '';
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
.show-works::after {
  top: 0;
  right: 0;
  border-bottom-style: none;
  border-left-style: none;
}
*/
.show-works::before {
  bottom: 0;
  left: 0;
  border-top-style: none;
  border-right-style: none;
}
.title {
  grid-area: title;
  height: 40px;
  margin: 0;
  position: relative;
  text-align: right;
  font-size: 20px;
  font-family: 'Quicksand', sans-serif;
  font-weight: lighter;
}
.title::after {
  position: absolute;
  content: '';
  width: 260px;
  height: 1px;
  border-bottom: 1px solid grey;
  bottom: 0;
  right: 0;
}
.work-detail {
  grid-area: detail;
}
.work-list {
  grid-area: list;
}
</style>
