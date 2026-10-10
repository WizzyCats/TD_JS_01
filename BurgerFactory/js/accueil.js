// Tableau contenant les burgers clé/valeur

const burgers = [
    {nom:"Burger Boeuf", img:"./img/burger/Burger_Boeuf.png"},
    {nom:"Burger Boeuf Raclette", img:"./img/burger/Burger_BoeufRaclette.png"},
    {nom:"Burger Poulet Ketchup", img:"./img/burger/Burger_PouletKetchup.png"},
    {nom:"Burger Poulet Avocal Pimenté", img:"./img/burger/Burger_pouletAvocatPiment.png"},
    {nom:"Burger Colin Ketchup Mayo", img:"./img/burger/Burger_Colin.png"},
    {nom:"Burger Saumon Sauce Citron & Aneth", img:"./img/burger/Burger_Saumon.png"}
];

// Mes constantes qui vont répérer des éléments par leurs id

const imageDiapo = document.getElementById("diaporama");
const afficheNom = document.getElementById("nom-burger");

let compteurDiaporama = 0; // compteur qui sera incrémenté pour changer l'image dans la fonction imageSuivante

// fonction qui fait le diapo via le compteur

function imageSuivante(){
    compteurDiaporama++;
    if (compteurDiaporama >= burgers.length){
        compteurDiaporama = 0;
    }
    imageDiapo.src = burgers[compteurDiaporama].img;
    afficheNom.textContent = "";
}
setInterval(imageSuivante, 10000); // permet de changer l'image toutes les 10s

// fonction qui va afficher le nom du burger dans mon html

function afficheBurger(){
    afficheNom.textContent = burgers[compteurDiaporama].nom;
}

imageDiapo.addEventListener("click", afficheBurger); // affiche le nom du burger au click sur l'image