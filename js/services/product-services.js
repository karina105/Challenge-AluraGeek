const apiUrl = "https://fake-api-bbi7.vercel.app/productos"; //  URL de tu API desplegada en Vercel

// Funciones para la página web

const productList = () => {
    return fetch(apiUrl)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProducts = (nombre, precio, imagen) => {
    return fetch(apiUrl, {
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
        .then((res) => {
            // Después de crear el producto, recarga la página
            location.reload();
            return res.json();
        })
        .catch((err) => console.log(err));
};

const deleteProduct = (id) => {
    return fetch(`${apiUrl}/${id}`, {
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