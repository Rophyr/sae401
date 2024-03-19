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
</template>

<script setup>
import { ref } from 'vue';
import objectsData from '../../public/data/objectDescription.json';

const objectDescription = ref('');


const rows = 3;
const columns = 4;
const totalCards = rows * columns;
const numEachType = totalCards / 6; // Il y a 6 types de cartes

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
          document.getElementById('jeu').style.display = "none"
          document.getElementById('victory').style.display = "flex"
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
    case "/images/facile/vert-rateau.svg":
      numRateau++;
      break;
    case "/images/facile/vert-arrosoir.svg":
      numArrosoir++;
      break;
    case "/images/facile/vert-solaire.svg":
      numSolaire++;
      break;
    case "/images/facile/vert-pelle.svg":
      numPelle++;
      break;
    case "/images/facile/trash.png":
      numTrash++;
      break;
    case "/images/facile/velo.png":
      numVelo++;
      break;
  }

  return selectedType.image;
}

let numRateau = 0;
let numArrosoir = 0;
let numSolaire = 0;
let numPelle = 0;
let numTrash = 0;
let numVelo = 0;

for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}

function getCardAlt(imagePath) {
  // Déterminez l'alt en fonction du chemin de l'image
  // Vous pouvez le personnaliser selon vos besoins
  return "Carte " + imagePath.split('/').pop().split('.')[0];
}
</script>
