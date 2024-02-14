<template>
  <div id="app">
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/classement" class="navbar-brand">Classement</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Difficulté
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link to="/facile" class="dropdown-item">Facile</router-link>
                <router-link to="/moyen" class="dropdown-item">Moyen</router-link>
                <router-link to="/difficile" class="dropdown-item">Difficile</router-link>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/jouer" class="nav-link">Jouer</router-link>
            </li>
          </ul>
        </div>
        <router-link to="/profil" class="navbar-brand">Profil</router-link>
      </div>
    </nav>

    <!-- Contenu principal -->
    <router-view></router-view>

    <!-- Bas de page -->
    <footer class="footer fixed-bottom">
      <div class="container">
        <router-link to="/regles">Règles</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Styles personnalisés peuvent être ajoutés ici */
</style>
