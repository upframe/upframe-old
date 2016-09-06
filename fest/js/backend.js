document.addEventListener("DOMContentLoaded", () => {
    // get all edit buttons
    var btns = document.getElementsByClassName("btnEdit");
    Array.from(btns).forEach(editHandler);
});

function editHandler(btn) {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        // get row data
        document.querySelector("#single-form").classList.add("fadeIn");
        var row = btn.parentElement.parentElement;
        for (x = 0; x < row.childElementCount - 1; x++) {
            let data = row.children[x].dataset.name;
            let input = document.querySelector("input[name=" + data + "]");
            let barID = document.querySelector("#barID");
            console.log(data);

            switch (input.type) {
                case "text":
                    input.value = row.children[x].innerHTML;
                    break;
                case "number":
                    input.value = row.children[x].innerHTML;
                    break;
                case "datetime-local":
                    input.value = new Date(row.children[x].innerHTML).toISOString().substr(0, 16);
                    break;
                case "checkbox":
                    input.checked = row.children[x].children[0].checked;
                    break;
                case "email":
                    input.value = row.children[x].innerHTML;
                    break;
                case "hidden":
                    input.value = row.children[x].innerHTML;
                    barID.innerHTML = input.value;
            }
        }
    });

}