document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
    scrollNav();
    navegacionFija();
});

function iniciarApp() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('DIV');
        imagen.innerHTML = `            
            <img  src="build/img/thumb/${i}.jpg" alt="Imagen ">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const overlay = document.createElement('DIV')
    const imagen = document.createElement('DIV')
    imagen.innerHTML = `            
        <img  src="build/img/grande/${id}.jpg" alt="Imagen ">
    `;

    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar')
        overlay.remove();
    }

    overlay.appendChild(cerrarModal)

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar');

}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}


function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {

        if (sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}