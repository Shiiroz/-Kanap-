const params = new URL(document.location).searchParams;
const _id  = params.get("_id");
const url = `http://localhost:3000/api/products/${_id}`;
console.log(url)


const getElement = async () => {
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
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


// liste des actions déclenchées au clic sur le bouton "ajouter"
button.addEventListener("click", function() {
  let basketValue = {
    //initialisation de la variable basketValue
    idSelectedProduct: _id,
    nameSelectedProduct: document.getElementById("title").innerHTML,
    colorSelectedProduct: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value
  };

  //je crée une fonction de récupération du panier
  function getBasket() {
    let basketValue = JSON.parse(localStorage.getItem("kanapLs"));
    if (basketValue === null) {
      return [];				//si le LocalStorage est vide, on crée un tableau vide
    } else {
      return basketValue;
    }
  }

  //je crée une fonction d'ajout au panier avec argument product
  function addBasket(product) {
    let basketValue = getBasket();
    let foundProducts = basketValue.find(function(item) {
      /// on définit foundProducts comme l'article à trouver
      return (
        item.idSelectedProduct === product.idSelectedProduct &&
        item.colorSelectedProduct === product.colorSelectedProduct	
      );
    }); //si les produits du panier et les produits du LS n'ont pas même ID et même couleur
    // il retournera undefined  
    if (
      foundProducts == undefined &&
      product.colorSelectedProduct != "" &&			//si les consitions sont OK
      product.quantity > 0 &&
      product.quantity <= 100
    ) {
      basketValue.push(product);					 //dans le Ls
    } else if (foundProducts) {
      let newQuantity = parseInt(foundProducts.quantity) + parseInt(product.quantity); //CUMUL Quantité si présent ID et color
      foundProducts.quantity = newQuantity;
    } else {
      alert("Veuillez sélectionner une quantité et une couleur correctes, SVP");
      return;
    }
    saveBasket(basketValue);
    alert(
      `Le canapé ${product.nameSelectedProduct} ${product.colorSelectedProduct} a été ajouté en ${product.quantity} exemplaires à votre panier !`
    );
  }
  //je crée une fonction de sauvegarde du panier
  function saveBasket(basketValue) {
    localStorage.setItem("kanapLs", JSON.stringify(basketValue));
  }

  // Si le choix de couleur est vide
  if (basketValue.colorSelectedProduct === "") {
    alert("Veuillez sélectionner une couleur avant d'ajouter au panier.");
    return;
  }
  

  getElement();
