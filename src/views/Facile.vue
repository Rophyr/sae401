<template>
  <div id="app" class="jeux jeux--facile">
    <div class="container container__facile">
      <div class="container__left">
        <div class="logo-bg-white">
          <img src="/public/images/logo-glasses.svg" alt="">
        </div>
        <div  class="object-description explain">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
            <!-- <p>{{ objectDescription }}</p> -->
          </div>
        <button @click="goToMenu" class="btn btn--green btn--round btn--round--col"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></button>
      </div> <!-- Fin container left -->
      <div class="container__middle">
        <div class="grid game"> <!-- JEU -->
          <Game />
      </div>
      <div class="container__right">
      </div>
    </div>
  </div>
  </div>
  <div id="victory" style="display: none">
    <p id="vic-text">Bravo !</p>
    <div class="separation"></div>
    <button class="btn btn--green" aria-label="recommencer une partie">Nouvelle partie</button>
    <button @click="goToMenu" class="btn btn--green">Accueil</button>
  </div>
</template>

<script setup>
const word = "FROGGY";
const colors = ['#E2A340FF', '#D3715BFF', '#228AB9FF', '#4C8B25FF'];

function getColorByIndex(index) {
  return colors[index % colors.length];
}
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