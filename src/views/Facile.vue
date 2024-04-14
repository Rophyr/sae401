<!-- Facile.vue -->
<template>
  <FacileComponent />
</template>
<script>
  import FacileComponent from '@/components/FacileComponent.vue'
  // import messages from '../js/messages.js';
  
  export default {
    methods: {
      goToMenu() {
        this.$router.push('/homepage');
      }
    },
    components: {
      FacileComponent,
    },
  }


</script>
<style scoped>
@import url('https://fonts.cdnfonts.com/css/simply-rounded');

</style>