//=========================================================================
// Traitement de "function_carre.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_carre = function (carte1Joueur1, carte2Joueur1, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	// VARIABLE
	var river1;
	var river2;
	var river3;

	// RIVIERE
	river1 = riviere[0].valeur;
	river2 = riviere[1].valeur;
	river3 = riviere[2].valeur;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);


	if (carte1Joueur1 === carte2Joueur1) {
		if (carte1Joueur1 === river1 && carte1Joueur1 === river2) {
			membres.valeurMain[joueur] = 8;
		} else if (carte1Joueur1 === river2 && carte1Joueur1 === river3) {
			membres.valeurMain[joueur] = 8;
		} else if (carte1Joueur1 === river1 && carte1Joueur1 === river3) {
			membres.valeurMain[joueur] = 8;
		}
	} else if (carte1Joueur1 !== carte2Joueur1) {
		if (river1 === river2 && river1 === river3) {
			// CARTE 1
			if (carte1Joueur1 === river1) {
				membres.valeurMain[joueur] = 8;
				// CARTE 2
			} else if (carte2Joueur2 === river2) {
				membres.valeurMain[joueur] = 8;
			}
		}
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_carre;
