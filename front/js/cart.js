import * as apiFunctions from "./apiFunctions.js";
import { test } from "./cartFunctions.js";
//Récupérez les données stockées dans le localStorage à l'aide de la méthode getItem()
//Convertissez les données récupérées en objet JSON à l'aide de la méthode JSON.parse()
const panier = JSON.parse(localStorage.getItem("kanapLs"));

// Sélectionner l'élément HTML où vous voulez afficher les produits du panier
let panierElement = document.getElementById("cart__items");

test();
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
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;
// Ajouter un gestionnaire d'événements pour chaque champ de quantité
let quantityField = produitElement.querySelector(".itemQuantity");
quantityField.addEventListener("change", () => {
  // Modifier la quantité de l'article dans le panier
  produit.quantity = parseInt(quantityField.value);
  localStorage.setItem("kanapLs", JSON.stringify(panier));

  // Recalculer le prix total du panier
  calculateTotalPrice();
  updateTotalArticles();

});

// Ajouter un bouton de suppression à chaque élément
let deleteButton = produitElement.querySelector(".deleteItem");
deleteButton.addEventListener("click", () => {
    // Supprimer l'article du panier
    const index = panier.findIndex(p => p.idSelectedProduct === produit.idSelectedProduct && p.colorSelectedProduct === produit.colorSelectedProduct);
    panier.splice(index, 1);
    localStorage.setItem("kanapLs", JSON.stringify(panier));
    // Mettre à jour l'affichage du panier
    produitElement.remove();
    calculateTotalPrice();
    updateTotalArticles();
});

totalArticlesElement.textContent = totalArticles;

    panierElement.appendChild(produitElement);
    })
}

// Initialisez le compteur total à 0
let totalArticles = 0;

// Parcourez le tableau panier pour récupérer la quantité de chaque produit
for (let produit of panier) {
    totalArticles += produit.quantity;
}

// Affichez le total des articles dans le panier
let totalArticlesElement = document.getElementById("totalQuantity");
totalArticlesElement.textContent = totalArticles;

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
  
  // Appeler la fonction calculateTotalPrice pour afficher le prix total du panier
  calculateTotalPrice();

  
  // Ajouter un gestionnaire d'événements sur chaque bouton "Supprimer" pour mettre à jour le prix total lorsque l'utilisateur supprime un article
  let deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Supprimer l'article du panier
      
      // Recalculer le prix total du panier
      calculateTotalPrice();
    });
  });
  
  // Ajouter un gestionnaire d'événements sur chaque champ de quantité pour mettre à jour le prix total lorsque l'utilisateur modifie la quantité d'un article
  let quantityFields = document.querySelectorAll(".itemQuantity");
  quantityFields.forEach(field => {
    field.addEventListener("change", () => {
      // Modifier la quantité de l'article dans le panier
     
      // Recalculer le prix total du panier
      calculateTotalPrice();
    });
  });
  

// Mettez à jour le nombre total d'articles en fonction du contenu du panier
function updateTotalArticles() {
    let totalArticles = 0;
    for (let produit of panier) {
      totalArticles += produit.quantity;
    }
    totalArticlesElement.textContent = totalArticles;
  }