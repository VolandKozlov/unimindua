<template>
  <section id="programs" class="section programs-section">
    <div class="container">
      <p class="eyebrow">Програми</p>
      <h2 class="section-title">Оберіть свій напрям</h2>
      <p class="section-description">Оберіть тему для підвищення кваліфікації</p>
      <div class="program-grid">
        <ProgramCard v-for="program in programs" :key="program.title" :program="program" />
      </div>
      <a class="programs-more" href="#contacts">Дізнатися більше <span>→</span></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { programs } from '../data/content'
import ProgramCard from './ProgramCard.vue'
</script>
