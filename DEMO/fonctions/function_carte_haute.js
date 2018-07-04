//=========================================================================
// Traitement de "function_carte_haute.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";


var fs = require ("fs");

// DEBUT DE LA FONCTION

var function_carte_haute = function (carte1Joueur1, carte2Joueur1, riviere, joueur, partie) {

	var fs = require ("fs");

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");
	var i;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	if(carte1Joueur1 !== carte2Joueur1){
		for(i = 0; i < riviere.length -1; i++){
			if(carte1Joueur1 !== riviere[i].valeur && carte2Joueur1 !== riviere[i].valeur){
				membres.valeurMain[joueur] = 1;
			}
		}
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");
};
//--------------------------------------------------------------------------

module.exports = function_carte_haute;
