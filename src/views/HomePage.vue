<template>
  <div id="app" class="home">

    <div class="container container--home">
      <div class="container__top">
        
        <button class="btn btn--green btn--round btn--round--col"><img src="/images/Profil.svg"  aria-label="voir le profil"></button>
      </div>

      <div class="container__middle">
        
        <div class="ensemble-logo">
          <img src="/public/images/logo.svg" alt="" class="logo-frog">
          <img src="/public/images/logo-froggy.svg" draggable="false" alt="Logo" class="logo-froggy">
        </div>

        <div class="container__middle__buttons">

          <select v-model="selectedDifficulty" class="btn btn--green btn--select"  aria-label="selectionner la difficulté">
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>

          <button @click="playGame" class="btn btn--green"  aria-label="jouer">Jouer</button>

          <!-- <button @click="goToLogin" class="btn btn--green">Login</button>
          <button @click="goToRegister" class="btn btn--green">Register</button> -->

        </div>

      </div>

      <div class="container__bottom">
        <button @click="goToRegles" class="btn btn--green btn--round"><img src="/images/Rules.svg"  aria-label="règles"></button>
        <button @click="goToClassement" class="btn btn--green btn--round"><img src="/images/Classement.svg"  aria-label="aller au classement"></button>
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
    },
    goToRegister(){
      this.$router.push('/register');
    },
    goToLogin(){
      this.$router.push('/login');
    },
    goToClassement(){
      this.$router.push('/classement');
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
// body{
//   overflow: hidden;
//   background-image: url("/homepagebg.png");
//   background-size: 100vw;
//   background-repeat: no-repeat;
//   background-position: center;
//   #app {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     // .btn {
//     //   margin: 10px;
//     //   // background: none;
//     //   border: none;
//     //   font-family: 'Simply Rounded', sans-serif;
//     //   font-size: x-large;
//     // }
//     .form-select {
//       appearance: none;
//       background-image: url('/arrow.png');
//       background-repeat: no-repeat;
//       background-position: calc(100% - 10%) center;;
//       width: 15.573vw;
//       height: 5.741vh;
//       color: white;
//       text-align: center;
//       font-family: 'Simply Rounded', sans-serif;
//       font-size: x-large;
//       background-color: #4C8B25;
//       box-shadow: 0 4px 0 0 #5FAE30;
//       border-radius: 15px;
//       border: none;
//       &:hover {
//         transform: scale(1.03);
//         background-color: #5FAE30;
//         box-shadow: 0 4px 0 0 #8CCF57;
//       }
//     }
//     .btn-register {
//       position: absolute;
//       top: 2%;
//       right: 2%;
//     }
//     .btn-login {
//       position: absolute;
//       top: 2%;
//       right: 10%;
//     }
//     .btn-play {
//       width: 15.573vw;
//       height: 5.741vh;
//       color: white;
//       text-align: center;
//       background-color: #4C8B25;
//       box-shadow: 0 4px 0 0 #5FAE30;
//       border-radius: 15px;
//       border: none;
//       margin-top: 8%;
//       transition: 0.1s;
//       &:hover{
//         transform: scale(1.03);
//         background-color: #5FAE30;
//         box-shadow: 0 4px 0 0 #8CCF57;
//       }
//     }
//     .btn-leaderboard {
//       position: absolute;
//       top: 10px;
//       left: 10px;
//     }
//     .btn-info {
//       position: absolute;
//       bottom: 10px;
//       right: 10px;
//     }
//   }
// }
</style>