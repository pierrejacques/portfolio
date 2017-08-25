<template lang="html">
  <div class="menu-list">
    <div class="mask" v-if="isListOpen()" @click="toCloseList()"></div>
    <ul class="list" :class="{shown: isListOpen()}" @click.stop="toCloseList()">
      <li v-for="item in list" :href="item.url" scroll-fire>{{item.name}}</li>
      <li @click="routeResume">{{isEnglish ? 'resume' : '简历'}}</li>
    </ul>
    <button class="btn" @click="toggleList()" >
			<div class="menu-btn-bar"></div>
			<div class="menu-btn-bar"></div>
			<div class="menu-btn-bar"></div>
    </button>
  </div>
</template>

<script>
export default {
	props: ['list'],
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isEnglish() {
      return this.$store.state.isEnglish
    },
  },
  methods: {
    routeResume() {
			this.isEnglish ? this.$router.push({ name: 'resumeEn' }) : this.$router.push({ name: 'resumeZh' })
		},
    isListOpen() {
      return this.isOpen
    },
    toggleList() {
      this.isOpen = !this.isOpen;
			this.$store.state.isBlur = !this.$store.state.isBlur;
    },
    toCloseList() {
      this.isOpen = false;
      this.$store.state.isBlur = false;
    }
  },
  created() {
  }
}
</script>

<style scoped lang="css">
.menu-list {
	position: fixed;
  z-index: 1;
	right: 1.5vw;
	top: 1.5vw;
  margin-top: 10px;
	width: 400px;
	opacity: 1;
	transition: 0.2s;
}
.mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
}
.list {
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  list-style: none;
  text-align: right;
  padding-top: 30px;
}
.list > li {
  position: relative;
  right: 0;
  box-sizing: border-box;
  overflow: hidden;
  margin: 15px 0;
  padding: 5px 20px;
	font-size: 20px;
  font-weight: 300;
  text-shadow: 0 0 8px white, 0 0 15px white;
  opacity: 0;
  height: 0;
  transition: 0.2s;
  cursor: pointer;
	transform-origin: right;
	transform: rotate(-45deg);
}
.list.shown {
  visibility: visible;
}
.list.shown > li {
  height: 4em;
  opacity: 1;
}
/* .list.shown > li:hover {
  transform: translate(-10px, 0) rotate(-45deg);
} */
.btn, .btn:active {
	opacity: 0.5;
  position: absolute;
  right: 0;
	top: 0;
  width: 40px;
	background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.btn:hover .menu-btn-bar {
  margin-bottom: 15px;
}
.menu-btn-bar {
	width: 100%;
	height: 3px;
	margin-bottom: 6px;
	background: black;
	transition: 0.2s;
}
.shown + .btn > .menu-btn-bar {
	transform: rotate(-45deg);
	margin-bottom: 15px;
	height: 2px;
	background: gray;
}
@media screen and (max-width: 768px) {
  .btn:hover .menu-btn-bar {
    margin-bottom: 6px;
  }
  .shown + .btn > .menu-btn-bar {
  	margin-bottom: 15px;
  }
}
</style>
