<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomInput from '@/components/CustomInput.vue'
import { signIn } from '@/composables/authClient'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const loading = ref<boolean>(false)

const form = reactive({
  username: '',
  password: ''
})

const submit = async () => {
  if (!form.username || !form.password) {
    toast.error('Please enter all required fields')
  }
  loading.value = true
  try {
    const { data, error } = await signIn(form)
    if (data) {
      localStorage.setItem('token', data.token)
      toast.success(data.msg)
      router.replace('/')
    }
    if (error) {
      toast.error(error.error)
    }
  } catch (e) {
    toast.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <form
      class="bg-[rgba(255,255,255,0.1)] backdrop-blur-[5px] rounded-[20px] px-16 py-8"
      @submit.prevent="submit"
    >
      <div class="flex items-center justify-between mb-10">
        <RouterLink to="/sign-in" v-slot="{ isActive }">
          <span
            class="text-primary font-bold text-2xl uppercase"
            :class="{ 'border-b-4 border-b-primary': isActive }"
            >Sign In</span
          >
        </RouterLink>
        <RouterLink to="/sign-up" v-slot="{ isActive }">
          <span
            class="text-primary font-bold text-2xl uppercase"
            :class="{ 'border-b-4 border-b-primary': isActive }"
            >Sign Up</span
          >
        </RouterLink>
      </div>
      <CustomInput
        name="username"
        type="text"
        placeholder="Username"
        class="mb-6"
        v-model="form.username"
      />
      <CustomInput type="password" name="password" placeholder="Password" v-model="form.password" />
      <CustomButton class="mt-6 block mx-auto" type="submit" :disabled="loading">{{
        loading ? 'Signing In...' : 'Sign In'
      }}</CustomButton>
    </form>
  </div>
</template>
