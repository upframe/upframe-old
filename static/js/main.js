document.addEventListener("scroll", ev => {
  document.querySelector("span#read-progress").style.width = String((window.pageYOffset / document.body.offsetHeight) * 100 + "%");
});