<template>
  <header class="bg-white shadow-xl">
    <div class="flex flex-wrap items-center justify-between px-4 sm:px-10 lg:px-16 py-4 gap-4">
      <div class="flex items-center justify-between w-full sm:w-auto">
        <h1 class="text-2xl text-[#FF7A00] font-bold cursor-pointer whitespace-nowrap" @click="navigateToHome">
          Orange Store
        </h1>

        <!-- Mobile Menu Button -->
        <button class="sm:hidden text-gray-700 focus:outline-none" @click="menuOpen = !menuOpen">
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden sm:flex flex-wrap gap-4 text-md font-light text-gray-700 flex-1 place-items-center">
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`men's clothing`)">
          Men
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`women's clothing`)">
          Women
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`jewelery`)">
          Jewelry
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`electronics`)">
          Electronic
        </button>
      </nav>
      <div class="relative w-full sm:w-72">
        <input v-model="search" type="text" placeholder="Search in Orange Store"
          class="border border-[#CACDD2] text-sm h-10 w-full rounded-xl px-9 focus:ring-2 focus:ring-[#FF7A00] outline-none"
          @input="searchProducts(search)" @keyup.enter="goToSearchPage" />
        <span class="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>
        <button v-if="search" class="absolute right-3 top-2.5 text-gray-400" @click="clearSearch">
          ✕
        </button>

        <div v-if="results.length && showSuggestions"
          class="absolute left-0 right-0 bg-white border rounded-xl mt-2 shadow-lg overflow-hidden z-50">
          <ul>
            <li v-for="r in results" :key="r.id" @click="goToProduct(r.id)"
              class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
              <span>🔍</span>
              <span class="truncate">{{ r.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition name="fade">
      <div v-if="menuOpen"
        class="sm:hidden flex flex-col items-start gap-3 px-6 pb-4 text-gray-700 text-md font-light border-t">
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`men's clothing`)">
          Men
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`women's clothing`)">
          Women
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`jewelery`)">
          Jewelry
        </button>
        <button class="cursor-pointer hover:text-[#FF7A00]" @click="goToCategory(`electronics`)">
          Electronic
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHeaderStore } from '~/stores/headerStore'
import { useSearchProducts } from '~/composables/useSearchProducts'

const { results, searchProducts } = useSearchProducts()

const router = useRouter()
const headerStore = useHeaderStore()
const menuOpen = ref(false)
const search = ref('')
const showSuggestions = ref(false)

function navigateToHome() {
  menuOpen.value = false
  headerStore.searchQuery = ''
  router.push('/')
}

function goToCategory(cat: string) {
  menuOpen.value = false
  headerStore.setCategory(cat)
  headerStore.searchQuery = ''
  router.push(`/category/${cat}`)
}

function goToProduct(id: number) {
  showSuggestions.value = false
  search.value = ''
  router.push(`/products/${id}`)
}

function goToSearchPage() {
  showSuggestions.value = false
  headerStore.searchQuery = search.value
  router.push(`/category/all?search=${search.value}`)
}

// function searchProducts() {
//   if (!search.value.trim()) return
//   menuOpen.value = false
//   headerStore.setSearchQuery(search.value)
//   router.push(`/category/all`)
// }

function clearSearch() {
  search.value = ''
  showSuggestions.value = false
}

watch(search, (val) => {
  showSuggestions.value = !!val.trim()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
