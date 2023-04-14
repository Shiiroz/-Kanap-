// Récupérer le panier depuis le stockage local
let panier = JSON.parse(localStorage.getItem("kanapLs"));

// Sélectionner l'élément HTML où vous voulez afficher les produits du panier
let panierElement = document.getElementById("cart__items");

// Créer un élément HTML pour chaque produit dans le panier
for(let produit of panier) {
  // Créer un élément HTML de type div pour chaque produit
  let produitElement = document.createElement("div");
  
   // Ajouter les informations du produit à l'élément HTML
   produitElement.innerHTML = `
   <article class="cart__item" data-id="${produit._id}" data-color="${produit.colorSelectedProduct}">
                <div class="cart__item__img">
                  <img src="${produit.imageUrl}" alt="${produit.altTxt} ">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.nameSelectedProduct}</h2>
                    <p>${produit.colorSelectedProduct}</p>
                    <p>${produit.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
 `;
 
 // Ajouter l'élément HTML du produit à l'élément HTML du panier
 panierElement.appendChild(produitElement);
}

