smoothScroll.init({
    offset: 60,
    speed: 1000,
});

window.addEventListener('scroll', function(e) {
    let nav = document.querySelector("nav");

    if (window.scrollY == 0) {
        nav.classList.remove("scroll");
    } else {
        nav.classList.add("scroll");
    }

    if (window.scrollY > window.innerHeight) {
        document.querySelector("header > img").style.display = "none";
        document.querySelector("header a").style.display = "none";
    } else {
        document.querySelector("header > img").style.display = "block";
        document.querySelector("header a").style.display = "block";
    }
});
