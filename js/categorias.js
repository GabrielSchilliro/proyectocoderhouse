/* Para acceder a todas las categorias */
const categorias = document.querySelectorAll('#categorias .categoria');

/* Para acceder a todos los contenedores de preguntas */
const contenedorPreguntas = document.querySelectorAll('.contenedor-preguntas');

/* Variable let porque quiero poder cambiarle el valor */
let categoriaActiva = null;

/* Por cada categoria ejecuto una funcion */
categorias.forEach((categoria) => {
    /* Por cada vez que hago un click en una categoria */
    categoria.addEventListener('click', (e) => {
        categorias.forEach((elemento) => {
            elemento.classList.remove('activa');
        });

        e.currentTarget.classList.toggle('activa');
        /* Guardo la categoria a la que le di click */
        categoriaActiva = categoria.dataset.categoria;


        /* Activo el contenedor de preguntas que corresponde */
        contenedorPreguntas.forEach((contenedor) => {
            /* Si el contenedor tiene un dataset de tipo categoria que es igual 
            a la categoriaActiva significa que quiero mostrar ese contenedor */
            if(contenedor.dataset.categoria === categoriaActiva){
                /* Entonces le ponemos la clase activo */
                contenedor.classList.add('activo');
            } else {
                /* Si no queremos mostrar esas preguntas le saco la clase activo */
                contenedor.classList.remove('activo');
            }
        });
    });
});