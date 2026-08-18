<script setup lang="ts">
import { formats } from '../data/content'
</script>

<template>
  <section class="section format-section shell">
    <div class="eyebrow">як проходить навчання</div>
    <div class="format-heading"><h2>Формат</h2></div>
    <div class="format-grid">
      <article v-for="item in formats" :key="item.no" class="format-card">
        <div class="format-no">{{ item.no }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
