<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useFavoriteStore } from '../stores/FavoriteStore.js'
import FavoriteAction from './actions/FavoriteAction.vue'
import { usePeopleStore, Page } from '../stores/PeopleStore.js'

const items = ref<Page|null>(null)
const search = ref('')

const { addItem, dropItem, isFavorite } = useFavoriteStore()
const peopleStore = usePeopleStore()
const dropdownActive = ref(false)

const headers = ref([
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
])

const hideDropdown = () => {
  setTimeout(() => {
    dropdownActive.value = false
  }, 100)
}

const loadPeople = async ({ page }:{page:number }) => {
  items.value = await peopleStore.getPeople(page)
}

watch(search, (newValue) => {
  peopleStore.makeSearch(newValue)
})

const convertUrl = (apiUrl: string) => {
  const last = apiUrl.split("/")
  const id = last[last.length-2]

  return `people/${id}`
}
</script>

<template>
  <v-row>
    <v-col cols="4" style="position: relative" click-outside="dropdownActive = false">
      <v-text-field
          label="Поиск"
          :items="peopleStore.searchItems && peopleStore.searchItems.results ? peopleStore.searchItems.results.map(i => i.name) : []"
          :loading="peopleStore.searchLoading"
          v-model="search"
          @focusin="dropdownActive = true"
          @focusout="hideDropdown"
      />
      <v-list v-if="dropdownActive && peopleStore.searchItems?.count" class="dropdown">
        <v-list-item v-for="item in peopleStore.searchItems.results">
          <router-link :to="convertUrl(item.url)">{{ item.name }}</router-link>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>

  <v-data-table-server
      :headers="headers"
      :items="items ? items.results : []"
      :loading="peopleStore.loading"
      :loading-text="'Идет загрузка'"
      :items-length="items?.count || 0"
      @update:options="loadPeople"
  >
    <template v-slot:item.name="{ item }">
      <router-link :to="convertUrl(item.url)">{{ item.name }}</router-link>
    </template>
    <template v-slot:item.actions="{ item }">
      <favorite-action
          :active="isFavorite(item)"
          @add="addItem(item)"
          @drop="dropItem(item)"
      />
    </template>
  </v-data-table-server>
</template>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  z-index: 1;
  top: 75px;
  left: 12px;
  width: calc(100% - 24px);
  border: 1px solid #ebebeb;
  box-shadow: 0 0 5px #00000055;
}
</style>