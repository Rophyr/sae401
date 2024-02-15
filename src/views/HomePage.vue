<template>
  <div id="app">
    <!-- Bouton vers le classement (en haut à gauche) -->
    <button @click="goToClassement" class="btn btn-leaderboard">Classement</button>

    <!-- Logo (au centre) -->
    <img src="chemin/vers/logo.png" alt="Logo" class="logo">

    <!-- Menu déroulant des difficultés du jeu -->
    <select v-model="selectedDifficulty" class="form-select">
      <option value="facile">Facile</option>
      <option value="moyen">Moyen</option>
      <option value="difficile">Difficile</option>
    </select>

    <!-- Bouton "Jouer" selon la difficulté sélectionnée -->
    <button @click="playGame" class="btn btn-play">Jouer</button>

    <!-- Bouton vers le profil (en haut à droite) -->
    <button @click="goToProfil" class="btn btn-profile">Profil</button>

    <!-- Bouton vers les règles (en bas à droite) -->
    <button @click="goToRegles" class="btn btn-info">Règles</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selectedDifficulty: 'facile' // Par défaut, sélectionnez la difficulté "facile"
    }
  },
  methods: {

    playGame() {
      // Récupérer la valeur de la difficulté sélectionnée
      const selectedDifficulty = this.selectedDifficulty;

      // Rediriger vers la page appropriée en fonction de la difficulté sélectionnée
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

<style>
body{
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  margin: 20px 0;
}

.btn {
  margin: 10px;
}

.btn-profile {
  position: absolute;
  top: 10px;
  right: 10px;
}

.btn-play {
  position: relative;
}

.btn-leaderboard {
  position: absolute;
  top: 10px;
  left: 10px;
}

.btn-info {
  position: absolute;
  bottom: 10px; /* Ajustez la position verticale selon vos besoins */
  right: 10px;
}

</style>
