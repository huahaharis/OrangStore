<template>
  <div class="bg-[#F9FAFB] min-h-screen flex flex-col">
    <div
      class="flex flex-wrap items-center max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 text-gray-500 text-xs sm:text-sm"
    >
      <span class="cursor-pointer hover:text-orange-500 mx-1 sm:mx-2" @click="navigateTo('/')">
        Home
      </span>
      <img src="/images/breadcrumb.png" alt=">" class="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
      <span class="capitalize mx-1 sm:mx-2">
        {{ product?.category || 'Loading...' }}
      </span>
      <img src="/images/breadcrumb.png" alt=">" class="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
      <span class="text-gray-700 truncate max-w-[60%] sm:max-w-none mx-1 sm:mx-2">
        {{ product?.title }}
      </span>
    </div>
    <main
      class="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-8 gap-6 sm:gap-8"
    >
      <template v-if="loading">
        <div class="flex-1 animate-pulse space-y-4">
          <div class="bg-gray-200 rounded-xl h-72 sm:h-96 w-full"></div>
        </div>
        <div class="flex-1 animate-pulse space-y-4">
          <div class="h-7 sm:h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-10 sm:h-12 bg-gray-200 rounded w-1/3 mt-6"></div>
        </div>
      </template>
      <template v-else>
        <div
          class="flex-1 flex justify-center items-center bg-[#F3F4F6] rounded-xl p-4 sm:p-6"
        >
          <img
            :src="product?.image"
            alt="Product image"
            class="max-h-72 sm:max-h-96 object-contain"
          />
        </div>
        <div class="flex-1 flex flex-col justify-center mt-6 md:mt-0">
          <h1
            class="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight"
          >
            {{ product?.title }}
          </h1>

          <p class="text-orange-500 text-xl sm:text-2xl font-bold mb-2">
            $ {{ product?.price?.toFixed(2) }}
          </p>

          <div class="flex items-center gap-2 mb-4">
            <span class="text-yellow-500 text-sm sm:text-base">⭐</span>
            <span class="font-medium text-sm sm:text-base">
              {{ product?.rating?.rate }}
            </span>
            <span class="text-gray-500 text-xs sm:text-sm">
              ({{ product?.rating?.count }})
            </span>
          </div>

          <p class="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
            {{ product?.description }}
          </p>

          <button
            class="bg-gray-200 text-gray-600 font-semibold py-2 sm:py-3 rounded-lg cursor-not-allowed w-full sm:w-1/2"
            disabled
          >
            Sold out!
          </button>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const product = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.params.id
    loading.value = true
    product.value = await $fetch(`https://fakestoreapi.com/products/${id}`)
  } catch (err) {
    console.error('Failed to fetch product:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.animate-pulse > div {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
</style>
