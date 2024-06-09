<script setup>
import { defineProps, computed } from "vue";
import { RouterLink } from "vue-router";

const { post } = defineProps(["post"]);

const snippet = computed(() => {
  return post.body.substring(0, 50) + "...";
});
</script>

<template>
  <RouterLink :to="{ name: 'DetailPost', params: { id: post.id } }">
    <h2 class="post-title">
      {{ post.title }}
    </h2>
    <h3 class="post-subtitle">
      {{ snippet }}
    </h3>
  </RouterLink>

  <RouterLink
    v-for="tag in post.tags"
    :key="tag"
    :to="{ name: 'Tag', params: { tag } }"
  >
    <span class="post-meta"> #{{ tag }} </span>
  </RouterLink>
</template>
