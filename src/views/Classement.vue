<template>
  <div class="classement">
    <div class="container container__classement"> 
      <div class="container__left">
        <div class="logo-bg-white">
          <img src="/public/images/logo-glasses-2.svg" alt="logo" />
        </div>

        <router-link to="/" class="btn btn--green btn--round"
          ><img src="/images/back_door.svg" aria-label="retourner au menu"
        /></router-link>
      </div>
      <div class="container__middle">
        <div class="title">
          <h1>{{ $t('classement.title') }}</h1>
          <div class="green-bar"></div>
        </div>

        <div class="tableau ">
          <table>
            <thead>
              <tr>
                <th>{{ $t('classement.top') }}</th>
                <th>{{ $t('classement.temps') }}</th>
                <th>{{ $t('classement.pseudo') }}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>00:00:00</td>
                <td>Enzo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>00:00:00</td>
                <td>Julien</td>
              </tr>
              <tr>
                <td>3</td>
                <td>00:00:00</td>
                <td>Amandine</td>
              </tr>
              <tr>
                <td>4</td>
                <td>00:00:00</td>
                <td>Alyson</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="niveau">
          <button @click="themeGreen" class="btn btn--facile">{{ $t('home.facile') }}</button>
          <button @click="themeYellow" class="btn btn--moyen">{{ $t('home.moyen') }}</button>
          <button @click="themeRed" class="btn btn--difficile">{{ $t('home.difficile') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    themeGreen() {
      console.log('themeGreen');
      const classement = document.querySelector('.classement');
      const tableau = document.querySelector('.tableau');
      if (classement.classList.contains('classement--yellow')) {
        classement.classList.remove('classement--yellow');
      } else if (classement.classList.contains('classement--red')) {
        classement.classList.remove('classement--red');
      }
      classement.classList.add('classement--green');
      tableau.classList.add('tableau--green'); // Ajout de la classe tableau--green
    },

    themeYellow() {
      console.log('themeYellow');
      const classement = document.querySelector('.classement');
      if (classement.classList.contains('classement--green')) {
        classement.classList.remove('classement--green');
      } else if (classement.classList.contains('classement--red')) {
        classement.classList.remove('classement--red');
      }
      classement.classList.add('classement--yellow');
    },
    themeRed() {
      console.log('themeRed');
      const classement = document.querySelector('.classement');
      if (classement.classList.contains('classement--green')) {
        classement.classList.remove('classement--green');
      } else if (classement.classList.contains('classement--yellow')) {
        classement.classList.remove('classement--yellow');
      }
      classement.classList.add('classement--red');
    }
  }
};
</script>


<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

.niveau {
  display: flex;
  flex-direction: row;
  gap: 10px;
  // font-size: 0.8em;
}
</style>
