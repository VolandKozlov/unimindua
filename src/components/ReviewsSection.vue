<template>
  <section id="reviews" class="section reviews-section"><div class="container"><p class="eyebrow">Відгуки студентів</p><h2 class="section-title">Що кажуть наші студенти</h2><div class="reviews-carousel"><button class="carousel-arrow carousel-arrow--prev" aria-label="Попередні відгуки" @click="prev"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button><div class="review-pages"><div v-for="(pageReviews, index) in reviewPages" :key="index" class="review-grid review-page" :class="pageClasses(index)" :aria-hidden="index !== currentPage" :inert="index !== currentPage"><ReviewCard v-for="review in pageReviews" :key="review.text" :review="review" active /></div></div><button class="carousel-arrow carousel-arrow--next" aria-label="Наступні відгуки" @click="next"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button></div><div class="carousel-dots"><button v-for="page in pageCount" :key="page" :class="{ active: page - 1 === currentPage }" :aria-label="`Сторінка відгуків ${page}`" @click="goTo(page - 1)"></button></div></div></section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { reviews } from '../data/content'
import ReviewCard from './ReviewCard.vue'

const currentPage = ref(0)
const previousPage = ref(-1)
const direction = ref<'forward' | 'backward'>('forward')
const viewportWidth = ref(1440)
let animationTimer: ReturnType<typeof setTimeout> | undefined
const perPage = computed(() => viewportWidth.value <= 900 ? 1 : viewportWidth.value <= 1180 ? 2 : 3)
const pageCount = computed(() => Math.ceil(reviews.length / perPage.value))
const reviewPages = computed(() => Array.from({ length: pageCount.value }, (_, index) =>
  reviews.slice(index * perPage.value, (index + 1) * perPage.value),
))
const changePage = (page: number, nextDirection: 'forward' | 'backward') => {
  if (page === currentPage.value) return
  window.clearTimeout(animationTimer)
  previousPage.value = currentPage.value
  direction.value = nextDirection
  currentPage.value = page
  animationTimer = window.setTimeout(() => previousPage.value = -1, 560)
}
const next = () => changePage((currentPage.value + 1) % pageCount.value, 'forward')
const prev = () => changePage((currentPage.value - 1 + pageCount.value) % pageCount.value, 'backward')
const goTo = (page: number) => changePage(page, page > currentPage.value ? 'forward' : 'backward')
const pageClasses = (index: number) => ({
  'is-current': index === currentPage.value,
  'is-previous': index === previousPage.value,
  'is-forward': direction.value === 'forward',
  'is-backward': direction.value === 'backward',
})
const setViewportWidth = () => viewportWidth.value = window.innerWidth

watch(perPage, () => { currentPage.value = 0; previousPage.value = -1 })
onMounted(() => { setViewportWidth(); window.addEventListener('resize', setViewportWidth) })
onBeforeUnmount(() => { window.clearTimeout(animationTimer); window.removeEventListener('resize', setViewportWidth) })
</script>
