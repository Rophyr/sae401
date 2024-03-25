<template>
  <div id="jeu" class="grid game"> <!-- JEU -->
    <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div class="container" v-for="(card, cardIndex) in row" :key="cardIndex" @click="flipCard(rowIndex, cardIndex)">
        <div class="card" :class="{ active: card.isFlipped }">
          <div class="front">
            <img draggable="false" :src="getCardImagePath(rowIndex, cardIndex)" alt="carte retournée">
          </div>
          <div class="back">
            <img draggable="false" :src="card.backImagePath" :alt="getCardAlt(card.backImagePath)">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="container__right">
      <div class="timer">
        <p> {{ displayTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import objectsData from '../../public/data/objectDescription.json';

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

const objectDescription = ref('');
const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6;

let winCount = 0;
const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({
  isFlipped: false,
  backImagePath: ''
}))));
let flippedCard = null;
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
        const objectName = card.backImagePath.split("/").pop().split(".")[0];

        objectDescription.value = objectsData[objectName];
        if (winCount === 6) {
          document.getElementById('jeu').style.display = "none";
          document.getElementById('victory').style.display = "flex";
          stopTimer();
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
function getCardImagePath(rowIndex, cardIndex) {
  return "/images/facile/back-facile.svg";
}
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/facile/vert-arrosoir.svg", count: 0 },
    { image: "/images/facile/vert-biomasse.svg", count: 0 },
    { image: "/images/facile/vert-courgette.svg", count: 0 },
    { image: "/images/facile/vert-eolie.svg", count: 0 },
    { image: "/images/facile/vert-fourche.svg", count: 0 },
    { image: "/images/facile/vert-geo.svg", count: 0 }
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
    case "/images/facile/vert-arrosoir.svg":
      numArrosoir++;
      break;
    case "/images/facile/vert-biomasse.svg":
      numBiomasse++;
      break;
    case "/images/facile/vert-courgette.svg":
      numCourgette++;
      break;
    case "/images/facile/vert-eolie.svg":
      numEolie++;
      break;
    case "/images/facile/vert-fourche.svg":
      numFourche++;
      break;
    case "/images/facile/vert-geo.svg":
      numGeo++;
      break;
  }
  return selectedType.image;
}
let numArrosoir = 0;
let numBiomasse = 0;
let numCourgette = 0;
let numEolie = 0;
let numFourche = 0;
let numGeo = 0;

for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}
function getCardAlt(imagePath) {
  return "Carte " + imagePath.split('/').pop().split('.')[0];
}
</script>