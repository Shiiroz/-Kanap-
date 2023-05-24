// Recuperer l'id de la commande 
let getArticle = new URL(location.href).searchParams.get("id")

//Fonction pour effacer le local Storage après confirmation 
confirmation()
function confirmation() {
    const confirmation = document.querySelector("#orderId")
    //Affichage de l'Id sur la page confirmation
    confirmation.innerHTML = `${getArticle}`
    //Ensuite vider le local storage
    localStorage.clear()
}