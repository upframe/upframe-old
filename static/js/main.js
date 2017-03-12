if (typeof smoothScroll != 'undefined') {
    smoothScroll.init({
        offset: 150,
        speed: 1000,
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname == "/") {
        initNewsletter();
    }

    if (window.location.pathname == "/mentors") {
        initMentorsPage();
    }

    if (window.location.pathname == "/apply") {
        initApplyPage();
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


function distributePhotos(mentors) {
    let max = mentors.length - 1,
        s = new Set();
    a = 0;
    num = 0;

    for (; s.size < 4;) {
        a = Math.floor(Math.random() * (max + 1));
        s.add(a);
    }

    for (i of document.querySelectorAll("#our-mentors div img")) {
        num = s.keys().next().value;
        i.src = "/img/mentors/" + mentors[num].Slug + ".jpg";
        s.delete(num);
    }
}

function initNewsletter() {
    document.querySelector('#newsletter form').addEventListener("submit", function() {
        event.preventDefault();
        let req = new XMLHttpRequest(),
            data = new FormData(document.querySelector("#newsletter form"));
        req.open("POST", "/newsletter")
        req.send(data);
        req.onreadystatechange = function() {
            if (this.readyState == 4) {
                switch (this.status) {
                    case 500:
                        console.log("Error: " + this.responseText);
                    case 200:
                        location.reload();
                }
            }
        }
    });
}

function initMentorsPage() {
    let mentorslist = [],
        children = document.querySelector("#mentors-container").children;

    for (let i of children) {
        mentorslist.push(i.cloneNode(true));
    }

    mentorslist.sort(function() {
        return .5 - Math.random();
    });

    for (let i = 0; i < children.length; i++) {
        children[i].parentNode.replaceChild(mentorslist[i], children[i]);
    }

    let images = document.querySelectorAll("#mentors-container .mentor img");
    [].forEach.call(images, function(img) {
        img.addEventListener("click", openMentorPopup);
        img.addEventListener('touchstart', openMentorPopup);
    });

    // Check if there is an hash
    if (window.location.hash != "") {
        let el = document.getElementById(window.location.hash.substring(1));
        if (el == null) return;

        el.querySelector('img').click();
    }
}

function openMentorPopup(event) {
    let mentor = event.currentTarget.parentElement,
        popup = document.querySelector(".mentor-popup"),
        overlay = document.querySelector(".overlay"),
        closeIcon = popup.querySelector(".close-icon");
    closeIcon.addEventListener("click", closeMentorPopup);

    history.pushState("", document.title, window.location.pathname + '#' + mentor.id);

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
        history.pushState("", document.title, window.location.pathname);
        popup.classList.remove("active");
    }
}

function initApplyPage() {
    Array.from(document.querySelectorAll(".writing-effect")).forEach(input => {
        input.addEventListener('focus', event => {
            event.currentTarget.parentElement.classList.remove("written");
            event.currentTarget.parentElement.classList.add("writing");
        });

        input.addEventListener('blur', event => {
            event.currentTarget.parentElement.classList.remove("writing");

            if (event.currentTarget.value != "") {
                event.currentTarget.parentElement.classList.add("written");
            } else {
                event.currentTarget.parentElement.classList.remove("written");
            }
        });
    });

    document.querySelector('form').addEventListener("submit", function(event) {
        event.preventDefault();

        let req = new XMLHttpRequest(),
            form = document.querySelector("form"),
            data = new FormData(form);

        req.open("POST", window.location);
        req.send(data);
        req.onreadystatechange = function() {
            if (this.readyState == 4) {
                switch (this.status) {
                    case 200:
                        form.classList.add('success');
                        break;
                    default:
                        form.classList.add('error');
                        form.querySelector(".btn").value = "Something went wrong";
                }

                return;
            }
        }

        return;
    });
}
