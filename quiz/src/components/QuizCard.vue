<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const { quiz } = defineProps(["quiz"]);
</script>

<template>
  <div class="card">
    <img :src="quiz.img" :alt="quiz.title" />
    <div class="card-body">
      <h2>{{ quiz.title }}</h2>
      <p>{{ quiz.questions.length }} questions</p>
      <RouterLink :to="`/quiz/${quiz.id}`">View Quiz</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 270px;
  margin-block: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin: 0;
}

.card-body {
  padding: 20px;
}

.card-body h2 {
  font-weight: bold;
}
</style>
