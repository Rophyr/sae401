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
          <h1 class="text-center">{{ $t('mentionsLegales.title') }}</h1>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t1') }}</p>
            <p>{{ $t('mentionsLegales.p1') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t2') }}</p>
            <p>{{ $t('mentionsLegales.p2') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t3') }}</p>
            <p>{{ $t('mentionsLegales.p3') }}</p>
          </div>
          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t4') }}</p>
            <p>{{ $t('mentionsLegales.p4') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t5') }}</p>
            <p>{{ $t('mentionsLegales.p5') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t6') }}</p>
            <p>{{ $t('mentionsLegales.p6') }}</p>
          </div>

          <div class="text-ab">
            <p class="titre">{{ $t('mentionsLegales.t7') }}</p>
            <p>
              {{ $t('mentionsLegales.p7') }}
              <a href="mailto:john.doe@mmi-troyes.fr">john.doe@mmi-troyes.fr</a>.
            </p>
          </div>
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
