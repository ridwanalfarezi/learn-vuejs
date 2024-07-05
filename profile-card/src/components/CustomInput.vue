<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  name: string
  type: string
  placeholder?: string
  class?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <input
    :class="[
      'border-b-2',
      'border-b-primary',
      'bg-transparent',
      'text-[#62cdff]',
      'py-2',
      'text-xl',
      'focus:outline-none',
      'focus:shadow-none',
      'focus:border-b-4',
      'transition',
      'duration-100',
      'block',
      props.class
    ]"
    :name="props.name"
    :type="props.type"
    :placeholder="props.placeholder"
    v-model="model"
  />
</template>
