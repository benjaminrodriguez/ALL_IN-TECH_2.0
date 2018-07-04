//=========================================================================
// Traitement de "function_carre.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_carre = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	// VARIABLE
	var compteur;
	var i;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	compteur = 0;

	if(carte1Joueur === carte2Joueur){
		compteur++;
	}

	for(i = 0; i < riviere.length; i++){
		if(carte1Joueur === riviere[i].valeur || carte2Joueur === riviere[i].valeur){
			compteur++;
		}
	}

	if(compteur >= 4){
		membres.valeurMain[joueur] = 8;
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_carre;
