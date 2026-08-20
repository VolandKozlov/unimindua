<template>
  <article class="speaker-card" :class="{ 'is-active': active }"><img :src="speaker.image" :alt="speaker.name"><div><h3>{{ speaker.name }}</h3><p>{{ speaker.role }}</p><a href="#contacts">Дізнатися більше <span>→</span></a></div></article>
</template>

<script setup lang="ts">
import type { Speaker } from '../data/content'
defineProps<{ speaker: Speaker; active?: boolean }>()
</script>
