<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import axios from "axios";
import { inject } from "vue";
import CardList from "../components/CardList.vue";

const { cart, addToCart, removeFromCart } = inject("cart");
const items = ref([]);

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
});

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

// Функция для получения избранных
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://604781a0efa572c1.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

// Функция для добавления и удаления из избранного
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
        item
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://c1a609d7f41bac5b.mokky.dev/Favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://c1a609d7f41bac5b.mokky.dev/Favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};

const fetchItems = async () => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    let sortedData = [...data];
    if (filters.sortBy === "price") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "-price") {
      sortedData.sort((a, b) => b.price - a.price);
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

    await fetchFavorites();
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
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все Кроссовки</h2>
    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img src="/search.svg" class="absolute left-3 top-2.5" />
        <input
          @input="onChangeSearchInput"
          placeholder="Поиск..."
          class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-cart="onClickAddPlus" @add-to-favorite="addToFavorite" />
  </div>
</template>
