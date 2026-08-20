<template>
  <article class="program-card">
    <img :src="program.icon" alt="">
    <div class="program-card__copy"><h3>{{ program.title }}</h3><p>{{ program.description }}</p></div>
    <a href="#contacts" :aria-label="`Дізнатися більше про програму ${program.title}`">Дізнатися більше <span>→</span></a>
  </article>
</template>

<script setup lang="ts">
import type { Program } from '../data/content'
defineProps<{ program: Program }>()
</script>
