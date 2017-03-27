'use strict'

import * as smoothScroll from 'smooth-scroll'
import * as mentors from './mentors'
import * as apply from './apply'
import * as pay from './pay'
import * as home from './home'

const apiURL = (() => {
  if (window.location.hostname !== 'upframe.co') {
    return `http://${window.location.hostname}:3002`
  }

  return 'https://api.upframe.co'
})()

function scrollEvent (event) {
  let nav = document.querySelector('nav'),
    early = document.querySelector("div#early-bird-bar");

  if (window.scrollY === 0) {
    nav.classList.remove('scroll')
    early.classList.remove('scroll')
  } else {
    nav.classList.add('scroll')
    early.classList.add('scroll')
  }
}

function hideEarly (event) {
    event.srcElement.offsetParent.style.visibility = "hidden"
}

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll.init({
    offset: 150,
    speed: 1000
  })

  scrollEvent()
  window.addEventListener('scroll', scrollEvent)
  document.querySelector("div#early-bird-bar span").addEventListener('click', hideEarly)

  switch (window.location.pathname) {
    case '/':
      home.init(apiURL)
      break
    case '/mentors':
      mentors.init()
      break
    case '/apply':
      apply.init(apiURL)
      break
    case '/pay':
      pay.pay()
      break
    case '/pay/cancel':
      pay.cancel()
      break
    case '/pay/confirm':
      pay.confirm()
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
