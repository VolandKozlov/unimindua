<template>
  <section id="programs" class="section programs-section">
    <div class="container"><h2 class="section-title">Наші програми</h2><div class="program-grid"><ProgramCard v-for="program in programs" :key="program.title" :program="program" /></div><a class="programs-more" href="#contacts">Дізнатися більше <span>→</span></a></div>
  </section>
</template>

<script setup lang="ts">
import { programs } from '../data/content'
import ProgramCard from './ProgramCard.vue'
</script>
