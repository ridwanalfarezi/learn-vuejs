<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomInput from '@/components/CustomInput.vue'
import { signUp } from '@/composables/authClient'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const loading = ref<boolean>(false)

const form = reactive({
  fullname: '',
  username: '',
  city: '',
  country: '',
  job: '',
  password: '',
  cpassword: ''
})

const submit = async () => {
  if (
    !form.fullname ||
    !form.username ||
    !form.city ||
    !form.country ||
    !form.job ||
    !form.password ||
    !form.cpassword
  ) {
    toast.error('Please enter all required fields')
    return
  }

  loading.value = true
  try {
    if (form.password !== form.cpassword) {
      toast.error('Passwords do not match')
      return
    }
    const body = {
      ...form
    }
    delete (body as { cpassword?: string }).cpassword
    const { data, error } = await signUp(body)
    if (data) {
      toast.success(data.msg)
      router.replace('/sign-in')
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
        name="fullname"
        type="text"
        placeholder="Fullname"
        class="mb-6"
        v-model="form.fullname"
      />
      <CustomInput
        name="username"
        type="text"
        placeholder="Username"
        class="mb-6"
        v-model="form.username"
      />
      <CustomInput name="city" type="text" placeholder="City" class="mb-6" v-model="form.city" />
      <CustomInput
        name="country"
        type="text"
        placeholder="Country"
        class="mb-6"
        v-model="form.country"
      />
      <CustomInput name="job" type="text" placeholder="Job" class="mb-6" v-model="form.job" />
      <CustomInput
        type="password"
        name="password"
        placeholder="Password"
        class="mb-6"
        v-model="form.password"
      />
      <CustomInput
        type="password"
        name="cpassword"
        placeholder="Confirm Password"
        v-model="form.cpassword"
      />
      <CustomButton type="submit" class="mt-6 block mx-auto" :disabled="loading">{{
        loading ? 'Signing Up..' : 'Sign Up'
      }}</CustomButton>
    </form>
  </div>
</template>
