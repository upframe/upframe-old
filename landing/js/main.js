document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#email input");
    let span = document.querySelector("#email span");
    let email = document.querySelector("#email");

    span.addEventListener("click", () => {
        input.focus();
        input.classList.add("active");
        span.style.textAlign = "left";
    });

    input.addEventListener("keyup", function(e) {
        if(input.value.trim() != ""){
            // working
            span.classList.add("hidden");
        } else {
            console.log("empty input")
            if(span.classList[0] == "hidden") {
                span.classList.remove("hidden");
            }
        }
    });


    input.addEventListener("blur", () => {
        if (input.value == "") {
            input.classList.remove("active");
            span.style.textAlign = "center"
        }
    });
});


function onfoc() {
    console.log("On focus");
}
