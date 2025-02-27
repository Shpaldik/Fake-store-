<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref(null)

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
    product.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div v-if="product" class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
    <img :src="product.image" alt="Product image" class="w-64 h-64 object-contain rounded-lg shadow-md" />
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold text-gray-800">{{ product.title }}</h1>
      <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-medium">Рейтинг:</span>
        <div class="flex items-center gap-1">
          <span class="text-yellow-500 font-semibold">{{ product.rating.rate }}</span>
          <span class="text-gray-400">({{ product.rating.count }} отзывов)</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-medium">Цена:</span>
        <b class="text-lg text-green-600 font-semibold">{{ product.price }} руб.</b>
      </div>
      <router-link to="/Home"><button class="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">Вернуться на главную страницу</button></router-link>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <p class="text-gray-500">Загрузка...</p>
  </div>
</template>
