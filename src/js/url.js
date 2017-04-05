export function query (parameter) {
  parameter = parameter.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + parameter + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(window.location.href)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
