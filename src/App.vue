<script setup>

</script>

<template>
  <div>
      <h1>Mon application</h1>
      <router-link to="/">Accueil</router-link>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-view></router-view>
    </div>
</template>

<style scoped></style>
