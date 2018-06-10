//=========================================================================
// Traitement de "function_brelan.js"
// Auteur : ALL-IN'TECH
// Version : 09/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_brelan = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

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


	if (carte1Joueur === carte2Joueur) {
		if (carte1Joueur === river1 || carte1Joueur === river2 || carte1Joueur === river3) {
			membres.valeurMain[joueur] = 4;
		}
	} else if (carte1Joueur !== carte2Joueur) { 

		// CARTE 1

		if (carte1Joueur === river1 && carte1Joueur === river2) {
			membres.valeurMain[joueur] = 4;
		} else if (carte1Joueur === river1 && carte1Joueur === river3) {
			membres.valeurMain[joueur] = 4;
		} else if (carte1Joueur === river2 && carte1Joueur === river3) {
			membres.valeurMain[joueur] = 4;

			// CARTE 2

		} else if (carte2Joueur === river1 && carte2Joueur === river2) {
			membres.valeurMain[joueur] = 4;
		} else if (carte2Joueur === river1 && carte2Joueur === river3) {
			membres.valeurMain[joueur] = 4;
		} else if (carte2Joueur === river2 && carte2Joueur === river3) {
			membres.valeurMain[joueur] = 4;
		}

	}
	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_brelan;

