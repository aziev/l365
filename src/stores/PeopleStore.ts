import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import debounce from 'lodash.debounce'

export type Person = {
  birth_year: string
  created: string
  edited: string
  eye_color: string
  films: string[]
  gender: 'male'|'female'
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export type Page = {
  results: Person[],
  count: number,
}

export type Response = {
  [key:number]: Page
}

export const usePeopleStore = defineStore('PeopleStore', () => {
  const loading = ref(false)
  const items = ref<Response>({})
  const searchLoading = ref(false)
  const searchItems = ref<Page|null>(null)

  const getPeople = async (page: number) => {
    if (page in items.value) {
      return items.value[page]
    }

    loading.value = true

    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
      items.value[page] = await response.json()
    } finally {
      loading.value = false
    }

    return items.value[page]
  }

  const names = computed(() => {
    return Object.keys(items.value)
      .map(key => items.value[+key])
      .map(page => page.results)
      .flat()
      .map(person => person.name)
  })

  const makeSearch = debounce(async function (search) {
    if (!search) {
      searchItems.value = null
    }

    searchLoading.value = true

    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${search}`)
      searchItems.value = await response.json()
    } finally {
      searchLoading.value = false
    }
  }, 700)

  const getById = async (id: string) => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}`)
      const data =  await response.json()

      return data
    } finally {
      //
    }
  }

  return {
    loading,
    items,
    getPeople,
    names,
    searchItems,
    searchLoading,
    makeSearch,
    getById,
  }
})

// function debounce(func, ms) {
//   let timeout;
//   return function() {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, arguments), ms);
//   };
// }