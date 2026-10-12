// Adresse de l'API avec le SIRET de la ferme en paramètre
const urlApi = "https://opendata.agencebio.org/api/gouv/operateurs?siret=79317749400028";
const infosFerme = document.getElementById("infos-ferme");
const listeProd = document.getElementById("liste-productions");

// On récupère grâce au fetch et converti la réponse du JS en fonction de si ok ou non
fetch(urlApi)
    .then(reponse => {
        if (!reponse.ok) {
            throw new Error("Erreur HTTP " + reponse.status);
        }
        return reponse.json();
    })

    // On récupère le retour de l'api pour afficher les champs à l'endroit désiré de notre paragraphe
    .then(data => {
        const ferme = data.items[0];
        const adresse = ferme.adressesOperateurs[0];
        infosFerme.textContent = "Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro " + ferme.numeroBio + " de Monsieur " + ferme.gerant + " située à l'adresse "
            + adresse.lieu + " " + adresse.codePostal + " " + adresse.ville + ". Cette ferme intervient dans les commerces : ";
        ferme.productions.forEach(production => {
            // créer un nouvel élément dans notre liste, et on l'ajoute avec le bon nom dans notre liste
            const li = document.createElement("li");
            li.textContent = production.nom;
            listeProd.appendChild(li);
        });
    }) // En cas d'erreur on l'affiche dans la console navigateur
    .catch(erreur => {
        console.error("Impossible de contacter l'API :", erreur);
    });