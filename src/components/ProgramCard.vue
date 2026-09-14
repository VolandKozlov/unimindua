<template>
  <RouterLink class="program-card" :to="`/programs/${program.slug}`" :aria-label="`Дізнатися більше про програму ${program.title}`">
    <img :src="program.icon" alt="">
    <div class="program-card__copy"><h3>{{ program.title }}</h3><p>{{ program.description }}</p></div>
    <span class="program-card__link" aria-hidden="true">Дізнатися більше <span>→</span></span>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Program } from '../data/content'
defineProps<{ program: Program }>()
</script>
