import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from  '../views/HomeView.vue'
import LiveView from '../views/LiveView.vue'
import Tenisaci from '../views/TenisaciView.vue'
import About from  '../views/AboutView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/live',
    name: 'live',
    component: LiveView
  },
{ 
  path: '/tenisaci',
  name: 'Tenisaci',
  component: Tenisaci
},
  {
    path: '/about',
    name: 'about',
    component: About
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
