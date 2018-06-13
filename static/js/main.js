function getDocHeight() {
  let D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  )
}

function windowScrollPerc() {
  let windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight,
      docHeight = getDocHeight(),
      scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return Math.floor((scrollTop / (docHeight - windowHeight)) * 100);
}

function readingProgress() {
  let progressbar = document.querySelector("span#read-progress");
  progressbar.style.width = String(windowScrollPerc() + "%");

  if(window.pageYOffset >= (progressbar.parentElement.offsetTop - progressbar.offsetHeight)) {
    progressbar.classList.add("fixed");
  } else {
    progressbar.classList.remove("fixed");
  }
}

function headerParallax() {
  let el = document.querySelector("header"),
      y = 0,
      clientHeight = el.clientHeight;

  while(el) {
    y += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }

  let scroll = Math.floor(100 * ((window.pageYOffset - y) / clientHeight));

  let title = document.querySelector("header .container .wrapper"),
      img = document.querySelector("header img"),
      banner = document.querySelector("#banner");
  title.style.transform = `translateY(${window.pageYOffset/3}px)`;
  img.style.transform = `scale(${1 + (scroll/1000)}, ${1 + (scroll/1000)})`;
  banner.style.opacity = (1 - 2* (scroll/100));
}

function onSubmit(token) {
  document.getElementById("subscribe").submit();
}


document.addEventListener("scroll", ev => {
  readingProgress();
  if(document.querySelector("header #banner")) {
    headerParallax();
  }
});
