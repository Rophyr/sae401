<template>
  <div id="app" class="mentions">
    <div class="container">
      <div class="container__left">
        <router-link to="/" class="btn btn--round btn--green"
          ><img src="/public/images/back_door.svg" alt="sortir icon"
        /></router-link>
      </div>

      <div class="container__middle">
        <div class="text">
          <h1 class="text-center">{{ $t('regles.title') }}</h1>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t1') }}</p>
            <p>{{ $t('regles.p1') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t2') }}</p>
            <p>{{ $t('regles.p2') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t3') }}</p>
            <p>{{ $t('regles.p3') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t4') }}</p>
            <p>{{ $t('regles.p4') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t5') }}</p>
            <p>{{ $t('regles.p5') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t6') }}</p>
            <p>{{ $t('regles.p6') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('regles.t7') }}</p>
            <p>{{ $t('regles.p7') }}</p>
          </div>

          <p>{{ $t('regles.p8') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/styles.css'
</script>

<style scoped>
.titre {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 1em;
}
</style>
