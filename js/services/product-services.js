const apiUrl = "https://challenge-alura-geek-liart.vercel.app/"; //  URL de la API desplegada en Vercel

// Funciones para la página web

const productList = () => {
    return fetch(`${apiUrl}/productos`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProducts = (nombre, precio, imagen) => {
    return fetch(`${apiUrl}/productos`, {
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
    return fetch(`${apiUrl}/productos/${id}`, {
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
