<template lang="">
  <resume></resume>
</template>

<script>
import resume from './resume'
export default {
	name: 'resumeEn',
	components: {
		resume,
	},
	created() {
		this.$store.state.isEnglish = true
	}
}
</script>
