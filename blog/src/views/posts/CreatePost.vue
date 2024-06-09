<script setup>
import { ref } from "vue";
import createPost from "@/composable/createPost";
import { useRouter } from "vue-router";

const title = ref("");
const body = ref("");
const tag = ref("");
const tags = ref([]);

const router = useRouter();

const handleKeydown = () => {
  if (!tags.value.includes(tag.value)) {
    tag.value = tag.value.replace(/\s/, "");
    tags.value.push(tag.value);
  }
  tag.value = "";
};

const handleSubmit = async () => {
  let post = { title: title.value, body: body.value, tags: tags.value };

  await createPost(post);

  router.push({ name: "Home" });
};
</script>

<template>
  <header
    class="masthead"
    style="background-image: url('https://images.unsplash.com/photo-1470092306007-055b6797ca72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
  >
    <div class="container position-relative px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div class="page-heading">
            <h1>Create Post</h1>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Main Content-->
  <main class="mb-4">
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <div class="my-5">
            <form @submit.prevent="handleSubmit">
              <div class="form-floating">
                <input
                  class="form-control"
                  id="title"
                  type="text"
                  placeholder="Enter your title..."
                  v-model="title"
                />
                <label for="title">Title</label>
              </div>
              <br />
              <div class="form-floating">
                <textarea
                  class="form-control"
                  id="body"
                  placeholder="Enter your content..."
                  style="height: 12rem"
                  v-model="body"
                ></textarea>
                <label for="body">Content</label>
              </div>
              <br />
              <div class="form-floating">
                <input
                  class="form-control"
                  id="tags"
                  type="text"
                  placeholder="Enter your tags..."
                  v-model="tag"
                  @keydown.enter.prevent="handleKeydown"
                />
                <label for="tags">Tags</label>
              </div>
              <br />
              <p v-for="t in tags" :key="t">#{{ t }}</p>
              <br />
              <button
                class="btn btn-md btn-primary text-uppercase w-100"
                type="submit"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
