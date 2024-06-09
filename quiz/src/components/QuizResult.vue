<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const { numberOfCorrectAnswer, quizLength } = defineProps([
  "numberOfCorrectAnswer",
  "quizLength",
]);
</script>

<template>
  <section class="results">
    <h3>Score :</h3>
    <h1>{{ numberOfCorrectAnswer }} / {{ quizLength }}</h1>
    <RouterLink to="/">Go Back</RouterLink>
  </section>
</template>

<style scoped>
.results {
  text-align: center;
  padding: 20px;
}

.results h1 {
  color: #0faf87;
  font-size: 40px;
}

.results h3 {
  font-size: 20px;
}

.results a {
  text-decoration: none;
  color: #0faf87;
  font-weight: bold;
}
</style>
