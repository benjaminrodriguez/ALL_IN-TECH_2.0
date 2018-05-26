//=========================================================================
// Traitement de "function_couleur.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_couleur = function (Carte1Joueur, Carte2Joueur, riviere, valeurMainJoueur) {
        
    // VARIABLE

	var i;
	var compteur;
	var carte1Joueur;
	var carte2Joueur;
	var valeurMain;

	// TEST DE LA COULEUR
		
	compteur = 0;	
	for (i = 0;i < 5;i++) {
		if (carte1Joueur === carte2Joueur) {
			compteur = 2;
				if (carte1Joueur === riviere[i].couleur) {
					compteur++;
						if (compteur === 5) {
							valeurMain.valeurMain = 6;
						}
				}
		} else if(carte1Joueur != carte2Joueur) {
			compteur = 1;
				if (carte1Joueur === riviere[i].couleur) {
					compteur++;
					if (compteur === 5) {
						valeurMain.valeurMain = 6;
					}
				}	
		} else if (carte2Joueur != carte1Joueur) {
			compteur = 1;
				if (carte2Joueur === riviere[i].couleur) {
					compteur++;
					if (compteur === 5){
						valeurMain.valeurMain = 6;
					}
				}
		}

	}
};
//--------------------------------------------------------------------------

module.exports = function_couleur;
