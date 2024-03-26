<template>
  <Game />

    <div id="victory" style="display: none">
      <p id="vic-text">Bravo !</p>
      <div class="separation"></div>
      <button class="btn btn--green" aria-label="recommencer une partie">Nouvelle partie</button>
      <router-link to="/" class="btn btn--dark-green">Accueil</router-link>
    </div>
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