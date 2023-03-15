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

const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", () =>{
    const addPro ={
        quantity : document.getElementById("quantity").value,
        color : document.getElementById("colors").value,
        id : id
    }
})

addProductLocalStorage = []
if(localStorage.getItem("addToCard") !==null){
    addProductLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
    addProductLocalStorage.push(addToCart)
    localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
} else {
    addProductLocalStorage.push(addProduct)
    localStorage.setItem("addToCart", JSON.stringify(addProductLocalStorage))
}

getElement();


/*
1-je veux ajouter au panier 
  1a-si le panier n'existe pas j veux le cree
  1b-si il existe je veux le recuperer
2-je veux ajouter le produit dans le panier
    2a-si il n'existe pas j'ajoute le produit dans le panier
    2b-si il exist edans la meme couleur mettre a jour la quantiter
3-je veux calculer le prix total du panier

mon contenant c'est le panier 
mon contenue c'est l'article 
un article est defini par la quantiter couleur et id 
mon panier definit par une collection d'article et le prix total
*/