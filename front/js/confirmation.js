// URLSearchParams : 

let url = new URLSearchParams(document.location.search);

let id = url.get("id");

const orderId = id;

//Affichage de l'id du produit :

const Confirmations = document.querySelector("#orderId");

Confirmations.innerHTML = `<span id="orderId"><strong>${orderId}</strong><br>Merci pour votre commande !</span>`;
  
//Nettoyage du local storage :

localStorage.clear();