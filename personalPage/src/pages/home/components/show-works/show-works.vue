<template lang="html">
  <div class="show-works screen-box">
    <h3 class="title">{{title}}</h3>
    <work-detail :work="works[currentWork]" class="work-detail"></work-detail>
    <work-list :works="works" class="work-list" @selectWork="selectWork"></work-list>
  </div>
</template>

<script>
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
      currentWork: undefined,
      works: [
        {
          name: 'sketch',
          iconUrl: '',
          picUrls: [1,2,3,4,5,6,

          ],
          descripts: [
            'asdasdasd','asdasdad','11sss','asd','123','asdas',
          ],
        },
        {
          name: 'modeling',
          iconUrl: '',
          picUrls: [1,2,3,4,

          ],
          descripts: [
            'qweqwe','asdaqweqwesdad','qwe11sss','asdasdd'
          ],
        },
      ],
    }
  },
  methods: {
    selectWork(workIdx) {
      this.currentWork = workIdx
    },
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
