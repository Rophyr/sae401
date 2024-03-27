<template>
  <button @click="toggleLanguage" class="language-switch">
    <div class="switch" :class="{ 'switch-en': currentLanguage === 'en', 'switch-fr': currentLanguage === 'fr' }"></div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: localStorage.getItem('lang') || 'en' // Récupérer la langue actuellement sélectionnée depuis le stockage local
    };
  },
  methods: {
    toggleLanguage() {
      const newLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
      this.currentLanguage = newLanguage;
      localStorage.setItem('lang', newLanguage); // Stocker la nouvelle langue sélectionnée dans le stockage local
      this.$i18n.locale = newLanguage; // Mettre à jour la langue dans l'instance de VueI18n
    }
  }
};
</script>
  
  <style scoped>
  .language-switch {
    position: relative;
    top: 20px;
    left: 20px;
    width: 60px; /* Ajustez la largeur selon vos besoins */
    height: 30px; /* Ajustez la hauteur selon vos besoins */
    background-color: #ccc;
    border-radius: 15px;
    cursor: pointer;
  }
  
  .switch {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
  
  .switch-en {
    left: 0;
  }
  
  .switch-fr {
    left: 50%;
  }
  </style>
  