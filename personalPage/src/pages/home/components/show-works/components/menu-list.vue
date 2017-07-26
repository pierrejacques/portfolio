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
  data() {
    return {
      list: [
        {
          name: 'sketch / modeling / product',
          url: '#product',
        },
        {
          name: 'UI / front-end / graphic',
          url: '#ui',
        },
        {
          name: 'photography',
          url: '#photo',
        },
        {
          name: 'musical / audio works',
          url: '#music',
        },
        {
          name: 'aesthetics research',
          url: '#research',
        },
        {
          name: 'resume',
          url: '#resume',
        },
      ],
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
.list-menu {
}
.list {
  position: absolute;
  bottom: 0;
  right: 40px;
  list-style: none;
  text-align: right;
  font-weight: lighter;
  padding-bottom: 100px;
}
.list > li {
  position: relative;
  right: 0;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  margin: 15px 0;
  padding: 5px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  opacity: 0;
  height: 0;
  transition: 0.2s;
  cursor: pointer;
  background: white;
}
.list.shown > li {
  height: 2em;
  opacity: 1;
}
.list.shown > li:hover {
  right: 15px;
}
.btn {
  position: absolute;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: blue;
  outline: none;
}
</style>
