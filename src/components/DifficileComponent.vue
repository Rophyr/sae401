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
            <div  @click="playSound()" class="no-btn no-btn--sound  no-btn--sound--red"></div>
          </div>
        </div>
        <router-link to="/" class="btn btn--difficile btn--round"><img src="/images/back_door.svg" aria-label="Retourner au menu" alt="Retour au menu"></router-link>
      </div>
      <div class="container__middle container__middle--difficile">
        <div id="jeu" class="grid grid--difficile game">
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
              <button @click="displayTimer()" class="no-btn no-btn--timer no-btn--timer--red"></button> <!-- ici -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="victory" class="victory victory--red rouge">
    <p id="vic-text" class="rouge-p">{{ $t('popUp.bravo') }}</p>
    <!-- <div class="separation"></div> -->
    <p id="display-time-victory">
      {{ $t('popUp.victory1') }} {{ gameTime }} {{ $t('popUp.victory2difficile') }}
    </p>
    <form @submit.prevent="submitPseudo" class="input-classement">
      <input type="text" v-model="pseudo" :placeholder="$t('popUp.placeholder')" required />
      <button type="submit" class="btn btn--difficile">{{$t('popUp.submit')}}</button>
    </form>
    <p class="confirmation-pseudo">{{ $t("popUp.confirmationPseudo") }}</p>
    <button @click="reload" class="btn btn--difficile" aria-label="recommencer une partie">{{ $t('popUp.newPartie') }}</button>
    <button @click="goToMenu"  class="btn btn--difficile">{{$t('popUp.accueil')}}</button>
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import jsonDataEn from '../../public/data/objectDescription_en.json';
import jsonDataFr from '../../public/data/objectDescription_fr.json';

const time = ref('');
const difficulty = ref('hard');
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
    const confirmationPseudo = document.querySelector('.confirmation-pseudo');
    confirmationPseudo.style.display = "block";
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


const rows = 5;
const columns = 6;
const totalCards = rows * columns;
const numEachType = totalCards / 15;

let winCount = ref(0);
const grid = ref(Array.from({ length: rows }, () => Array.from({ length: columns }, () => ({
  isFlipped: false,
  backImagePath: ''
}))));
let flippedCard = null;

let cardDescription = '';

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
        winCount.value++;
        if (winCount.value === 15) {
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
  return "/images/difficile/back.svg";
}

function getBackImagePath(rowIndex, cardIndex) {
  let selectedType = null;
  do {
    const randomIndex = Math.floor(Math.random() * types.length);
    if (types[randomIndex].count < numEachType) {
      selectedType = types[randomIndex];
      selectedType.count++;
    }
  } while (!selectedType);

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

// Initialisation des types d'images
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
    button.classList.remove('no-btn--sound--pause--red');
    button.classList.add('no-btn--sound--play--red');
  } else {
    // Sinon, démarrer l'audio
    audio = new Audio("../../public/sounds/" + cardSound + langAudio);
    audio.play();
    console.log("Audio started");
    button.classList.remove('no-btn--sound--play--red');
    button.classList.add('no-btn--sound--pause--red');
    // Ajoutez un événement pour réinitialiser le bouton lorsque l'audio est terminé
    audio.addEventListener('ended', function() {
      console.log("Audio ended");
      button.classList.remove('no-btn--sound--pause--red');
      button.classList.add('no-btn--sound--play--red');
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
  const timerInput = document.getElementsByClassName('input-classement')[0];
  timerInput.style.display = "none";
}

// Fin arreter de display le timer

function goToMenu(){
  location.href = "/";
}

function reload(){
  location.reload();
}


</script>
