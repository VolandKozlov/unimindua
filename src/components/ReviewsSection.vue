<template>
  <section id="reviews" class="section reviews-section"><div class="container"><p class="eyebrow">Відгуки студентів</p><h2 class="section-title">Що кажуть наші студенти</h2><div class="reviews-carousel"><button class="carousel-arrow carousel-arrow--prev" aria-label="Попередні відгуки" @click="prev">‹</button><div class="review-grid" :key="currentPage"><ReviewCard v-for="review in visibleReviews" :key="review.name" :review="review" active /></div><button class="carousel-arrow carousel-arrow--next" aria-label="Наступні відгуки" @click="next">›</button></div><div class="carousel-dots"><button v-for="page in pageCount" :key="page" :class="{ active: page - 1 === currentPage }" :aria-label="`Сторінка відгуків ${page}`" @click="currentPage = page - 1"></button></div></div></section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { reviews } from '../data/content'
import ReviewCard from './ReviewCard.vue'

const currentPage = ref(0)
const viewportWidth = ref(1440)
const perPage = computed(() => viewportWidth.value <= 900 ? 1 : viewportWidth.value <= 1180 ? 2 : 3)
const pageCount = computed(() => Math.ceil(reviews.length / perPage.value))
const visibleReviews = computed(() => {
  const start = currentPage.value * perPage.value
  return reviews.slice(start, start + perPage.value)
})
const next = () => currentPage.value = (currentPage.value + 1) % pageCount.value
const prev = () => currentPage.value = (currentPage.value - 1 + pageCount.value) % pageCount.value
const setViewportWidth = () => viewportWidth.value = window.innerWidth

watch(perPage, () => currentPage.value = 0)
onMounted(() => { setViewportWidth(); window.addEventListener('resize', setViewportWidth) })
onBeforeUnmount(() => window.removeEventListener('resize', setViewportWidth))
</script>
