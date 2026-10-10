// Récupération de la saisie de l'utilisateur pour la créa de ses ingrédients

const ingredientNomUser = document.getElementById("nom-ingredient");
const qteIngredientUser = document.getElementById("quantite-ingredient");
const msgUser = document.getElementById("message-ingredient");
const creaIngreUser = document.getElementById("btn-creer-ingredient");

// Liste d'ingrédients de base
const ingredientDeBase = [
    {nom:"Poulet", quantite:5},
    {nom:"Boeuf", quantite:5},
    {nom:"Colin", quantite:5},
    {nom:"Saumon", quantite:5},
    {nom:"Bacon", quantite:5},
    {nom:"Oeuf", quantite:5},
    {nom:"salade", quantite:5},
    {nom:"Tomate", quantite:5},
    {nom:"Oignon" , quantite:5},
    {nom:"Avocat", quantite:5},
    {nom:"Choux Rouge", quantite:5},
    {nom:"Ananas", quantite:5},
    {nom:"Cornichons", quantite:5},
    {nom:"Jalapiños", quantite:5},
    {nom:"Cheddar", quantite:5},
    {nom:"Emmental", quantite:5},
    {nom:"Raclette", quantite:5},
    {nom:"Sauce Citron & Aneth", quantite:5},
    {nom:"Sauce Avocat Pimentée", quantite:5},
    {nom:"Sauce Burger", quantite:5},
    {nom:"Sauce Ketchup", quantite:5},
    {nom:"Sauce Fromagère", quantite:5}
];

const ingredient = JSON.parse(localStorage.getItem("ingredient")) || ingredientDeBase; // Stockage de variables pour pas les perdre au rechargement de la page

creaIngreUser.addEventListener("click", creerIngredient); // Ecoutes du click

// Fonction qui récupère la saisie user et créer l'ingrédients sous conditions
function creerIngredient(){
    const nomIngredient = ingredientNomUser.value.trim();
    const qteIngredient = Number(qteIngredientUser.value);
    console.log(nomIngredient, qteIngredient);

    if(nomIngredient === ""){
        msgUser.classList.remove("succes");
        msgUser.classList.add("erreur");
        msgUser.textContent = "Le nom de l'ingrédient ne peut pas être vide";
    } else if(qteIngredient <= 0 || isNaN(qteIngredient)){
        msgUser.classList.remove("succes");
        msgUser.classList.add("erreur");
        msgUser.textContent = "La quantité de l'ingrédient ne peut pas être inférieure ou égale à 0";
    } else {
        msgUser.classList.remove("erreur");
        msgUser.classList.add("succes");
        msgUser.textContent = "L'ingrédient " + nomIngredient + " a bien été créé !";
        console.log("L'ingrédient a bien été créé");
        ingredientNomUser.value = "";
        qteIngredientUser.value = "";

        // Ingrédient déjà existant (sans tenir compte des majuscules)
        const existant = ingredient.find(ing => ing.nom.toLowerCase() === nomIngredient.toLowerCase());

        // Mise à jour et stockage de la nouvelle qté
        if(existant){
            existant.quantite = existant.quantite + qteIngredient;
            msgUser.textContent = "La quantité de l'ingrédient " + nomIngredient + " a bien été mise à jour !";
        } else {
            ingredient.push({nom:nomIngredient, quantite:qteIngredient});
        }
        localStorage.setItem("ingredient", JSON.stringify(ingredient));


    }
}












