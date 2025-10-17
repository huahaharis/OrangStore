<template>
    <div class="h-screen flex flex-col items-center justify-center text-center">
        <h1 class="text-3xl font-bold text-red-500">Oops! Something went wrong</h1>
        <p class="mt-2 text-gray-400">
            {{ error?.statusCode || 'Error' }} - {{ error?.message || 'Unexpected issue' }}
        </p>
        <NuxtLink to="/" class="mt-4 text-blue-500 underline">Go back home</NuxtLink>
    </div>
</template>

<script setup>
const error = useError()
</script>
