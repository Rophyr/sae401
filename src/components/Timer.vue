<template>
  <div class="timer">
    <p>{{ formattedMinutes }}:{{ formattedSecondes }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      horloge: null,
      secondes: 0,
      minutes: 0,
    };
  },
  computed: {
    formattedSecondes() {
      return this.secondes < 10 ? '0' + this.secondes : this.secondes;
    },
    formattedMinutes() {
      return this.minutes < 10 ? '0' + this.minutes : this.minutes;
    }
  },
  methods: {
    timerhorloge() {
      this.horloge = setInterval(() => {
        this.secondes++;
        if (this.secondes === 60) {
          this.minutes++;
          this.secondes = 0;
        }
        if (this.minutes === 0){
          document.getElementById("time").textContent = this.minutes + ":" + this.secondes;
        }
        else{
          document.getElementById("time").textContent = this.minutes + ":" + this.secondes;
        }
      }, 1000); // Une seconde
    },
    stopTimer() {
      clearInterval(this.horloge);
    }
  },
  mounted() {
    this.timerhorloge();
  },
  beforeDestroy() {
    this.stopTimer();
  }
};
</script>

<style scoped>
/* Styles spécifiques au composant Timer.vue */
</style>
