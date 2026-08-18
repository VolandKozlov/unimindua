<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <section class="contact-hero">
        <div class="contact-hero-overlay"></div>
        <div class="shell contact-hero-content">
          <h1>Connect With Us</h1>
          <p>Start the conversation about your financial goals.</p>
        </div>
      </section>

      <section class="contact-section shell">
        <div class="eyebrow">why choose us?</div>
        <div class="contact-grid">
          <div class="contact-form-wrap">
            <h2>Get In Touch</h2>
            <p>Start the conversation about your financial goals.</p>
            <form class="contact-form" @submit.prevent>
              <label>First Name*<input type="text" required></label>
              <label>Last Name*<input type="text" required></label>
              <label>Email*<input type="email" required></label>
              <label>Subject<input type="text"></label>
              <label class="full">Message<textarea rows="7"></textarea></label>
              <button class="full" type="submit">Send Message</button>
            </form>
          </div>
          <aside class="contact-info">
            <section>
              <h3>Office Location</h3>
              <p>500 Terry Francine Street,<br>San Francisco,<br>CA 94158</p>
            </section>
            <section>
              <h3>Inquiries</h3>
              <p>123-456-7890<br>info@mysite.com</p>
            </section>
            <section>
              <h3>Consultation Hours</h3>
              <p>Mon — Fri: 08:30 – 18:00<br>By Appointment Only</p>
            </section>
          </aside>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
