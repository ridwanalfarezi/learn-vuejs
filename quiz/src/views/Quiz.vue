<script setup>
import QuizHeader from "@/components/QuizHeader.vue";
import QuizContent from "@/components/QuizContent.vue";
import QuizResult from "@/components/QuizResult.vue";
import { useRoute } from "vue-router";
import quizData from "@/data/quizes.json";
import { ref, computed } from "vue";

const route = useRoute();
const quizId = parseInt(route.params.id);
const quiz = quizData.find((q) => q.id === quizId);
const numberOfCorrectAnswer = ref(0);
const currentQuestionIndex = ref(0);
const showResult = ref(false);

const questionPage = computed(() => {
  return `${currentQuestionIndex.value + 1}/ ${quiz.questions.length}`;
});
const barPercentage = computed(() => {
  return `${((currentQuestionIndex.value + 1) / quiz.questions.length) * 100}%`;
});

const onSelectOption = (answer) => {
  if (answer.correct) {
    numberOfCorrectAnswer.value++;
  }

  if (currentQuestionIndex.value === quiz.questions.length - 1) {
    showResult.value = true;
    return;
  }
  currentQuestionIndex.value++;
};
</script>

<template>
  <QuizHeader :questionPage="questionPage" :barPercentage="barPercentage" />
  <QuizContent
    :question="quiz.questions[currentQuestionIndex]"
    @selectOption="onSelectOption"
    v-if="!showResult"
  />
  <div class="controls" v-if="!showResult">
    <button
      @click="currentQuestionIndex--"
      class="prev-btn"
      :disabled="currentQuestionIndex === 0"
    >
      Prev
    </button>
    <button
      @click="currentQuestionIndex++"
      class="next-btn"
      :disabled="currentQuestionIndex === quiz.questions.length - 1"
    >
      Next
    </button>
  </div>
  <QuizResult
    v-else
    :numberOfCorrectAnswer="numberOfCorrectAnswer"
    :quizLength="quiz.questions.length"
  />
</template>

<style scoped>
.controls {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

.prev-btn,
.next-btn {
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
