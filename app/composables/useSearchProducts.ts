// ~/composables/useSearchProducts.ts
export function useSearchProducts() {
  const results = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const config = useRuntimeConfig()
  const baseUrl = config.public.API_BASE

  let timeout: ReturnType<typeof setTimeout> | null = null

  function searchProducts(query: string) {
    if (!query.trim()) {
      results.value = []
      return
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      loading.value = true
      try {
        const allProducts = await $fetch<any[]>(`${baseUrl}/products`)
        results.value = allProducts.filter((p: any) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      } catch (err: any) {
        error.value = err.message || 'Failed to search products.'
      } finally {
        loading.value = false
      }
    }, 300)
  }

  return { results, loading, error, searchProducts }
}
