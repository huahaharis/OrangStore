<template>
  <div class="bg-stone-100">
    <div class="flex justify-center py-5 px-2 sm:px-4">
      <img src="/images/newimage.png" alt="Logo"
        class="max-h-[300px] sm:max-h-[400px] w-full max-w-[1320px] object-contain" />
    </div>

    <div class="bg-[#EEF2F7] w-full h-6 sm:h-10"></div>
    <div class="px-4 sm:px-10 lg:px-16 py-10 bg-white">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 class="text-xl sm:text-2xl font-bold text-center sm:text-left">
          All Product
        </h2>

        <select v-model="selectedCategory"
          class="border border-gray-300 rounded-lg px-3 py-2 capitalize w-full sm:w-auto">
          <option v-for="cat in categories" :key="cat.type" :value="cat.type">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
      </div>

      <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="p in products" :key="p.id"
          class="bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
          @click="goToDetail(p.id)">
          <img :src="p.image" alt="product image"
            class="rounded-xl mx-auto mb-4 w-full h-56 sm:h-64 object-contain bg-gray-100" />

          <div class="flex flex-wrap items-center text-sm text-gray-600 mb-1 justify-center sm:justify-start">
            <span class="capitalize">{{ p.category }}</span>
            <div class="flex items-center mx-2 gap-1">
              <span class="text-yellow-500">⭐</span>
              <span class="font-semibold">{{ p.rating?.rate ?? 0 }}</span>
              <span class="text-gray-500">({{ p.rating?.count ?? 0 }})</span>
            </div>
          </div>

          <h3 class="mt-2 font-medium text-gray-900 line-clamp-2 text-center sm:text-left">
            {{ p.title }}
          </h3>

          <p class="mt-2 font-bold text-gray-800 text-center sm:text-left">
            $ {{ p.price.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="hidden sm:flex justify-center mt-8">
        <button class="px-6 py-2 bg-gray-100 rounded-xl border hover:bg-gray-200 transition text-sm sm:text-base"
          @click="loadMore" v-if="!loading && products.length < totalProducts">
          Muat lebih banyak
        </button>
      </div>
      <div v-if="loadingMore" class="sm:hidden flex justify-center mt-6 text-gray-500 text-sm">
        Loading more products...
      </div>
    </div>
  <div class="bg-[#EEF2F7] w-full h-6 sm:h-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useFetchProducts } from '~/composables/useFetchProducts'

const selectedCategory = ref('all')
const limit = ref(4)
const loadingMore = ref(false)
const totalProducts = 20

const categories = [
  { name: 'all', type: 'all' },
  { name: 'men', type: "men's clothing" },
  { name: 'women', type: "women's clothing" },
  { name: 'jewelery', type: 'jewelery' },
  { name: 'electronics', type: 'electronics' },
]

const { products, loading, error, fetchProducts } = useFetchProducts()

function loadMore() {
  if (products.value.length < totalProducts) {
    limit.value += 4
  }
}

function goToDetail(id: number) {
  navigateTo(`/products/${id}`)
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
  if (nearBottom && window.innerWidth < 640 && !loadingMore.value) {
    loadingMore.value = true
    setTimeout(() => {
      loadMore()
      loadingMore.value = false
    }, 800)
  }
}

onMounted(() => {
  fetchProducts(selectedCategory.value, limit.value)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch([selectedCategory, limit], () => {
  fetchProducts(selectedCategory.value, limit.value)
})
</script>
