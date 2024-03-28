import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from '../src/js/messages'; // Importez vos messages de traduction

const i18n = createI18n({
  locale: 'fr', // Langue par défaut
  messages
});

createApp(App)
  .use(router)
  .use(i18n) // Utilisez Vue i18n dans votre application
  .mount('#app');
