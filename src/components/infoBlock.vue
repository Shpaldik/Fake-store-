<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
  category: String
})
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img height="80" width="80" alt="Info image" src="/public//empty.svg" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">Категория:{{ category }}</p>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>