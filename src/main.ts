// @ts-nocheck
import './style.scss'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import Favorites from './components/Favorites.vue'
import Home from './components/Home.vue'
import People from './components/People.vue'
import Person from './components/Person.vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/people',
    component: People,
    name: 'people',
  },
  {
    path: '/people/:id',
    component: Person,
    name: 'person',
  },
  {
    path: '/favorites',
    component: Favorites,
    name: 'favorites',
  },
]

const router = createRouter({
  history: createWebHistory('/l365'),
  routes,
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')