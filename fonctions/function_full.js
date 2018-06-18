//=========================================================================
// Traitement de "function_full.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_full = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON 
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	//VARIABLE
	var compteur1;
	var compteur2;
	var i;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	compteur1 = 0;
	compteur2 = 0;

	if(carte1Joueur !== carte2Joueur){
		for(i = 0; i < riviere.length; i++){
			if(carte1Joueur === riviere[i].valeur){
				compteur1++;
			}else if(carte2Joueur === riviere[i].valeur){
				compteur2++;
			}
		}
	}

	if(compteur1 >= 3 && compteur2 >= 2){
		membres.valeurMain[joueur] = 7;
	}else if(compteur1 >= 2 && compteur2 >= 3){
		membres.valeurMain[joueur] = 7;
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");


};
//--------------------------------------------------------------------------

module.exports = function_full;
