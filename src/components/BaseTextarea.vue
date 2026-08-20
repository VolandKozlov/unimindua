<template>
  <label class="form-control form-control--textarea" :class="{ 'form-control--invalid': errorMessage }">
    <span :class="{ 'sr-only': hideLabel }">{{ label }}</span>
    <textarea v-model="value" :name="name" :rows="rows" :placeholder="hideLabel ? label : ''"></textarea>
    <small v-if="errorMessage">{{ errorMessage }}</small>
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
const props = withDefaults(defineProps<{ name: string; label: string; rows?: number; hideLabel?: boolean }>(), { rows: 4, hideLabel: false })
const { value, errorMessage } = useField<string>(() => props.name)
</script>
