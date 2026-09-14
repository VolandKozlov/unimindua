<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <RouterLink class="app-logo" to="/" aria-label="UNIMIND — на головну"><img src="/assets/logo/unimind-logo.png" alt="UNIMIND"></RouterLink>
      <nav class="desktop-nav" aria-label="Головна навігація">
        <a href="/#about">Про нас</a><a href="/#programs">Програми</a><a href="/#learning">Навчання</a>
        <a href="/#speakers">Спікери</a><a href="/#reviews">Відгуки</a><a href="/#contacts">Контакти</a>
      </nav>
      <RouterLink class="registry-link" to="/registry">Реєстр</RouterLink>
      <a class="header-cta" href="https://ig.me/m/unimind.ua" target="_blank" rel="noopener noreferrer">Написати в дірект</a>
      <button class="menu-button" :aria-label="menuOpen ? 'Закрити меню' : 'Відкрити меню'" :aria-expanded="menuOpen" @keydown.esc="menuOpen = false" @click="menuOpen = !menuOpen"><img :src="menuOpen ? '/assets/icons/ui/close.svg' : '/assets/icons/ui/menu.svg'" alt=""></button>
    </div>
    <MobileMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileMenu from './MobileMenu.vue'
const menuOpen = ref(false)
</script>
