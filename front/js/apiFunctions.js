// Cette fonction récupère tous les produits à partir de l'URL "http://localhost:3000/api/products" 
// en utilisant la méthode fetch() pour effectuer une requête HTTP GET. 
// Une fois les données récupérées, elles sont converties en objet JavaScript 
// à l'aide de la méthode response.json() et stockées dans la variable 'catalog'. 
// La fonction retourne finalement l'objet 'catalog'.
async function getProducts() {
    const url = "http://localhost:3000/api/products";
    let catalog = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {catalog = data})

    return catalog;
}
  
// La fonction retourne finalement l'objet 'product'.
async function getProduct(id) {
    const url = "http://localhost:3000/api/products/" + id;
    let product = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {product = data})

    return product;
}

// Cette fonction utilise la fonction 'getProduct' pour récupérer l'image d'un produit spécifique à partir de son ID. 
// La fonction retourne finalement l'URL de l'image.
async function getProductImageUrl(id) {
    let data = await getProduct(id);

    return data["imageUrl"];
}

// Cette fonction utilise la fonction 'getProduct' pour récupérer le prix d'un produit spécifique à partir de son ID. 
// La fonction retourne finalement le prix du produit.
async function getProductPrice(id) {
    let data = await getProduct(id);

    return data["price"];
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let produit of panier) {
      apiFunctions.getProduct(produit.idSelectedProduct).then(productData => {
        let productPrice = productData.price;
        let productQuantity = produit.quantity;
        totalPrice += productPrice * productQuantity;
        let totalPriceElement = document.getElementById("totalPrice");
        totalPriceElement.innerHTML = totalPrice;
      });
    }
  } 

export {getProduct , getProducts , getProductImageUrl , getProductPrice , calculateTotalPrice}