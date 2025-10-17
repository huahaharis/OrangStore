<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6 text-center sm:text-left">
      <h2
        class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 leading-snug"
      >
        <template v-if="searchQuery">
          Search Results For
          <span class="text-orange-500">“{{ searchQuery }}”</span>
        </template>
        <template v-else>
          {{ title }}
        </template>
      </h2>
      <div class="text-gray-500 text-sm space-y-1">
        <div v-if="!searchQuery">
          See all new in from
          <span class="font-medium text-gray-700">{{
            title.toLowerCase()
          }}</span>
          here
        </div>
        <div>
          Displaying
          <span class="text-orange-500 font-medium">1 - {{ displayedCount }}</span>
          of {{ totalCount }} products
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="bg-gray-50 p-4 rounded-xl hover:shadow-md transition cursor-pointer"
        @click="goToDetail(product.id)"
      >
        <img
          :src="product.image"
          alt=""
          class="w-full h-44 sm:h-48 md:h-56 object-contain mb-3"
        />
        <p class="text-gray-500 text-xs sm:text-sm truncate">
          {{ product.category }}
        </p>
        <div class="flex items-center text-xs sm:text-sm mb-1 flex-wrap">
          <span class="text-orange-500">⭐</span>
          <span class="ml-1 font-semibold">{{ product.rating.rate }}</span>
          <span class="ml-1 text-gray-500"
            >({{ product.rating.count }})</span
          >
        </div>
        <h3
          class="font-medium text-gray-800 text-sm sm:text-base line-clamp-2"
        >
          {{ product.title }}
        </h3>
        <p class="mt-1 sm:mt-2 font-semibold text-gray-900 text-sm sm:text-base">
          ${{ product.price }}
        </p>
      </div>
    </div>
    <div class="flex justify-center mt-8">
      <button
        v-if="displayedCount < totalCount"
        @click="loadMore"
        class="border rounded-full px-5 py-2 text-sm hover:bg-gray-100 transition"
      >
        Muat lebih banyak
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '~/stores/headerStore'

const route = useRoute()
const router = useRouter()
const headerStore = useHeaderStore()

useHead({
  title: `Shop ${route.params.slug} - Orange Store`,
  meta: [
    { name: 'description', content: `Explore the best ${route.params.slug} at Orange Store.` },
    { property: 'og:title', content: `Shop ${route.params.slug}` },
    { property: 'og:description', content: `Find top ${route.params.slug} items at Orange Store.` }
  ]
})


const products = ref<any[]>([])
const limit = ref(4)
const searchQuery = computed(() => headerStore.searchQuery)
const category = computed(() => route.params.slug)

const displayedProducts = computed(() => products.value.slice(0, limit.value))
const displayedCount = computed(() => displayedProducts.value.length)
const totalCount = computed(() => products.value.length)

const title = computed(() => {
  if (searchQuery.value) return 'Search Results'
  const name = category.value as string
  if (name === 'all') return 'All Products'
  const words = name.split(' ')
  return (
    words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') + ' Collection'
  )
})

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()

  if (searchQuery.value) {
    products.value = data.filter((p: any) =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  } else if (category.value === 'all') {
    products.value = data
  } else {
    products.value = data.filter((p: any) => p.category === category.value)
  }
}

function loadMore() {
  limit.value += 4
}

function goToDetail(id: number) {
  router.push(`/products/${id}`)
}

onMounted(fetchProducts)
</script>

<style scoped>
@media (max-width: 400px) {
  .text-xl {
    font-size: 1.1rem;
  }
}
</style>
