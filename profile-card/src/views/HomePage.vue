<script setup lang="ts">
import { getProfile } from '@/composables/profileClient'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const loading = ref<boolean>(true)
let user = {
  avatar: '',
  fullname: '',
  city: '',
  country: '',
  job: '',
  about: '',
  instagram: '',
  facebook: '',
  twitter: ''
}

const logout = () => {
  localStorage.removeItem('token')
  toast.success('Logout successfully')
  router.replace('/sign-in')
}

const getUser = async () => {
  try {
    const { data, error } = await getProfile()

    if (data) {
      user = data.data
    }

    if (error) {
      toast.error(error.error)
      router.replace('/sign-in')
    }
  } catch (error) {
    toast.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <main class="min-h-screen flex justify-center items-center lg:px-0 px-2" v-if="user && !loading">
    <div class="max-w-md bg-white w-full h-full rounded-lg overflow-hidden">
      <div class="relative bg-[url('../assets/bg.jpeg')] h-60 bg-cover bg-no-repeat bg-center">
        <div
          class="absolute top-5 left-5 cursor-pointer text-white hover:text-primary"
          @click="logout"
        >
          <i class="pi pi-sign-out rotate-180 text-lg"></i>
        </div>
        <RouterLink
          to="/edit"
          class="absolute top-5 right-5 cursor-pointer text-white hover:text-primary"
        >
          <i class="pi pi-pen-to-square text-lg"></i>
        </RouterLink>
        <div class="absolute -bottom-16 left-[32%]">
          <img :src="user.avatar" :alt="user.fullname" class="size-40 rounded-full object-cover" />
        </div>
      </div>
      <div class="text-center mt-24 lg:px-20 px-10 pb-10">
        <h1 class="text-3xl font-bold">{{ user.fullname }}</h1>
        <p class="text-lg">{{ user.city }}, {{ user.country }}</p>
        <h3 class="italic text-2xl my-3">{{ user.job }}</h3>
        <p class="text-base">{{ user.about }}</p>
        <div class="flex justify-between items-center mt-10">
          <a v-if="user.instagram" :href="user.instagram" target="_blank">
            <i class="pi pi-instagram text-3xl cursor-pointer hover:text-primary"></i>
          </a>
          <a v-if="user.facebook" :href="user.facebook" target="_blank">
            <i class="pi pi-facebook text-3xl cursor-pointer hover:text-primary"></i>
          </a>
          <a v-if="user.twitter" :href="user.twitter" target="_blank">
            <i class="pi pi-twitter text-3xl cursor-pointer hover:text-primary"></i>
          </a>
        </div>
      </div>
    </div>
  </main>
  <div v-else class="w-full h-screen flex justify-center items-center">
    <div role="status">
      <svg
        aria-hidden="true"
        class="md:size-20 size-10 text-gray-200 animate-spin dark:text-gray-500 fill-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
