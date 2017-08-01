<template lang="html">
  <div class="show-works screen-box">
    <div class="title">{{title}}</div>
    <work-detail 
								 @to-work="updateCurrentWork" 
								 :to-pic-id="toPicId" 
								 :pics="pics" 
								 :flag="flag" 
								 class="work-detail"></work-detail>
    <work-list 
							 	 @to-pic="toSelectPic"
							 	 :to-work-id="toWorkId"		
							 	 :works="works" :flag="flag" class="work-list" @selectWork="selectWork"></work-list>
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
			toPicId: undefined,
			toWorkId: undefined,
      works: [],
    }
  },
  methods: {
		updateCurrentWork(id) {
			this.toWorkId = id
		},
		toSelectPic(id) {
			this.toPicId = id
		}
  },
  created() {
    api.getWorks(this.flag)
    .then(data => {
      this.pics = data.pics
			this.works = data.works
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
