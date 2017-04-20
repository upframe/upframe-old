'use strict'

import * as smoothScroll from 'smooth-scroll'
import * as mentors from './mentors'
import * as home from './home'

const apiURL = (() => {
  if (window.location.hostname !== 'upframe.co') {
    return `http://${window.location.hostname}:3002`
  }

  return 'https://api.upframe.co'
})()

function scrollEvent (event) {
  let nav = document.querySelector('nav')

  if (window.scrollY === 0) {
    nav.classList.remove('scroll')
  } else {
    nav.classList.add('scroll')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll.init({
    offset: 150,
    speed: 1000
  })

  scrollEvent()
  window.addEventListener('scroll', scrollEvent)

  switch (window.location.pathname) {
    case '/':
      home.init(apiURL)
      break
    case '/mentors':
      mentors.init()
      break
  }

  Array.from(document.querySelectorAll('.writing-effect')).forEach(input => {
    let parent = input.parentElement

    input.addEventListener('focus', event => {
      parent.classList.remove('written')
      parent.classList.add('writing')
    })

    input.addEventListener('blur', event => {
      parent.classList.remove('writing')

      if (event.currentTarget.value !== '') {
        parent.classList.add('written')
      } else {
        parent.classList.remove('written')
      }
    })
  })
})
