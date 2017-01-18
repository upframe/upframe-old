if (typeof smoothScroll != 'undefined') {
    smoothScroll.init({
        offset: 150,
        speed: 1000,
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname == "/mentors") {
        randomMentorPosition();
        initMentorsPage();
    }
});

window.addEventListener('scroll', function(e) {
    let nav = document.querySelector("nav");

    if (window.scrollY == 0) {
        nav.classList.remove("scroll");
    } else {
        nav.classList.add("scroll");
    }
});

function initMentorsPage() {
    let images = document.querySelectorAll("#mentors .container .mentor img");
    [].forEach.call(images, function(img) {
        img.addEventListener("click", openMentorPopup);
    });
}

function randomMentorPosition() {
    let mentorslist = [],
        children = document.querySelector("div#mentors .container").children;

    for (let i of children) {
        mentorslist.push(i.cloneNode(true));
    }

    mentorslist.sort(function() {
        return .5 - Math.random();
    });

    for (let i = 0; i < children.length; i++) {
        children[i].parentNode.replaceChild(mentorslist[i], children[i]);
    }
}

function openMentorPopup() {
    let mentor = this.parentElement,
        popup = document.querySelector(".mentor-popup"),
        overlay = document.querySelector(".overlay"),
        closeIcon = popup.querySelector(".close-icon");
    closeIcon.addEventListener("click", closeMentorPopup);

    popup.querySelector("img").src = mentor.querySelector("img").src;
    popup.querySelector(".name").innerHTML = mentor.querySelector(".name").innerHTML;
    popup.querySelector(".role").innerHTML = mentor.querySelector(".role").innerHTML;
    popup.querySelector(".job").innerHTML = mentor.querySelector(".job").innerHTML;
    popup.querySelector(".description").innerHTML = mentor.querySelector(".description").innerHTML;

    overlay.classList.add("active");
    popup.classList.add("active");
    window.addEventListener("click", closeMentorPopup);
    window.addEventListener("keydown", closeMentorPopup);
}

function closeMentorPopup(event) {
    let overlay = document.querySelector("#mentors .overlay"),
        popup = document.querySelector("#mentors .mentor-popup");
    if (event.target.className == "overlay active" || event.target.className == "close-icon" || event.key == "Escape") {
        overlay.classList.remove("active");
        popup.classList.remove("active");
    }
}
