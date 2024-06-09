<script setup>
import { ref, watch } from "vue";
import quiz from "@/data/quizes.json";
import QuizCard from "@/components/QuizCard.vue";

const quizes = ref(quiz);
const search = ref("");

watch(search, () => {
  setTimeout(() => {
    if (search.value === "") return (quizes.value = quiz);
    quizes.value = quiz.filter((quiz) => {
      return quiz.title.toLowerCase().includes(search.value.toLowerCase());
    });
  }, 500);
});
</script>

<template>
    <header>
      <h1 id="title">Quiz</h1>
      <input
        v-model.trim="search"
        type="text"
        id="search-input"
        placeholder="Search Quiz"
      />
    </header>
    <section id="quiz-container">
      <QuizCard v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
    </section>
</template>

<style scoped>

header {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#title {
  font-size: 30px;
  font-weight: bold;
}

#search-input {
  border: none;
  background-color: #c9c9c9;
  padding: 10px;
  border-radius: 8px;
}

#quiz-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-evenly;
}
</style>
