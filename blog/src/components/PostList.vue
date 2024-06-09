<script setup>
import { defineProps } from "vue";
import PostSingle from "./PostSingle.vue";

const { posts } = defineProps(["posts"]);
</script>

<template>
  <div v-for="post in posts" :key="post.id" class="post-preview">
    <PostSingle :post="post" />
    <hr class="my-4" />
  </div>
</template>
