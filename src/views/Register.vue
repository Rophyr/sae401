<template>
  <div id="app">
    <img src="/froggy.png" alt="logo" class="logo">

    h1

    <form @submit.prevent="registerUser" class="register-form">
      <input v-model="email" type="text" placeholder="Adresse Mail" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe" required>
      <button type="submit" class="btn btn-register">S'inscrire</button>
    </form>

    <button @click="goToMenu" class="btn btn-menu"><img src="/back.png" alt=""></button>
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

body {
  overflow: hidden;
  background-image: url("/homepagebg.png");
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: center;
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

.btn-register {
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

.btn-register:hover {
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
}
</style>