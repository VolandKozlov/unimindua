<template>
  <main class="admin-login-page">
    <RouterLink class="admin-login-page__logo" to="/" aria-label="UNIMIND — на головну">
      <img src="/assets/logo/unimind-logo.png" alt="UNIMIND">
    </RouterLink>

    <section class="admin-login-card" aria-labelledby="admin-login-title">
      <p class="admin-login-card__eyebrow">Адміністрування</p>
      <h1 id="admin-login-title">Вхід до бази учнів</h1>
      <p class="admin-login-card__lead">Сторінка доступна лише користувачам із правами адміністратора.</p>

      <form @submit.prevent="submit">
        <label>
          Email
          <input v-model.trim="email" type="email" autocomplete="username" required>
        </label>
        <label>
          Пароль
          <input v-model="password" type="password" autocomplete="current-password" required>
        </label>
        <p v-if="error" class="admin-login-card__error" role="alert">{{ error }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Входимо…' : 'Увійти' }}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginAdmin } from '../services/admin'

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await loginAdmin(email.value, password.value)
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/admin')
      ? route.query.redirect
      : '/admin/users'
    await router.replace(redirect)
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося увійти.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.admin-login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 112px 24px 48px;
  background:
    radial-gradient(circle at 86% 12%, rgba(155, 217, 141, .32), transparent 28%),
    var(--navy);
}

.admin-login-page__logo {
  position: absolute;
  top: 28px;
  left: 40px;
  width: 166px;

  img { width: 100%; }
}

.admin-login-card {
  width: min(100%, 520px);
  padding: 48px;
  border-radius: 24px;
  background: var(--cream);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .22);

  &__eyebrow {
    margin: 0 0 16px;
    color: var(--green-dark);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(36px, 5vw, 54px);
    line-height: 1.04;
    letter-spacing: -.04em;
  }

  &__lead {
    margin: 20px 0 32px;
    color: var(--muted);
  }

  form { display: grid; gap: 18px; }

  label {
    display: grid;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
  }

  input {
    width: 100%;
    min-height: 52px;
    padding: 12px 16px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #fff;
    outline: none;

    &:focus { border-color: var(--green-dark); box-shadow: 0 0 0 3px rgba(155, 217, 141, .24); }
  }

  button {
    min-height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    padding: 12px 20px;
    border: 0;
    border-radius: 10px;
    color: #fff;
    background: var(--navy);
    cursor: pointer;

    &:disabled { cursor: wait; opacity: .65; }
  }

  &__error { margin: 0; color: #a72c2c; font-size: 14px; }
}

@media (max-width: 600px) {
  .admin-login-page { padding-top: 92px; }
  .admin-login-page__logo { top: 24px; left: 24px; width: 140px; }
  .admin-login-card { padding: 32px 24px; }
}
</style>
