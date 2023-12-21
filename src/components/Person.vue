<script lang="ts" setup>
import { Person, usePeopleStore } from '../stores/PeopleStore.ts'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useFavoriteStore } from '../stores/FavoriteStore.ts'
import FavoriteAction from './actions/FavoriteAction.vue'

const route = useRoute()
const peopleStore = usePeopleStore()
const { addItem, dropItem, isFavorite } = useFavoriteStore()

const person = ref<Person|null>(null)

onMounted(async () => {
  person.value = await peopleStore.getById(route.params.id as string)
})

const toTitleCase = (str: string) => {
  return str.replace('_', ' ').replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}
</script>

<template>
  <div v-if="person">
    <v-btn @click="isFavorite(person) ? dropItem(person) : addItem(person)">
      <favorite-action class="mr-2" />
      {{ isFavorite(person) ? 'Убрать из избранного' : 'Добавить в избранное' }}
    </v-btn>
    <h1 class="my-5">{{ person.name }}</h1>

    <v-table>
      <tbody>
      <tr v-for="(value, key) of person" :key="key">
        <td>{{ toTitleCase(key) }}</td>
        <td>{{ value }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    Идет загрузка
  </div>
</template>

<style lang="scss" scoped>
td:first-child {
  background: #ebebeb;
}
td:last-child {
  font-weight: 600;
}
</style>