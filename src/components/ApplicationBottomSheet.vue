<template>
  <Teleport to="body"><Transition name="sheet-fade"><div v-if="open" class="sheet-backdrop" @click.self="emit('close')"><section class="application-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><button class="application-sheet__close" aria-label="Закрити форму" @click="emit('close')"><img src="/assets/icons/ui/close.svg" alt=""></button><p class="eyebrow">Навчання в UNIMIND</p><h2 id="sheet-title">Залишити заявку</h2><p>Заповніть форму — ми зв’яжемося з вами та допоможемо обрати програму.</p><ApplicationForm variant="sheet" @submitted="emit('close')" /></section></div></Transition></Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import ApplicationForm from './ApplicationForm.vue'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
watch(() => props.open, (open) => document.body.classList.toggle('sheet-open', open), { immediate: true })
onBeforeUnmount(() => document.body.classList.remove('sheet-open'))
</script>
