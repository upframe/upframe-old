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
    h2.innerHTML = 'No address email provided.'
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
  if (!isValid()) {
    window.alert('Wrong URL!')
  }

  let name = document.querySelector('#person')
// closeLoading()
// window.alert('Payment cancel page!')
}

export function confirm (apiURL) {
  if (!isValid()) {
    window.alert('Wrong URL!')
  }

  let name = document.querySelector('#person')

// window.alert('Payment confirm page!')
}
