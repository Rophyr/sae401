<template>
  <div id="app" class="jeux jeux--facile">
    <div class="container container__facile">
      <div class="container__left">
        <div  class="explain">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
        </div>
        <router-link to="/" class="btn btn--green btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle">
        <div id="jeu" class="grid game">
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
              <p class="dark-vert-p"> {{ displayTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="vert" style="display: none">
    <p id="vic-text" class="light-vert-p">Bravo !</p>
    <div class="separation"></div>
    <p>
      Félicitations ! <br><br>
      Tu as mis {{ gameTime }} pour réaliser le niveau facile.
    </p>
    <button class="btn btn--green" aria-label="recommencer une partie">Nouvelle partie</button>
    <button @click="goToMenu"  class="btn btn--green">Accueil</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import jsonDataEn from '../../public/data/objectDescription.json';
import jsonDataFr from '../../public/data/objectDescription_en.json';

const word = "FROGGY";
const colors = ['#E2A340FF', '#D3715BFF', '#228AB9FF', '#4C8B25FF'];

const language = localStorage.getItem('lang'); 
console.log(language); 

let jsonData; 

if (language === 'fr') {
  jsonData = jsonDataFr; 
} else {
  jsonData = jsonDataEn; 
}

console.log(jsonData);




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
  if (minutes.value < 1)
  {
    return `${minutes.value < 1 ? '' + '' : ''}${secondes.value + ' secondes'}`;
  }
  else {
    return `${minutes.value + 'minutes et '}${secondes.value + ' secondes'}`;
  }
})

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



let cardName = ''; // Ajout d'une variable pour stocker le nom de la carte
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
        if (winCount === 6) {
          setTimeout(() => {
            grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
            card.isFlipped = false;
          }, 2000);
          document.getElementById('jeu').style.display = "none";
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

function getCardImagePath(rowIndex, cardIndex) {
  return "/images/facile/back.svg";
}
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/facile/arrosoir.svg", count: 0 },
    { image: "/images/facile/biomasse.svg", count: 0 },
    { image: "/images/facile/courgette.svg", count: 0 },
    { image: "/images/facile/eolienne.svg", count: 0 },
    { image: "/images/facile/fourche.svg", count: 0 },
    { image: "/images/facile/geothermique.svg", count: 0 }
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
    case "/images/facile/arrosoir.svg":
      numArrosoir++;
      break;
    case "/images/facile/biomasse.svg":
      numBiomasse++;
      break;
    case "/images/facile/courgette.svg":
      numCourgette++;
      break;
    case "/images/facile/eolienne.svg":
      numEolie++;
      break;
    case "/images/facile/fourche.svg":
      numFourche++;
      break;
    case "/images/facile/geothermique.svg":
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