<template>
  <div id="app" class="facile">
    <div class="container container__facile">
      <!-- <img src="/froggy.png" alt="logo" class="logo"> -->

      <div class="container__top">
        <Timer/>
      </div>

      <div class="container__middle">

        <div v-if="objectDescription" class="object-description">
          {{ objectDescription }}
        </div>

        <div class="grid"> <!-- JEU -->
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

      <div class="container__bottom">
        <button @click="goToMenu" class="btn btn--green btn--round"><img src="/images/back_door.svg" alt=""></button>
      <p id="timer"></p>
      </div>

    </div>
    </div>

      <div id="victory">
        <p id="vic-text">Félicitations, tu as réussi(e) !</p>
      </div>
</template>
<script setup>
import Timer from '../components/Timer.vue'
import '../assets/styles.css';  //link css / scss
import { ref } from 'vue';

import objectsData from '../../public/data/objectDescription.json';
const objectDescription = ref('');

const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

let winCount = 0;

const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({ isFlipped: false, backImagePath: '' }))));

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
        if(winCount === 6){
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
  return "/card.png";
}

// eslint-disable-next-line no-unused-vars
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/rateau.png", count: 0 },
    { image: "/arrosoir.png", count: 0 },
    { image: "/elec.png", count: 0 },
    { image: "/rotten.png", count: 0 },
    { image: "/trash.png", count: 0 },
    { image: "/velo.png", count: 0 }
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
    case "/rateau.png":
      numRateau++;
      break;
    case "/arrosoir.png":
      numArrosoir++;
      break;
    case "/elec.png":
      numElec++;
      break;
    case "/rotten.png":
      numRotten++;
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
let numElec = 0;
// eslint-disable-next-line no-unused-vars
let numRotten = 0;
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

body {
  overflow: hidden;
  /* background-image: url("/homepagebg.png"); */
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: center;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  position: absolute;
  margin: 30px 0;
  width: 250px;
  height: 80px;
  top: 10px;
  left: 10px;
}

.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
}

.container {
  margin: 5px;
  perspective: 1000px;
}

.card {
  margin: 10px;
  width:  10.417vw;
  height:  10.417vw ;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card.active {
  transform: rotateY(180deg);
}

.card.active:hover {
  transform: scale(1.05) rotateY(180deg);
}

.front,
.back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
}

.front {
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}

img {
  width: 100%;
  height: 100%;
}

.btn-menu {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>