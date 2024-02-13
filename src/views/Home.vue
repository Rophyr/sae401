<template>
  <div class="grid">
    <div class="row" v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div class="container" v-for="(card, cardIndex) in row" :key="cardIndex" @click="flipCard(rowIndex, cardIndex)">
        <div class="card" :class="{ active: card.isFlipped }">
          <div class="front">
            <img :src="getCardImagePath(rowIndex, cardIndex)">
          </div>
          <div class="back">
            <img :src="card.backImagePath" alt="Back face">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const grid = ref([
  [{ isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }],
  [{ isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }],
  [{ isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }, { isFlipped: false, backImagePath: '' }]
]);

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
  return "../../public/card.png";
}

function getBackImagePath(rowIndex, cardIndex) {
  if (Math.random() < 0.5) {
    return "../../public/rateau.png"; // Utilise le rateau
  } else {
    return "../../public/arrosoir.png"; // Utilise l'arrosoir
  }
}

// Assurez-vous que chaque carte a un chemin de backImagePath attribué correctement lors de la création de la grille
for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}
</script>

<style scoped>
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
  width: 125px;
  height: 125px;
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
