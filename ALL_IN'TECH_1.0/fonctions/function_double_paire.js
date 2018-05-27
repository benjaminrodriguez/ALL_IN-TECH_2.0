//=========================================================================
// Traitement de "function_double_paire.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_double_paire = function (carte1Joueur, carte2Joueur, riviere, valeurMain) {

	// VARIABLE

    var river1;
    var river2;
    var river3;

	// TEST DU DOUBLE PAIRE

	river1 = riviere[0].valeur;
	river2 = riviere[1].valeur;
	river3 = riviere[2].valeur;

    if (carte1Joueur === carte2Joueur) {
		if (carte1Joueur === river1 || carte1Joueur === river2 || carte1Joueur === river3 ) {
			valeurMain.valeurMain = 3;
		} else if (carte2Joueur === river1 || carte2Joueur === river2 || carte2Joueur === river3) {
			valeurMain.valeurMain = 3;
		}
    } else if (carte1Joueur === river1 || carte1Joueur === river2 || carte1Joueur === river3 ) {
        if (carte1Joueur === carte2Joueur) {
			valeurMain.valeurMain = 3;
		} else if (carte2Joueur === river1 || carte2Joueur === river2 || carte2Joueur === river3 ) {
			valeurMain.valeurMain = 3;
		}
    } else if (carte2Joueur=== river1 || carte2Joueur === river2 || carte2Joueur === river3 ) {
		if (carte1Joueur === carte2Joueur) {
			valeurMain.valeurMain = 3;
		} else if (carte1Joueur === river1 || carte1Joueur === river2 || carte1Joueur === river3 ) {
			valeurMain.valeurMain = 3;
		}
    }
};
//--------------------------------------------------------------------------

module.exports = function_double_paire;
