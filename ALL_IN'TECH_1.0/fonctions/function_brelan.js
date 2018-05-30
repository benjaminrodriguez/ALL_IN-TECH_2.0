//=========================================================================
// Traitement de "function_brelan.js"
// Auteur : ALL-IN'TECH
// Version : 09/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs");

// DEBUT DE LA FONCTION

var function_brelan = function (carte1Joueur, carte2Joueur, riviere, valeurMain) {

	// VARIABLE 

	var river1;
	var river2;
	var river3;

	// TEST DU BRELAN
	
	river1 = riviere[0].valeur;
	river2 = riviere[1].valeur;
	river3 = riviere[2].valeur;

	if (carte1Joueur === carte2Joueur) {
		if (carte1Joueur === river1 || carte1Joueur === river2 || carte1Joueur === river3) {
			valeurMain.valeurMain = 4;
			console.log("Brelan!");
		}
	} else if (carte1Joueur !== carte2Joueur) { 

		// CARTE 1

		if (carte1Joueur === river1 && carte1Joueur === river2) {
			valeurMain.valeurMain = 4;
		} else if (carte1Joueur === river1 && carte1Joueur === river3) {
			valeurMain.valeurMain = 4;
		} else if (carte1Joueur === river2 && carte1Joueur === river3) {
			valeurMain.valeurMain = 4;

			// CARTE 2

		} else if (carte2Joueur === river1 && carte2Joueur === river2) {
			valeurMain.valeurMain = 4;
		} else if (carte2Joueur === river1 && carte2Joueur === river3) {
			valeurMain.valeurMain = 4;
		} else if (carte2Joueur === river2 && carte2Joueur === river3) {
			valeurMain.valeurMain = 4;
		}

	}

};
	//--------------------------------------------------------------------------

	module.exports = function_brelan;

