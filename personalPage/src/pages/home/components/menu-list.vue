<template lang="html">
  <div class="menu-list">
    <ul class="list" :class="{shown: isListOpen()}" @mouseleave="toHideList(false)">
      <li v-for="item in list" :href="item.url" scroll-fire>{{item.name}}</li>
    </ul>
    <button class="btn" @mouseenter="toShowList()" >

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
  methods: {
    isListOpen() {
      return this.isOpen
    },
    toShowList() {
      this.isOpen = true;
    },
    toHideList() {
      this.isOpen = false;
    },
  },
  created() {
  }
}
</script>

<style scoped lang="css">
.menu-list {
	position: fixed;
	right: 50px;
	bottom: 50px;
	width: 300px;
	opacity: 1;
	transition: 0.5s;
}
.list {
  visibility: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  list-style: none;
  text-align: right;
  font-weight: lighter;
  padding-bottom: 50px;
}
.list > li {
  position: relative;
  right: 0;
  box-sizing: border-box;
  overflow: hidden;
  margin: 15px 0;
  padding: 5px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
  opacity: 0;
  height: 0;
  transition: 0.2s;
  cursor: pointer;
  background: black;
	color: white;
}
.list.shown {
  visibility: visible;
}
.list.shown > li {
  height: 2em;
  opacity: 1;
}
.list.shown > li:hover {
  right: 15px;
}
.btn {
	opacity: 0.5;
  position: absolute;
  right: 0;
	bottom: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: blue;
  outline: none;
}
</style>
