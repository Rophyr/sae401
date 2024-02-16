<template>
  <div id="app">
    <img src="/froggy.png" alt="logo" class="logo">

    <div class="grid">
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

    <button @click="goToMenu" class="btn btn-menu"><img src="/back.png" alt=""></button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

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
      } else {
        grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
        grid.value[rowIndex][cardIndex].isFlipped = false;
      }

      flippedCard = null;
    }
  }
}

function getCardImagePath(rowIndex, cardIndex) {
  return "/card.png";
}

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

let numRateau = 0;
let numArrosoir = 0;
let numElec = 0;
let numRotten = 0;
let numTrash = 0;
let numVelo = 0;

for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}
</script>

<script>
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
  background-image: url("/homepagebg.png");
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