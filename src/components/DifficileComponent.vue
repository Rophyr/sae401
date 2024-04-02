<template>
  <div id="app" class="jeux jeux--difficile">
    <div class="container container__difficile">
      <div class="container__left">
        <div  class="explain explain--difficile">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
          <div class="row">
            <img draggable="false" src="/images/grenouille lunettes.svg" alt="icon grenouille lunette">
            <button class="no-btn"><img draggable="false" src="/images/son_rouge.svg" alt="icon allumer le son"></button>
          </div>
        </div>
        <router-link to="/" class="btn btn--difficile btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
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
              <p class="rouge-p"> {{ displayTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="rouge">
    <p id="vic-text" class="rouge-p">Bravo !</p>
    <div class="separation"></div>
    <p>
      Tu as mis {{ gameTime }} pour réaliser le niveau moyen.
    </p>
    <button class="btn btn--difficile" aria-label="recommencer une partie">Nouvelle partie</button>
    <button @click="goToMenu"  class="btn btn--green">Accueil</button>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import jsonDataEn from '../../public/data/objectDescription.json';
import jsonDataFr from '../../public/data/objectDescription_en.json';

const language = localStorage.getItem('lang');

let jsonData;

if (language === 'fr') {
  jsonData = jsonDataFr;
} else {
  jsonData = jsonDataEn;
}

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
  const minute = minutes.value;
  const second = secondes.value;
  if (minute < 1) {
    return `${minute < 1 ? '' + '' : ''}${second + ' secondes'}`;
  } else if (minute > 1) {
    return `${minute + ' minutes et '}${second + ' secondes'}`;
  } else {
    return `${minute + ' minute et '}${second + ' secondes'}`;
  }
});


const rows = 5;
const columns = 6;
const totalCards = rows * columns;
const numEachType = totalCards / 30;

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
        if (winCount === 30) {
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
  return "/images/difficile/back.svg";
}
function getBackImagePath(rowIndex, cardIndex) {
  let rowCount = 0; // Initialisation du compteur pour les lignes
  let columnCount = 0; // Initialisation du compteur pour les colonnes
  
  console.log('Début de la fonction getBackImagePath'); // Ajout d'un console.log pour indiquer le début de la fonction

  const types = [
    { image: "/images/difficile/arrosoir.svg", count: 0 },
    { image: "/images/difficile/balais.svg", count: 0 },
    { image: "/images/difficile/carotte.svg", count: 0 },
    { image: "/images/difficile/courgette.svg", count: 0 },
    { image: "/images/difficile/eolienne.svg", count: 0 },
    { image: "/images/difficile/feuilles.svg", count: 0 },
    { image: "/images/difficile/hydraulique.svg", count: 0 },
    { image: "/images/difficile/geothermique.svg", count: 0 },
    { image: "/images/difficile/laitue.svg", count: 0 },
    { image: "/images/difficile/oeuf.svg", count: 0 },
    { image: "/images/difficile/pelle.svg", count: 0 },
    { image: "/images/difficile/rateau.svg", count: 0 },
    { image: "/images/difficile/seau.svg", count: 0 },
    { image: "/images/difficile/solaire.svg", count: 0 },
    { image: "/images/difficile/tomate.svg", count: 0}
  ];

  for (let i = 0; i < grid.value.length; i++) {
    rowCount++; // Incrémenter le compteur à chaque itération de la boucle des lignes pour debug
    for (let j = 0; j < grid.value[i].length; j++) {
        columnCount++; // Incrémenter le compteur à chaque itération de la boucle des colonnes pour debug
        const backImagePath = grid.value[i][j].backImagePath;
        const index = types.findIndex(type => type.image === backImagePath);
        if (index !== -1) {
            types[index].count++;
        }
        if (columnCount > 2) {
            break; // Arrêter la boucle si columnCount dépasse 2
        }
    }
    // Réinitialiser columnCount pour la prochaine itération de la boucle externe
    columnCount = 0;
    if (rowCount > 2) {
        break; // Arrêter la boucle externe si rowCount dépasse 2
    }
}


  console.log('Nombre d\'itérations de la boucle des lignes :', rowCount);
  console.log('Nombre d\'itérations de la boucle des colonnes :', columnCount);

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
    case "/balais.svg":
      numBalais++;
      break;
    case "/carotte.svg":
      numCarotte++;
      break;
    case "/laitue.svg":
      numLaitue++;
      break;
    case "/feuilles.svg":
      numFeuilles++;
      break;
    case "/oeuf.svg":
      numOeuf++;
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
    case "/geothermique.svg":
      numGeothermique++;
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

  console.log('Fin de la fonction getBackImagePath'); // Ajout d'un console.log pour indiquer la fin de la fonction

  return selectedType.image;
}
let numArrosoir = 0;
let numBalais = 0;
let numCarotte = 0;
let numLaitue = 0;
let numFeuilles = 0;
let numOeuf = 0;
let numCourgette = 0;
let numEolienne = 0;
let numFourche = 0;
let numSeau = 0;
let numHydro = 0;
let numGeothermique = 0;
let numPelle = 0;
let numSolaire = 0;
let numTomate = 0;

for (let i = 0; i < grid.value.length; i++) {
  for (let j = 0; j < grid.value[i].length; j++) {
    grid.value[i][j].backImagePath = getBackImagePath(i, j);
  }
}
function getCardAlt(imagePath) {
  return "Carte " + imagePath.split('/').pop().split('.')[0];
}
</script>
