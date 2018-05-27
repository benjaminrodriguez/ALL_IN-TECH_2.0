//=========================================================================
// Traitement de "req_page_adversaire"
// Auteur : ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require  ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var partie;
	var liste_membres;
	var adversaire;
	var i;
	var j;
//	var b;
	var compte;
	var hote;
	var page;
	var marqueurs;


	// LECTURE DU JSON "connecte.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	liste_membres = JSON.parse(contenu_fichier);

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	for (i = 0 ; i < liste_membres.length ; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			//j = i;
			hote = liste_membres[i].hote;
			adversaire = liste_membres[i].adversaire;
			if (liste_membres[i].connecte === true) {
				page = fs.readFileSync('./html/modele_salon_multi.html','UTF-8');
			} else if (liste_membres[i].connecte === "joue") {
				page = fs.readFileSync("./html/page_adversaire.html", "UTF-8");
			} else {
				page = fs.readFileSync("./html/modele_accueil_membre.html", "UTF-8");
			}
		}
	}


	marqueurs = {};
	marqueurs.joueur = query.joueur;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	marqueurs.hote = hote;
	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

// ==================================================================================

module.exports = trait;
