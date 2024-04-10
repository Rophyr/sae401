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
            <h1>{{ $t('registration.title') }}</h1> 
            <div class="green-bar"></div>
          </div>

          <form @submit.prevent="registerUser">
            <div class="inputs">
              <input v-model="email" type="text" :placeholder="$t('login.emailPlaceholder')" required>
              <input v-model="password" type="password" :placeholder="$t('login.passwordPlaceholder')" required>
              <input v-model="confirmPassword" type="password" :placeholder="$t('login.confirmPasswordPlaceholder')" required>
            </div>
            <button type="submit" class="btn btn--dark-green">{{ $t('login.submitButton') }}</button>
            <router-link to="/login">Se connecter</router-link>
          </form>

        </div>
      
        <!-- Ajoutez le bouton de commutation de langue ici -->
        <ToggleLanguage />

      </div>

      <div class="container__bottom">
        <button @click="goToMenu" class="tn btn--green btn--round"><img src="/images/back_door.svg" alt=""></button>
      </div>

    </div>
  </div>
</template>

<script>
// import ToggleLanguage from './components/ToggleLanguage.vue';

export default {
  methods: {
    goToMenu() {
      this.$router.push('/homepage');
    }
  },
  // components: {
  //   ToggleLanguage
  // }
}
</script>

<style scoped>
/* Vos styles existants */
</style>
