<template>
  <div id="app">
    <button @click="goToClassement" class="btn btn-leaderboard">Classement</button>

    <img src="/froggy.png" draggable="false" alt="Logo" class="logo">

    <select v-model="selectedDifficulty" class="form-select">
      <option value="facile">Facile</option>
      <option value="moyen">Moyen</option>
      <option value="difficile">Difficile</option>
    </select>

    <button @click="playGame" class="btn btn-play">Jouer</button>

    <button @click="goToProfil" class="btn btn-profile">Profil</button>

    <button @click="goToRegles" class="btn btn-info"><img src="/rules.png" alt="règles"></button>
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

<style>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
body{
  overflow: hidden;
  background-image: url("/homepagebg.png");
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  margin: 30px 0;
  transition: 0.2s;
}

.logo:hover{
  transform: scale(1.05) rotateZ(2deg);
}

.btn {
  margin: 10px;
  background: none;
  border: none;
  font-family: 'Simply Rounded', sans-serif;
  font-size: x-large;
}

.form-select {
  appearance: none;
  background-image: url('/arrow.png');
  background-repeat: no-repeat;
  background-position: calc(100% - 10%) center;;
  width: 15.573vw;
  height: 5.741vh;
  color: white;
  text-align: center;
  font-family: 'Simply Rounded', sans-serif;
  font-size: x-large;
  background-color: #4C8B25;
  box-shadow: 0 4px 0 0 #5FAE30;
  border-radius: 15px;
  border: none;
}

.form-select:hover {
  transform: scale(1.03);
  background-color: #5FAE30;
  box-shadow: 0 4px 0 0 #8CCF57;
}

.btn-profile {
  position: absolute;
  top: 10px;
  right: 10px;
}

.btn-play {
  width: 15.573vw;
  height: 5.741vh;
  color: white;
  text-align: center;
  background-color: #4C8B25;
  box-shadow: 0 4px 0 0 #5FAE30;
  border-radius: 15px;
  border: none;
  margin-top: 8%;
  transition: 0.1s;
}

.btn-play:hover{
  transform: scale(1.03);
  background-color: #5FAE30;
  box-shadow: 0 4px 0 0 #8CCF57;
}

.btn-leaderboard {
  position: absolute;
  top: 10px;
  left: 10px;
}

.btn-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

</style>