<template>
  <div id="app" class="jeux jeux--facile">
    <div class="container container__facile">
      

      <div class="container__left">
        <router-link to="/"><img src="/public/images/logo_glasses.svg" alt=""></router-link>
        
        <div  class="object-description explain">
            
          <div class="word">
            <span v-for="(letter, i) in word" :key="i" :class="'lettre-' + i">{{ letter }}</span>
          </div>


              <p>{{ objectDescription }}</p>
            
          </div>

        <button @click="goToMenu" class="btn btn--green btn--round btn--round--col"><img src="/images/back_door.svg" aria-label="retourner au menu"></button>
      
      </div> <!-- Fin container left -->

      <div class="container__middle">

        <div class="grid game"> <!-- JEU -->
          <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
            <div class="container" v-for="(card, cardIndex) in row" :key="cardIndex" @click="flipCard(rowIndex, cardIndex)">
              <div class="card" :class="{ active: card.isFlipped }">
                <div class="front">
                  <img draggable="false" :src="getCardImagePath(rowIndex, cardIndex)" alt="carte retourné">
                </div>
                <div class="back">
                  <img draggable="false" :src="card.backImagePath" alt="Back face" :alt="carte">
                </div>
              </div>
            </div>
          </div>
        </div> <!-- Fin JEU -->
      </div>

      <div class="container__right">
        
        <Timer ref="timerComponent"/>
        <!-- <p id="timer"></p> -->
      </div>

    </div>

  </div>

  <div id="victory">
    <p id="vic-text">Félicitations, tu as réussi(e) ! <span id="time"></span></p>
  </div>


</template>


<script setup>
import Timer from '../components/Timer.vue'
import '../assets/styles.css';  //link css / scss
import { ref } from 'vue';
import objectsData from '../../public/data/objectDescription.json';
const objectDescription = ref('');
let word = "RATEAU"; //debug

const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

let winCount = 0;

const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({ isFlipped: false, backImagePath: '' }))));

let flippedCard = null;
let timerComponent = null;

// eslint-disable-next-line no-unused-vars
// let timerComponent = null;

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
          timerComponent.stopTimer();
          console.log('Recommencer')
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
  return "/images/facile/back-facile.svg";
}

// eslint-disable-next-line no-unused-vars
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/facile/vert-rateau.svg", count: 0 },
    { image: "/images/facile/vert-arrosoir.svg", count: 0 },
    { image: "/images/facile/vert-pelle.svg", count: 0 },
    { image: "/images/facile/vert-solaire.svg", count: 0 },
    { image: "/images/facile/trash.png", count: 0 },
    { image: "/images/facile/velo.png", count: 0 }
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
    case "/vert-rateau.svg":
      numRateau++;
      break;
    case "/vert-arrosoir.svg":
      numArrosoir++;
      break;
    case "/vert-solaire.svg":
      numSolaire++;
      break;
    case "vert-pelle.svg":
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