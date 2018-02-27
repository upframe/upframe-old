function getDocHeight() {
  let D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  )
}

function scrollPerc() {
  let windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight,
      docHeight = getDocHeight(),
      scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return Math.floor((scrollTop / (docHeight - windowHeight)) * 100); 
}

document.addEventListener("scroll", ev => {
  let progressbar = document.querySelector("span#read-progress");
  progressbar.style.width = String(scrollPerc() + "%");

  if(window.pageYOffset >= (progressbar.parentElement.offsetTop - progressbar.offsetHeight - 10)) {
    progressbar.classList.add("fixed");
  } else {
    progressbar.classList.remove("fixed");
  }
});