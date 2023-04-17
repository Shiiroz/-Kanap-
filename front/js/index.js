//const url = "http://localhost:3000/api/products"; //Recuperation du Catalogue de canapés
const catalogue = document.getElementById("items");

import * as apiFunctions from "./apiFunctions.js"


/*async function getApiCatalog() {
    let catalog = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {catalog = data})

    return catalog;
}*/
    
function buildHtml(elements) {
            console.log(elements)
        elements.forEach(element => {
            catalogue.innerHTML += `<a href="./product.html?_id=` + element._id + `">
            <article>
            <img src="${element.imageUrl} " alt="${element.alttxt} ">
                <h3 class="productName">${element.name}</h3>
            <p class="productDescription">${element.description} </p>
            </article>
        </a>`;
        });
}


//buildHtml(await getApiCatalog());
apiFunctions.getProducts().then( products => buildHtml(products));

