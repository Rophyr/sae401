<template>
  <div id="app" class="jeux jeux--difficile">
    <div class="container container__facile container--difficile">
      

      <div class="container__left">

        <router-link to="/"><img src="/public/images/logo_glasses.svg" alt=""></router-link>
        
        <div  class="object-description explain explain--difficile">
            
          <div class="word">
            <span v-for="(letter, index) in word" :key="index" :class="'lettre-' + index">{{ letter }}</span>
          </div>


              <p>{{ objectDescription }}</p>
            
          </div>


        <button @click="goToMenu" class="btn btn--difficile btn--round btn--round--col"><img src="/images/back_door.svg" alt=""></button>
        
      </div>

      <div class="container__middle">

        

        <div class="grid grid--difficile">
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
        <Timer ref="timerComponent" class="timer timer--difficile"/>
        
      </div>

    </div>
  </div>

  <div id="victory">
    <p id="vic-text">Félicitations, tu as réussi(e) ! <span id="time"></span></p>
  </div>
</template>

<script setup>
import Timer from '../components/Timer.vue'
import { ref } from 'vue';

const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({ isFlipped: false, backImagePath: '' }))));

let flippedCard = null;

function flipCard(rowIndex, cardIndex) {
  console.log("Clicked card:", rowIndex, cardIndex);

  const card = grid.value[rowIndex][cardIndex];

  if (!card.isFlipped) {
    console.log("Flipping card...");

    card.isFlipped = true;

    if (!flippedCard) {
      flippedCard = { rowIndex, cardIndex, backImagePath: card.backImagePath };
      console.log("First card flipped:", flippedCard);
    } else {
      const { rowIndex: prevRowIndex, cardIndex: prevCardIndex, backImagePath: prevBackImagePath } = flippedCard;
      console.log("Second card flipped:", rowIndex, cardIndex);

      if (rowIndex === prevRowIndex && cardIndex === prevCardIndex) {
        return; // Ne rien faire si la même carte est retournée
      }

      if (card.backImagePath === prevBackImagePath) {
        // Les deux cartes ont la même backface, elles disparaissent
        grid.value[prevRowIndex][prevCardIndex].isFlipped = true;
        card.isFlipped = true;
        console.log("Matching backfaces!");
      } else {
        // Les deux cartes ont des backfaces différentes, les retourner à leur frontface
        grid.value[prevRowIndex][prevCardIndex].isFlipped = false;
        grid.value[rowIndex][cardIndex].isFlipped = false;
        console.log("Different backfaces, flipping back...");
      }

      flippedCard = null; // Réinitialiser la carte retournée
    }
  }
}

function getCardImagePath(rowIndex, cardIndex) {
  return "/card.png";
}

function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/difficile/rateau.png", count: 0 },
    { image: "/images/difficile/arrosoir.png", count: 0 },
    { image: "/images/difficile/elec.png", count: 0 },
    { image: "/images/difficile/rotten.png", count: 0 },
    { image: "/images/difficile/trash.png", count: 0 },
    { image: "/images/difficile/velo.png", count: 0 }
  ];

  // Compter le nombre d'occurrences de chaque type dans la grille
  for (let i = 0; i < grid.value.length; i++) {
    for (let j = 0; j < grid.value[i].length; j++) {
      const backImagePath = grid.value[i][j].backImagePath;
      const index = types.findIndex(type => type.image === backImagePath);
      if (index !== -1) {
        types[index].count++;
      }
    }
  }

  // Sélectionner un type d'image qui n'a pas encore atteint le nombre maximum de paires
  let selectedType = null;
  do {
    const randomIndex = Math.floor(Math.random() * types.length);
    if (types[randomIndex].count < numEachType) {
      selectedType = types[randomIndex];
      selectedType.count++;
    }
  } while (!selectedType);

  // Incrémenter le compteur du type sélectionné
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

// Assurez-vous que chaque carte a un chemin de backImagePath attribué correctement lors de la création de la grille
for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}
</script>

<style scoped>

body{
  overflow: hidden;
  background-image: url("/homepagebg.png");
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
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card.active {
  transform: rotateY(180deg);
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
</style>
