import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Facile from '../views/Facile.vue'
import Moyen from '../views/Moyen.vue'
import Difficile from '../views/Difficile.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const routes = [
  // Redirection automatique vers la page d'accueil
  { path: '/', redirect: '/homepage' },
  { path: '/homepage', component: HomePage },
  { path: '/facile', component: Facile },
  { path: '/moyen', component: Moyen },
  { path: '/difficile', component: Difficile },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
