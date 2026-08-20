<template>
  <section id="learning" class="section learning-section">
    <div class="container">
      <p class="eyebrow">Формат навчання</p><h2 class="section-title">Зручно. Гнучко. Ефективно.</h2>
      <div class="learning-grid">
        <article v-for="(item, index) in learningItems" :key="item.title" class="learning-item">
          <div class="learning-item__icon"><img :src="item.icon" alt=""></div>
          <div class="learning-item__copy"><strong>0{{ index + 1 }}</strong><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { learningItems } from '../data/content'
</script>
