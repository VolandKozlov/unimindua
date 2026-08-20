import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import ContactPage from './pages/ContactPage.vue'
import AccessibilityStatementPage from './pages/AccessibilityStatementPage.vue'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.vue'
import './styles.scss'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/accessibility-statement', name: 'accessibility', component: AccessibilityStatementPage },
    { path: '/privacy-policy', name: 'privacy', component: PrivacyPolicyPage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
