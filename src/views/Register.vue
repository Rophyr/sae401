<template>
  <div id="app" class="login">
    <div class="container container__login">

      <div class="container__top">
        
      </div>

      <div class="container__middle">

        <div class="ensemble-logo">
          <img src="/public/images/logo.svg" alt="" class="logo-frog">
          <img src="/public/images/logo-froggy.svg" draggable="false" alt="Logo" class="logo-froggy">
        </div>

        <div class="form">

          <div class="title">
            <h1>INSCRIPTION</h1>
            <div class="green-bar"></div>
          </div>

          <form @submit.prevent="registerUser">
            <div class="inputs">
              <input v-model="email" type="text" placeholder="email" required>
              <input v-model="password" type="password" placeholder="mot de passe" required>
              <input v-model="confirmPassword" type="password" placeholder="confirmer le mot de passe" required>
            </div>
            <button type="submit" class="btn btn--dark-green">valider</button>
          </form>

        </div>
      
      
      </div>

      <div class="container__bottom">
        <button @click="goToMenu" class="tn btn--green btn--round"><img src="/images/back_door.svg" alt=""></button>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    goToMenu() {
      this.$router.push('/homepage');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');
/* 
body {
  overflow: hidden;
  background-image: url("/homepagebg.png");
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: center;
}

.register-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 18%;
  width: 42.344vw;
  right:  13.177vw;
}

.green-bar{
  display: flex;
  background-color: #4C8B25;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 80%;
  border-radius: 5px;
  width: 16vw;
  height: 6px;
  right:  13.177vw;
}

.register-header h1 {
  text-align: center;
  width: 42.344vw;
  font-size: 32px;
  font-family: 'Simply Rounded', sans-serif;
}

.register-form {
  position: absolute;
  right:  13.177vw;
  width:  41.094vw;
  height: 30.51vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8CCF57;
  font-family: 'Simply Rounded', sans-serif;
  border-radius: 15px;
  box-shadow: 0 2px 4px 0 #4C8B25;
  padding: 4vh 2vh 4vh 2vh;
}

.register-form input {
  font-family: 'Simply Rounded', sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
  padding: 8px;
  width: 36.927vw;
  height: 4.629vh;
  background-color: #DBFFD5;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.btn-submit {
  background-color: #4C8B25;
  box-shadow: 0 4px 0 0 #5FAE30;
  width: 38.1665vw;
  height: 6.629vh;
  margin: 0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #5FAE30;
  box-shadow: 0 4px 0 0 #4C8B25;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  position: absolute;
  margin: 30px 0;
  width: 250px;
  height: 80px;
  left: 15%;
}

img {
  width: 100%;
  height: 100%;
}

.btn-menu {
  position: absolute;
  bottom: 10px;
  left: 10px;
} */
</style>
