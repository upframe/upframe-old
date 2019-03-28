function addHamburger() {
  let hamburgerMenu = document.querySelector('.hamburger-menu'),
    hamburger = document.querySelector('.hamburger')

  if (hamburgerMenu && hamburger) {
    // set click listener on hamburger icon
    hamburgerMenu.addEventListener('click', (e) => {
      hamburgerMenu.classList.toggle('open')
      hamburger.classList.toggle('active')
    })
  }
}

function addFaqSlideDown() {
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
}

function init() {
  addHamburger()
  addFaqSlideDown()
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})

/* slide down to faq */
function slideDownFaq() {
  document.querySelector('#faq').scrollIntoView()
}