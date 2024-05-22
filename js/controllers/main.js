import { servicesProducts } from "../services/product-services.js";

const productoContainer = document.querySelector("[data-producto]"); //selecciona el contenedor de los productos
const form = document.querySelector("[data-form]");


function createcard(nombre, precio, imagen, id) {
    const card = document.createElement("div"); //crea el div
    card.classList.add("producto-item"); //le agrega la clase card al div
    card.innerHTML = `
        <img class="producto-imagen" src="${imagen}" alt="${nombre}"> <!-- Imagen del producto -->
        <p class="producto-descripcion">${nombre}</p> <!-- Nombre del producto -->
        <p class="producto-precio">$ ${precio}</p> <!-- Precio del producto -->
        <button class="icono-borrar" data-id="${id}">
            <div class="icono-basurero">
                <img src="imagenes/🦆 icon _trash 2_.png" alt="Eliminar">
            </div>
        </button> <!-- Botón para eliminar el producto -->
    `;

    const deleteButton = card.querySelector(".icono-borrar");
    deleteButton.addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    productoContainer.appendChild(card);
    return card;

}



const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(productos => {
            productoContainer.appendChild(
                createcard(
                    productos.nombre,
                    productos.precio,
                    productos.imagen,
                    productos.id)
            );

        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    // Verificar si los campos no están vacíos
    if (nombre.trim() === '' || precio.trim() === '' || imagen.trim() === '') {
        alert('Por favor completa todos los campos del formulario.');
        return;
    }

    servicesProducts
        .createProducts(nombre, precio, imagen)
        .then((res) => {
            // Limpiar el formulario después de agregar el producto
            document.querySelector("[data-nombre]").value = '';
            document.querySelector("[data-precio]").value = '';
            document.querySelector("[data-imagen]").value = '';
            // Renderizar nuevamente la lista de productos para que aparezca el nuevo producto
            render();
        })
        .catch((err) => console.log(err))
});


render();