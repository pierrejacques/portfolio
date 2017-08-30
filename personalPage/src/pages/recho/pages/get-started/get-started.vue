<template lang="html">
<div class="start">
  <recho-header title="Get Started" :has-ask="true"></recho-header>
  <section class="section-body">
    <div class="horizon-scroll"
         :class="{
          'stage-1': stage === 1,
          'stage-2': stage === 2,
          'stage-3': stage === 3,
         }">
      <recho-stage-as :options="options" @next="toDos"></recho-stage-as>
      <recho-stage-do :options="dos" @next="toAts"></recho-stage-do>
      <recho-stage-in :options="ats" @next="done"></recho-stage-in>
    </div>
  </section>
</div>
</template>

<script>
import rechoHeader from '../../components/recho-header'
import rechoStageAs from './components/recho-stage-as.vue'
import rechoStageDo from './components/recho-stage-do.vue'
import rechoStageIn from './components/recho-stage-in.vue'

export default {
  name: 'rechoStart',
  components: {
    rechoHeader,
    rechoStageAs,
    rechoStageDo,
    rechoStageIn,
  },
  created() {
    this.$store.state.isRechoMenuAvailable = false;
  },
  data() {
    return {
      stage: 1,
      selection: {
        as: undefined,
        do: [],
      },
      options: [
        {
          title: 'performer',
          note: 'play instruments or perform singing',
          icon: '',
          options: [
            {
              title: 'singer',
              icon: '',
            },
            {
              title: 'guitarist',
              icon: '',
            },
            {
              title: 'bassist',
              icon: '',
            },
            {
              title: 'keyboarder',
              icon: '',
            },
            {
              title: 'drummer',
              icon: '',
            },
          ]
        },
        {
          title: 'audio technicist',
          note: 'produce music or organize live shows',
          icon: '',
          options: [
            {
              title: 'Recording',
              note: 'recording down both the ouput of the mixing system and the atmosphere',
              icon: '',
            },
            {
              title: 'Mixing',
              note: 'balancing and optimizing the sound effect with a console',
              icon: '',
            },
            {
              title: 'Sound Picking',
              note: 'establishing a sound picking system for the players on stage/ in the studio',
              icon: '',
            },
          ]
        },
      ],
      ats: [
        {
          title: 'live-show',
          icon: '',
        },
        {
          title: 'studio',
          icon: '',
        },
      ]
    }
  },
  computed: {
    dos() {
      return this.selection.as ? this.options[this.selection.as].options : []
    }
  },
  methods: {
    toDos(idx) {
      this.selection.as = idx
      this.stage = 2
    },
    toAts(idxArr) {
      this.selection.do = idxArr
      this.stage = 3
    },
    done(idx) {
      const as = this.options[this.selection.as].title
      const dos = []
      this.selection.do.forEach(index => {
        dos.push(this.options[this.selection.as].options[index].title)
      })
      const at = this.ats[idx].title
      this.$router.push({ name: 'recho-confirm', params: { as, dos, at }})
    }
  },
}
</script>

<style lang="css" scoped>
.start {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.section-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.horizon-scroll {
  position: relative;
  display: flex;
  flex-grow: 1;
  width: 1300px;
  height: 100%;
  transition: left 0.3s;
}
.stage-1 {
  left: 0;
}
.stage-2 {
  left: -100%;
}
.stage-3 {
  left: -200%;
}
</style>
