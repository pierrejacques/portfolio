<template lang="">
  <resume></resume>
</template>

<script>
import resume from './resume'
export default {
	name: 'resumeZh',
	components: {
		resume,
	},
	created() {
		this.$store.state.isEnglish = false
    document.title = '金辰浩的简历'
	}
}
</script>
