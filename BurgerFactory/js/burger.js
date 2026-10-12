// evitons de perdre les saisies lors d'un F5
const ingredient = JSON.parse(localStorage.getItem("ingredient")) || ingredientDeBase;
const burgers = JSON.parse(localStorage.getItem("burgers")) || [];

// Récupération de la sélection de l'user pour la créa des burgers
const selectOne = document.getElementById("ingredient-1");
const selectTwo = document.getElementById("ingredient-2");
const selectThree = document.getElementById("ingredient-3");

// Fonction qui affiche à l'user une liste déroulante contenant chaque ingrédient
function remplirSelect(select){
    const optionVide = document.createElement("option");
    optionVide.textContent = "Choisir un Ingrédient"; // Permet de pas afficher le premier ingrédient du tableau d'ingrédient
    optionVide.value = "";
    select.appendChild(optionVide);
    [...ingredient].sort((a, b) => a.nom.localeCompare(b.nom)).forEach( ing => { // Affichage par ordre alphabetique c'est mieux
        const option = document.createElement("option");
        option.textContent = ing.nom;
        option.value = ing.nom;
        select.appendChild(option);
    });
}

// Appel de notre fonction sur chaque liste
remplirSelect(selectOne);
remplirSelect(selectTwo);
remplirSelect(selectThree);

// Récupération de la création de l'user
const nomBurgerUser = document.getElementById("nom-burger");
const btnCreerBurger = document.getElementById("btn-creer-burger");
const msgBurger = document.getElementById("message-burger");

// Création Burger
btnCreerBurger.addEventListener("click", creerBurger);

function creerBurger() {
    const nomBurger = nomBurgerUser.value.trim();
    const ing1 = selectOne.value;
    const ing2 = selectTwo.value;
    const ing3 = selectThree.value;

    //  Verification si le nom du burger existe déjà, si le nom n'est pas vide, si les ingrédients sont bien sélectionnés
    if (nomBurger === "") {
        msgBurger.classList.remove("succes");
        msgBurger.classList.add("erreur");
        msgBurger.textContent = "erreur : Nom Vide";
    } else if (burgers.find(b => b.nom.toLowerCase() === nomBurger.toLowerCase())) {
        msgBurger.classList.remove("succes");
        msgBurger.classList.add("erreur");
        msgBurger.textContent = "Erreur : un burger porte déjà ce nom";
    } else if (ing1 === "" || ing2 === "" || ing3 === "") {
        msgBurger.classList.remove("succes");
        msgBurger.classList.add("erreur");
        msgBurger.textContent = "erreur : un ingrédient n'est pas choisi";
    } else {
        burgers.push({ nom: nomBurger, ingredients: [ing1, ing2, ing3] });
        localStorage.setItem("burgers", JSON.stringify(burgers));
        msgBurger.classList.remove("erreur");
        msgBurger.classList.add("succes");
        msgBurger.textContent = "Le Burger a bien été créé";

        // On sort du stock les ing sélectionnés
        [ing1, ing2, ing3].forEach(nomIng => {
            const trouve = ingredient.find(i => i.nom === nomIng);
            trouve.quantite = trouve.quantite - 1;
        });

        localStorage.setItem("ingredient", JSON.stringify(ingredient));
    }

}