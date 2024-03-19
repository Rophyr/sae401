<template>
  <div id="app" class="jeux jeux--facile">
    <div class="container container__facile">
      <div class="container__left">
        <router-link to="/"><img src="/public/images/logo_glasses.svg" alt=""></router-link>
        <div  class="object-description explain">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
              <p>{{ objectDescription }}</p>
          </div>
        <button @click="goToMenu" class="btn btn--green btn--round btn--round--col"><img src="/images/back_door.svg" aria-label="retourner au menu"></button>
      </div> <!-- Fin container left -->
      <div class="container__middle">
        <div class="grid game"> <!-- JEU -->
          <Game />
      </div>
      <div class="container__right">
        <Timer />
      </div>
    </div>
  </div>
  </div>
  <div id="victory" style="display: none">
    <p id="vic-text">Bravo !</p>
    <div class="separation"></div>
    <p>Temps réalisé : 00:32</p>
    <button class="btn btn--green" aria-label="recommencer une partie">Nouvelle partie</button>
    <button @click="goToMenu" class="btn btn--green">Accueil</button>

  </div>
</template>


<script setup>
const word = "FROGGY"; // Votre mot ici
const colors = ['#E2A340FF', '#D3715BFF', '#228AB9FF', '#4C8B25FF'];

function getColorByIndex(index) {
  return colors[index % colors.length];
}
</script>
<script>
import Timer from '../components/Timer.vue'
import Game from '../components/Game.vue';
export default {
  methods: {
    goToMenu() {
      this.$router.push('/homepage');
    }
  },
  components: {
    Game,
    Timer
  },
}
</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
</style>