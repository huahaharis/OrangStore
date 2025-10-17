import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    searchQuery: '',
    selectedCategory: 'all'
  }),

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    setCategory(category: string) {
      this.selectedCategory = category
    },
    clearSearch() {
      this.searchQuery = ''
    }
  }
})
