<template>
  <div class="site-page">
    <AppHeader /><main><HeroSection /><ProgramsSection /><LearningSection /><SpeakersSection /><ReviewsSection /><ContactSection /></main><AppFooter /><StickyApplicationBar />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import ProgramsSection from '../components/ProgramsSection.vue'
import LearningSection from '../components/LearningSection.vue'
import SpeakersSection from '../components/SpeakersSection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import AppFooter from '../components/AppFooter.vue'
import StickyApplicationBar from '../components/StickyApplicationBar.vue'
</script>
