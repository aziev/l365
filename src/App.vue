<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const currentRouteName = computed(() => route.name)
</script>

<template>
  <v-container>
    <nav class="mb-8">
      <router-link to="/">
        <v-btn :color="currentRouteName === 'home' ? 'indigo' : ''">Главная</v-btn>
      </router-link>
      <router-link to="/people">
        <v-btn :color="currentRouteName === 'people' ? 'indigo' : ''">Персонажи</v-btn>
      </router-link>
      <router-link to="/favorites">
        <v-btn :color="currentRouteName === 'favorites' ? 'indigo' : ''">Избранное</v-btn>
      </router-link>
    </nav>
    <router-view/>
  </v-container>
</template>

<style scoped>

</style>
