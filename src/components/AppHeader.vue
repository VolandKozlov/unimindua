<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <a class="app-logo" href="#about" aria-label="UNIMIND — на головну"><img src="/assets/logo/unimind-logo.png" alt="UNIMIND"></a>
      <nav class="desktop-nav" aria-label="Головна навігація">
        <a href="#about">Про нас</a><a href="#programs">Програми</a><a href="#learning">Навчання</a>
        <a href="#speakers">Спікери</a><a href="#reviews">Відгуки</a><a href="#contacts">Контакти</a>
      </nav>
      <a class="header-cta" href="#contacts">Залишити заявку</a>
      <button class="menu-button" :aria-label="menuOpen ? 'Закрити меню' : 'Відкрити меню'" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen"><img :src="menuOpen ? '/assets/icons/ui/close.svg' : '/assets/icons/ui/menu.svg'" alt=""></button>
    </div>
    <MobileMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileMenu from './MobileMenu.vue'
const menuOpen = ref(false)
</script>
