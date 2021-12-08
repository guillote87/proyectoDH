window.addEventListener("load", function () {

    const formulario = document.querySelector(".register-form")
    // Selecciono todos los inputs del form con ID register-form

    const inputs = document.querySelectorAll("#register-form input")

    const botonImagen = document.getElementById('image');
    // expresiones para validar
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, // 4 a 12 digitos..
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const campos = {
        name: false,
        lastName: false,
        email: false,
        password: false,
    }

    const validarForm = (e) => {
        // target me trae el name del input
        switch (e.target.name) {
            case "name":
                validarCampo(expresiones.nombre, e.target, e.target.name)
                break
            case "lastName":
                validarCampo(expresiones.nombre, e.target, e.target.name)
                break
            case "email":
                validarCampo(expresiones.email, e.target, e.target.name)
                break
            case "password":
                validarCampo(expresiones.password, e.target, e.target.name)
                validarPass()
                break
            
            case "confirmation":
                validarPass()
                break
        }
    }

    botonImagen.addEventListener("change", ()=>{
        fileValidation()
        })

    function fileValidation() {
        var image = document.getElementById('image');
        var filePath = image.value;
        var extensiones = /(.jpg|.jpeg|.png|.gif)$/i;
        if (!extensiones.exec(filePath)) {
            alert('Solo se permiten las siguientes extensiones .jpeg/.jpg/.png/.gif.');
            image.value = '';
            return false;
        } else {
            //Image preview
            if (image.files && image.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('avatar').innerHTML = '<img src="' + e.target.result + '"/>';
                };
                reader.readAsDataURL(image.files[0]);
            }
        }
    }

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`${campo}`).classList.remove("formulario__grupo-incorrecto")
            document.getElementById(`${campo}`).classList.add("formulario__grupo-correcto")
            document.querySelector(`#${campo} i`).classList.add('fa-check-circle')
            document.querySelector(`#${campo} i`).classList.remove("fa-times-circle")
            document.querySelector(`#${campo} .input-error`).classList.remove("input-error-activo")
            // paso a true el campo
            campos[campo] = true
        } else {
            document.getElementById(`${campo}`).classList.add("formulario__grupo-incorrecto")
            document.getElementById(`${campo}`).classList.remove("formulario__grupo-correcto")
            document.querySelector(`#${campo} i`).classList.remove('fa-check-circle')
            document.querySelector(`#${campo} i`).classList.add("fa-times-circle")
            document.querySelector(`#${campo} .input-error`).classList.add("input-error-activo")
            // paso a false el campo
            campos[campo] = false
        }
    }


    const validarPass = () => {
        const pass = document.getElementById("pass")
        const confirm = document.getElementById("pass2")

        if (pass.value !== confirm.value) {
            document.getElementById(`confirmation`).classList.add("formulario__grupo-incorrecto")
            document.getElementById(`confirmation`).classList.remove("formulario__grupo-correcto")
            document.querySelector(`#confirmation i`).classList.remove('fa-check-circle')
            document.querySelector(`#confirmation i`).classList.add("fa-times-circle")
            document.querySelector(`#confirmation .input-error`).classList.add("input-error-activo")
            // paso a false el campo
            campos[password] = false
        } else {
            document.getElementById(`confirmation`).classList.remove("formulario__grupo-incorrecto")
            document.getElementById(`confirmation`).classList.add("formulario__grupo-correcto")
            document.querySelector(`#confirmation i`).classList.add('fa-check-circle')
            document.querySelector(`#confirmation i`).classList.remove("fa-times-circle")
            document.querySelector(`#confirmation .input-error`).classList.remove("input-error-activo")
            // paso a true el campo
            campos[password] = true
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("keyup", validarForm)
        input.addEventListener("blur", validarForm)
    })


    formulario.addEventListener("submit", enviarForm)


    function enviarForm(e) {
        e.preventDefault()
        if (campos.name && campos.lastName && campos.email && campos.password) {

            document.getElementById("envio-exitoso").classList.add("envio-exitoso-activo")
            // Pongo tiempo de ejecucion y despues que vuelva a desaparecer
            setTimeout(() => {
                document.getElementById("envio-exitoso").classList.remove("envio-exitoso-activo")
            }, 5000)
            // Por cada icono activo le saco la clase 
            document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
                icono.classList.remove("formulario__grupo-correcto")
            })
            document.getElementById("mensaje-error").classList.remove("mensaje-error-activo")
            this.submit()

        } else {
            document.getElementById("mensaje-error").classList.add("mensaje-error-activo")

        }

    }

})