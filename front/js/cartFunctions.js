function getProductPrice(productId){
    //appel à l'api pour récupérer le prix du produit
    // retourne le prix du produit
    return apiFunctions.getProductPrice(id).then(productData => {
        return productData.price;
      });
}

function getLinePrice(productId){
    // va dans le local storage, réucpere la quantité pour le produit
    // appelle getProductPrice pour récupérer le prix du produit
    // retourne le prix du produit * la quantité
    let produit = panier.find(p => p.idSelectedProduct === productId);
  return getProductPrice(productId).then(price => {
    return price * produit.quantitySelectedProduct;
  });
}

function getCartQuantity(){
    // retourne la somme des quantités de produits dans le panier
    let quantity = 0;
  for (let produit of panier) {
    quantity += produit.quantitySelectedProduct;
  }
  return quantity;
}

function getCartTotal() {
    // parcourir le panier, et pour chaque produit,
    // appeler getLinePrice puis faire la somme des retours.
    let total = 0;
  for (let produit of panier) {
    total += getLinePrice(produit.idSelectedProduct);
  }
  return total;
}

function deleteProduct(id) {
    let id = produitElement.dataset.id;
      let color = produitElement.dataset.color;
      let index = panier.findIndex((p) => p.idSelectedProduct == id && p.colorSelectedProduct == color);
      panier.splice(index, 1);
      localStorage.setItem("kanapLs", JSON.stringify(panier));
      produitElement.remove();
}

