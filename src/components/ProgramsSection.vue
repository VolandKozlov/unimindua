<template>
  <section id="programs" class="section programs-section">
    <div class="container"><p class="eyebrow">Знайдіть свій напрям</p><h2 class="section-title">Наступний рівень. Ваш.</h2><p class="section-description">Оберіть знання, які стануть вашою силою.</p><div class="program-grid"><ProgramCard v-for="program in programs" :key="program.title" :program="program" /></div><a class="programs-more" href="#contacts">Дізнатися більше <span>→</span></a></div>
  </section>
</template>

<script setup lang="ts">
import { programs } from '../data/content'
import ProgramCard from './ProgramCard.vue'
</script>
