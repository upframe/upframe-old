document.addEventListener("DOMContentLoaded", () => {
    // get all edit buttons
    var btns = document.getElementsByClassName("btnEdit");
    Array.from(btns).forEach(editHandler);

    document.getElementById("single-form").addEventListener('submit', submitHandler);
});

function editHandler(btn) {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        // get row data
        document.getElementById("single-form").className = "fadeIn";
        var row = btn.parentElement.parentElement;
        for (x = 0; x < row.childElementCount - 1; x++) {
            let data = row.children[x].dataset.name;
            let input = document.querySelector("input[name=" + data + "]");
            let barID = document.querySelector("#barID");
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
    });
}

function submitHandler(event) {
    event.preventDefault();

    var object = new Object();
    object.ID = 0;
    var div = this.querySelector('div');

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

    var method = (object.ID == 0) ? 'POST' : 'PUT';
    var link = this.dataset.link;

    if (object.ID != 0) {
        link += "/" + object.ID;
    }

    let request = new XMLHttpRequest();
    request.open(method, link);
    request.send(JSON.stringify(object));
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                // TODO @ffcf mete os dados novos na tabela and fadeoff the editor
                document.getElementById("single-form").className = "fadeOut";
                if(method == "PUT") {
                    var row = document.querySelector('tr[data-id="' + object.ID + '"]');
                    for (x = 0; x < row.childElementCount - 1; x++) {
                        let tbspace = row.children[x];
                        let val = object[x];

                        switch (tbspace.dataset.name) {
                            case "Expires":
                                tbspace.value = new Date(object.Expires).toISOString().substr(0, 16);
                                break;
                            case "Deactivated":
                                tbspace.checked = object.Deactivated.checked;
                                break;
                            default:
                                tbspace.innerHTML = object[tbspace.dataset.name];
                        }
                    }
                } else {
                    window.location.pathname = "/admin/" + window.location.pathname.split("/")[2] + "/" + object.ID;
                }
            } else {
                formError("Something went wrong.", "error")
            }
        }
    }
}
