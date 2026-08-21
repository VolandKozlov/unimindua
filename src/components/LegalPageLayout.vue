<template>
  <div class="legal-page">
    <AppHeader />
    <main class="container legal-content">
      <header class="legal-hero">
        <RouterLink class="legal-back" to="/">← На головну</RouterLink>
        <p class="legal-kicker">Правова інформація</p>
        <h1>{{ title }}</h1>
      </header>
      <article class="legal-document">
        <div class="legal-document__inner">
          <slot />
        </div>
      </article>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

defineProps<{
  title: string
}>()
</script>
