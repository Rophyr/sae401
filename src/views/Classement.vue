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

        <div class="tableau tableau--green">
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
          <button @click="setTheme('green')" class="btn btn--facile">{{ $t('home.facile') }}</button>
          <button @click="setTheme('yellow')" class="btn btn--moyen">{{ $t('home.moyen') }}</button>
          <button @click="setTheme('red')" class="btn btn--difficile">{{ $t('home.difficile') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    setTheme(theme) {
      console.log(`Setting theme to ${theme}`);
      const classement = document.querySelector('.classement');
      ['green', 'yellow', 'red'].forEach(color => {
        if (theme !== color && classement.classList.contains(`classement--${color}`)) {
          classement.classList.remove(`classement--${color}`);
        }
      });
      classement.classList.add(`classement--${theme}`);
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
