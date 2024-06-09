import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/posts/:id",
      name: "DetailPost",
      component: () => import("@/views/posts/DetailPost.vue"),
      props: true,
    },
    {
      path: "/posts/create",
      name: "CreatePost",
      component: () => import("@/views/posts/CreatePost.vue"),
    },
    {
      path: "/tag/:tag",
      name: "Tag",
      component: () => import("@/views/posts/TagPost.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;

