const url = "http://localhost:3000/api/products"; //Recuperation du Catalogue de canapés
const catalogue = document.getElementById("items");


const getcanap = () => {
    fetch(url)
    .then((response) => response.json())
    .then ((data) => {console.log(data)})
    .catch((err)=>{console.log(err)})
    /*.then(function (data){
        console.log(data)
        for(catalogue in data){
            catalogue.innerHTML += `<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`
        }
    })*/
};

class functions {

    static async getApiCatalog() {
        let catalog = {}
    
        await fetch(url)
        .then((response) => response.json())
        .then ((data) => {catalog = data})
    
        return catalog;
    }
    
    
    
    static buildHtml(elements) {
    
            elements.forEach(element => {
                catalogue.innerHTML += `<a href="./product.html?id= ` + element._id + `">
                <article>
                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">Kanap name1</h3>
                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                </article>
            </a>`;
            });
    }
    }

functions.buildHtml(await functions.getApiCatalog());

function buildHtml(element) {
    console.log("je sais faire du html.");
}
buildHtml("cacaboudin")


function findAge(name) {

    let data = [
        {prenom : "Ryan" , age: 25},
        {prenom : "Adrien", age:37},
        {prenom : "Sophie", age : 42},
        {prenom: "Mohair" , age : 35}
    ];
console.log(data);
    let age = "Inconnu";
    data.forEach(element => {
        if (age !== "Inconnu") return;
        console.log(element.prenom)
        if(element.prenom === name)
            age = element.age;

        
    });

    return age;

}

console.log(findAge("Adrien"));