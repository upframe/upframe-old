export function getCookie (name) {
  var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$')
  return document.cookie.replace(re, '$1')
}
