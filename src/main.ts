import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import ContactPage from './pages/ContactPage.vue'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.vue'
import OfferAgreementPage from './pages/OfferAgreementPage.vue'
import './styles.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/privacy-policy', name: 'privacy', component: PrivacyPolicyPage },
    { path: '/offer-agreement', name: 'offer', component: OfferAgreementPage },
    { path: '/accessibility-statement', redirect: '/offer-agreement' },
    { path: '/admin', redirect: '/admin/users' },
    { path: '/admin/login', name: 'admin-login', component: () => import('./pages/AdminLoginPage.vue') },
    { path: '/admin/users', name: 'admin-users', component: () => import('./pages/AdminUsersPage.vue'), meta: { requiresAdmin: true } },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true
  try {
    const { getAdminSession } = await import('./services/admin')
    await getAdminSession()
    return true
  } catch {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }
})

createApp(App).use(router).mount('#app')
