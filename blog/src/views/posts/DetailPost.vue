<script setup>
import { defineProps } from "vue";
import getOnePost from "@/composable/getOnePost";
import Loading from "@/components/Loading.vue";
import { useRouter } from "vue-router";
import { deleteDoc, doc } from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";

const { id } = defineProps(["id"]);
const router = useRouter();

const { post, error, fetchData } = getOnePost(id);

fetchData();

const deletePost = async () => {
  await deleteDoc(doc(projectFirestore, "posts", id));
  router.push({ name: "Home" });
  alert("Post deleted successfully");
};
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post">
    <header
      class="masthead"
      style="
        background-image: url('https://images.unsplash.com/photo-1470092306007-055b6797ca72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
      "
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="post-heading">
              <h1>{{ post.title }}</h1>
              <span v-for="tag in post.tags" :key="tag" class="meta-post"
                >#{{ tag }}</span
              >
              <button class="btn btn-danger d-block mt-3" @click="deletePost">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <article class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <p>
              {{ post.body }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>
