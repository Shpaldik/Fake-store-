<script setup>
import DrawerHead from "./DrawerHead.vue";
import CartItemList from "./CartItemList.vue";
import infoBlock from "./infoBlock.vue";

const emit = defineEmits(["createOrder"]);

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  buttonDisabled: Boolean,
});
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!totalPrice" class="flex h-full items-center">
      <infoBlock
        title="Корзина пустая"
        description="Добавьте хотя бы один товар, чтобы сделать заказ"
      />
    </div>

    <div v-else>
      <CartItemList v-if="totalPrice" />

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>

      <div>
        <div class="flex gap-2">
          <span>Налог 5%</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} ₽</b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="emit('createOrder')"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 mt-5 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
    </div>
  </div>
</template>
