// Funciones para la página web

const productList = () => {
    return fetch("http://localhost:3000/productos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProducts = (nombre, precio, imagen) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
        }),

    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch((err) => console.log(err));
};
export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
}