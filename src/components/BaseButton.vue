<template>
  <button class="base-button" :class="`base-button--${variant}`" :type="type" :disabled="disabled"><slot /></button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit'; variant?: 'primary' | 'outline'; disabled?: boolean }>(), {
  type: 'button', variant: 'primary', disabled: false,
})
</script>
