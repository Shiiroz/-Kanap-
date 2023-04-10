// Récupération du localstorage
let addToLocalStorage = JSON.parse(localStorage.getItem("kanapLs"))
// fonction pour récupérer les donner du localstorage
async function fetchApi(){
  // Déclaration tableau vide pour envoyer les objets créés 
  let Produits = []; 
  if (addToLocalStorage !== null) {
      for (let i = 0; i < addToLocalStorage.length; i++) {
      await fetch("http://localhost:3000/api/products/"+ addToLocalStorage[i]._id)
          .then((res) => res.json())
          .then((kanap) =>  {
              //Création d'un objet regroupant les informations
              const article = {
                  _id: addToLocalStorage[i]._id,
                  name: kanap.name,
                  price: kanap.price,
                  color: addToLocalStorage[i].color,
                  quantity: addToLocalStorage[i].quantity,
                  alt: kanap.altTxt,
                  img: kanap.imageUrl
              }
              //Ajout de l'objet article au tableau
              Produits.push(article)
          })
          .catch(function (err) {
              console.log(err)
          })
      }
  }
  return Produits
}

//Fonction pour afficher les produis sur la page panier 
showProduct()
async function showProduct() {
	const responseFetch = await fetchApi()
    if(addToLocalStorage !== 0) {
        //Selection Element du DOM 
        const cartItems = document.querySelector("#cart__items")
        const totalQuantity = document.querySelector("#totalQuantity")
        responseFetch.forEach((product) => { 
            cartItems.innerHTML += `
         <article class="cart__item" data-id="${product._id}" data-color="${product.colors}" data-quantity="${product.quantity}" data-price="${product.price}">
                     <div class="cart__item__img">
                       <img src="${product.img}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p>${product.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p> Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                            </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p> 
                            </div>
                        </div>
                    </div>
                </article>
            `
        })
        editQuantity()
        totalProduct()
    } 
}

