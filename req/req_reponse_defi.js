//=========================================================================
// Traitement de "req_reponse_defi"
// Auteur : ALL IN'TECH
<<<<<<< HEAD
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require ("remedial");
=======
// Version : 27/05/2018
//=========================================================================
"use strict"

var fs = require("fs");
var url = require ("url");
var remedial = require = ("remedial");
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
<<<<<<< HEAD
	var membres;
	var i;
	var a;
	var page;
	var adversaire_trouve;
	var compte;

	// LECTURE DU JSON CONNECTE POUR SAVOIR QUELS JOUEURS VEULENT JOUER
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	membres = JSON.parse (contenu_fichier);
	
	adversaire_trouve = false;
	// REDIRECTION VERS LES DIFFERENTES PAGES QUAND JOUEUR DÉFIÉ
	for (i = 0 ; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			a=i;
			if (membres[a].connecte === true) {
				adversaire_trouve = true; 	
			} else {
				adversaire_trouve = false;
			}
=======
	var liste_membres;
	var i;
	var page;
	var marqueurs = {};

	// LIRE LE JSON POUR VÉRIFIÉ LES JOUEURS PRÉSENT DANS LE SALON
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);


	// MODIFICATION DU JSON CONNECTE.JSON
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			liste_membres[i].connecte = "attente";
			liste_membres[i].adversaire = query.adversaire;
		} else if ( liste_membres[i].compte === query.adversaire ) {
			liste_membres[i].connecte = "attente";
			liste_membres[i].adversaire = query.compte;
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
		}
	}

	if (membres[a].connecte === false) {
		page = fs.readFileSync("./html/modele_attendre_reponse.html" , "UTF-8");
	} else if (membres[a].connecte === "joue") {
		page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");
	// PASSE DIRECT ICI
	} else {
//		page = fs.readFileSync("./html/modele_salon_multi.html", "UTF-8");
		page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");

<<<<<<< HEAD
	}


	// MARQUEURS
	marqueurs = {};
=======
	// ECRITURE DU NOUVEAU JSON "SALON.JSON"

	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/connecte.json", contenu_fichier, "utf-8");

	page = fs.readFileSync("./html/modele_attendre_reponse.html", "utf-8");

>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	marqueurs.adversaire = query.adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
