import { onMounted, onBeforeUnmount } from 'vue'

/** Reveal once; content stays visible when motion is reduced or JS is unavailable. */
export function useReveal() {
  let observer: IntersectionObserver | undefined
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.section .section-title, .program-card, .learning-item, .speaker-carousel, .reviews-carousel, .contact-grid').forEach((element, index) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return
      element.classList.add('reveal')
      ;(element as HTMLElement).style.setProperty('--reveal-delay', `${index % 4 * 65}ms`)
      observer?.observe(element)
    })
  })
  onBeforeUnmount(() => observer?.disconnect())
}
