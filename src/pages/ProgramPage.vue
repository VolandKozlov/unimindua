<template>
  <div v-if="program" class="site-page program-page">
    <AppHeader />
    <main>
      <section class="program-page__hero">
        <div class="container program-page__hero-inner">
          <div class="program-page__hero-copy">
            <RouterLink class="program-page__back" to="/#programs"
              ><span aria-hidden="true">←</span> Всі програми</RouterLink
            >
            <p class="eyebrow">Освітній напрям</p>
            <h1>{{ program.title }}</h1>
            <p class="program-page__lead">
              {{ detail ? program.description : program.placeholder?.lead }}
            </p>
            <RouterLink class="base-button base-button--primary" to="/contact"
              >Дізнатися про старт <span>→</span></RouterLink
            >
          </div>
          <div class="program-page__visual" aria-hidden="true">
            <img :src="program.icon" alt="" />
          </div>
        </div>
      </section>

      <section class="program-page__content section">
        <div class="container program-page__content-grid">
          <div>
            <p class="eyebrow">{{ detail ? 'Про курс' : 'Про напрям' }}</p>
            <h2>Знання, які мають<br />практичний сенс.</h2>
          </div>
          <div class="program-page__text">
            <p
              v-for="paragraph in detail?.intro ?? program.placeholder?.about ?? []"
              :key="paragraph"
            >
              {{ paragraph }}
            </p>
            <small v-if="!detail">Поки що це текст-заглушка. Деталі програми буде оновлено.</small>
          </div>
        </div>
        <div v-if="detail" class="container program-page__modules">
          <div class="program-page__section-heading">
            <p class="eyebrow">Навчальний план</p>
            <h2>Програма курсу</h2>
          </div>
          <div class="program-page__module-grid">
            <article v-for="module in detail.modules" :key="module.label">
              <span>{{ module.label }}</span>
              <h3>{{ module.title }}</h3>
              <p v-if="module.body">{{ module.body }}</p>
            </article>
          </div>
        </div>
        <div v-else class="container program-page__topics">
          <article v-for="(topic, index) in program.placeholder?.topics ?? []" :key="topic">
            <span>0{{ index + 1 }}</span>
            <h3>{{ topic }}</h3>
            <p>Детальний опис модуля з’явиться тут незабаром.</p>
          </article>
        </div>
      </section>

      <section v-if="detail" class="program-page__audience section">
        <div class="container">
          <div class="program-page__section-heading">
            <p class="eyebrow">Для кого</p>
            <h2>Кому підійде курс</h2>
          </div>
          <ul>
            <li v-for="item in detail.audience" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section class="program-page__cta">
        <div class="container program-page__cta-inner">
          <div>
            <p class="eyebrow">Залишилися питання?</p>
            <h2>Допоможемо обрати<br />найкращий напрям.</h2>
          </div>
          <a
            class="base-button base-button--primary"
            href="https://ig.me/m/unimind.ua"
            target="_blank"
            rel="noopener noreferrer"
            >Написати в дірект <span>↗</span></a
          >
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
import programDetails from '../data/programDetails.json'

const route = useRoute()
const router = useRouter()
const program = computed(() => programs.find((item) => item.slug === route.params.slug))
const detail = computed(() =>
  program.value ? programDetails[program.value.slug as keyof typeof programDetails] : undefined,
)

watchEffect(() => {
  if (!program.value) {
    router.replace('/#programs')
    return
  }
  document.title = `${program.value.title} — UNIMIND`
})
</script>
