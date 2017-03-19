'use strict';

var apiURL = (() => {
    let splitted = window.location.host.split('.'),
        domain = '';

    if (splitted.length > 1) {
        domain = splitted[splitted.length - 2] + '.' + splitted[splitted.length - 1];
    } else {
        domain = splitted[0];
    }

    return window.location.protocol + '//api.' + domain;
})();

/* MENTORS PAGE */

let mentors = {
    overlay: null
};

mentors.init = () => {
    mentors.overlay = document.querySelector('.overlay'),
        mentors.popup = document.querySelector('.mentor-popup');

    mentors.overlay.addEventListener('click', mentors.close);
    document.querySelector('.mentor-popup .close-icon').addEventListener('click', mentors.close)
    window.addEventListener('keydown', mentors.close);

    mentors.randomize();

    let images = document.querySelectorAll('#mentors-container .mentor img');
    for(let img of images) {
        img.addEventListener('click', mentors.open);
    }

    // Check if there is an hash
    if (window.location.hash != '') {
        let el = document.getElementById(window.location.hash.substring(1));
        if (el == null) return;

        el.querySelector('img').click();
    }
}

mentors.randomize = () => {
    let list = [],
        children = document.querySelector('#mentors-container').children;

    for (let i = 0; i < children.length; i++) {
        list.push(children[i].cloneNode(true));
    }

    list.sort(function() {
        return .5 - Math.random();
    });

    for (let i = 0; i < children.length; i++) {
        children[i].parentNode.replaceChild(list[i], children[i]);
    }
}

mentors.open = event => {
    event.preventDefault();

    let mentor = event.currentTarget.parentElement;

    history.pushState('', document.title, window.location.pathname + '#' + mentor.id);

    mentors.popup.querySelector('img').src = mentor.querySelector('img').src;
    mentors.popup.querySelector('.name').innerHTML = mentor.querySelector('.name').innerHTML;
    mentors.popup.querySelector('.role').innerHTML = mentor.querySelector('.role').innerHTML;
    mentors.popup.querySelector('.description').innerHTML = mentor.querySelector('.description').innerHTML;

    mentors.overlay.classList.add('active');
    mentors.popup.classList.add('active');

    document.querySelector('body').classList.add('no-scroll');
}

mentors.close = event => {
    if (event.target.className == 'overlay active' || event.target.className == 'close-icon' || event.key == 'Escape') {
        mentors.overlay.classList.add('disappear');
        mentors.popup.classList.add('disappear');

        setTimeout(() => {
            mentors.overlay.classList.remove('active');
            mentors.overlay.classList.remove('disappear');

            mentors.popup.classList.remove('active');
            mentors.popup.classList.remove('disappear');
        }, 250);

        document.querySelector('body').classList.remove('no-scroll');
        history.pushState('', document.title, window.location.pathname);
    }
}

/* APPLY PAGE */

let apply = {
    overlay: null,
    tac: null
}

apply.init = () => {
    apply.overlay = document.querySelector('.overlay'),
        apply.tac = document.querySelector('div#terms-and-conditions');

    document.getElementById('tac-link').addEventListener('click', apply.openTac);
    document.getElementById('tac-close').addEventListener('click', apply.closeTac);
    document.querySelector('.overlay').addEventListener('click', apply.closeTac)
    document.querySelector('form').addEventListener('submit', apply.submit);
}

apply.openTac = event => {
    event.preventDefault();

    apply.tac.classList.add('active');
    apply.overlay.classList.add('active');

    document.body.classList.add('no-scroll');
}

apply.closeTac = event => {
    event.preventDefault();

    apply.tac.classList.add('disappear');
    apply.overlay.classList.add('disappear');

    setTimeout(() => {
        apply.tac.classList.remove('disappear');
        apply.overlay.classList.remove('disappear');

        apply.tac.classList.remove('active');
        apply.overlay.classList.remove('active');
    }, 250)

    document.body.classList.remove('no-scroll');
}

apply.submit = event => {
    event.preventDefault();

    let req = new XMLHttpRequest(),
        form = event.currentTarget,
        data = new FormData(form);

    // TODO: JS DATA VALIDITY CHECK

    req.open('POST', apiURL + '/apply');
    req.send(data);
    req.onload = function() {
        switch (this.status) {
            case 200:
                form.classList.add('success');
                form.querySelector('p').style.display = 'block';
                form.querySelector('.btn').style.display = 'none';
                break;
            default:
                form.classList.add('error');
                form.querySelector('.btn').value = 'Something went wrong';
        }
    }

    return;
}

/* HOME PAGE */
let home = {};

home.randomizePhotos = mentors => {
    let max = mentors.length - 1,
        s = new Set(),
        a = 0,
        num = 0;

    for (; s.size < 4;) {
        a = Math.floor(Math.random() * (max + 1));
        s.add(a);
    }

    for (let i of document.querySelectorAll('#our-mentors div img')) {
        num = s.keys().next().value;
        i.src = '/img/mentors/' + mentors[num].Slug + '.jpg';
        s.delete(num);
    }
}

home.newsletter = event => {
    event.preventDefault();

    let req = new XMLHttpRequest(),
        data = new FormData(event.currentTarget);

    req.open('POST', apiURL + '/newsletter')
    req.send(data);
    req.onerror = () => {
        console.log('Error: ' + req.responseText);
    }

    req.onload = function() {
        if (req.status == 200) {
            location.reload();
            return;
        }

        console.log('Error: ' + req.responseText);
    }
}

/* PAY PAGE */

let pay = {};

pay.pay = () => {
    alert('Pay Page!')
}

pay.cancel = () => {
    alert('Payment cancel page!')
}

pay.confirm = () => {
    alert('Payment confirm page!')
}

/* GENERAL AND BASE FUNCTIONS */

function scrollEvent(event) {
    let nav = document.querySelector('nav');

    if (window.scrollY == 0) {
        nav.classList.remove('scroll');
    } else {
        nav.classList.add('scroll');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof smoothScroll != 'undefined') {
        smoothScroll.init({
            offset: 150,
            speed: 1000,
        });
    }

    window.addEventListener('scroll', scrollEvent);

    if (window.location.pathname == '/') {
        document.querySelector('#newsletter form').addEventListener('submit', home.newsletter);
    }

    if (window.location.pathname == '/mentors') {
        mentors.init();
    }

    if (window.location.pathname == '/apply') {
        apply.init();
    }

    if (window.location.pathname == '/pay') {
        pay.pay();
    }

    if (window.location.pathname == '/pay/cancel') {
        pay.cancel();
    }

    if (window.location.pathname == '/pay/confirm') {
        pay.confirm();
    }

    Array.from(document.querySelectorAll('.writing-effect')).forEach(input => {
        let parent = input.parentElement;

        input.addEventListener('focus', event => {
            parent.classList.remove('written');
            parent.classList.add('writing');
        });

        input.addEventListener('blur', event => {
            parent.classList.remove('writing');

            if (event.currentTarget.value != '') {
                parent.classList.add('written');
            } else {
                parent.classList.remove('written');
            }
        });
    });
});
