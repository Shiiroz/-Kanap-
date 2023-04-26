async function getProducts() {
    const url = "http://localhost:3000/api/products";
    let catalog = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {catalog = data})

    return catalog;
}

async function getProduct(id) {
    const url = "http://localhost:3000/api/products/" + id;
    let product = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {product = data})

    return product;
}

async function getProductImageUrl(id) {
    let data = await getProduct(id);

    return data["imageUrl"];
}

async function getProductPrice(id) {
    let data = await getProduct(id);

    return data["price"];
}

export {getProduct , getProducts , getProductImageUrl , getProductPrice}