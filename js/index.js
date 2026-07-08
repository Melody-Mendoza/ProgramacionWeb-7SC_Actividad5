import { crearSlider }
from "https://cdn.jsdelivr.net/gh/Melody-Mendoza/ProgramacionWeb-7SC_Actividad3@main/js/componente.js";

import { validarCorreo, validarPassword } from "https://cdn.jsdelivr.net/gh/Angel-2329/Programacion-WEB-7SC-Actividad-2@main/js/validaciones.js";
import { componente_tipError } from "https://cdn.jsdelivr.net/gh/Angel-2329/Verano-de-Programacion-WEB-7SC-Actividad-3@main/js/componente.js";

const escuela = [
    {
        imagen: "img/posgrados.png",
        titulo: "Posgrados",
        descripcion: "Conoce la oferta educativa de posgrado del Instituto Tecnológico de Oaxaca."
    },
    {
        imagen: "img/resultados.png",
        titulo: "Resultados",
        descripcion: "Consulta los resultados institucionales del Tecnológico Nacional de México."
    },
    {
        imagen: "img/tec.jpg",
        titulo: "Instituto Tecnológico de Oaxaca",
        descripcion: "Bienvenido al Instituto Tecnológico de Oaxaca."
    },
    {
        imagen: "img/violencia.jpg",
        titulo: "Prevención de la Violencia",
        descripcion: "Información sobre campañas de concientización y prevención."
    },
    {
        imagen: "img/virtual.jpg",
        titulo: "Campus Virtual",
        descripcion: "Accede a los servicios académicos y plataformas digitales."
    }
];


const usuarioActivo = sessionStorage.getItem("usuarioLogueado");

// Si no hay sesión activa, redirigir inmediatamente al login
if (!usuarioActivo) 
{
    window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", () => 
{
        crearSlider(
        "contenedor-carrusel",
        escuela,
        "Conoce más sobre "
    ); 
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

    const btnRegresarCaptura = document.getElementById("btn-regresar-captura");
    const btnRegresarAlumnos = document.getElementById("btn-regresar-alumnos");

    if (btnRegresarCaptura) 
    {
        btnRegresarCaptura.addEventListener("click", () => 
        {
            document.getElementById("form-captura").reset();
            volverAlInicio();
        });
    }

    if (btnRegresarAlumnos) 
    {
        btnRegresarAlumnos.addEventListener("click", () => 
        {
            document.getElementById("form-alumnos").reset();
            volverAlInicio();
        });
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

    const formCaptura = document.getElementById("form-captura");
    const capNombre = document.getElementById("cap-nombre"); 
    const capCorreo = document.getElementById("cap-correo");
    const capPassword = document.getElementById("cap-password");
    const alertaExito = document.getElementById("alerta-exito");
    const alertaErrorCaptura = document.getElementById("alerta-error-captura");

    formCaptura.addEventListener("submit", (e) => 
    {
        e.preventDefault(); 

        const nombreVal = capNombre.value.trim();
        const correoVal = capCorreo.value.trim();
        const passwordVal = capPassword.value;

        const expresionNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (nombreVal === "" || !expresionNombre.test(nombreVal) || correoVal === "" || passwordVal === "" || !validarCorreo(correoVal) || !validarPassword(passwordVal))
        {
            alertaErrorCaptura.classList.remove("d-none");
            alertaExito.classList.add("d-none"); 
            return;
        }

        alertaErrorCaptura.classList.add("d-none");
        alertaExito.classList.remove("d-none");
        
        setTimeout(() => 
        {
            alertaExito.classList.add("d-none"); 
            formCaptura.reset(); 
            volverAlInicio();
        }, 1900);
    });

    const formAlumnos = document.getElementById("form-alumnos");
    const alumControl = document.getElementById("alum-control");
    const alumEdad = document.getElementById("alum-edad");
    const modalTexto = document.getElementById("modal-texto");
    const alertaErrorAlumnos = document.getElementById("alerta-error-alumnos");

    const modalBootstrap = new bootstrap.Modal(document.getElementById('modal-edad'));

    formAlumnos.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        const controlVal = alumControl.value.trim();
        const edadVal = alumEdad.value.trim(); 
        const edadInput = parseInt(edadVal);

        const expresionControl = /^\d{6}$/;

        if (controlVal === "" || edadVal === "" || !expresionControl.test(controlVal)) 
        {
            alertaErrorAlumnos.classList.remove("d-none");
            return;
        }

        alertaErrorAlumnos.classList.add("d-none");

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

        modalBootstrap.show();
    });

    document.getElementById('modal-edad').addEventListener('hidden.bs.modal', () => 
    {
        formAlumnos.reset(); 
        volverAlInicio();
    });
});

