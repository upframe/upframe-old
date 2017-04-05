import * as url from './url'
import { handleErrors } from './utils'

function closeLoading () {
  document.querySelector('.loading').style.opacity = 0
}

function isValid () {
  if (url.query('email') === null) {
    return false
  }

  if (window.location.pathname === '/pay/confirm' && url.query('paymentId') === null) {
    return false
  }

  return true
}

export function pay (apiURL) {
  if (!isValid()) {
    document.querySelector('h2').innerHTML = 'No address email provided.'
    closeLoading()
    return
  }

  fetch(`${apiURL}/pay`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: window.location.search.substr(1)
  }).then(handleErrors)
    .then(function (res) { return res.json() })
    .then(function (response) {
      window.location = response['Content']['Link']
    })
    .catch(function (err) {
      closeLoading()
      console.log(err)
    })
}

export function cancel (apiURL) {
  confirmCancelHandler(`${apiURL}/pay/cancel`)
}

export function confirm (apiURL) {
  confirmCancelHandler(`${apiURL}/pay/confirm`)
}

function confirmCancelHandler (url) {
  if (!isValid()) {
    document.querySelector('#process-success').style.display = 'none'
    document.querySelector('#process-error').style.display = 'block'
    closeLoading()
    return
  }

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: window.location.search.substr(1)
  }).then(handleErrors)
    .then(function (res) { return res.json() })
    .then(function (response) {
      document.querySelector('#person').innerHTML = response['Content']['Name']
      closeLoading()
    })
    .catch(function (err) {
      document.querySelector('#process-success').style.display = 'none'
      document.querySelector('#process-error').style.display = 'block'
      closeLoading()
      console.log(err)
    })
}
