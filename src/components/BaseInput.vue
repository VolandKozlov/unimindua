<template>
  <label class="form-control" :class="{ 'form-control--invalid': errorMessage }">
    <span :class="{ 'sr-only': hideLabel }">{{ label }}</span>
    <input v-model="value" :type="type" :name="name" :placeholder="hideLabel ? label : ''" :autocomplete="autocomplete">
    <small v-if="errorMessage">{{ errorMessage }}</small>
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
const props = withDefaults(defineProps<{ name: string; label: string; type?: string; autocomplete?: string; hideLabel?: boolean }>(), {
  type: 'text', autocomplete: 'off', hideLabel: false,
})
const { value, errorMessage } = useField<string>(() => props.name)
</script>
