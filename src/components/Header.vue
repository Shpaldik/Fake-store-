<script setup>
defineProps({
  totalPrice: Number,
});
const emit = defineEmits(["openDrawer"]);
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/Home"><div class="flex items-center gap-4">
        <img src="/icon.jpg" alt="Logo" class="w-10">
        <div>
          <h2 class="text-xl font-bold uppercase">Fake Store</h2>
          <p class="text-slate-500">Магазин</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-3">
      <p>Корзина:</p>
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>


    </ul>
  </header>
</template>
