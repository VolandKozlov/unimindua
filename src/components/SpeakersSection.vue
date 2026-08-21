<template>
  <section id="speakers" class="section speakers-section"><div class="container"><p class="eyebrow">Лектори</p><h2 class="section-title">Досвідчені експертки-практики</h2><div class="speaker-carousel"><button class="carousel-arrow carousel-arrow--prev" aria-label="Попередні експертки" @click="prev">‹</button><div class="speaker-grid" :key="current"><SpeakerCard v-for="(speaker, index) in orderedSpeakers" :key="speaker.name" :speaker="speaker" :active="index === 0" /></div><button class="carousel-arrow carousel-arrow--next" aria-label="Наступні експертки" @click="next">›</button></div><div class="carousel-dots speaker-dots"><button v-for="(_, index) in speakers" :key="index" :class="{ active: index === current }" :aria-label="`Експертка ${index + 1}`" @click="current = index"></button></div></div></section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { speakers } from '../data/content'
import SpeakerCard from './SpeakerCard.vue'
const current = ref(0)
const orderedSpeakers = computed(() => [...speakers.slice(current.value), ...speakers.slice(0, current.value)])
const next = () => current.value = (current.value + 1) % speakers.length
const prev = () => current.value = (current.value - 1 + speakers.length) % speakers.length
</script>
