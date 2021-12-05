window.addEventListener("load", function () {
    let form = document.querySelector(".register-form")

    form.addEventListener("submit", function (e) {
        
        let errors = []

        let nombre = document.querySelector(".name")
    
        if (nombre.value == "") {
            errors.push("Debe completar el campo nombre")
        } else if (nombre.value.length < 3) {
            errors.push("El nombre debe tener al menos 3 caracteres")
        }

        let apellido = document.querySelector(".lastname")
       
        if (apellido.value == "") {
            errors.push("Debe completar el campo apellido")
        } else if (apellido.value.length < 3) {
            errors.push("El apellido debe tener al menos 3 caracteres")
        }

        let email = document.querySelector(".email")
        if (email.value == "") {
            errors.push("Debe completar el campo email")
        } 
        console.log(errors.length)
        if (errors.length > 0) {
            e.preventDefault() 
            let ulErrors = document.querySelector("div.errors ul")
            for (i = 0 ; i < errors.length ; i++) {
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }

        }
    })

})