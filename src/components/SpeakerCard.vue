<template>
  <article class="speaker-card" :class="{ 'is-active': active }"><img :src="speaker.image" :alt="speaker.name"><div><h3>{{ speaker.name }}</h3><p v-for="paragraph in speaker.bio" :key="paragraph">{{ paragraph }}</p></div></article>
</template>

<script setup lang="ts">
import type { Speaker } from '../data/content'
defineProps<{ speaker: Speaker; active?: boolean }>()
</script>
