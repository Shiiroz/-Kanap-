// Récupération de l'ID du produit à afficher depuis l'URL
const params = new URL(document.location).searchParams;
const _id  = params.get("_id");

//  l'URL de l'API pour récupérer les informations du produit
const url = `http://localhost:3000/api/products/${_id}`;

// Récupère l'élément correspondant à l'id sélectionné depuis l'API
const getElement = async () => {
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        const addTitre = (document.getElementById("title").innerHTML= data.name)
        const addPrix = (document.getElementById("price").innerHTML= data.price)
        const addImage = (document.createElement("img"))
        document.querySelector(".item__img").appendChild(addImage)
        addImage.setAttribute("src", `${data.imageUrl}`)

            // ajout de la description
        const addDescription = (document.getElementById("description").innerHTML= data.description)
        const addOption = document.getElementById("colors")
        for (color in data.colors){
            addOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`
        }
    })
}

const button = document.getElementById("addToCart");


// Actions déclenchées au clic sur le bouton "ajouter"
button.addEventListener("click", function(){
   // Récupère les informations de l'article sélectionné
  let produitValue = {
    idSelectedProduct: _id,
    nameSelectedProduct: document.getElementById("title").innerHTML,
    colorSelectedProduct: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
    prix: document.getElementById("price").value
  }
  addBasket(produitValue);
});

//récupère les informations du panier stockées dans le localStorage
// associée à la clé "kanapLs"
function getBasket() {
  let produitValue = JSON.parse(localStorage.getItem("kanapLs"));
  if (produitValue === null) {
    return [];
  } else {
    return produitValue;
  }
}

function addBasket(product) {
  


  let produitValue = getBasket();
  let foundProducts = produitValue.find(function(item) {
    return (
      item.idSelectedProduct === product.idSelectedProduct &&
      item.colorSelectedProduct === product.colorSelectedProduct	
    );
  });
  if (
    foundProducts == undefined &&
    product.colorSelectedProduct != "" &&
    product.quantity > 0 &&
    product.quantity <= 100
  ) {
    product.quantity = parseInt(product.quantity);
    produitValue.push(product);
  } else if (foundProducts) {
    let newQuantity = parseInt(foundProducts.quantity) + parseInt(product.quantity);
    foundProducts.quantity = newQuantity;
  } else {
    alert("Veuillez sélectionner une quantité et une couleur correctes, SVP");
    return;
  }
  saveBasket(produitValue);
  alert(
    `Le canapé ${product.nameSelectedProduct} ${product.colorSelectedProduct} a été ajouté en ${product.quantity} exemplaires à votre panier !`
  );
}

function saveBasket(produitValue) {
  localStorage.setItem("kanapLs", JSON.stringify(produitValue));
}

getElement();
