<template>
  <article class="review-card" :class="{ 'is-active': active }">
    <div class="review-card__head"><img :src="review.avatar" :alt="review.name"><div><h3>{{ review.name }}</h3><img class="review-stars" src="/assets/icons/ui/stars-5.svg" alt="Оцінка 5 з 5"></div></div>
    <p>{{ review.text }}</p>
  </article>
</template>

<script setup lang="ts">
import type { Review } from '../data/content'
defineProps<{ review: Review; active?: boolean }>()
</script>
