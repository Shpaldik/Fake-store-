import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import ProductPage from "./pages/ProductPage.vue";

import "./assets/main.css";
import App from "./App.vue";
import Home from "./pages/Home.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: Home },

    {
      path: '/ProductPage/:id',
      name: 'ProductPage',
      component: ProductPage,
      props: true
    },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router).use(autoAnimatePlugin).mount("#app");
