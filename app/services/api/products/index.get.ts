import { defineEventHandler, getQuery } from 'h3'
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = query.page || 1
    const limit = query.limit || 12
    const search = query.search || ''
    const apiBase = process.env.API_BASE_URL || 'https://fakestoreapi.com'
    const url =
        `${apiBase}/products?page=${page}&limit=${limit}&search=${search}`
    try {
        const res = await $fetch(url)
        return res
    } catch (err) {
        throw createError({
            statusCode: 500, statusMessage: 'Failed to fetch products', data: err })
}
})