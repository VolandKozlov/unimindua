<template>
  <section id="contacts" class="contact-section"><div class="container contact-grid">
    <div class="contact-intro"><img class="contact-logo" src="/assets/logo/unimind-logo.png" alt="UNIMIND"><p>Міжнародна освітня платформа для психологів та фахівців, які прагнуть професійного зростання та змінюють світ.</p><div class="social-links"><a href="https://t.me/unimind_ua" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><img src="/assets/icons/ui/telegram.svg" alt=""></a><a href="https://www.instagram.com/unimind.ua/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/assets/icons/ui/instagram.svg" alt=""></a><a href="https://www.youtube.com/@unimind_ua" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src="/assets/icons/ui/youtube.svg" alt=""></a></div></div>
    <div class="contact-form-wrap"><h2>Напишіть нам</h2><ApplicationForm variant="footer" /></div>
    <div class="contact-details"><h2>Контакти</h2><div v-for="item in contacts" :key="item.label" class="contact-detail"><img :src="`/assets/icons/ui/${item.icon}`" alt=""><a v-if="item.href" :href="item.href">{{ item.label }}</a><span v-else>{{ item.label }}</span></div></div>
  </div></section>
</template>

<script setup lang="ts">
import ApplicationForm from './ApplicationForm.vue'
const contacts = [
  { icon: 'phone.svg', label: '+38 (068) 123 45 67', href: 'tel:+380681234567' },
  { icon: 'mail.svg', label: 'info@unimind.education', href: 'mailto:info@unimind.education' },
  { icon: 'map-pin.svg', label: 'м. Київ, Україна' },
  { icon: 'clock.svg', label: 'Пн – Пт: 10:00 – 18:00' },
]
</script>
