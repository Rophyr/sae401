<template>
  <Game />
</template>

<script setup>

</script>
<script>
  import Game from '../components/Game.vue';
  export default {
    methods: {
      goToMenu() {
        this.$router.push('/homepage');
      }
    },
    components: {
      Game
    },
  }
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
</style>