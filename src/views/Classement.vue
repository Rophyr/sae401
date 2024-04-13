<template>
  <div class="classement">
    <div class="container container__classement">
      <div class="container__left">
        <div class="logo-bg-white">
          <img src="/public/images/logo-glasses-2.svg" alt="logo" />
        </div>
        <router-link to="/" class="btn btn--green btn--round">
          <img src="/images/back_door.svg" aria-label="retourner au menu" />
        </router-link>
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
            <tr v-for="(data, index) in filteredClassementData" :key="data.id">
              <td>{{ index + 1 }}</td>
              <td>{{ data.time }}</td>
              <td>{{ data.pseudo }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="niveau">
          <button @click="setTheme('green'); selectDifficulty('easy')" class="btn btn--facile">{{ $t('home.facile') }}</button>
          <button @click="setTheme('yellow'); selectDifficulty('medium')" class="btn btn--moyen">{{ $t('home.moyen') }}</button>
          <button @click="setTheme('red'); selectDifficulty('hard')" class="btn btn--difficile">{{ $t('home.difficile') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';

const classementData = ref([]);
const selectedDifficulty = ref('easy'); // Par défaut, afficher les données de difficulté "easy"

onMounted(async () => {
  try {
    const response = await axios.get('https://mmi22c07-2.h205.online/api/classements');
    classementData.value = response.data['hydra:member'];
    filterClassementData(); // Filtrer les données au chargement initial
  } catch (error) {
    console.error('Error fetching classement data:', error);
  }
});

const filteredClassementData = computed(() => {
  return classementData.value.filter(data => data.difficulty === selectedDifficulty.value);
});

function filterClassementData() {
  selectedDifficulty.value = 'easy'; // Réinitialiser la difficulté sélectionnée à "easy" par défaut
}

function setTheme(theme) {
  console.log(`Setting theme to ${theme}`);
  const classement = document.querySelector('.classement');
  ['green', 'yellow', 'red'].forEach(color => {
    if (theme !== color && classement.classList.contains(`classement--${color}`)) {
      classement.classList.remove(`classement--${color}`);
    }
  });
  classement.classList.add(`classement--${theme}`);
}

function selectDifficulty(difficulty) {
  selectedDifficulty.value = difficulty;
}
</script>

<style lang="scss">
/* Vos styles CSS */
</style>
