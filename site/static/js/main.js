smoothScroll.init({
    offset: 150,
    speed: 1000,
});

document.addEventListener("DOMContentLoaded", () => {
    if(window.location.pathname == "/mentors/") {
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
        img.addEventListener("click", openMentorPopup)
    });
}

function openMentorPopup() {
    let mentor = this.parentElement,
        popup = document.querySelector(".mentor-popup"),
        overlay = document.querySelector(".overlay"),
        closeIcon = popup.querySelector(".close-icon");
    closeIcon.addEventListener("click", closeMentorPopup);
    popup.querySelector("img").src = mentor.querySelector("img").src;
    popup.querySelector(".mentor-popup-name").innerHTML = mentor.querySelector(".mentor-name").innerHTML;
    popup.querySelector(".mentor-popup-role").innerHTML = mentor.querySelector(".mentor-role").innerHTML;
    popup.querySelector(".mentor-popup-job").innerHTML = mentor.querySelector(".mentor-job").innerHTML;
    popup.querySelector(".mentor-popup-description").innerHTML = mentor.querySelector(".mentor-description").innerHTML;

    overlay.style.display = "block";
    popup.style.display = "block";
    window.addEventListener("click", closeMentorPopup);
}

function closeMentorPopup(event) {
    let overlay = document.querySelector("#mentors .overlay"),
        popup = document.querySelector("#mentors .mentor-popup");
    if(event.target.className == "overlay" || event.target.className == "close-icon") {
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".mentor-popup").style.display = "none";
    }
}
