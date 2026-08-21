<template>
  <article class="review-card" :class="{ 'is-active': active }">
    <p>{{ review.text }}</p>
  </article>
</template>

<script setup lang="ts">
import type { Review } from '../data/content'
defineProps<{ review: Review; active?: boolean }>()
</script>
