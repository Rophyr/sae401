import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../App.vue'
import Facile from '../views/Facile.vue'
import Moyen from '../views/Moyen.vue'
import Difficile from '../views/Difficile.vue'
/*import Profil from '../views/Profil.vue'
import Regles from '../views/Regles.vue'*/

const routes = [
  { path: '/', component: HomePage },
  { path: '/facile', component: Facile },
  { path: '/moyen', component: Moyen },
  { path: '/difficile', component: Difficile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router