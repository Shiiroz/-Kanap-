async function getProducts() {
    const url = "http://localhost:3000/api/products";
    let catalog = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {catalog = data})

    return catalog;
}

async function getProduct(id) {
    const url = "http://localhost:3000/api/products/" + id;
    let product = {}

    await fetch(url)
    .then((response) => response.json())
    .then ((data) => {product = data})

    return product;
}

export {getProduct , getProducts}

/*
getProducts().then( x => {
    //console.log(x);

    x.forEach(element => {
        getProduct(element._id).then(y =>{
            //console.log(y);
        })
    });
})


let testId = "8906dfda133f4c20a9d0e34f18adcf06";
getProduct(testId).then(productData => {
    console.log(productData)
})*/