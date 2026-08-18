<script setup lang="ts">
import { ref } from 'vue'
import { speakers } from '../data/content'

const speakerIndex = ref(0)
const nextSpeaker = () => speakerIndex.value = (speakerIndex.value + 1) % speakers.length
const prevSpeaker = () => speakerIndex.value = (speakerIndex.value - 1 + speakers.length) % speakers.length
</script>

<template>
  <section class="section team" id="team">
    <div class="eyebrow">наша команда</div>
    <div class="team-head">
      <h2>Спікери</h2>
      <div class="controls">
        <button aria-label="Previous speaker" @click="prevSpeaker">←</button>
        <button aria-label="Next speaker" @click="nextSpeaker">→</button>
      </div>
    </div>
    <div class="speaker-card">
      <img :src="speakers[speakerIndex].image" :alt="speakers[speakerIndex].name">
      <div class="speaker-copy">
        <h3>{{ speakers[speakerIndex].name }}</h3>
        <p v-for="line in speakers[speakerIndex].text" :key="line">{{ line }}</p>
      </div>
    </div>
  </section>
</template>
