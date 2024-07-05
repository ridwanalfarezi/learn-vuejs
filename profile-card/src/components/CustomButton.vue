<script setup lang="ts">
interface Props {
  class?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})
</script>

<template>
  <button
    :class="[
      'bg-primary',
      'text-white',
      'px-10',
      'py-2',
      'rounded-full',
      'lg:text-xl',
      'text-lg',
      'font-bold',
      props.class
    ]"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>
