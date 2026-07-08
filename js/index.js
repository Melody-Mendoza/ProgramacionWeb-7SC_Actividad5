
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
    const contenedorCarrusel = document.getElementById("contenedor-carrusel");

    function volverAlInicio() 
    {
        seccionCaptura.classList.add("ocultar-seccion");
        seccionAlumnos.classList.add("ocultar-seccion");
        contenedorCarrusel.classList.remove("ocultar-seccion");
    }

    if (btnMostrarCaptura) 
    {
        btnMostrarCaptura.addEventListener("click", () => 
        {
            seccionCaptura.classList.remove("ocultar-seccion");
            seccionAlumnos.classList.add("ocultar-seccion");
            contenedorCarrusel.classList.add("ocultar-seccion");
        });
    }

    if (btnMostrarAlumnos) 
    {
        btnMostrarAlumnos.addEventListener("click", () => 
        {
            seccionAlumnos.classList.remove("ocultar-seccion");
            seccionCaptura.classList.add("ocultar-seccion");
            contenedorCarrusel.classList.add("ocultar-seccion");
        });
    }

    new componente_tipError("#cap-correo", 
    {
        mensaje: "Ingrese un correo electrónico válido.",
        regla: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    });

    new componente_tipError("#cap-password", 
    {
        mensaje: "La contraseña debe tener al menos 6 caracteres.",
        regla: /^.{6,}$/
    });

    new componente_tipError("#alum-control", 
    {
        mensaje: "El número de control debe ser exactamente de 6 dígitos numéricos.",
        regla: /^\d{6}$/
    });


    const formCaptura = document.getElementById("form-captura");
    const capCorreo = document.getElementById("cap-correo");
    const capPassword = document.getElementById("cap-password");
    
    formCaptura.addEventListener("submit", (e) => 
    {
        e.preventDefault(); 

        const correoVal = capCorreo.value.trim();
        const passwordVal = capPassword.value;

        if (!validarCorreo(correoVal)) 
        {
            capCorreo.focus();
            return;
        }

        if (!validarPassword(passwordVal)) 
        {
            capPassword.focus();
            return;
        }

        alert("¡Nuevo usuario guardado correctamente en el sistema!"); 
        formCaptura.reset(); 
        volverAlInicio();
    });

    const formAlumnos = document.getElementById("form-alumnos");
    const alumControl = document.getElementById("alum-control");
    const modalEdad = document.getElementById("modal-edad");
    const modalTexto = document.getElementById("modal-texto");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");

    formAlumnos.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        const controlVal = alumControl.value.trim();
        const edadInput = parseInt(document.getElementById("alum-edad").value);

        const expresionControl = /^\d{6}$/;
        if (!expresionControl.test(controlVal)) 
        {
            alumControl.focus();
            return;
        }

        if (edadInput >= 18) 
        {
            modalTexto.textContent = `El alumno con número de control ${controlVal} es MAYOR de edad.`;
            modalTexto.style.color = "#2e7d32"; 
        } 
        else 
        {
            modalTexto.textContent = `El alumno con número de control ${controlVal} es MENOR de edad.`;
            modalTexto.style.color = "#c62828"; 
        }

        modalEdad.classList.remove("ocultar-seccion");
    });

    btnCerrarModal.addEventListener("click", () => 
    {
        modalEdad.classList.add("ocultar-seccion");
        formAlumnos.reset(); 
        volverAlInicio();
    });
});