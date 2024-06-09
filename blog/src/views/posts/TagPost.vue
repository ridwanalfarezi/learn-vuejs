<script setup>
import PostList from "@/components/PostList.vue";
import Loading from "@/components/Loading.vue";
import getPosts from "@/composable/getPosts";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const { posts, error, fetchData } = getPosts();

fetchData();

const postsbyTag = computed(() => {
  return posts.value.filter((post) => post.tags.includes(route.params.tag));
});
</script>

<template>
  <header
    class="masthead"
    style="
      background-image: url('https://images.unsplash.com/photo-1470092306007-055b6797ca72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    "
  >
    <div class="container position-relative px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div class="site-heading">
            <h1 class="text-capitalize">{{ route.params.tag }}</h1>
            <span class="subheading">Posts by Tag {{ route.params.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="container px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <p v-if="error">{{ error }}</p>
        <PostList :posts="postsbyTag" v-if="postsbyTag" />
        <div v-else><Loading /></div>
      </div>
    </div>
  </div>
</template>
