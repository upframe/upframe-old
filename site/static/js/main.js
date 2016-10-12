smoothScroll.init({
    offset: 150,
    speed: 1000,
});

window.addEventListener('scroll', function(e) {
    let nav = document.querySelector("nav");

    if (window.scrollY == 0) {
        nav.classList.remove("scroll");
    } else {
        nav.classList.add("scroll");
    }
});
