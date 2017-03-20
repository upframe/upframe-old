var apiURL = ''

export function init (api) {
  apiURL = api

  document.querySelector('#newsletter form').addEventListener('submit', newsletter)
  randomizePhotos(JSON.parse(document.getElementById('mentors-data').innerHTML))
}

function randomizePhotos (mentors) {
  let max = mentors.length - 1
  let s = new Set()
  let a = 0
  let num = 0

  for (; s.size < 4;) {
    a = Math.floor(Math.random() * (max + 1))
    s.add(a)
  }

  for (let i of document.querySelectorAll('#our-mentors div img')) {
    num = s.keys().next().value
    i.src = `/img/mentors/${mentors[num].Slug}.jpg`
    s.delete(num)
  }
}

function newsletter (event) {
  event.preventDefault()

  let req = new window.XMLHttpRequest()
  let data = new window.FormData(event.currentTarget)

  req.open('POST', `${apiURL}/newsletter`)
  req.send(data)
  req.onerror = () => {
    console.log('Error: ' + req.responseText)
  }

  req.onload = function () {
    if (req.status === 200) {
      window.location.reload()
      return
    }

    console.log('Error: ' + req.responseText)
  }
}
