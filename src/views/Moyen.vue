<template>
  <div id="app" class="jeux jeux--moyen">
    <div class="container container__facile container--moyen">
      

      <div class="container__left">

        <div class="logo-bg-white">
          <img src="/public/images/logo-glasses.svg" alt="">
        </div>
        
        <div  class="object-description explain explain--moyen">
            
          <div class="word">
            <span v-for="(letter, index) in word" :key="index" :class="'lettre-' + index">{{ letter }}</span>
          </div>


              <p>{{ objectDescription }}</p>
            
          </div>


        <button @click="goToMenu" class="btn btn--moyen btn--round btn--round--col"><img src="/images/back_door.svg" alt=""></button>
        
      </div>

      <div class="container__middle">

        

        <div class="grid grid--moyen"> <!-- JEU -->
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
        </div> <!-- Fin JEU -->



      </div>

      <div class="container__right">
      </div>

    </div>
  </div>

  <div id="victory">
    <p id="vic-text">Félicitations, tu as réussi(e) ! <span id="time"></span></p>
  </div>
</template>

<script setup>
import '../assets/styles.css';  //link css / scss
import { ref } from 'vue';
import objectsData from '../../public/data/objectDescription.json';
const objectDescription = ref('');
// let word = "RATEAU"; //debug

const rows = 4;
const columns = 5;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

let winCount = 0;

const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({ isFlipped: false, backImagePath: '' }))));

let flippedCard = null;

// eslint-disable-next-line no-unused-vars

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
        if(winCount === 10){
          document.getElementById('victory').style.height = "100px";
          document.getElementById('victory').style.width = "300px";
          document.getElementById('vic-text').style.transitionDelay = "300ms";
          document.getElementById('vic-text').style.fontSize = "30px";
        }
      } else {
        // Retourner les cartes après une pause de 0.5 seconde
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
  return "/images/moyen/back-inter.svg";
}

// eslint-disable-next-line no-unused-vars
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/moyen/orange-rateau.svg", count: 0 },
    { image: "/images/moyen/orange-arrosoir.svg", count: 0 },
    { image: "/images/moyen/orange-pelle.svg", count: 0 },
    { image: "/images/moyen/orange-solaire.svg", count: 0 },
    { image: "/images/moyen/trash.png", count: 0 },
    { image: "/images/moyen/velo.png", count: 0 }
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
    case "/orange-rateau.svg":
      numRateau++;
      break;
    case "/orange-arrosoir.svg":
      numArrosoir++;
      break;
    case "/orange-solaire.svg":
      numSolaire++;
      break;
    case "/orange-pelle.svg":
      numPelle++;
      break;
    case "/trash.png":
      numTrash++;
      break;
    case "/velo.png":
      numVelo++;
      break;
  }

  return selectedType.image;
}
// eslint-disable-next-line no-unused-vars
let numRateau = 0;
// eslint-disable-next-line no-unused-vars
let numArrosoir = 0;
// eslint-disable-next-line no-unused-vars
let numSolaire = 0;
// eslint-disable-next-line no-unused-vars
let numPelle = 0;
// eslint-disable-next-line no-unused-vars
let numTrash = 0;
// eslint-disable-next-line no-unused-vars
let numVelo = 0;

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