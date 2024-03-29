<template>
  <DifficileComponent />
</template>
<script>
import DifficileComponent from '../components/DifficileComponent.vue';
export default {
  methods: {
    goToMenu() {
      this.$router.push('/homepage');
    }
  },
  components: {
    DifficileComponent
  },
}
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
</style>