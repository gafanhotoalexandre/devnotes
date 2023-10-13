const toggler = document.querySelector('#toggler') as HTMLElement
const body = document.body

toggler.addEventListener('click', () => {
  // toggle theme
  body.classList.toggle('light')

  // toggle icon
  toggler.classList.toggle('ph-sun', !body.classList.contains('light'))
  toggler.classList.toggle('ph-moon', body.classList.contains('light'))
})