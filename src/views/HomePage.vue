<template>
  <div id="app" class="home">
    <div class="container container--home">
      <div class="container__left">
        <router-link to="classement" class="btn btn--green btn--round"><img src="/images/Classement.svg" aria-label="aller au classement"></router-link>
        <ToggleLanguage />
      </div>
      <div class="container__middle">
        <div class="ensemble-logo">
          <img src="/public/images/logo.svg" alt="logo froggy grenouille" draggable="false" class="logo-frog">
          <img src="/public/images/logo-froggy.svg" draggable="false" alt="Logo texte" class="logo-froggy">
        </div>
        <div class="container__middle__buttons">
          <div class="btn btn--green btn--select" @click="toggleDropdown" aria-label="selectionner la difficulté">
            {{ selectedDifficultyLabel }}
            <div v-if="isDropdownOpen" class="dropdown">
              <div class="option" @click="selectDifficulty('facile')">{{$t('home.facile')}}</div>
              <div class="option" @click="selectDifficulty('moyen')">{{$t('home.moyen')}}</div>
              <div class="option" @click="selectDifficulty('difficile')">{{$t('home.difficile')}}</div>
            </div>
          </div>
          <button @click="playGame" class="btn btn--green btn--select" aria-label="jouer">{{ $t("home.jouer") }}</button>
        </div>
        <router-link to="/mentions-legales" class="at-bottom"><p class="underline">{{ $t("home.mentionsLegales") }}</p></router-link>
      </div>
      <div class="container__right">
        <router-link to="/profil" class="btn btn--green btn--round btn--round--col"><img src="/images/Profil.svg" aria-label="voir le profil"></router-link>
        <router-link to="/regles" class="btn btn--green btn--round"><img src="/images/Rules.svg" aria-label="règles"></router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import ToggleLanguage from '../components/ToggleLanguage.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isDropdownOpen = ref(false);
const selectedDifficulty = ref('facile');
const selectedDifficultyLabel = ref('Facile');
const router = useRouter();

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectDifficulty = (difficulty) => {
  selectedDifficulty.value = difficulty;
  isDropdownOpen.value = false;
  updateSelectedDifficultyLabel(difficulty);
};

const updateSelectedDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case 'facile':
      selectedDifficultyLabel.value = 'Facile';
      break;
    case 'moyen':
      selectedDifficultyLabel.value = 'Moyen';
      break;
    case 'difficile':
      selectedDifficultyLabel.value = 'Difficile';
      break;
    default:
      selectedDifficultyLabel.value = 'Facile';
  }
};

const playGame = () => {
  const selected = selectedDifficulty.value;
  switch (selected) {
    case 'facile':
      router.push('/facile');
      break;
    case 'moyen':
      router.push('/moyen');
      break;
    case 'difficile':
      router.push('/difficile');
      break;
    default:
      router.push('/facile');
  }
};
</script>

<style>
/* Ajoutez votre style ici */
</style>
