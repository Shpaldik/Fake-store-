<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import axios from "axios";
import { inject } from "vue";
import CardList from "../components/CardList.vue";

const { cart, addToCart } = inject("cart");
const items = ref([]);

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
  selectedCategory: "", 
});


const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};


const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};

const onChangeCategorySelect = (event) => {
  filters.selectedCategory = event.target.value;
};


const fetchItems = async () => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    let sortedData = [...data];


if (filters.selectedCategory) {
  sortedData = sortedData.filter(item =>
    item.category.toLowerCase() === filters.selectedCategory.toLowerCase()
  );
}



    if (filters.sortBy === "price") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "-price") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "category") {
      sortedData.sort((a, b) => {
        const nameA = a.category.toLowerCase();
        const nameB = b.category.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filters.searchQuery) {
      sortedData = sortedData.filter((item) =>
        item.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    items.value = sortedData.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }));

  } catch (err) {
    console.log(err);
  }
};


onMounted(fetchItems);

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.some(cartItem => cartItem.id === item.id),
  }));
});
watch(filters, fetchItems);
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between items-center gap-4">
    <h2 class="text-3xl font-bold text-center md:text-left">Все товары:</h2>
    <div class="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <select
        @change="onChangeCategorySelect"
        class="py-2 px-3 border rounded-lg outline-none bg-white shadow-sm focus:ring-2 focus:ring-gray-300 w-full md:w-auto"
      >
        <option value="">Выбрать категорию</option>
        <option value="electronics">Электроника</option>
        <option value="women's clothing">Для женщин</option>
        <option value="men's clothing">Для мужчин</option>
        <option value="jewelery">Украшения</option>
      </select>

      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-lg outline-none bg-white shadow-sm focus:ring-2 focus:ring-gray-300 w-full md:w-auto"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>


      <div class="relative w-full md:w-auto">
        <img src="/search.svg" class="absolute left-3 top-2.5 w-5 h-5 opacity-60" />
        <input
          @input="onChangeSearchInput"
          placeholder="Поиск..."
          class="border rounded-lg py-2 pl-10 pr-4 outline-none w-full md:w-64 shadow-sm focus:ring-2 focus:ring-gray-300"
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-cart="onClickAddPlus" />
  </div>
</template>

