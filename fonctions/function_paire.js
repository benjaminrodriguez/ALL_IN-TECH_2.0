//=========================================================================
// Traitement de "function_paire.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_paire = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	// VARIABLE 
	var i;
	var compteur;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	compteur = 0;

	for( i = 0; i < riviere.length; i++){
		if(carte1Joueur === riviere[i].valeur || carte2Joueur === riviere[i].valeur){
			compteur++;
		}
	}

	if(carte1Joueur === carte2Joueur){
		membres.valeurMain[joueur] = 2;
	}else if(compteur >= 1){
		membres.valeurMain[joueur] = 2;
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_paire;
