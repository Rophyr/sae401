<template>
  <div id="app" class="jeux jeux--moyen">
    <div class="container container__facile container--moyen">
      <div class="container__left">
        <div class="logo-bg-white">
          <img src="/public/images/logo-glasses.svg" alt="">
        </div>
        <div  class="object-description explain explain--moyen">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
        </div>
        <button @click="goToMenu" class="btn btn--moyen btn--round btn--round--col"><img src="/images/back_door.svg" alt=""></button>
      </div>
      <div class="container__middle">
        <div class="grid grid--moyen">
          <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
            <div class="container" v-for="(card, cardIndex) in row" :key="cardIndex" @click="flipCard(rowIndex, cardIndex)">
              <div class="card" :class="{ active: card.isFlipped }">
                <div class="front">
                  <img draggable="false" :src="getCardImagePath(rowIndex, cardIndex)">
                </div>
                <div class="back">
                  <img draggable="false" :src="card.backImagePath" alt="Back face">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container__right">
        <div class="timer">
          <p> {{ displayTime }}</p>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" style="display: none">
    <p id="vic-text">Bravo !</p>
    <div class="separation"></div>
    <p>
      Félicitations ! <br><br>
      Tu as mis {{ gameTime }} pour réaliser le niveau moyen
    </p>
    <button class="btn btn--green" aria-label="recommencer une partie">Nouvelle partie</button>
    <router-link to="/" class="btn btn--green">Accueil</router-link>
  </div>
</template>
 <script setup>
import '../assets/styles.css';  //link css / scss
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const word = "FROGGY";
const colors = ['#E2A340FF', '#D3715BFF', '#228AB9FF', '#4C8B25FF'];

function getColorByIndex(index) {
  return colors[index % colors.length];
}

const horloge = ref(null);
const minutes = ref(0);
const secondes = ref(0);
const startTimer = () => {
  horloge.value = setInterval(() => {
    secondes.value++;
    if (secondes.value === 60) {
      minutes.value++;
      secondes.value = 0;
    }
  }, 1000);
};
const stopTimer = () => {
  clearInterval(horloge.value);
};
onMounted(() => {
  startTimer();
});
onBeforeUnmount(() => {
  stopTimer();
});
const displayTime = computed(() => {
  return `${minutes.value < 10 ? '0' + minutes.value : minutes.value}:${secondes.value < 10 ? '0' + secondes.value : secondes.value}`;
});
const gameTime = computed(() => {
  return `${minutes.value < 1 ? '' + '' : ''}${secondes.value + ' secondes'}`;
})

const rows = 4;
const columns = 5;
const totalCards = rows * columns;
const numEachType = totalCards / 10; // Il y a 10 types de cartes

let winCount = 0;

const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({ isFlipped: false, backImagePath: '' }))));

let flippedCard = null;

import jsonData from '../../public/data/objectDescription.json';
let cardDescription = ''; // Ajout d'une variable pour stocker la description de la carte


function flipCard(rowIndex, cardIndex) {
  const card = grid.value[rowIndex][cardIndex];

  if (!card.isFlipped) {
    card.isFlipped = true;

    if (!flippedCard) {
      flippedCard = { rowIndex, cardIndex, backImagePath: card.backImagePath };
    } else {
      const { rowIndex: prevRowIndex, cardIndex: prevCardIndex, backImagePath: prevBackImagePath } = flippedCard;

      if (rowIndex === prevRowIndex && cardIndex === prevCardIndex) {
        return;
      }

      if (card.backImagePath === prevBackImagePath) {
        grid.value[prevRowIndex][prevCardIndex].isFlipped = true;
        card.isFlipped = true;
        winCount++;
        if (winCount === 10) {
          document.getElementById('victory').style.display = "flex";
          stopTimer();
        }
        let cardName = card.backImagePath.split('/').pop().split('.')[0];
        const matchingCard = jsonData.text.find(item => item.name === cardName);
        if (matchingCard) {
          cardName = matchingCard.name;
          cardDescription = matchingCard.description;
        } else {
        }
      } else {
        setTimeout(() => {
          grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
          card.isFlipped = false;
        }, 500);
      }

      flippedCard = null;
    }
  }
}
// eslint-disable-next-line no-unused-vars
function getCardImagePath(rowIndex, cardIndex) {
  return "/images/moyen/back.svg";
}

// eslint-disable-next-line no-unused-vars
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/moyen/arrosoir.svg", count: 0 },
    { image: "/images/moyen/biomasse.svg", count: 0 },
    { image: "/images/moyen/courgette.svg", count: 0 },
    { image: "/images/moyen/eolienne.svg", count: 0 },
    { image: "/images/moyen/fourche.svg", count: 0 },
    { image: "/images/moyen/seau.svg", count: 0 },
    { image: "/images/moyen/hydraulique.svg", count: 0 },
    { image: "/images/moyen/pelle.svg", count: 0 },
    { image: "/images/moyen/solaire.svg", count: 0 },
    { image: "/images/moyen/tomate.svg", count: 0 }
  ];

  for (let i = 0; i < grid.value.length; i++) {
    for (let j = 0; j < grid.value[i].length; j++) {
      const backImagePath = grid.value[i][j].backImagePath;
      const index = types.findIndex(type => type.image === backImagePath);
      if (index !== -1) {
        types[index].count++;
      }
    }
  }

  let selectedType = null;
  do {
    const randomIndex = Math.floor(Math.random() * types.length);
    if (types[randomIndex].count < numEachType) {
      selectedType = types[randomIndex];
      selectedType.count++;
    }
  } while (!selectedType);

  switch (selectedType.image) {
    case "/arrosoir.svg":
      numArrosoir++;
      break;
    case "/biomasse.svg":
      numBiomasse++;
      break;
    case "/courgette.svg":
      numCourgette++;
      break;
    case "/eolienne.svg":
      numEolienne++;
      break;
    case "/fourche.svg":
      numFourche++;
      break;
    case "/seau.svg":
      numSeau++;
      break;
    case "/hydraulique.svg":
      numHydro++;
      break;
    case "/pelle.svg":
      numPelle++;
      break;
    case "/solaire.svg":
      numSolaire++;
      break;
    case "/tomate.svg":
      numTomate++;
      break;
  }

  return selectedType.image;
}
let numArrosoir = 0;
let numBiomasse = 0;
let numCourgette = 0;
let numEolienne = 0;
let numFourche = 0;
let numSeau = 0;
let numHydro = 0;
let numPelle = 0;
let numSolaire = 0;
let numTomate = 0;

for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}

</script>
<script>

import '../assets/styles.css';  //link css / scss

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

</style>