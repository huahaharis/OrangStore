import { ref } from 'vue'

export function useFetchProducts() {
  const products = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const config = useRuntimeConfig()
  const baseUrl = config.public.API_BASE

  async function fetchProducts(category?: string, limit?: number ,search?: string) {
    try {
      loading.value = true
      error.value = null

      let url = `${baseUrl}/products`

      if (category && category !== 'all') {
        url = `${baseUrl}/products/category/${category}`
      }

      const data = await $fetch<any[]>(url)

      if (search) {
        products.value = data.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      } else {
        products.value = data.slice(0, limit)
      }
    } catch (err) {
      error.value = 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
