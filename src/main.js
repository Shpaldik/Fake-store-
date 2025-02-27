import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import "./assets/main.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: Home },
  { path: "/favorites", name: "Favorites", component: Favorites }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router).use(autoAnimatePlugin).mount("#app");
