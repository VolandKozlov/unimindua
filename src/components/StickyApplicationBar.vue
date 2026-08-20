<template>
  <div class="sticky-application"><div class="sticky-application__desktop"><strong>Залишити заявку<br>на навчання</strong><ApplicationForm variant="inline" /></div><button class="sticky-application__mobile" @click="sheetOpen = true">Залишити заявку <span>→</span></button></div>
  <ApplicationBottomSheet :open="sheetOpen" @close="sheetOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ApplicationBottomSheet from './ApplicationBottomSheet.vue'
import ApplicationForm from './ApplicationForm.vue'
const sheetOpen = ref(false)
</script>
