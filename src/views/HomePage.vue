<template>
  <div id="app" class="home">

    <div class="container container--home">
      <div class="container__left">
        <router-link to="classement" class="btn btn--green btn--round"><img src="/images/Classement.svg"  aria-label="aller au classement"></router-link>

      </div>

      <div class="container__middle">
        
        <div class="ensemble-logo">
          <img src="/public/images/logo.svg" alt="logo froggy grenouille" draggable="false" class="logo-frog">
          <img src="/public/images/logo-froggy.svg" draggable="false" alt="Logo texte" class="logo-froggy">
        </div>

        <div class="container__middle__buttons">

          <select v-model="selectedDifficulty" class="btn btn--green btn--select"  aria-label="selectionner la difficulté">
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>

          <button @click="playGame" class="btn btn--green"  aria-label="jouer">Jouer</button>

          

        </div>
        <router-link to="/mentions-legales" class="at-bottom"><p class="underline">Mentions Légales</p></router-link>

      </div>

      <div class="container__right">
        <router-link to="/profil" class="btn btn--green btn--round btn--round--col"><img src="/images/Profil.svg"  aria-label="voir le profil"></router-link>
        <router-link to="/regles" class="btn btn--green btn--round"><img src="/images/Rules.svg"  aria-label="règles"></router-link>
        
        
      </div>

    </div>
      
  </div>

    
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selectedDifficulty: 'facile'
    }
  },
  methods: {

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


// @import url('https://fonts.cdnfonts.com/css/simply-rounded');

</style>