<script setup>
let horloge = null;
let secondes = 0;
let minutes = 0;

function formatTemps(temps) {
  return temps < 10 ? "0" + temps : temps;
}

function timerhorloge() {
  horloge = setInterval(() => {
    secondes++;
    if (secondes === 60) {
      minutes++;
      secondes = 0;
    }
    console.log(formatTemps(minutes) + ":" + formatTemps(secondes));
  }, 1000); // Une seconde
}

function stopTimer() {
  clearInterval(horloge);
}

timerhorloge();

window.addEventListener('beforeunload', function(event) {
  stopTimer();
});
</script>
