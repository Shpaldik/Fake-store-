<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
  v-for="item in items"
  :key="item.id"
  :title="item.title || 'Без названия'" 
  :imageUrl="item.image || 'default-image.jpg'" 
  :price="item.price || 0"
  :category="item.category || 'Без категории'"
  :onClickAdd="() => emit('addToCart', item)"
  :isAdded="item.isAdded"
/>


  </div>
</template>