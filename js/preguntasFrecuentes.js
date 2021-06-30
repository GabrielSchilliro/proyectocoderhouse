/* Para acceder a la clase de preguntas y luego al contenedor-pregunta */
const preguntas = document.querySelectorAll('.preguntas .contenedor-pregunta');
/* Ejecuto una funcion por cada una de las preguntas */
preguntas.forEach((pregunta) => {
    /* Por cada pregunta cuando le de click ejecuto una funcion */
	pregunta.addEventListener('click', (e) => {
		e.currentTarget.classList.toggle('activa');

        /* Accedo a la respuesta que tengo dentro de la pregunta que le di click */
		const respuesta = pregunta.querySelector('.respuesta');
        /* Saco la altura real de la respuesta */
		const alturaRealRespuesta = respuesta.scrollHeight;
		
        /* Condicional */
		if(!respuesta.style.maxHeight){
			/* Si esta vacio el maxHeight entonces ponemos un valor */
			respuesta.style.maxHeight = alturaRealRespuesta + 'px';
		} else {
			respuesta.style.maxHeight = null;
		}

		/* Reinicio las demas preguntas */
		preguntas.forEach((elemento) => {

			if(pregunta !== elemento){
				elemento.classList.remove('activa');
				elemento.querySelector('.respuesta').style.maxHeight = null;
			}
		});
	});
});