/*----------FORMULAIRE --------*/

// déclaration des différentes zones de messages d'erreur 
const zoneFirstNameErrorMsg = document.querySelector("firstNameErrorMsg");
const zoneLastNameErrorMsg = document.querySelector("lastNameErrorMsg");
const zoneAddressErrorMsg = document.querySelector("addressErrorMsg");
const zoneCityErrorMsg = document.querySelector("cityErrorMsg");
const zoneEmailErrorMsg = document.querySelector("emailErrorMsg");

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");


// déclaration des regex de contrôle des inputs du formulaire //

const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;