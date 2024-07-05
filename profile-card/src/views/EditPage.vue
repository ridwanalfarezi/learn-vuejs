<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomInput from '@/components/CustomInput.vue'
import { getProfile, updateProfile } from '@/composables/profileClient'
import convertToBase64 from '@/utils/convertToBase64'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const loading = ref<boolean>(true)
const loadingBtn = ref<boolean>(false)

const form = reactive({
  fullname: '',
  avatar: '',
  avatarFile: '',
  city: '',
  country: '',
  job: '',
  about: '',
  instagram: '',
  facebook: '',
  twitter: ''
})

const getUser = async () => {
  try {
    const { data, error } = await getProfile()

    if (data) {
      form.fullname = data.data.fullname
      form.avatar = data.data.avatar
      form.avatarFile = data.data.avatar
      form.city = data.data.city
      form.country = data.data.country
      form.job = data.data.job
      form.about = data.data.about
      form.instagram = data.data.instagram
      form.facebook = data.data.facebook
      form.twitter = data.data.twitter
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

const handleImageChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] as File
  if (!file) {
    return
  }
  try {
    const avatar = URL.createObjectURL(file)
    const avatarFile = (await convertToBase64(file)) as string
    if (avatarFile) {
      form.avatarFile = avatarFile
    }
    form.avatar = avatar
  } catch (error) {
    console.error('Error converting image to base64:', error)
  }
}

const submit = async () => {
  loadingBtn.value = true
  const body = {
    fullname: form.fullname,
    avatar: form.avatarFile,
    city: form.city,
    country: form.country,
    job: form.job,
    about: form.about,
    instagram: form.instagram,
    facebook: form.facebook,
    twitter: form.twitter
  }

  const { data, error } = await updateProfile(body)

  if (data) {
    toast.success(data.msg)
    router.replace('/')
  }
  if (error) {
    toast.error(error.error)
  }
  loadingBtn.value = false
}
onMounted(() => {
  getUser()
})
</script>

<template>
  <div v-if="!loading" class="flex items-center justify-center min-h-screen py-5">
    <form
      class="bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] px-16 py-8 max-w-lg w-full"
      @submit.prevent="submit"
    >
      <div class="flex items-end mb-12 gap-8">
        <RouterLink to="/">
          <i class="pi pi-chevron-circle-left text-primary text-3xl"></i>
        </RouterLink>
        <h1 class="text-primary font-bold text-4xl uppercase">Edit Profile</h1>
      </div>
      <div class="w-full mb-6">
        <label for="fullname" class="text-primary">
          <i class="pi pi-user text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Fullname</span>
        </label>
        <CustomInput
          name="fullname"
          type="text"
          class="w-full"
          v-model="form.fullname"
          id="fullname"
        />
      </div>
      <div class="w-full mb-6">
        <label for="avatar" class="text-primary">
          <i class="pi pi-image text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Avatar</span>
        </label>
        <div class="size-40 rounded-full relative overflow-hidden mt-5 mx-auto group/avatar">
          <img :src="form.avatar" class="w-full h-full object-cover" :alt="form.fullname" />
          <div
            class="absolute top-0 left-0 w-full h-full bg-primary opacity-0 group-hover/avatar:opacity-70 transition group-hover/avatar:cursor-pointer"
          >
            <label
              for="avatar"
              class="text-white flex items-center justify-center h-full cursor-pointer"
              >Change Avatar</label
            >
          </div>
          <input
            type="file"
            accept="image/*"
            id="avatar"
            hidden
            @change="handleImageChange($event)"
          />
        </div>
        <p class="text-center mt-5 text-primary">Recommendation resolution of 1 : 1</p>
      </div>
      <div class="w-full mb-6">
        <label for="city" class="text-primary">
          <i class="pi pi-building text-xl"></i>
          <span class="text-2xl ml-4 uppercase">City</span>
        </label>
        <CustomInput name="city" type="text" class="w-full" id="city" v-model="form.city" />
      </div>
      <div class="w-full mb-6">
        <label for="country" class="text-primary">
          <i class="pi pi-flag text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Country</span>
        </label>
        <CustomInput
          name="country"
          type="text"
          class="w-full"
          id="country"
          v-model="form.country"
        />
      </div>
      <div class="w-full mb-6">
        <label for="job" class="text-primary">
          <i class="pi pi-briefcase text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Job</span>
        </label>
        <CustomInput name="job" type="text" class="w-full" id="job" v-model="form.job" />
      </div>
      <div class="w-full mb-6">
        <label for="about" class="text-primary">
          <i class="pi pi-briefcase text-xl"></i>
          <span class="text-2xl ml-4 uppercase">About</span>
        </label>
        <textarea
          class="border-2 border-primary bg-transparent text-primary p-3 text-xl focus:outline-none focus:shadow-none focus:border-4 transition duration-100 block w-full resize-none mt-2"
          name="about"
          rows="10"
          cols="30"
          id="about"
          v-model="form.about"
        ></textarea>
      </div>
      <div class="w-full mb-6">
        <label for="instagram" class="text-primary">
          <i class="pi pi-instagram text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Instagram</span>
        </label>
        <CustomInput
          name="instagram"
          type="text"
          class="w-full"
          id="instagram"
          v-model="form.instagram"
        />
      </div>
      <div class="w-full mb-6">
        <label for="facebook" class="text-primary">
          <i class="pi pi-facebook text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Facebook</span>
        </label>
        <CustomInput
          name="facebook"
          type="text"
          class="w-full"
          id="facebook"
          v-model="form.facebook"
        />
      </div>
      <div class="w-full mb-6">
        <label for="twitter" class="text-primary">
          <i class="pi pi-twitter text-xl"></i>
          <span class="text-2xl ml-4 uppercase">Twitter</span>
        </label>
        <CustomInput
          name="twitter"
          type="text"
          class="w-full"
          id="twitter"
          v-model="form.twitter"
        />
      </div>
      <CustomButton type="submit" class="mt-6 block mx-auto" :disabled="loadingBtn">{{
        loadingBtn ? 'Updating...' : 'Update'
      }}</CustomButton>
    </form>
  </div>
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
