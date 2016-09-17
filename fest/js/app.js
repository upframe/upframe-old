// Register page JS file

document.addEventListener("DOMContentLoaded", () => {
    // if register form was loaded it means everything is fine
    // if not, it means register is only available by invitation
    if (form = document.getElementById("register")) {
        form.addEventListener("submit", registerHandler);
    }

    if (form = document.getElementById("login")) {
        form.addEventListener("submit", loginHandler);
    }

    document.addEventListener('click', function(event) {
        if (event.target.id != "dropdown" && event.target.parentElement.getAttribute("for") != "dropdown") {
            document.querySelector('body>nav input[type="checkbox"]').checked = false;
        }
    });

    if (settings = document.getElementById("settings")) {
        settings.addEventListener('submit', submitSettings);
    }
});

function submitSettings(event) {
    event.preventDefault();
    let inputs = this.querySelectorAll('input'),
        form = new Object();

    Array.from(inputs).forEach((input) => {
        form[input.name] = input.value;
    });

    var request = new XMLHttpRequest();
    request.open("PUT", window.location, true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(JSON.stringify(form));
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            switch (request.status) {
                case 200:
                case 201:
                    console.log("Hey")
                    break;
                default:
                    console.log("BAD")
            }
        }
    }
}

Object.prototype.serialize = function() {
    var str = [];
    for (var p in this) {
        if (this.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this[p]));
        }
    }

    return str.join("&");
}

var registerHandler = function(event) {
    event.preventDefault();

    if (checkRegisterFields(this)) {
        // passwords match. so que let fica condicionado ao if{} e var fica na funcao toda
        var form = new Object();
        // ugly names!!!
        form.first_name = this.querySelectorAll('input[name=first_name]')[0].value.trim(),
            form.last_name = this.querySelectorAll('input[name=last_name]')[0].value.trim(),
            form.email = this.querySelectorAll("input[name=email]")[0].value.trim(),
            form.password = this.querySelectorAll("input[name=password]")[0].value;

        let pwdHash = new jsSHA("SHA-256", "TEXT");
        pwdHash.update(form.password);
        form.password = pwdHash.getHash("HEX");

        var request = new XMLHttpRequest();
        request.open("POST", window.location, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(form.serialize());
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                switch (request.status) {
                    case 200:
                    case 201:
                        formError("You're now registered. Check your email to confirm.", "success");
                        break;
                    case 400:
                        formError("Some fields are empty or invalid.", "error");
                        break;
                    case 403:
                        formError("The reffer link is invalid.", "error");
                        break;
                    case 409:
                        formError("Your email is already registered. Please <a href='/login'>login</a>.", "error");
                        break;
                    case 410:
                        formError("It seems that in the meanwhile the person that invited you ran out of invites.", "error");
                        break;
                    default:
                        formError("Something went wrong and we are unable to explain it right now.", "error")
                }
            }
        }
    } else {
        formError("Passwords doesn't match or some fields are empty.", "error")
    }
}

var loginHandler = function(event) {
    event.preventDefault();

    // passwords match. so que let fica condicionado ao if{} e var fica na funcao toda
    var form = new Object();
    form.email = this.querySelectorAll("input[name=email]")[0].value.trim();
    form.password = this.querySelectorAll("input[name=password]")[0].value;

    let pwdHash = new jsSHA("SHA-256", "TEXT");
    pwdHash.update(form.password);
    form.password = pwdHash.getHash("HEX");

    var request = new XMLHttpRequest();
    request.open("POST", window.location, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(form.serialize());
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            switch (request.status) {
                case 200:
                    window.location = window.location.protocol + "//" + window.location.hostname
                    break;
                case 400:
                    formError("You might have left some fields blank!", "error");
                    break;
                case 404:
                    formError("We can't find you in our database. <a href='/register'>Register</a> first.", "error")
                    break;
                case 401:
                    formError("Incorrect password.", "error")
                    break;
                case 423:
                    formError("Your account is deactivated.", "error")
                    break;
                case 424:
                    formError("Check your email to confirm your account first. <a href='#' onclick='resendConfirmation();'>Resend confirmation.</a>", "warning")
                    break;
                default:
                    formError("Something went wrong and we are unable to explain it right now.", "error")
            }
        }
    }
}

function resendConfirmation() {
    email = document.querySelector('input[name="email"]');

    if (email.value.search("@") == -1) {
        return formError("Your email is invalid.", "error");
    }

    var request = new XMLHttpRequest();
    request.open("POST", window.location, true);
    request.setRequestHeader("Resend", "true");
    request.setRequestHeader("Email", email.value);
    request.send(form.serialize());
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            switch (request.status) {
                case 201:
                case 200:
                    formError("Check your email!", "success");
                    break;
                case 404:
                    formError("We can't find you in our database. <a href='/register'>Register</a> first.", "error")
                    break;
                default:
                    formError("Something went wrong and we are unable to explain it right now.", "error")
            }
        }
    }
}

function formError(message, type) {
    let error = document.getElementById("form-error");

    error.classList.remove("warning");
    error.classList.remove("success");
    error.classList.remove("error");

    error.classList.add(type);
    error.innerHTML = message;
    error.classList.add("shake");

    setTimeout(() => {
        error.classList.remove("shake");
    }, 830);
}

function checkRegisterFields(form) {
    let inputs = form.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            console.log(input[i])
            return false;
        }
    }

    if (form.querySelector('input[name="password"]').value != form.querySelector('input[name="password_conf"]').value) {
        return false;
    }

    if (form.querySelector('input[name="email"]').value.search("@") == -1) {
        return false;
    }

    return true;
}
