export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: '/api',
        onResponseError({ response }) {
            console.error('API error', response.status, response._data)
        }
    })
    return { provide: { api } }
})