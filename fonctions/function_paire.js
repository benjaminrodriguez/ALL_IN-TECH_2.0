//=========================================================================
// Traitement de "function_paire.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_paire = function (carte1Joueur1, carte2Joueur1, riviere, joueur, partie) {

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
        membres.valeurMain[joueur] = 2;
    } else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
        membres.valeurMain[joueur] = 2;
    } else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
        membres.valeurMain[joueur] = 2;
    }

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_paire;
