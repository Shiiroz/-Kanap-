const catalogue = document.getElementById("items");

import * as apiFunctions from "./apiFunctions.js"
    
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

