
// Importar librería CDN
import {
    validarCorreo,
    validarPassword
} from "https://cdn.jsdelivr.net/gh/Angel-2329/Programacion-WEB-7SC-Actividad-2@main/js/validaciones.js";



// Importar componente CDN
import {
    componente_tipError,
    componente_Contraseña
} from "https://cdn.jsdelivr.net/gh/Angel-2329/Verano-de-Programacion-WEB-7SC-Actividad-3@main/js/componente.js";


const formulario = document.getElementById("formLogin");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const mostrarPassword = document.getElementById("mostrarPassword");


// Tooltip para correo
new componente_tipError("#correo",{
    mensaje:"Ingrese un correo electrónico válido.",
    regla:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
});

// Tooltip para contraseña
new componente_tipError("#password",{
    mensaje:"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
    regla:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
});

mostrarPassword.addEventListener("change",function(){

    if(mostrarPassword.checked){
        password.type = "text";
    }else{
        password.type = "password";
    }

});

// Inicio de sesión

formulario.addEventListener("submit",function(event){

    event.preventDefault();

    var correoUsuario = correo.value.trim();
    var passwordUsuario = password.value;

    if(!validarCorreo(correoUsuario)){
        correo.focus();
        return;
    }

    if(!validarPassword(passwordUsuario)){
        password.focus();
        return;
    }

    // Guardar usuario

    sessionStorage.setItem("usuarioLogueado",correoUsuario);
    

    sessionStorage.setItem("usuario",correoUsuario);

    window.location.href="index.html";

});