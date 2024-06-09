<script setup>
import { ref } from "vue";

const showModal = ref(false);
const newMemo = ref("");
const memos = ref([]);
const errorMessage = ref("");

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const addMemo = () => {
  if (!newMemo.value) {
    errorMessage.value = "Please enter a memo";
    return;
  }
  memos.value.push({
    id: Date.now(),
    memo: newMemo.value,
    date: new Date().toLocaleDateString("en-GB"),
    backgroundColor: getRandomColor(),
  });
  newMemo.value = "";
  closeModal();
};

const deleteMemo = (id) => {
  memos.value = memos.value.filter((memo) => memo.id !== id);
};
</script>

<template>
  <main>
    <div class="container">
      <header>
        <h1 class="header-title">Memo</h1>
        <button @click="openModal" class="header-button">+</button>
      </header>
      <div class="card-container" v-if="memos.length > 0">
        <div
          v-for="memo in memos"
          class="card"
          :style="{ backgroundColor: memo.backgroundColor }"
          :key="memo.id"
        >
          <p class="card-content">
            {{ memo.memo }}
          </p>
          <p class="card-date">{{ memo.date }}</p>
          <button class="card-delete-btn" @click="deleteMemo(memo.id)">Delete</button>
        </div>
      </div>
      <p v-else>No memos</p>
    </div>
    <div v-if="showModal" class="form-overlay">
      <div class="form-modal">
        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
        <div class="form-close-btn" @click="closeModal">&times;</div>
        <textarea
          v-model="newMemo"
          name="memo"
          id="memo"
          cols="30"
          rows="10"
        ></textarea>
        <button class="form-save-btn" @click="addMemo">Save</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}

.container {
  max-width: 900px;
  padding: 10px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #495a7d;
}

.header-button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 100%;
  background-color: #495a7d;
  color: white;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.card {
  width: 225px;
  height: 225px;
  padding: 10px;
  background-color: #ffa6c1;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-modal {
  background-color: white;
  width: 500px;
  padding: 30px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.form-save-btn {
  border: none;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  background-color: #495a7d;
  color: white;
  font-size: 20px;
}

#memo {
  margin-block: 15px;
  padding: 10px;
}

.form-close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  font-weight: bold;
}

.form-error {
  color: red;
  font-size: 20px;
  text-align: center;
}

.card-delete-btn {
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  background-color: red;
  color: white;
  font-size: 20px;
}
</style>
