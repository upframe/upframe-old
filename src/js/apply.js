import { handleErrors } from './utils'

var overlay = null
var tac = null
var apiURL = ''

export function init (url) {
  apiURL = url

  overlay = document.querySelector('.overlay')
  tac = document.querySelector('div#terms-and-conditions')

  document.getElementById('tac-link').addEventListener('click', openTac)
  document.getElementById('tac-close').addEventListener('click', closeTac)
  document.querySelector('.overlay').addEventListener('click', closeTac)
  document.querySelector('form').addEventListener('submit', submit)
}

function openTac (event) {
  event.preventDefault()

  tac.classList.add('active')
  overlay.classList.add('active')

  document.body.classList.add('no-scroll')
}

function closeTac (event) {
  event.preventDefault()

  tac.classList.add('disappear')
  overlay.classList.add('disappear')

  setTimeout(() => {
    tac.classList.remove('disappear')
    overlay.classList.remove('disappear')

    tac.classList.remove('active')
    overlay.classList.remove('active')
  }, 250)

  document.body.classList.remove('no-scroll')
}

function submit (event) {
  event.preventDefault()

  let form = event.currentTarget

  form.classList.add('sending')

  // TODO: JS DATA VALIDITY CHECK

  fetch(`${apiURL}/apply`, {
    method: 'POST',
    mode: 'cors',
    body: new window.FormData(form)
  }).then(handleErrors)
    .then(function (response) {
      console.log(response)

      form.classList.remove('sending')
      form.classList.add('hide')
      document.getElementById('success').classList.add('show')
      form.querySelector('p').style.display = 'block'
      form.querySelector('.btn').style.display = 'none'
    })
    .catch(function (err) {
      form.classList.remove('sending')
      form.classList.add('error')
      form.querySelector('.btn').value = 'Something went wrong'
      console.log(err)
    })
}
