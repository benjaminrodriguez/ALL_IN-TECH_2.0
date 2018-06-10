//=========================================================================
// Traitement de "function_couleur.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

var function_couleur = function (Carte1Joueur, Carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");


	// VARIABLE
	var i;
	var compteur;
	var carte1Joueur;
	var carte2Joueur;
	var valeurMain;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);


	// TEST DE LA COULEUR	
	compteur = 0;	
	for (i = 0;i < 5;i++) {
		if (carte1Joueur === carte2Joueur) {
			compteur = 2;
			if (carte1Joueur === riviere[i].couleur) {
				compteur++;
				if (compteur === 5) {
					membres.valeurMain[joueur] = 6;
				}
			}
		} else if(carte1Joueur != carte2Joueur) {
			compteur = 1;
			if (carte1Joueur === riviere[i].couleur) {
				compteur++;
				if (compteur === 5) {
					membres.valeurMain[joueur] = 6;
				}
			}	
		} else if (carte2Joueur != carte1Joueur) {
			compteur = 1;
			if (carte2Joueur === riviere[i].couleur) {
				compteur++;
				if (compteur === 5){
					membres.valeurMain[joueur] = 6;
				}
			}
		}

	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_couleur;
