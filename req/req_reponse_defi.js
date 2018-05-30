//=========================================================================
// Traitement de "req_reponse_defi"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
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

	}


	// MARQUEURS
	marqueurs = {};
	marqueurs.adversaire = query.adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
