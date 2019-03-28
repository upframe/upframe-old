function addHamburger() {
  let hamburgerMenu = document.querySelector('.hamburger-menu')

  if (hamburgerMenu) {
    // add .active class on click
    hamburgerMenu.addEventListener('click', (e) => {
      let icon = document.querySelector('.hamburger')
      
      if (icon.classList.contains('active')) {
        document.querySelector('.hamburger-menu').classList.remove('open')
        icon.classList.remove('active')
      } else {
        document.querySelector('.hamburger-menu').classList.add('open')
        icon.classList.add('active')
      }
    })

    document.body.addEventListener('click', (e) => {
      let target = e.target
    })
  }
}


function init() {
  addHamburger()
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})