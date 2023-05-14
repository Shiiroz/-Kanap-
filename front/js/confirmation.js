// Envoyer une requête POST à l'API du serveur pour valider la commande
fetch('http://localhost:3000/api/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contact: formData,
    products: panier.map(p => p.idSelectedProduct)
  })
})
.then(response => {
  // Vérifier que la réponse est OK
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la validation de la commande");
  }
  // Extraire le numéro de commande de la réponse
  return response.json();
})
.then(data => {
  // Afficher une confirmation de commande à l'utilisateur
  const confirmationElement = document.createElement('div');
  confirmationElement.innerHTML = `
    <h2>Votre commande a été validée</h2>
    <p>Numéro de commande : ${data.orderId}</p>
    <p>Total de la commande : ${totalPrice} €</p>
    <p>Nous vous remercions pour votre achat.</p>
  `;
  document.body.appendChild(confirmationElement);

  // Vider le panier
  localStorage.removeItem("kanapLs");
})
.catch(error => {
  // Gérer les erreurs
  console.error(error);
});
