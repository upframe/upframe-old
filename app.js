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
  document.getElementById('1').addEventListener('click', function () {
    document.getElementById('answer-1').classList.toggle('none')
    document.getElementById('signal-1').innerHTML = document.getElementById('signal-1').innerHTML === '+' ? '-' : '+'
  });
  document.getElementById('2').addEventListener('click', function() {
    document.getElementById('answer-2').classList.toggle('none')
    document.getElementById('signal-2').innerHTML = document.getElementById('signal-2').innerHTML === '+' ? '-' : '+'
  });
  document.getElementById('3').addEventListener('click', function() {
    document.getElementById('answer-3').classList.toggle('none')
    document.getElementById('signal-3').innerHTML = document.getElementById('signal-3').innerHTML === '+' ? '-' : '+'
  });

function init() {
  addHamburger()
}

function slideDownFaq() {
  document.querySelector('#faq').scrollIntoView()
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})