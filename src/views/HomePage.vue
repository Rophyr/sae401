<template>
  <div id="app" class="home">

    <div class="container container--home">
      <div class="container__left">

        <router-link to="classement" class="btn btn--green btn--round"><img src="/images/Classement.svg"  aria-label="aller au classement"></router-link>
        <ToggleLanguage />
      </div>
      <div class="container__middle">
        <div class="ensemble-logo">
          <img src="/public/images/logo.svg" alt="logo froggy grenouille" draggable="false" class="logo-frog">
          <img src="/public/images/logo-froggy.svg" draggable="false" alt="Logo texte" class="logo-froggy">
        </div>
        <div class="container__middle__buttons">
          <div class="btn btn--group" @click="toggleDifficultyOptions">
            <button @click="playGame" class="btn btn--green"  aria-label="jouer">{{ $t("home.jouer") }}</button>
            <div class="btn--div">{{ $t("home.choix") }}</div>
            <div v-if="showDifficultyOptions" class="btn btn--div">
              <div @click="selectDifficulty('facile')" :class="{ 'btn': true, 'btn--green': selectedDifficulty === 'facile', 'btn--selected': selectedDifficulty === 'facile' }">{{ $t("home.facile") }}</div>
              <div @click="selectDifficulty('moyen')" :class="{ 'btn': true, 'btn--green': selectedDifficulty === 'moyen', 'btn--selected': selectedDifficulty === 'moyen' }">{{ $t("home.moyen") }}</div>
              <div @click="selectDifficulty('difficile')" :class="{ 'btn': true, 'btn--green': selectedDifficulty === 'difficile', 'btn--selected': selectedDifficulty === 'difficile' }">{{ $t("home.difficile") }}</div>
            </div>
          </div>

        </div>
        <router-link to="/mentions-legales" class="at-bottom"><p class="underline">{{ $t("home.mentionsLegales") }}</p></router-link>
      </div>

      <div class="container__right">
        <router-link to="/profil" class="btn btn--green btn--round btn--round--col"><img src="/images/Profil.svg"  aria-label="voir le profil"></router-link>
        <router-link to="/regles" class="btn btn--green btn--round"><img src="/images/Rules.svg"  aria-label="règles"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleLanguage from '../components/ToggleLanguage.vue';

export default {
  name: 'App',
  components: {
    ToggleLanguage
  },
  data() {
    return {
      selectedDifficulty: 'facile',
      showDifficultyOptions: false
    }
  },
  methods: {
    toggleDifficultyOptions() {
      this.showDifficultyOptions = !this.showDifficultyOptions;
    },
    selectDifficulty(difficulty) {
      this.selectedDifficulty = difficulty;
      this.showDifficultyOptions = false; // Hide the options after selection
    },
    playGame() {
      const selectedDifficulty = this.selectedDifficulty;

      if (selectedDifficulty === 'facile') {
        this.$router.push('/facile');
      } else if (selectedDifficulty === 'moyen') {
        this.$router.push('/moyen');
      } else if (selectedDifficulty === 'difficile') {
        this.$router.push('/difficile');
      }
    }
  }
}
</script>

<style lang="scss">

</style>
