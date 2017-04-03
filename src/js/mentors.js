var overlay = null
var popup = null

export function init () {
  overlay = document.querySelector('.overlay')
  popup = document.querySelector('.mentor-popup')

  overlay.addEventListener('click', close)
  document.querySelector('.mentor-popup .close-icon').addEventListener('click', close)
  window.addEventListener('keydown', close)

  randomize()

  const images = document.querySelectorAll('#mentors-container .mentor img')

  for (const img of images) {
    img.addEventListener('click', open)
  }
  // Check if there is an hash
  if (window.location.hash !== '') {
    const el = document.getElementById(window.location.hash.substring(1))
    if (el == null) return
    el.querySelector('img').click()
  }
}

function randomize () {
  let list = []
  let children = document.querySelector('#mentors-container').children

  for (let i = 0; i < children.length; i++) {
    list.push(children[i].cloneNode(true))
  }

  list.sort(function () {
    return 0.5 - Math.random()
  })

  for (let i = 0; i < children.length; i++) {
    children[i].parentNode.replaceChild(list[i], children[i])
  }
}

function open (event) {
  event.preventDefault()

  const mentor = event.currentTarget.parentElement

  window.history.pushState(
    '',
    document.title,
    window.location.pathname + '#' + mentor.id
  )

  popup.querySelector('img').src = mentor.querySelector('img').src
  popup.querySelector('img').srcset = mentor.querySelector('img').srcset
  popup.querySelector('.name').innerHTML = mentor.querySelector('.name').innerHTML
  popup.querySelector('.role').innerHTML = mentor.querySelector('.role').innerHTML
  popup.querySelector('.description').innerHTML = mentor.querySelector('.description').innerHTML

  overlay.classList.add('active')
  popup.classList.add('active')
  document.querySelector('body').classList.add('no-scroll')
}

function close (event) {
  if (event.target.className === 'overlay active' || event.target.className === 'close-icon' || event.key === 'Escape') {
    overlay.classList.add('disappear')
    popup.classList.add('disappear')

    setTimeout(() => {
      overlay.classList.remove('active')
      overlay.classList.remove('disappear')
      popup.classList.remove('active')
      popup.classList.remove('disappear')
    }, 250)

    document.querySelector('body').classList.remove('no-scroll')
    window.history.pushState('', document.title, window.location.pathname)
  }
}
