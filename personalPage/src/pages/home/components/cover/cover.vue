<template>
  <div class="cover">
  <section class="cover-section screen-box">
    <h-fullwidth class="big-title" content="PORTFILIO"></h-fullwidth>
    <h2 class="name-title">Jin</br>Chenhao</h2>
    <div class="select-lang">
      <a>中文</a>
      |
      <a>English</a>
    </div>
    <div class="contact-list">
      <i></i>
      <span>Github</span>
      <i></i>
      <span>Email</span>
    </div>
    <ul class="menu">
      <li v-for="item in menuList" :href="item.url" scroll-fire>
        {{item.name}}
      </li>
      <li @click="routeResume">
        resume
      </li>
    </ul>
    <slider-ctrl class="slider-ctrl" @shift="shiftSlider"></slider-ctrl>
    <div class=btn-down></div>
  </section>
  <slider class="slider" :slider-num="sliderNum"></slider>
</div>
</template>

<script>
import slider from './components/slider'
import sliderCtrl from './components/slider-ctrl'
import hFullwidth from './components/h-fullwidth'
import Router from 'vue-router'
export default {
  name: 'cover',
	props: ['menuList'],
  components: {
    slider,
    sliderCtrl,
    hFullwidth,
  },
  data() {
    return {
      sliderNum: undefined,
    }
  },
  methods: {
    shiftSlider(sliderNum) {
      this.sliderNum = sliderNum;
    },
    routeResume() {
      this.$router.push({ name: 'resume' })
    }
  },
  created() {
  },
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.cover-section {
  display: grid;
  grid-template-columns: 3fr 4fr 3fr;
  grid-template-rows: 35% 20% auto 50px;
  grid-template-areas: "contact . lang"
    "portfilio portfilio portfilio"
    "name . menu"
    "slider down menu";
  background: #3e3e3e
  linear-gradient(to right,
    #4f4646 0,
    #464242 32%,
    #3e3e3e 80%);
  padding: 30px 60px;
  color: white;
  font-family: 'Avenir Next', 'MicrosoftYaHei';
}
.big-title {
  grid-area: portfilio;
  font-size: 30px;
  vertical-align: bottom;
  font-weight: lighter;
  text-align: justify;
  width: 100%;
}
.name-title {
  grid-area: name;
  font-size: 24px;
  text-align: left;
  font-weight: lighter;
}
.select-lang {
  position: relative;
  grid-area: lang;
  font-size: 12px;
  font-weight: lighter;
  text-align: right;
  width: calc( 100% + 30px );
}
.contact-list {
  grid-area: contact;
  font-size: 12px;
  font-weight: lighter;
  text-align: left;
  text-indent: -30px;
}
.menu {
  grid-area: menu;
  font-weight: lighter;
  list-style: none;
  line-height: 1.8em;
  font-size: 18px;
  cursor: pointer;
}
.menu > li {
  position: relative;
  left: 0;
  transition: 0.3s;
  text-indent: -1em;
}
.menu > li:hover {
  left: -10px;
  opacity: 1;
  color: #98ce9f;
}
.menu > li::before {
  content: '-   ';
  white-space: pre;
  font-size: 0.7em;
}
.slider-ctrl {
  grid-area: slider;
  margin-top: 20px;
}
.btn-down {
  grid-area: down;
  position: relative;
  transform: scaleX(1.5);
  text-align: center;
  cursor: pointer;
}
.btn-down::before {
  position: absolute;
  display: inline-block;
  content: '';
  bottom: 0;
  width: 20px;
  height: 20px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  transform: rotate(45deg);
  transition: 0.3s;
  opacity: 0.5;
}
.btn-down:hover::before {
  bottom: -10px;
  opacity: 0.9;
}
/* stretch */
.name-title, .menu {
  transform: scaleX(1.05);
  transform-origin: left;
}
/* opacity reduction */
.menu > li {
  opacity: 0.8;
}
.contact-list, .select-lang {
  opacity: 0.7;
}
/* text-shadow */
.big-title, .name-title, .menu > li:hover {
  text-shadow: 1px 0 0 black;
}
@media screen and (max-width: 768px) {
  .cover-section {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 25% 10% 13% auto 30px;
    grid-template-areas: "contact lang"
      "portfilio portfilio"
      "name name"
      "menu menu"
      "down down";
  }
  .slider, .slider-ctrl {
    display: none;
  }
  .name-title {
    font-size: 16px;
  }
	.menu {
    padding-left: 20px;
  }
}
</style>
