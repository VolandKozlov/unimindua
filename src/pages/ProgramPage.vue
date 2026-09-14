<template>
  <div v-if="program" class="site-page program-page">
    <AppHeader />
    <main>
      <section class="program-page__hero">
        <div class="container program-page__hero-inner">
          <div class="program-page__hero-copy">
            <RouterLink class="program-page__back" to="/#programs"><span aria-hidden="true">←</span> Всі програми</RouterLink>
            <p class="eyebrow">Освітній напрям</p>
            <h1>{{ program.title }}</h1>
            <p class="program-page__lead">{{ program.placeholder.lead }}</p>
            <RouterLink class="base-button base-button--primary" to="/contact">Дізнатися про старт <span>→</span></RouterLink>
          </div>
          <div class="program-page__visual" aria-hidden="true"><img :src="program.icon" alt=""></div>
        </div>
      </section>

      <section class="program-page__content section">
        <div class="container program-page__content-grid">
          <div>
            <p class="eyebrow">Про напрям</p>
            <h2>Знання, які мають<br>практичний сенс.</h2>
          </div>
          <div class="program-page__text">
            <p v-for="paragraph in program.placeholder.about" :key="paragraph">{{ paragraph }}</p>
            <small>Поки що це текст-заглушка. Деталі програми буде оновлено.</small>
          </div>
        </div>
        <div class="container program-page__topics">
          <article v-for="(topic, index) in program.placeholder.topics" :key="topic">
            <span>0{{ index + 1 }}</span><h3>{{ topic }}</h3><p>Детальний опис модуля з’явиться тут незабаром.</p>
          </article>
        </div>
      </section>

      <section class="program-page__cta">
        <div class="container program-page__cta-inner">
          <div><p class="eyebrow">Залишилися питання?</p><h2>Допоможемо обрати<br>найкращий напрям.</h2></div>
          <a class="base-button base-button--primary" href="https://ig.me/m/unimind.ua" target="_blank" rel="noopener noreferrer">Написати в дірект <span>↗</span></a>
        </div>
      </section>
    </main>
    <AppFooter />
    <StickyApplicationBar />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import StickyApplicationBar from '../components/StickyApplicationBar.vue'
import { programs } from '../data/content'

const route = useRoute()
const router = useRouter()
const program = computed(() => programs.find(item => item.slug === route.params.slug))

watchEffect(() => {
  if (!program.value) {
    router.replace('/#programs')
    return
  }
  document.title = `${program.value.title} — UNIMIND`
})
</script>
