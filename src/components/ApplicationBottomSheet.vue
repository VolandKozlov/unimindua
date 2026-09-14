<template>
  <Teleport to="body"><Transition name="sheet-fade"><div v-if="open" class="sheet-backdrop" @click.self="emit('close')"><section ref="sheet" class="application-sheet" tabindex="-1" @keydown="onKeydown" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><button class="application-sheet__close" aria-label="Закрити форму" @click="emit('close')"><img src="/assets/icons/ui/close.svg" alt=""></button><p class="eyebrow">Навчання в UNIMIND</p><h2 id="sheet-title">Залишити заявку</h2><p>Заповніть форму — ми зв’яжемося з вами та допоможемо обрати програму.</p><ApplicationForm variant="sheet" @submitted="emit('close')" /></section></div></Transition></Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import ApplicationForm from './ApplicationForm.vue'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const sheet = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
  if (event.key !== 'Tab') return
  const elements = sheet.value?.querySelectorAll<HTMLElement>('button:not(:disabled), input, textarea, a[href]')
  if (!elements?.length) return
  const first = elements[0], last = elements[elements.length - 1]
  if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet.value)) {
    event.preventDefault(); last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus()
  }
}
watch(() => props.open, async (open) => {
  document.body.classList.toggle('sheet-open', open)
  if (open) {
    previousFocus = document.activeElement as HTMLElement
    await nextTick()
    sheet.value?.focus()
  } else previousFocus?.focus()
}, { immediate: true })
onBeforeUnmount(() => document.body.classList.remove('sheet-open'))
</script>
