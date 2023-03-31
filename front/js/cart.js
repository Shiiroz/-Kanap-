// récupérer le panier depuis le localStorage
const cartItems = JSON.parse(localStorage.getItem('kanapLs')) || [];

// sélectionner le conteneur d'affichage du panier
const cartContainer = document.querySelector('.cart');

// si le panier est vide, afficher un message
if (cartItems.length === 0) {
  cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
} else {
  // créer une table pour afficher les articles dans le panier
  const table = document.createElement('table');
  table.classList.add('cart__table');

  // ajouter une ligne d'en-tête à la table
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Produit</th>
    <th>Couleur</th>
    <th>Quantité</th>
    <th>Prix unitaire</th>
    <th>Total</th>
  `;
  table.appendChild(headerRow);

  // parcourir chaque article dans le panier et ajouter une ligne à la table pour chaque article
  let total = 0;
                    console.log(cartItems);
  cartItems.forEach(item => {
    // on a chaque élément avec sa quantité, son id, sa couleur
    // il nous manque le prix unitaire qu'on sait récupérer dans l'api
     // todo : aller récupérer le prix de l'élément (le canapé ) via l'api.
     // puis on multiplie le prix unitaire par la quantité
     // puis on affiche le prix dans le tableau.

     
    const row = document.createElement('tr');
   
    const price = item.quantity /100 ; // diviser par 100 pour afficher le prix en euros
    row.innerHTML = `
      <td>${item.nameSelectedProduct}</td>
      <td>${item.colorSelectedProduct}</td>
      <td>${item.quantity}</td>
      <td>${price.toFixed(2)} €</td>
      <td>${(price * item.quantity).toFixed(2)} €</td>
    `;
    table.appendChild(row);
    total += price * item.quantity || 0;
  });

  // ajouter la table au conteneur d'affichage du panier
  cartContainer.appendChild(table);

  // afficher le total du panier
  const totalRow = document.createElement('div');
  totalRow.classList.add('cart__total');
  totalRow.innerHTML = `<p>Total: ${total} €</p>`;
  cartContainer.appendChild(totalRow);
}

