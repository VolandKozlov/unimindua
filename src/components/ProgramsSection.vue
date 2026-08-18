<script setup lang="ts">
import { programs } from '../data/content'
</script>

<template>
  <section class="section shell" id="programs">
    <div class="section-title"><span>Освітні програми</span></div>
    <div class="program-grid">
      <article v-for="(program, i) in programs" :key="program.title" class="program-card">
        <div class="program-no">0{{ i + 1 }}</div>
        <h2>{{ program.title }}</h2>
        <p>{{ program.text }}</p>
      </article>
    </div>
  </section>
</template>
