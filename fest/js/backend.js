'use strict';

var singleForm,
    monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

document.addEventListener("DOMContentLoaded", () => {
    // Initializes the Single Form variable
    singleForm = document.getElementById("single-form");

    if (singleForm) {
        // Add an event listener to the Single Form
        document.addEventListener("click", pageClick)
        singleForm.addEventListener('submit', submitHandler);
        singleForm.addEventListener('keyup', escapeHandler)

        // Get all the edit buttons and initialize them
        var btns = document.getElementsByClassName("btnEdit");
        Array.from(btns).forEach(editHandler);
    }

    highlight();
});

function highlight() {
    let hash = window.location.hash.replace('#', '');
    let items = hash.split(',')

    for (var i = 0; i < items.length; i++) {
        let row = document.querySelector('tr[data-id="' + items[i] + '"]');
        if (typeof row == 'undefined' || row == null) continue;
        row.classList.add('highlight');
    }
}

function pageClick(event) {
    event.preventDefault();
    if(event.srcElement.className == "btnEdit") {
        return;
    }
    if(singleForm.className == "fadeIn") {
        singleForm.className = "fadeOut";
    }
}

function escapeHandler(event) {
    event.preventDefault();
    if(event.key == "Escape") {
        document.getElementById("single-form").className = "fadeOut";
    }
}

function editHandler(btn) {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        // fades in the form and copies the row information to the form
        singleForm.className = "fadeIn";
        copyRowToForm(btn.parentElement.parentElement);
        singleForm.children[1].children[3].focus();
    });
}

function submitHandler(event) {
    event.preventDefault();

    let data = copyFormToObject(this);
    let method = (data.ID == 0) ? 'POST' : 'PUT';
    let link = this.dataset.link;

    if (data.ID != 0) {
        link += "/" + data.ID;
    }

    let request = new XMLHttpRequest();
    request.open(method, link);
    request.send(JSON.stringify(data));
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                singleForm.className = "fadeOut";

                if (method == "PUT") {
                    copyFormToRow(document.querySelector('tr[data-id="' + data.ID + '"]'));
                } else {
                    window.location.pathname = "/admin/" + window.location.pathname.split("/")[2] + "/" + request.responseText;
                }
            } else {
                formError("Something went wrong.", "error")
            }
        }
    }
}

function copyFormToRow(row) {
    let form = singleForm;

    if (typeof form == 'undefined') {
        return;
    }

    let div = form.querySelector('div');

    if (typeof div == 'undefined') {
        return;
    }

    for (var i = 0; i < div.childElementCount; i++) {
        let name = div.children[i].name;

        if (typeof name == 'undefined' || name == null || name == "") {
            continue;
        }

        let space = row.querySelector('td[data-name="' + name + '"]');

        if (typeof space == 'undefined' || space == null) {
            continue;
        }

        switch (div.children[i].type) {
            case "datetime-local":
                space.innerHTML = getPrettyDate(new Date(div.children[i].value));
                break;
            case "checkbox":
                space.querySelector('input[type="checkbox"]').checked = div.children[i].checked;
                break;
            default:
                space.innerHTML = div.children[i].value;
        }
    }
}

// getPrettyDate puts the date in a 22 Oct 99 08:48 UTC pretty format
function getPrettyDate(date) {
    let pretty;

    let normalize = function(number) {
        if (number.length == 1) {
            return "0" + number;
        }

        return number;
    }

    pretty = normalize(date.getUTCDate().toString()) + " "
    pretty += monthNames[date.getUTCMonth()] + " "
    pretty += date.getUTCFullYear().toString().substr(2, 2) + " "
    pretty += normalize(date.getUTCHours().toString()) + ":"
    pretty += normalize(date.getUTCMinutes().toString()) + " UTC"

    return pretty;
}

// Copies the information from a row to the editor form
function copyRowToForm(row) {
    let form = singleForm;

    if (typeof form == 'undefined') {
        return;
    }

    for (var x = 0; x < row.childElementCount - 1; x++) {
        let data = row.children[x].dataset.name,
            input = form.querySelector("input[name=" + data + "]"),
            barID = form.querySelector("#barID");

        if (data == "ID") {
            barID.innerHTML = row.children[x].innerHTML;
        }

        switch (input.type) {
            case "datetime-local":
                input.value = new Date(row.children[x].innerHTML).toISOString().substr(0, 16);
                break;
            case "checkbox":
                input.checked = row.children[x].children[0].checked;
                break;
            default:
                input.value = row.children[x].innerHTML;
        }
    }
}

function copyFormToObject(form) {
    let object = new Object();
    object.ID = 0;

    let div = form.querySelector('div');

    for (var i = 0; i < div.childElementCount; i++) {
        let name = div.children[i].name;

        if (typeof name == 'undefined' || name == null || name == "") {
            continue;
        }

        switch (div.children[i].type) {
            case "number":
                object[name] = parseInt(div.children[i].value);
                break;
            case "datetime-local":
                object[name] = (new Date(div.children[i].value)).toISOString();
                break;
            case "checkbox":
                object[name] = div.children[i].checked;
                break;
            default:
                object[name] = div.children[i].value;
        }
    }

    if (isNaN(object.ID)) object.ID = 0;
    return object;
}
