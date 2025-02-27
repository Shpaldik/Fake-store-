<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  category: String,
  isAdded: Boolean,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <router-link :to="`/ProductPage/${id}`">
      <div class="w-full h-60 flex justify-center items-center overflow-hidden rounded-xl">
        <img :src="imageUrl" alt="Product Image" class="w-92 h-48 object-cover"/>
      </div>

      <p class="mt-2 text-lg font-semibold">{{ title }}</p>
      <div class="flex flex-col mt-3">
        <span class="text-slate-400 text-sm">Категория:</span>
        <b class="text-base"> {{ category }}</b>
      </div>
    </router-link>

    <div class="flex justify-between items-center mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 text-sm">Цена:</span>
        <b class="text-lg">{{ price }} руб.</b>
      </div>
      <img
        v-if="onClickAdd"
        @click.stop="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Add to Cart"
        class="w-8 h-8 cursor-pointer"
      />
    </div>
  </div>
</template>
