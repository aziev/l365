<script lang="ts" setup>
import { useFavoriteStore } from '../stores/FavoriteStore.ts'
import FavoriteAction from './actions/FavoriteAction.vue'

const store = useFavoriteStore()
const favorites = store.favorites
const {addItem, dropItem, isFavorite} = store

const headers = [
  {
    title: 'Имя',
    key: 'name',
  },
  {
    title: 'Рост',
    key: 'height',
  },
  {
    title: 'Вес',
    key: 'mass',
  },
  {
    title: 'Цвет волос',
    key: 'hair_color',
  },
  {
    title: 'Избранное',
    key: 'actions',
  },
]
</script>

<template>
  <v-data-table
    :items="favorites"
    :headers="headers"
  >
    <template v-slot:item.actions="{ item }">
      <favorite-action
        :active="isFavorite(item)"
        @add="addItem(item)"
        @drop="dropItem(item)"
      />
    </template>
  </v-data-table>
</template>