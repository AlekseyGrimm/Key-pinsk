document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger')
  const mobileMenu = document.getElementById('mobileMenu')
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : []

  function toggleMenu(forceState) {
    if (!mobileMenu || !burger) return
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !mobileMenu.classList.contains('is-open')
    mobileMenu.classList.toggle('is-open', shouldOpen)
    burger.classList.toggle('is-active', shouldOpen)
    burger.setAttribute('aria-expanded', String(shouldOpen))
  }

  if (burger) burger.addEventListener('click', () => toggleMenu())
  mobileLinks.forEach((link) => link.addEventListener('click', () => toggleMenu(false)))
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleMenu(false) })

  const revealElements = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          instance.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    revealElements.forEach((el) => observer.observe(el))
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'))
  }
})
