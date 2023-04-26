import * as apiFunctions from "./apiFunctions.js";

// Récupérer le panier depuis le stockage local
let panier = JSON.parse(localStorage.getItem("kanapLs"));

// Sélectionner l'élément HTML où vous voulez afficher les produits du panier
let panierElement = document.getElementById("cart__items");

// Créer un élément HTML pour chaque produit dans le panier
for(let produit of panier) {
  apiFunctions.getProduct(produit.idSelectedProduct).then( productData => {
    let produitElement = document.createElement("div");
    produitElement.innerHTML = `
      <article class="cart__item" data-id="${produit.idSelectedProduct}" data-color="${produit.colorSelectedProduct}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="${productData.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${produit.colorSelectedProduct}</p>
            <p>${productData.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantitySelectedProduct}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `;

    // Gestion de la suppression de l'article
    
    // let deleteButton = produitElement.querySelector(".deleteItem");
    // deleteButton.addEventListener("click", deleteProduct(id));
    
  


    panierElement.appendChild(produitElement);
  });
}

// Calculer le nombre total d'articles dans le panier
let totalItems = 0;
for(let produit of panier) {
  totalItems += produit.quantity;
}


// Afficher le nombre total d'articles dans le panier
let totalItemsElement = document.getElementById("totalQuantity");
totalItemsElement.innerHTML = totalItems;
