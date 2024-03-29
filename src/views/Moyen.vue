<template>
  <MoyenComponent />
</template>

<script setup>

</script>
<script>
import MoyenComponent from '../components/MoyenComponent.vue';
export default {
  methods: {
    goToMenu() {
      this.$router.push('/homepage');
    }
  },
  components: {
    MoyenComponent
  },
}
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
</style>