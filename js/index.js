
const usuarioActivo = sessionStorage.getItem("usuarioLogueado");

// Si no hay sesión activa, redirigir inmediatamente al login
if (!usuarioActivo) 
{
    window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", () => 
{
    const spanNombreUsuario = document.getElementById("nombre-usuario");
    if (spanNombreUsuario) 
    {
        spanNombreUsuario.textContent = usuarioActivo;
    }

    const perfilUsuario = document.getElementById("perfil-usuario");
    const menuSalir = document.getElementById("menu-salir");
    
    perfilUsuario.addEventListener("click", () => {
        menuSalir.classList.toggle("mostrar");
    });

    const btnSalir = document.getElementById("btn-salir");
    if (btnSalir) 
    {
        btnSalir.addEventListener("click", (e) => 
        {
            e.preventDefault(); 

            sessionStorage.removeItem("usuarioLogueado");
            sessionStorage.removeItem("passwordLogueado");
            
            // Redirigimos al login
            window.location.replace("login.html");
        });
    }

    const btnMenuLateral = document.getElementById("btn-menu");
    const sidebar = document.getElementById("menu-lateral");
    
    btnMenuLateral.addEventListener("click", () => 
        {
        sidebar.classList.toggle("oculto");
        btnMenuLateral.classList.toggle("mover"); 
    });

    const btnUsuarios = document.getElementById("btn_usuarios");
    const submenuUsuarios = document.getElementById("subsubmenu_captura");
    
    btnUsuarios.addEventListener("click", () => 
    {
        submenuUsuarios.classList.toggle("mostrar-submenu");
    });

    const btnMostrarCaptura = document.getElementById("btn_mostrar_captura");
    const btnMostrarAlumnos = document.getElementById("btn_alumnos");
    
    const seccionCaptura = document.getElementById("seccion-captura");
    const seccionAlumnos = document.getElementById("seccion-alumnos");
    const mensajeBienvenida = document.getElementById("mensaje-bienvenida");

    btnMostrarCaptura.addEventListener("click", () => 
    {
        seccionCaptura.classList.remove("ocultar-seccion");
        seccionAlumnos.classList.add("ocultar-seccion");
        if (mensajeBienvenida) mensajeBienvenida.classList.add("ocultar-seccion");
    });

    btnMostrarAlumnos.addEventListener("click", () => {
        seccionAlumnos.classList.remove("ocultar-seccion");
        seccionCaptura.classList.add("ocultar-seccion");
        if (mensajeBienvenida) mensajeBienvenida.classList.add("ocultar-seccion");
    });

    const formCaptura = document.getElementById("form-captura");
    
    formCaptura.addEventListener("submit", (e) => 
    {
        e.preventDefault(); 

        const correoInput = document.getElementById("cap-correo");
        const passwordInput = document.getElementById("cap-password");

        if (!validarCorreo(correoInput.value)) 
        {
            new componente_tipError(correoInput, "Por favor, ingresa un formato de correo válido.");
            return;
        }

        if (!validarPassword(passwordInput.value)) 
        {
            new componente_tipError(passwordInput, "La contraseña debe contener al menos 6 caracteres.");
            return;
        }

        alert("¡Nuevo usuario guardado correctamente en el sistema!"); 

        formCaptura.reset();
    });

    const formAlumnos = document.getElementById("form-alumnos");
    const modalEdad = document.getElementById("modal-edad");
    const modalTexto = document.getElementById("modal-texto");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");

    formAlumnos.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        const controlInput = document.getElementById("alum-control");
        const edadInput = parseInt(document.getElementById("alum-edad").value);

        const expresionControl = /^\d{6}$/;
        if (!expresionControl.test(controlInput.value)) 
        {
            new componente_tipError(controlInput, "El número de control debe tener exactamente 6 dígitos.");
            return;
        }

        if (edadInput >= 18) 
        {
            modalTexto.textContent = `El alumno con número de control ${controlInput.value} es MAYOR de edad.`;
            modalTexto.style.color = "#2e7d32"; 
        }
        else 
        {
            modalTexto.textContent = `El alumno con número de control ${controlInput.value} es MENOR de edad.`;
            modalTexto.style.color = "#c62828"; 
        }

        modalEdad.classList.remove("ocultar-seccion");
    });

    btnCerrarModal.addEventListener("click", () => {
        modalEdad.classList.add("ocultar-seccion");
        formAlumnos.reset(); 
    });
});