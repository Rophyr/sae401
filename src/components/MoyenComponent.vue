<template>
  <div id="app" class="jeux jeux--moyen">
    <div class="container container__facile">
      <div class="container__left">
        <div  class="explain explain--moyen">
          <div class="word">
            <span class="FroggyDesc" v-for="(letter, index) in word" :key="index" :style="{ color: getColorByIndex(index) }">{{ letter }}</span>
          </div>
          <p class="description">{{ cardDescription }}</p>
          <div class="row">
            <img draggable="false" src="/public/images/grenouille lunettes.svg" alt="icon grenouille lunette">
            <div  @click="playSound()" class="no-btn  no-btn--sound no-btn--sound--orange"></div>
          </div>
        </div>
        <router-link to="/" class="btn btn--moyen btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle container__middle--moyen">
        <div id="jeu" class="grid grid--moyen game">
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
              <p class="orange-p"> {{ displayTime }}</p>
              <button @click="displayTimer()" class="no-btn no-btn--timer no-btn--timer--orange"></button> <!-- ici -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="victory victory--orange orange">
    <p id="vic-text" class="dark-orange-p">Bravo !</p>
    <!-- <div class="separation"></div> -->
    <p>
      Tu as mis {{ gameTime }} pour réaliser le niveau moyen.
    </p>
    <form @submit.prevent="submitPseudo" class="">
      <input type="text" v-model="pseudo" placeholder="Entrez votre pseudo" required />
      <button type="submit" class="btn btn--green">Envoyer</button>
    </form>
    <button class="btn btn--moyen" aria-label="recommencer une partie">Nouvelle partie</button>
    <button @click="goToMenu"  class="btn btn--green--yellow">Accueil</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import jsonDataEn from '../../public/data/objectDescription_en.json';
import jsonDataFr from '../../public/data/objectDescription_fr.json';

const time = ref('');
const difficulty = ref('medium');
const pseudo = ref('');

const submitPseudo = async () => {
  try {
    const response = await axios.post('https://mmi22c07-2.h205.online/api/classements', {
      time: displayTime.value,
      difficulty: difficulty.value,
      pseudo: pseudo.value
    }, {
      headers: {
        'Content-Type': 'application/ld+json'
      }
    });
    console.log('Pseudo envoyé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du pseudo :', error);
  }
};
const language = localStorage.getItem('lang');
let langAudio = '';
let cardSound = '';

let jsonData;

if (language === 'fr') {
  jsonData = jsonDataFr;
  langAudio = '_fr.mp3';

} else {
  jsonData = jsonDataEn;
  langAudio = '_en.mp3';
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


const rows = 4;
const columns = 5;
const totalCards = rows * columns;
const numEachType = totalCards / 10;

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
        if (winCount === 10) {
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
          cardSound = matchingCard.name;
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
  return "/images/moyen/back.svg";
}
function getBackImagePath(rowIndex, cardIndex) {
  const types = [
    { image: "/images/moyen/arrosoir.svg", count: 0 },
    { image: "/images/moyen/biomasse.svg", count: 0 },
    { image: "/images/moyen/courgette.svg", count: 0 },
    { image: "/images/moyen/eolienne.svg", count: 0 },
    { image: "/images/moyen/fourche.svg", count: 0 },
    { image: "/images/moyen/seau.svg", count: 0 },
    { image: "/images/moyen/hydraulique.svg", count: 0 },
    { image: "/images/moyen/pelle.svg", count: 0 },
    { image: "/images/moyen/solaire.svg", count: 0 },
    { image: "/images/moyen/tomate.svg", count: 0 }
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
    case "/arrosoir.svg":
      numArrosoir++;
      break;
    case "/biomasse.svg":
      numBiomasse++;
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

  return selectedType.image;
}
let numArrosoir = 0;
let numBiomasse = 0;
let numCourgette = 0;
let numEolienne = 0;
let numFourche = 0;
let numSeau = 0;
let numHydro = 0;
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

// Audio pour les cartes
let audio = null;

function playSound() {
  console.log("A appuyer sur le bouton pour le son");
  console.log(cardSound);
  console.log("Card sound:", cardSound); // Afficher le son de la carte

  const button = document.querySelector('.no-btn--sound'); // Sélectionnez le bouton une fois pour réutiliser

  if (audio && !audio.paused) {
    // Si l'audio est en cours de lecture, l'arrêter
    audio.pause();
    console.log("Audio stopped");
    button.classList.remove('no-btn--sound--pause--yellow');
    button.classList.add('no-btn--sound--play--yellow');
  } else {
    // Sinon, démarrer l'audio
    audio = new Audio("../../public/sounds/" + cardSound + langAudio);
    audio.play();
    console.log("Audio started");
    button.classList.remove('no-btn--sound--play--yellow');
    button.classList.add('no-btn--sound--pause--yellow');
    // Ajoutez un événement pour réinitialiser le bouton lorsque l'audio est terminé
    audio.addEventListener('ended', function() {
      console.log("Audio ended");
      button.classList.remove('no-btn--sound--pause--yellow');
      button.classList.add('no-btn--sound--play--yellow');
    });
  }
}

//fin audio pour les cartes


// Arreter de display le timer

function displayTimer() {
  clearInterval(horloge.value);
  const timerElement = document.getElementsByClassName('timer')[0];
  timerElement.style.display = "none";
  const displayTimeVictory = document.getElementById('display-time-victory');
  displayTimeVictory.style.display = "none";
}

// Fin arreter de display le timer
</script>