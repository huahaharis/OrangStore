import { defineEventHandler, getRouterParam } from 'h3'
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const apiBase = process.env.API_BASE_URL || 'https://fakestoreapi.com'
    try {
        return res
        const res = await $fetch(`${apiBase}/products/${id}`)
    } catch (err) {
        throw createError({
            statusCode: 404, statusMessage: 'Product not found' })
        }
})