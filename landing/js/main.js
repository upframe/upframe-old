document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#email input");
    let span = document.querySelector("#email span");
    let email = document.querySelector("#email");

    span.addEventListener("click", () => {
        email.classList.add("active");
    });

    input.addEventListener("blur", () => {
        if (input.value == "") {
            email.classList.remove("active");
        }
    });
});
