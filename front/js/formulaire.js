//Sélection du bouton commander :
let btnSendForm = document.querySelector('#order');

// Tableau des produits selon le back-end 
const products = []

//Écoute du bouton commander sur le click pour pouvoir contrôler, valider et ennoyer le formulaire et les produits au back-end :
btnSendForm.addEventListener('click', (e) => {
e.preventDefault();


//Récupération des valeur du formulaire :
const contact = {
    "firstName" : document.querySelector("#firstName").value,
    "lastName" : document.querySelector("#lastName").value,
    "address" : document.querySelector("#address").value,
    "city" : document.querySelector("#city").value,
    "email" : document.querySelector("#email").value,
    
};
    

//GESTION DU FORMULAIRE 
    

    function firstNameControle () {     
        //Regex pour le contrôle des champs Prénom :
        const firstName = contact.firstName;  
        let inputFirstName = document.querySelector("#firstName");
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
            document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            document.querySelector("#firstNameErrorMsg").textContent = "Champ Prénom du formulaire et invalide, ex: Paul";
            return false;
        }
        
    }
    


    function lastNameControle () {     
        //Regex pour le contrôle des champs Nom :
        const lastName = contact.lastName; 
        let inputLastName = document.querySelector("#lastName"); 
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
            document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
        } 
                
        else {
            document.querySelector("#lastNameErrorMsg").textContent = "Champ Nom du formulaire et invalide, ex: Dupont";
            return false;
        }
            
    }



    function addressControl () {     
        // Regex pour le contrôle des champs adresse :
        const adresse = contact.address;  
        let inputAddress = document.querySelector("#address");
        if (/^[A-Za-z0-9\s]{5,100}$/.test(adresse)) {
            document.querySelector("#addressErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            document.querySelector("#addressErrorMsg").textContent = "Champ Adresse du formulaire et invalide, ex: 50 rue desbois";
            return false;
        }
        
    }



    
    function cityControl () {     
        //Regex pour le contrôle des champs Ville :
        const city = contact.city;  
        let inputCity = document.querySelector("#city");
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
            document.querySelector("#cityErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            document.querySelector("#cityErrorMsg").textContent = "Champ Ville du formulaire et invalide, ex: Paris";
            return false;
        }
        
    }




    function emailControle () {     
        //Regex pour le contrôle des champs Email :
        const email = contact.email;  
        let inputMail = document.querySelector("#email");
        if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
            document.querySelector("#emailErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            document.querySelector("#emailErrorMsg").textContent = "Champ Email du formulaire et invalide, ex: example@contact.(fr,com etc...)";
            return false;
        }
        
    }




    //Contrôle validité formulaire avant envoie dans le locale storage : 
    if (firstNameControle() && lastNameControle() && addressControl() && cityControl() && emailControle()) {
    //Mettre l'objet "contact" dans le local storage :
        localStorage.setItem("contact",JSON.stringify(contact));

        sendFromToServer();
    } 
    
    else {
        alert(" Veillez remplir le formulaire ")
    }
    
    
    //FIN  DU FORMULAIRE 
     
    // variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST :
    const orderId = "";

    
    //REQUÊTE DU SERVEUR 
    
    

     function sendFromToServer () {
        const panier = JSON.parse(localStorage.getItem("kanapLs")) ; 
    //Boucle pour récupérer les id dans le local storage
    for (let k = 0; k < panier.length; k++) {
        const productId = panier[k].idSelectedProduct; 
        products.push(productId);
    }
    console.log(products)
       fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body:JSON.stringify({contact, products }) ,
            // body: {
            //     "contact": contact,
            //     "products": products
            // },
            headers: {
                "Content-Type": "application/json",
            },
        }) 
        
        // Ensuite on stock la réponse de l'api 
        .then((response) => {
            return response.json();
        })
        

        .then((server) => {
          const orderId = server.orderId;
          console.log(orderId);
            // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable :
            if (orderId != "") {
                alert("Votre commande à bien était prise en compte");
                location.href = "confirmation.html?id=" + orderId;
            }
        })
        
    }
})
