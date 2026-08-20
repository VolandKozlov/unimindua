<template>
  <div class="legal-page">
    <SiteHeader />
    <main class="shell legal-content">
      <h1>{{ title }}</h1>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'

defineProps<{
  title: string
}>()
</script>
