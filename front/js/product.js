// Récupération de l'URL actuelle de la page
const page = window.location.href;

// Création d'un objet URL à partir de la chaîne d'URL
const url = new URL(page);

// Récupération de la valeur de la clé _id dans la requête d'URL
const idProduct = url.searchParams.get("_id");

// Initialisation de la variable article avec une chaîne vide (pas utilisée ici)
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur ");
    })
}
    
function getPost(article){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre h1
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre 
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit  est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}
