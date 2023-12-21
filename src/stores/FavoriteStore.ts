import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Person } from './PeopleStore'

const LOCAL_STORAGE_KEY = 'favorites'

export const useFavoriteStore = defineStore('FavoriteStore', () => {
  const favorites = ref<Person[]>([])

  let storageValue = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storageValue) {
    favorites.value = JSON.parse(storageValue)
  }

  const addItem = (item: Person) => {
    let existingItem = favorites.value.find(f => f.url === item.url)

    if (!existingItem) {
      favorites.value.push(item)
    }
  }

  const dropItem = (item: Person) => {
    let index = favorites.value.findIndex(f => f.url === item.url)

    favorites.value.splice(index, 1)
  }

  const isFavorite = (item: Person) => {
    return Boolean(favorites.value.find(f => f.url === item.url))
  }

  const syncLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites.value))
  }

  watch(favorites.value, syncLocalStorage)

  return {
    favorites,
    addItem,
    dropItem,
    isFavorite,
  }
})