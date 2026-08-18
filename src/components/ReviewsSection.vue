<script setup lang="ts">
import { ref } from 'vue'
import { reviews } from '../data/content'

const reviewIndex = ref(0)
const nextReview = () => reviewIndex.value = (reviewIndex.value + 1) % reviews.length
const prevReview = () => reviewIndex.value = (reviewIndex.value - 1 + reviews.length) % reviews.length
</script>

<template>
  <section class="section reviews shell">
    <div class="reviews-head">
      <h2>Відгуки наших студентів</h2>
      <div class="controls">
        <button aria-label="Previous review" @click="prevReview">←</button>
        <button aria-label="Next review" @click="nextReview">→</button>
      </div>
    </div>
    <div class="review-wrap">
      <img :src="reviews[reviewIndex]" alt="Відгук студента">
      <div class="review-counter">{{ String(reviewIndex + 1).padStart(2, '0') }} / {{ String(reviews.length).padStart(2, '0') }}</div>
    </div>
  </section>
</template>
