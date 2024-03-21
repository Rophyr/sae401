import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Facile from '../views/Facile.vue'
import Moyen from '../views/Moyen.vue'
import Difficile from '../views/Difficile.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Classement from '../views/Classement.vue'
import Mentions from '../views/MentionsLegales.vue'

const routes = [
  { path: '/', redirect: '/homepage' },
  { path: '/homepage', component: HomePage },
  { path: '/facile', component: Facile },
  { path: '/moyen', component: Moyen },
  { path: '/difficile', component: Difficile },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {path: '/classement', component: Classement},
  {path: '/mentions-legales', component: Mentions}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
