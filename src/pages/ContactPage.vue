<template>
  <div class="site-page contact-page">
    <AppHeader />
    <main><section class="contact-page-intro container"><p class="eyebrow">Будьмо на зв’язку</p><h1>Ваш наступний крок.<br><span>Почнемо разом.</span></h1><p>Допоможемо обрати програму та відповімо на ваші запитання.</p></section><ContactSection /></main>
    <AppFooter /><StickyApplicationBar />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import ContactSection from '../components/ContactSection.vue'
import AppFooter from '../components/AppFooter.vue'
import StickyApplicationBar from '../components/StickyApplicationBar.vue'
</script>
