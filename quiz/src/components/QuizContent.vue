<script setup>
import { defineProps, defineEmits } from "vue";

const { question } = defineProps(["question"]);
const emit = defineEmits(["selectOption"]);

const emitSelectOption = (answer) => {
  emit("selectOption", answer);
};
</script>

<template>
  <section id="question-container">
    <h1 class="question-title">{{ question.text }}</h1>
  </section>
  <section id="options-container">
    <div
      class="option"
      v-for="answer in question.answers"
      :key="answer.id"
      @click="emitSelectOption(answer)"
    >
      <div class="option-label">{{ answer.label }}</div>
      <div class="option-value">{{ answer.text }}</div>
    </div>
  </section>
</template>

<style scoped>
#question-container {
  margin-top: 30px;
}

.question-title {
  font-size: 30px;
  font-weight: bold;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.option-label {
  font-size: 20px;
  font-weight: bold;
  width: 50px;
  height: 50px;
  background-color: #a0ced9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-value {
  font-size: 20px;
  font-weight: bold;
  padding-inline: 20px;
  background-color: #e2e2e2;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
