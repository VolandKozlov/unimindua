<template>
  <section id="speakers" class="section speakers-section"><div class="container"><p class="eyebrow">Лектори</p><h2 class="section-title">Досвідчені експертки-практики</h2><div class="speaker-carousel"><button v-if="hasOverflow" class="carousel-arrow carousel-arrow--prev" aria-label="Попередні експертки" @click="prev">‹</button><div class="speaker-grid" :key="current" :style="{ gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))` }"><SpeakerCard v-for="(speaker, index) in visibleSpeakers" :key="speaker.name" :speaker="speaker" :active="index === 0" /></div><button v-if="hasOverflow" class="carousel-arrow carousel-arrow--next" aria-label="Наступні експертки" @click="next">›</button></div><div v-if="hasOverflow" class="carousel-dots speaker-dots"><button v-for="(_, index) in speakers" :key="index" :class="{ active: index === current }" :aria-label="`Експертка ${index + 1}`" @click="current = index"></button></div></div></section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { speakers } from '../data/content'
import SpeakerCard from './SpeakerCard.vue'

const current = ref(0)
const itemsPerView = ref(3)
let mobileQuery: MediaQueryList | undefined
let tabletQuery: MediaQueryList | undefined

const updateItemsPerView = () => {
  itemsPerView.value = mobileQuery?.matches ? 1 : tabletQuery?.matches ? 2 : 3
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 640px)')
  tabletQuery = window.matchMedia('(max-width: 1100px)')
  updateItemsPerView()
  mobileQuery.addEventListener('change', updateItemsPerView)
  tabletQuery.addEventListener('change', updateItemsPerView)
})

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', updateItemsPerView)
  tabletQuery?.removeEventListener('change', updateItemsPerView)
})

const hasOverflow = computed(() => speakers.length > itemsPerView.value)
const visibleSpeakers = computed(() => Array.from(
  { length: Math.min(itemsPerView.value, speakers.length) },
  (_, index) => speakers[(current.value + index) % speakers.length],
))
const next = () => current.value = (current.value + 1) % speakers.length
const prev = () => current.value = (current.value - 1 + speakers.length) % speakers.length
</script>
