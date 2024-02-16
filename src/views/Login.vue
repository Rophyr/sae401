<template>
  <div id="app">
    <img src="/froggy.png" alt="logo" class="logo">

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
  top: 10px;
  left: 10px;
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