// Obtengo la clase button
const clickButton = document.querySelectorAll('.button');
//
const tbody = document.querySelector('.tbody');
// Array del carrito (lista de productos seleccionados)
let carrito = [];
// forEach recorre la matriz
$(".button").click((e) => {
  addToCarritoItem(e.target)
});
/* clickButton.forEach(btn => {
  // "Escucho" el evento 'click'
  btn.addEventListener('click', addToCarritoItem);
}) */

// Funcion que se ejecuta cuando hago se detecta un click a un producto
function addToCarritoItem(e){
  // Guardo al producto/item que clickee
  const item = e.closest('.card');
  // Obtengo el titulo/nombre del producto
  const itemTitle = item.querySelector('.card-title').textContent;
  // Obtengo el precio del producto
  const itemPrice = item.querySelector('.precio').textContent;
  // Obtengo la imagen del producto
  const itemImg = item.querySelector('.card-img-top').src;
  
  // Creamos un objeto con los datos recopilados
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  // Funcion que añade el item al carrito
  addItemCarrito(newItem);
}

// Funcion que añade el item al carrito
function addItemCarrito(newItem){

  const alert = document.querySelector('.alert');

  setTimeout( function(){
    alert.classList.add('hide');
  }, 2000)
    alert.classList.remove('hide');

  // Obtengo el elemento que se encuentre en el tbody
  const InputElemnto = tbody.getElementsByClassName('input__elemento');
  // Recorro el carrito para ver si ya se encuentra el producto que estoy agregando
  for(let i =0; i < carrito.length ; i++){
    // Si ese producto ya esta
    if(carrito[i].title.trim() === newItem.title.trim()){
      // Sumo uno a la cantidad
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      // Llamo a la funcion carritoTotal para que me saque el calculo del valor total de los productos en el carrito
      CarritoTotal();
      // Con el return null se evita que se pushee de nuevo el item y simplemente se sume 1 a la cantidad
      return null;
    }
  }
  // Agrego el nuevo producto/item a la lista (Array carrito)
  carrito.push(newItem);
  
  renderCarrito();
} 

// Funcion que genera HTML de los items en el carrito
function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    // Creo el table ROW element
    const tr = document.createElement('tr');
    // Cargo los table data
    tr.classList.add('ItemCarrito');
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    // Lo agrego a la estructura body
    tbody.append(tr);

    // Al detectar el click sobre la cruz se ejecuta la funcion de eliminar
    tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
    // Evento change para aumentar o disminuir la cantidad de un producto en el carrito
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
  })
  // Llamo a la funcion que calcula el valor total del carrito
  CarritoTotal();
}

// Funcion para calcular el valor total del carrito
function CarritoTotal(){
  // Variable del valor total, inicia en 0 porque al principio no hay nada en el carrito
  let Total = 0;
  // Obtengo la clase la clase itemCartTotal
  const itemCartTotal = document.querySelector('.itemCartTotal');
  // Recorro con forEach para ver el precio de los items
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''));
    // Operacion para calcular el precio total
    Total = Total + precio*item.cantidad;
  })

  // Muestro en el HTML el precio total
  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

// Funcion para eliminar un producto/item del carrito
function removeItemCarrito(e){
  const buttonDelete = e.target;
  // Elimina al item
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector('.remove');

  setTimeout( function(){
    alert.classList.add('remove');
  }, 2000)
    alert.classList.remove('remove');

  tr.remove();
    // Llamo a la funcion que calcula el valor total del carrito
  CarritoTotal();
}

//Funcion que permite aumentar o disminuir la cantidad de un producto en el carrito
function sumaCantidad(e){
  const sumaInput  = e.target;
  // Aumenta o disminuye la cantidad
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      // Llamo a la funcion que calcula el valor total del carrito
      CarritoTotal();
    }
  })
}

// Funcion para añadir los productos/items al localStorage
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Al refrescar la página por primera vez se ejetcuta esta funcion
window.onload = function(){
  //Busca en el localStorage si existe 'carrito', si es asi lo va a parsear
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito();
  }
}