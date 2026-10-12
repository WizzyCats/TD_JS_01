// Récupération de la saisie de l'utilisateur pour la créa de ses ingrédients

const ingredientNomUser = document.getElementById("nom-ingredient");
const qteIngredientUser = document.getElementById("quantite-ingredient");
const msgUser = document.getElementById("message-ingredient");
const creaIngreUser = document.getElementById("btn-creer-ingredient");

// evitons de perdre les saisies lors d'un F5
const ingredient = JSON.parse(localStorage.getItem("ingredient")) || ingredientDeBase; // Stockage de variables pour pas les perdre au rechargement de la page

creaIngreUser.addEventListener("click", creerIngredient); // Ecoutes du click

// Fonction qui récupère la saisie user et créer l'ingrédients sous conditions
function creerIngredient(){
    const nomIngredient = ingredientNomUser.value.trim();
    const qteIngredient = Number(qteIngredientUser.value);
    console.log(nomIngredient, qteIngredient);

    // Verification si le nom dde l'ingrédient existe déjà, si la qté est au moins de 1 et créa du burger
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












