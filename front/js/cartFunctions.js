function getProductPrice(productId){
    //appel à l'api pour récupérer le prix du produit
    // retourne le prix du produit
}

function getLinePrice(productId){
    // va dans le local storage, réucpere la quantité pour le produit
    // appelle getProductPrice pour récupérer le prix du produit
    // retourne le prix du produit * la quantité
}

function getCartQuantity(){
    // retourne la somme des quantités de produits dans le panier
}

function getCartTotal() {
    // parcourir le panier, et pour chaque produit,
    // appeler getLinePrice puis faire la somme des retours.
}

function deleteProduct(id) {
    let id = produitElement.dataset.id;
      let color = produitElement.dataset.color;
      let index = panier.findIndex((p) => p.idSelectedProduct == id && p.colorSelectedProduct == color);
      panier.splice(index, 1);
      localStorage.setItem("kanapLs", JSON.stringify(panier));
      produitElement.remove();
}