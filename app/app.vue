<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: '%s — BookingToGo'
})
</script>
